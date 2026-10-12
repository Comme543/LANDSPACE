package com.landspace.landspace_backend.controller;

import com.landspace.landspace_backend.model.User;
import com.landspace.landspace_backend.service.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;


    public UserController(
            UserService userService) {

        this.userService =
                userService;
    }


    // Register
    @PostMapping("/register")
    public User register(
            @RequestBody User user) {

        User registeredUser =
                userService.registerUser(user);

        if (registeredUser == null) {

            return null;
        }

        return registeredUser;
    }


    // Login
    @PostMapping("/login")
    public User login(
            @RequestBody User user) {

        return userService.loginUser(
                user.getEmail(),
                user.getPassword()
        );
    }

}