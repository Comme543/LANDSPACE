package com.landspace.landspace_backend.service;

import com.landspace.landspace_backend.model.User;
import com.landspace.landspace_backend.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(
            UserRepository userRepository) {

        this.userRepository =
                userRepository;
    }


    // Register user
    public User registerUser(User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(
                        user.getEmail()
                );

        if (existingUser.isPresent()) {

            return null;
        }

        return userRepository.save(user);
    }


    // Login user
    public User loginUser(
            String email,
            String password) {

        Optional<User> user =
                userRepository.findByEmail(
                        email
                );

        if (user.isPresent()) {

            User existingUser =
                    user.get();

            if (
                existingUser
                    .getPassword()
                    .equals(password)
            ) {

                return existingUser;
            }
        }

        return null;
    }

}