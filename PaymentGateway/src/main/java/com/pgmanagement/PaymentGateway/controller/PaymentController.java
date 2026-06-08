package com.pgmanagement.PaymentGateway.controller;


import com.pgmanagement.PaymentGateway.dto.CreateOrderRequest;
import com.pgmanagement.PaymentGateway.dto.PaymentOrderResponse;
import com.pgmanagement.PaymentGateway.dto.VerifyPaymentRequest;
import com.pgmanagement.PaymentGateway.services.PaymentServices;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {


    @Autowired
    private PaymentServices paymentServices;




//    @PostMapping("/create-order")
//    public ResponseEntity<String> pgRoomBook(@RequestParam int amount, @RequestParam String currency) throws RazorpayException {
//        try{
//            return ResponseEntity.ok(paymentServices.bookRoom(amount,currency,"receiptId"));
//        }
//        catch (RazorpayException e){
//            throw new RazorpayException(e);
//        }
//    }
        @PostMapping("/create-order")
        public ResponseEntity<?> createOrder(@RequestBody CreateOrderRequest request) {
            try {
                PaymentOrderResponse response = paymentServices.createOrder(
                        request.getTenantId(),
                        request.getRoomId(),
                        request.getPaymentMonth()
                );
                return ResponseEntity.ok(response);

            } catch (RazorpayException e) {
                return ResponseEntity
                        .status(HttpStatus.BAD_GATEWAY)
                        .body(Map.of(
                                "error", "Razorpay order creation failed",
                                "details", e.getMessage()
                        ));

            } catch (Exception e) {
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", e.getMessage()));
            }
        }

        // ─── 2. Verify Payment (called by React after checkout success) ───────────
        // This is the UI confirmation path — webhook is the source of truth
        @PostMapping("/verify")
        public ResponseEntity<?> verifyPayment(@RequestBody VerifyPaymentRequest request) {


            // ADD THIS LINE
            System.out.println("Received: orderId=" + request.getRazorpayOrderId()
                    + " paymentId=" + request.getRazorpayPaymentId()
                    + " signature=" + request.getRazorpaySignature());
            try {
                paymentServices.verifyAndConfirm(
                        request.getRazorpayOrderId(),
                        request.getRazorpayPaymentId(),
                        request.getRazorpaySignature()
                );
                return ResponseEntity.ok(Map.of(
                        "message", "Payment verified successfully",
                        "status", "SUCCESS"
                ));

            } catch (RuntimeException e) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "error", "Payment verification failed",
                                "details", e.getMessage()
                        ));
            }
        }




        // ─── 3. Razorpay Webhook (Razorpay calls this directly) ──────────────────
        // Register this URL in your Razorpay dashboard under Webhooks

//        @PostMapping("/webhook")
//        public ResponseEntity<Void> handleWebhook(
//                @RequestBody String payload,
//                @RequestHeader("X-Razorpay-Signature") String signature) {
//            try {
//                // Parse the event type
//                org.json.JSONObject event = new org.json.JSONObject(payload);
//                String eventType = event.getString("event");
//
//                if ("payment.captured".equals(eventType)) {
//                    org.json.JSONObject entity = event
//                            .getJSONObject("payload")
//                            .getJSONObject("payment")
//                            .getJSONObject("entity");
//
//                    String orderId   = entity.getString("order_id");
//                    String paymentId = entity.getString("id");
//
//                    // Find payment by razorpayOrderId string (not DB id)
//                    paymentServices.verifyAndConfirm(null, paymentId, signature);
//                    // Note: See fix below for orderId vs DB id issue
//                }
//
//                return ResponseEntity.ok().build();
//
//            } catch (Exception e) {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//            }
//        }

        // ─── 4. Get Payment Status (optional — React can poll this) ──────────────
//        @GetMapping("/status/{orderId}")
//        public ResponseEntity<?> getPaymentStatus(@PathVariable Long orderId) {
//            try {
//                // Add getPaymentStatus() in your service if needed
//                return ResponseEntity.ok(Map.of("orderId", orderId));
//            } catch (Exception e) {
//                return ResponseEntity
//                        .status(HttpStatus.NOT_FOUND)
//                        .body(Map.of("error", "Payment not found"));
//            }
//        }
//    }

}
