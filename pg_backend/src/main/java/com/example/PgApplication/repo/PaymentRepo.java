//package com.example.PgApplication.repo;
//
//import com.example.PgApplication.enums.Months;
//import com.example.PgApplication.model.Payment;
//import com.example.PgApplication.model.Tenants;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDate;
//import java.time.Month;
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface PaymentRepo extends JpaRepository<Payment , Long> {
//
//List<Payment> findByTenant(Tenants tenant);
//
//   Optional<Payment> findByTenantAndMonthAndYear(Tenants tenant, Months month, int year);
//
//   @Query("SELECT p FROM Payment p WHERE p.status = true AND p.month = :month AND p.tenant.checkin_date <= :monthStart")
//   List<Payment> findPaidPaymentsByMonth(@Param("month") Months month, @Param("monthStart") LocalDate monthStart);
//}
