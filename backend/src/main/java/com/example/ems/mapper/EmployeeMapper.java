package com.example.ems.mapper;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        if (employee == null) return null;
        return new EmployeeDto(
            employee.getId(),
            employee.getFirstName(),
            employee.getLastName(),
            employee.getEmail(),
            employee.getPhone(),
            employee.getRole(),
            null
        );
    }

    public static Employee mapToEmployee(EmployeeDto dto) {
        if (dto == null) return null;
        Employee e = new Employee();
        e.setId(dto.getId());
        e.setFirstName(dto.getFirstName());
        e.setLastName(dto.getLastName());
        e.setEmail(dto.getEmail());
        e.setPhone(dto.getPhone());
        e.setRole(dto.getRole());
       e.setPassword(dto.getPassword());
        return e;
    }

    public static void updateEmployeeFromDto(Employee existing, EmployeeDto dto) {
        if (existing == null || dto == null) return;
        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        existing.setPhone(dto.getPhone());
        existing.setRole(dto.getRole());
        existing.setPassword(dto.getPassword());
    }

}