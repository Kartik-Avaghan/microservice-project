package com.example.PgApplication.service;

import com.example.PgApplication.dto.AllComplaintGet;
import com.example.PgApplication.dto.ComplaintRequest;
import com.example.PgApplication.dto.ComplaintResponse;
import com.example.PgApplication.model.*;
import com.example.PgApplication.repo.ComplaintRepo;
import com.example.PgApplication.repo.NotificationRepo;
import com.example.PgApplication.repo.TenantRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class ComplaintService {

    @Autowired
    public ComplaintRepo complaintRepo;

    @Autowired
    public TenantRepo tenantRepo;

    @Autowired
    NotificationRepo notificationRepo;



    public Complaints raiseComplaints( ComplaintRequest request){
        Tenants tenant = tenantRepo.findById(request.getTenantId())
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Tenant not found with id" +request.getTenantId()));

        Complaints complaint =new Complaints();
        complaint.setTenant(tenant);
        complaint.setText(request.getText());
        complaint.setStatus(false);
        complaint.setComplaint_date(LocalDate.now());
        complaint.setComplaint_time(LocalTime.now());

        return complaintRepo.save(complaint);
    }


//    @Transactional
//    public List<AllComplaintGet> getAllComplaints() {
//        return complaintRepo.findAll().stream().map(c -> {
//            AllComplaintGet dto = new AllComplaintGet();
//            dto.setId(c.getId());
//            dto.setText(c.getText());
//            dto.setStatus(c.getStatus());
//            dto.setComplaintDate(c.getComplaint_date());
//            dto.setComplaintTime(c.getComplaint_time());
//
//            if (c.getTenant() != null) {
//                dto.setTenantId(c.getTenant().getId());
//                dto.setTenantName(c.getTenant().getName());
//                dto.setRoomId(c.getTenant().getRoom() != null ? c.getTenant().getRoom().getId() : null);
//            } else {
//                dto.setTenantName("No Tenant Assigned");
//            }
//            return dto;
//        }).collect(Collectors.toList());
//    }
//

    @Transactional
    public ComplaintResponse resolveComplaints(Long complaintId) {
        Complaints complaint = complaintRepo.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(true);
        complaintRepo.save(complaint);


        Notification notification = new Notification();
        notification.setTenant(complaint.getTenant());
        notification.setMessage("Your complaint '" + complaint.getText() + "' has been resolved. ");
        notificationRepo.save(notification);

        return new ComplaintResponse(complaint);
    }



    public List<AllComplaintGet> getComplaintsByStatus(boolean status) {
        return complaintRepo.findByStatus(status)
                .stream()
                .map(c -> {
                    AllComplaintGet dto = new AllComplaintGet();
                    dto.setId(c.getId());
                    dto.setText(c.getText());
                    dto.setStatus(c.getStatus());
                    dto.setComplaintDate(c.getComplaint_date());
                    dto.setComplaintTime(c.getComplaint_time());

                    if (c.getTenant() != null) {
                        dto.setTenantId(c.getTenant().getId());
                        dto.setTenantName(c.getTenant().getName());
                        dto.setRoomId(c.getTenant().getRoom() != null ? c.getTenant().getRoom().getId() : null);
                    } else {
                        dto.setTenantName("No Tenant Assigned");
                    }
                    return dto;
                }).collect(Collectors.toList());
    }

}

