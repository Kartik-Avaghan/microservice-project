package com.example.PgApplication.dto;

import com.example.PgApplication.model.Complaints;

import java.time.LocalDate;
import java.time.LocalTime;

public class ComplaintResponse {

    private Long id;
    private String text;
    private boolean status;
    private LocalDate complaintDate;
    private LocalTime complaintTime;
    private String tenantName;

    // constructor
    public ComplaintResponse(Complaints c) {
        this.id = c.getId();
        this.text = c.getText();
        this.status = c.getStatus();
        this.complaintDate = c.getComplaint_date();
        this.complaintTime = c.getComplaint_time();
        this.tenantName = c.getTenant() != null ? c.getTenant().getName() : null;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public LocalDate getComplaintDate() {
        return complaintDate;
    }

    public void setComplaintDate(LocalDate complaintDate) {
        this.complaintDate = complaintDate;
    }

    public LocalTime getComplaintTime() {
        return complaintTime;
    }

    public void setComplaintTime(LocalTime complaintTime) {
        this.complaintTime = complaintTime;
    }

    public String getTenantName() {
        return tenantName;
    }

    public void setTenantName(String tenantName) {
        this.tenantName = tenantName;
    }
}
