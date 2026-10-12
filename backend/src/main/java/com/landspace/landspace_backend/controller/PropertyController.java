package com.landspace.landspace_backend.controller;

import com.landspace.landspace_backend.model.Property;
import com.landspace.landspace_backend.service.PropertyService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:4200")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @PostMapping
    public Property addProperty(@RequestBody Property property) {
        return propertyService.addProperty(property);
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/{id}")
    public Optional<Property> getPropertyById(
            @PathVariable String id) {

        return propertyService.getPropertyById(id);
    }

    @PutMapping("/{id}")
    public Property updateProperty(
            @PathVariable String id,
            @RequestBody Property property) {

        return propertyService.updateProperty(
                id,
                property
        );
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(
            @PathVariable String id) {

        propertyService.deleteProperty(id);
    }
}