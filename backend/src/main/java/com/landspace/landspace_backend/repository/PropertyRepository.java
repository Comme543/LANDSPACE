package com.landspace.landspace_backend.repository;

import com.landspace.landspace_backend.model.Property;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PropertyRepository extends MongoRepository<Property, String> {

}