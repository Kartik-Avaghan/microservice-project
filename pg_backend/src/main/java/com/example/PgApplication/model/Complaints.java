package com.example.PgApplication.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.stereotype.Controller;

import java.time.LocalDate;
import java.time.LocalTime;


@Entity
@Table(name = "complaints")
public class Complaints {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    private Boolean status;
    private LocalDate complaint_date;
    private LocalTime complaint_time;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tenant_id" , nullable = false)
    @JsonIgnoreProperties({"room","payments"})
    private Tenants tenant;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Tenants getTenant() {
        return tenant;
    }

    public void setTenant(Tenants tenant) {
        this.tenant = tenant;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public LocalDate getComplaint_date() {
        return complaint_date;
    }

    public void setComplaint_date(LocalDate complaint_date) {
        this.complaint_date = complaint_date;
    }

    public LocalTime getComplaint_time() {
        return complaint_time;
    }

    public void setComplaint_time(LocalTime complaint_time) {
        this.complaint_time = complaint_time;
    }
}
