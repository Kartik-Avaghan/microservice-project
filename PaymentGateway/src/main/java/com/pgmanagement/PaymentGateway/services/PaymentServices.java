package com.pgmanagement.PaymentGateway.services;


import com.pgmanagement.PaymentGateway.Enum.PaymentStatus;
import com.pgmanagement.PaymentGateway.dto.PaymentOrderResponse;
import com.pgmanagement.PaymentGateway.dto.TenantResponse;
import com.pgmanagement.PaymentGateway.feign.PgmanagementClient;
import com.pgmanagement.PaymentGateway.repo.PaymentRepository;
import com.pgmanagement.PaymentGateway.entity.Payment;
import com.razorpay.Order;
//import com.razorpay.Payment;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class PaymentServices {

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;


    @Autowired
    private PgmanagementClient pgmanagementClient;

    @Autowired
    private PaymentRepository paymentRepository;


//    public String bookRoom(int amount, String currency, String receiptId) throws RazorpayException {
//
//        RazorpayClient razorpayClient = new RazorpayClient(apiKey,apiSecret);
//        JSONObject orderRequest = new JSONObject();
//        orderRequest.put("amount",amount);
//        orderRequest.put("currency", currency);
//        orderRequest.put("receipt",receiptId);
//
//        Order order = razorpayClient.orders.create(orderRequest);
//        return order.toString();
//
//    }


    public PaymentOrderResponse createOrder(Long tenantId, Long roomId, LocalDate paymentMonth) throws RazorpayException {

        BigDecimal amount = pgmanagementClient.getTenantsRent(roomId);

        TenantResponse tenant = pgmanagementClient.getTenantsDetails(tenantId);

        RazorpayClient client = new RazorpayClient(apiKey,apiSecret);
        JSONObject opts = new JSONObject();

        opts.put("amount", amount.multiply(BigDecimal.valueOf(100)).intValue());
        opts.put("currency", "INR");
        opts.put("receipt", "rcpt_" + tenantId + "_" + System.currentTimeMillis());


        // Optional: add notes for Razorpay dashboard visibility
        JSONObject notes = new JSONObject();
        notes.put("tenant_name", tenant.getName());
        notes.put("room_id", roomId);
        notes.put("month", paymentMonth.toString());
        opts.put("notes", notes);

        Order order = client.orders.create(opts);

        Payment payment = new Payment();
        payment.setTenantId(tenantId);
        payment.setRoomId(roomId);
        payment.setAmount(amount);
        payment.setRazorpayOrderId(order.get("id"));
        payment.setStatus(PaymentStatus.CREATED);
        payment.setPaymentMonth(paymentMonth);
        payment.setCreatedAt(LocalDateTime.now());
        paymentRepository.save(payment);

        return new PaymentOrderResponse(order.get("id"), apiKey, amount);


    }


    public void verifyAndConfirm(String razorpayOrderId, String paymentId, String signature) {
        String payload = razorpayOrderId + "|" + paymentId;
        try {
            boolean valid = Utils.verifySignature(payload, signature, apiSecret);

            Payment payment = paymentRepository.findByRazorpayOrderId(razorpayOrderId)
                    .orElseThrow(() -> new RuntimeException(
                            "Payment order not found: " + razorpayOrderId
                    ));

            if (valid) {
                payment.setStatus(PaymentStatus.SUCCESS);
                payment.setRazorpayPaymentId(paymentId);
                payment.setRazorpaySignature(signature);
            } else {
                payment.setStatus(PaymentStatus.FAILED);
            }

            payment.setUpdatedAt(LocalDateTime.now());
            paymentRepository.save(payment);

        } catch (RuntimeException e) {
            throw e;  // let it bubble — don't swallow it
        } catch (Exception e) {
            throw new RuntimeException("Signature verification failed: " + e.getMessage());
        }
    }
}
