// dto/CreateOrderRequest.java
package com.pgmanagement.PaymentGateway.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateOrderRequest {

    private Long tenantId;
    private Long roomId;
    private LocalDate paymentMonth;

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public LocalDate getPaymentMonth() {
        return paymentMonth;
    }

    public void setPaymentMonth(LocalDate paymentMonth) {
        this.paymentMonth = paymentMonth;
    }
}