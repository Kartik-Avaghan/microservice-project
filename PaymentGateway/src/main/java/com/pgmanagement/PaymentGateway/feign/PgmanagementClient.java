package com.pgmanagement.PaymentGateway.feign;

import com.pgmanagement.PaymentGateway.dto.TenantResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;

@FeignClient("PgApplication")
public interface PgmanagementClient {


    @GetMapping("/api/rooms/rent/{roomId}")
//    @PreAuthorize("hasRole('ADMIN','GUEST)")
   BigDecimal getTenantsRent(@PathVariable Long roomId);

    @GetMapping("/api/tenants/{id}")
    TenantResponse getTenantsDetails(@PathVariable Long id);
}
