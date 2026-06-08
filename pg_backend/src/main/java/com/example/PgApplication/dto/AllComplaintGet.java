package com.example.PgApplication.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AllComplaintGet {

    private Long id;
    private String text;
    private Boolean status;
    private LocalDate complaintDate;
    private LocalTime complaintTime;
    private Long tenantId;
    private String tenantName;
    private Long roomId;

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

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
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

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public String getTenantName() {
        return tenantName;
    }

    public void setTenantName(String tenantName) {
        this.tenantName = tenantName;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }
}
