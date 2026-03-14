package com.example.ems.repository;

import com.example.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Spring Data JPA automatically provides CRUD methods:
    // - save(Employee)
    // - findById(Long)
    // - findAll()
    // - deleteById(Long)
    // - count()
    // etc.
}