package com.example.ems.service.impl;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;
import com.example.ems.exception.ResourceNotFoundException;
import com.example.ems.mapper.EmployeeMapper;
import com.example.ems.service.EmployeeService;
import com.example.ems.repository.EmployeeRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found" + employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(employee -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

  

//     @Override
// public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {

//     Employee employee = employeeRepository.findById(employeeId)
//             .orElseThrow(() -> new ResourceNotFoundException("Employee not found " + employeeId));

//     // update existing entity
//     employee.setFirstName(employeeDto.getFirstName());
//     employee.setLastName(employeeDto.getLastName());
//     employee.setEmail(employeeDto.getEmail());
//     employee.setPhone(employeeDto.getPhone());
//     employee.setRole(employeeDto.getRole());

//     Employee savedEmployee = employeeRepository.save(employee);

//     return EmployeeMapper.mapToEmployeeDto(savedEmployee);
// }

@Override
public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {

    Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found " + employeeId));

    EmployeeMapper.updateEmployeeFromDto(employee, employeeDto);

    Employee savedEmployee = employeeRepository.save(employee);

    return EmployeeMapper.mapToEmployeeDto(savedEmployee);
}

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found" + employeeId));
        employeeRepository.delete(employee);
    }
}