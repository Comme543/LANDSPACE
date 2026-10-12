package com.landspace.landspace_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.landspace.landspace_backend.model.Property;
import com.landspace.landspace_backend.repository.PropertyRepository;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public Property addProperty(Property property) {
        return propertyRepository.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(String id) {

        List<Property> properties = propertyRepository.findAll();

        for (Property property : properties) {

            if (property.getId() != null &&
                property.getId().trim().equals(id.trim())) {

                return Optional.of(property);
            }
        }

        return Optional.empty();
    }

    public Property updateProperty(
            String id,
            Property updatedProperty) {

        Optional<Property> existingProperty =
                getPropertyById(id);

        if (existingProperty.isPresent()) {

            Property property =
                    existingProperty.get();

            property.setPropertyName(
                    updatedProperty.getPropertyName());

            property.setLocation(
                    updatedProperty.getLocation());

            property.setPropertyType(
                    updatedProperty.getPropertyType());

            property.setArea(
                    updatedProperty.getArea());

            property.setPrice(
                    updatedProperty.getPrice());

            property.setDescription(
                    updatedProperty.getDescription());

            property.setOwnerName(
                    updatedProperty.getOwnerName());

            property.setImage(
                    updatedProperty.getImage());

            property.setStatus(
                    updatedProperty.getStatus());

            return propertyRepository.save(property);
        }

        return null;
    }

    public void deleteProperty(String id) {
        propertyRepository.deleteById(id);
    }
}