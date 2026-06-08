//package com.example.PgApplication.model;
//
//import com.example.PgApplication.enums.Months;
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import jakarta.persistence.*;
//
//import java.math.BigDecimal;
//import java.time.LocalDate;
//
//
//
//@Entity
//@Table(name = "payments")
//public class Payment {
//
//
//@Id
//@GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private LocalDate payment_date;
//    private int year;
//    private BigDecimal amount;
//    private Boolean status;
//    @Enumerated(EnumType.STRING)
//    private Months month;
//
////    public enum Months {
////        JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE,
////        JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER
////    }
//
//    @ManyToOne
//    @JoinColumn(name = "tenant_id", nullable = false)
//    @JsonIgnoreProperties({"payments","room","user"})
//    private Tenants tenant;
//
//    @ManyToOne
//    @JoinColumn(name = "room_id", nullable = false)
//    @JsonIgnoreProperties({"tenants", "payments"}) // Prevents deep room recursion
//    private Rooms room;
//
//
//    public Rooms getRoom() {
//        return room;
//    }
//
//    public void setRoom(Rooms room) {
//        this.room = room;
//    }
//
//    public Months getMonth() {
//        return month;
//    }
//
//    public void setMonth(Months month) {
//        this.month = month;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//
//
//    public int getYear() {
//        return year;
//    }
//
//    public void setYear(int year) {
//        this.year = year;
//    }
//
//    public LocalDate getPayment_date() {
//        return payment_date;
//    }
//
//    public Tenants getTenant() {
//        return tenant;
//    }
//
//    public void setTenant(Tenants tenant) {
//        this.tenant = tenant;
//    }
//
//    public void setPayment_date(LocalDate payment_date) {
//        this.payment_date = payment_date;
//    }
//
//
//
//    public BigDecimal getAmount() {
//        return amount;
//    }
//
//    public void setAmount(BigDecimal amount) {
//        this.amount = amount;
//    }
//
//    public Boolean getStatus() {
//        return status;
//    }
//
//    public void setStatus(Boolean status) {
//        this.status = status;
//    }
//}
