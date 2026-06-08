//package com.example.PgApplication.controle;
//
//import com.example.PgApplication.enums.Months;
//import com.example.PgApplication.model.Payment;
//import com.example.PgApplication.model.Tenants;
//import com.example.PgApplication.service.PaymentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/payment")
//public class PaymentController {
//
//
//    @Autowired
//    public PaymentService paymentService;
//
//
////    Tenant makes payment
//    @PostMapping("/pay/{tenantId}")
//    public ResponseEntity<?> makePayment(@PathVariable Long tenantId) {
//        try {
//            Payment payment = paymentService.makePayment(tenantId);
//            return ResponseEntity.ok(payment);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
//
//    //  Generate monthly reminders (can be called by admin or scheduled job)
//    @PostMapping("/generateReminders/{tenantId}")
//    public ResponseEntity<String> generateReminders(@PathVariable Long tenantId) {
//        try {
//            paymentService.monthlyPaymentReminder(tenantId);
//            return ResponseEntity.ok("Payment reminder generated successfully for tenant ID: " + tenantId);
//        } catch (RuntimeException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("Error while generating reminder: " + e.getMessage());
//        }
//    }
//
//
//    //  Get payment history of a tenant
//    @GetMapping("/tenant/{tenantId}")
//    public ResponseEntity<List<Payment>> getPaymentsByTenant(@PathVariable Long tenantId) {
//        return ResponseEntity.ok(paymentService.paymentHistory(tenantId));
//    }
//
//    //  Get all pending payments
//    @GetMapping("/pending")
//    public ResponseEntity<List<Tenants>> getPendingPayments() {
//        return ResponseEntity.ok(paymentService.paymentPending());
//    }
//
//
//    @GetMapping("/paidPayments/{month}")
//    public ResponseEntity<List<Payment>> getAllPaidPaymentByMonth(@PathVariable("month") Months month) {
//        return ResponseEntity.ok(paymentService.getAllPaidPaymentsByMonth(month));
//    }
//}
