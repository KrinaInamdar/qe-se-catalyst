package com.example.ems.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employees") // Explicitly tell Postgres to use 'employees'
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name") // Good practice for Postgres naming
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    private String phone;
    private String role;
}
