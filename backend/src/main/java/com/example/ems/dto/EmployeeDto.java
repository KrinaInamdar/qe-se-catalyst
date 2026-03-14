package com.example.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// DTO for Employee use for transferring data between layers(e.g., Service to Controller)it represents the data structure without exposing the entity directly.
public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;
    // Getters and Setters
}