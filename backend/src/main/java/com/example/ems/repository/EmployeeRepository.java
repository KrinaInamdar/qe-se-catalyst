package com.example.ems.repository;

import com.example.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Spring Data JPA automatically provides CRUD methods:
    // - save(Employee)
    // - findById(Long)
    // - findAll()
    // - deleteById(Long)
    // - count()
    
    // Custom method to find employee by email
    Optional<Employee> findByEmail(String email);
}