package com.example.PgApplication.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    private String roomNo;
    private Integer capacity;
    private Integer occupied;
    private BigDecimal rent;
    private String status;


    //  One room has many tenants
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"room","tenant","user"})
    private List<Tenants> tenants = new ArrayList<>();

//    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
//    @JsonIgnoreProperties({"room", "tenant"})
//    private List<Payment> payments;


//    public List<Payment> getPayments() {
//        return payments;
//    }
//
//    public void setPayments(List<Payment> payments) {
//        this.payments = payments;
//    }

    public List<Tenants> getTenants() {
        return tenants;
    }

    public void setTenants(List<Tenants> tenants) {
        this.tenants = tenants;
    }

//    public String getRoomNo() {
//        return roomNo;
//    }
//
//    public void setRoomNo(String roomNo) {
//        this.roomNo = roomNo;
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

//    public Integer getOccupied() {
//        return occupied;
//    }
//
    public void setOccupied(Integer occupied) {
        this.occupied = occupied;
    }

    public BigDecimal getRent() {
        return rent;
    }

    public void setRent(BigDecimal rent) {
        this.rent = rent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getOccupied(){
        return tenants.size();
    }

    public BigDecimal getRentPerTenants(){
        int occupied = getOccupied();
        return occupied == 0 ? rent : rent.divide(BigDecimal.valueOf(occupied),2, RoundingMode.HALF_UP);
    }
}
