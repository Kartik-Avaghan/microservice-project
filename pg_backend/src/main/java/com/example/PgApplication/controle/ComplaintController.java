package com.example.PgApplication.controle;

import com.example.PgApplication.dto.AllComplaintGet;
import com.example.PgApplication.dto.ComplaintRequest;
import com.example.PgApplication.dto.ComplaintResponse;
import com.example.PgApplication.model.Complaints;
import com.example.PgApplication.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaint")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    public ComplaintService complaintService;


    @PostMapping("/raise")
    @PreAuthorize("hasRole('GUEST')")
    public Complaints raiseComplaints(@RequestBody ComplaintRequest request) {
        return complaintService.raiseComplaints(request);
    }


    // Get all complaints
//    @GetMapping
//    @PreAuthorize("hasRole('ADMIN')")
//    public List<AllComplaintGet> getAllComplaints() {
//        return complaintService.getAllComplaints();
//    }
//
//
    @PutMapping("/resolve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ComplaintResponse resolveComplaint(@PathVariable Long id) {
        return complaintService.resolveComplaints(id);
    }



    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AllComplaintGet> getPendingComplaints() {
        return complaintService.getComplaintsByStatus(false);
    }

    @GetMapping("/resolved")
    @PreAuthorize("hasRole('ADMIN')")
    public List<AllComplaintGet> getResolvedComplaints() {
        return complaintService.getComplaintsByStatus(true);
    }

}
