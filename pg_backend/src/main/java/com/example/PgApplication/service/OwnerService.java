package com.example.PgApplication.service;


import com.example.PgApplication.model.Owner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.PgApplication.repo.OwnerRepo;

import java.util.*;

@Service
public class OwnerService {



    @Autowired
public OwnerRepo ownerRepo;

    public Owner saveOwner(Owner owner) {
        return ownerRepo.save(owner);
    }

    public List<Owner> getOwners() {
        return ownerRepo.findAll();
    }

    }