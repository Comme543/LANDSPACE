package com.landspace.landspace_backend.repository;

import com.landspace.landspace_backend.model.User;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository
        extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

}