//package com.example.PgApplication.service;
//
//
//import com.example.PgApplication.enums.Months;
//import com.example.PgApplication.model.*;
//import com.example.PgApplication.repo.NotificationRepo;
//import com.example.PgApplication.repo.PaymentRepo;
//import com.example.PgApplication.repo.RoomsRepo;
//import com.example.PgApplication.repo.TenantRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class PaymentService {
//
//
//    @Autowired
//    public PaymentRepo paymentRepo;
//
//    @Autowired
//    public TenantRepo tenantRepo;
//
//    @Autowired
//    public RoomsRepo roomsRepo;
//
//    @Autowired
//    public NotificationRepo notificationRepo;
//
//
//    public Payment makePayment(Long tenantId) {
//        Tenants tenant = tenantRepo.findById(tenantId)
//                .orElseThrow(() -> new RuntimeException("Tenant not find with Id" + tenantId));
//
//        Rooms room = tenant.getRoom();
//        BigDecimal rentAmount = tenant.getRoom().getRent();
//
//        LocalDate today = LocalDate.now();
//        Months currentMonth = Months.valueOf(today.getMonth().name());
//        int currentYear = today.getYear();
//
//        Optional<Payment> existingPayment = paymentRepo.findByTenantAndMonthAndYear(tenant, currentMonth, currentYear);
//        if (existingPayment.isPresent()) {
//            throw new RuntimeException("Payment already made for this month");
//
//        }
//
//        Payment payment = new Payment();
//        payment.setPayment_date(today);
//        payment.setYear(currentYear);
//        payment.setMonth(currentMonth);
//        payment.setAmount(rentAmount);
//        payment.setStatus(true);
//        payment.setTenant(tenant);
//        payment.setRoom(room);
//
//        paymentRepo.save(payment);
//
//
//        Notification notification = new Notification();
//        notification.setTenant(tenant);
//        notification.setMessage("Payment of ₹" + rentAmount + " for " + currentMonth + " has been successfully received.");
//
//        notificationRepo.save(notification);
//
//        return payment;
//    }
//
//
//    //    generating payment due reminder
//    public void monthlyPaymentReminder(Long tenantId) {
//        // Fetch tenant by ID
//        Optional<Tenants> optionalTenant = tenantRepo.findById(tenantId);
//
//        if (optionalTenant.isEmpty()) {
//            throw new RuntimeException("Tenant not found with ID: " + tenantId);
//        }
//
//        Tenants tenant = optionalTenant.get();
//
//        // Get current month and year
//        LocalDate today = LocalDate.now();
//        Months currentMonth = Months.valueOf(today.getMonth().name());
//        int currentYear = today.getYear();
//
//        // Check if payment for current month already exists
//        Optional<Payment> existingPayment = paymentRepo.findByTenantAndMonthAndYear(tenant, currentMonth, currentYear);
//
//        if (existingPayment.isEmpty()) {
//            // Create a notification if no payment record exists
//            Notification notification = new Notification();
//            notification.setTenant(tenant);
//            notification.setMessage("Reminder: Rent payment of ₹"
//                    + tenant.getRoom().getRent()
//                    + " for " + currentMonth + " " + currentYear
//                    + " is pending. Please pay soon.");
//            notificationRepo.save(notification);
//
//            System.out.println("Payment reminder notification sent to tenant: " + tenant.getName());
//        } else {
//            System.out.println("Payment already exists for " + currentMonth + " " + currentYear + " for tenant: " + tenant.getName());
//        }
//    }
//
//
//
//    //        View payment history of a tenant
//      public List<Payment> paymentHistory(Long tenantId){
//        Tenants tenant = tenantRepo.findById(tenantId)
//                .orElseThrow(()->new RuntimeException("Tenant not found with Id:" + tenantId));
//        return paymentRepo.findByTenant(tenant);
//
//      }
//
//
////      Get all pending payments (for admin)
//    public List<Tenants> paymentPending(){
//        LocalDate today =LocalDate.now();
//        Months currentMonth = Months.valueOf(today.getMonth().name());
//        int currentYear = today.getYear();
//
//        List<Tenants> tenants = tenantRepo.findAll();
//        return tenants.stream()
//                .filter(tenant -> paymentRepo.findByTenantAndMonthAndYear(tenant, currentMonth, currentYear).isEmpty())
//                .toList();
//    }
//
//
//    public List<Payment> getAllPaidPaymentsByMonth(Months month) {
//        LocalDate monthStart = LocalDate.of(LocalDate.now().getYear(), month.ordinal() + 1, 1);
//        return paymentRepo.findPaidPaymentsByMonth(month, monthStart);
//    }
//
//}
//
//
//
////    public Payment createPayment(PaymentRequest request) {
////        Tenants tenant = tenantRepo.findById(request.getTenantId())
////                .orElseThrow(() -> new RuntimeException("Tenant not found"));
////
////        Rooms room = roomsRepo.findById(request.getRoomId())
////                .orElseThrow(() -> new RuntimeException("Room not found"));
////
////        Payment payment = new Payment();
////        payment.setTenant(tenant);
////        payment.setRoom(room);
////        payment.setPayment_date(LocalDate.now());
////        payment.setAmount(room.getRent());  // rent is fetched from room entity
////        payment.setStatus(false);
////        payment.setMonth(request.getMonth());
////        payment.setYear(request.getYear());
////
////        return paymentRepo.save(payment);
////    }
////
////
////
////
////    public Payment markAsPaid(Long paymentId){
////        Payment payment =paymentRepo.findById(paymentId)
////                .orElseThrow(()->new RuntimeException("Payment not found"));
////        payment.setStatus(true);
////        return paymentRepo.save(payment);
////    }
//
//
//
//
//
//
//
//
//
