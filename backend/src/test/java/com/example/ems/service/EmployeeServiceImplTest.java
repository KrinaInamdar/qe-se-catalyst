package com.example.ems.service;

import com.example.ems.dto.EmployeeDto;
import com.example.ems.entity.Employee;
import com.example.ems.repository.EmployeeRepository;
import com.example.ems.service.impl.EmployeeServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.Optional;
import java.util.List;

class EmployeeServiceImplTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private EmployeeServiceImpl employeeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateEmployee() {
        EmployeeDto dto = new EmployeeDto(null, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
        Employee employee = new Employee(null, "John", "Doe", "john@example.com", "1234567890", "USER",
                "encryptedPassword");

        when(passwordEncoder.encode(dto.getPassword())).thenReturn("encryptedPassword");
        when(employeeRepository.save(any(Employee.class))).thenReturn(employee);

        EmployeeDto result = employeeService.createEmployee(dto);

        assertThat(result.getEmail()).isEqualTo("john@example.com");
        verify(employeeRepository, times(1)).save(any(Employee.class));
    }

    @Test
    void testGetEmployeeById() {
        Employee employee = new Employee(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        EmployeeDto result = employeeService.getEmployeeById(1L);

        assertThat(result.getEmail()).isEqualTo("john@example.com");
        verify(employeeRepository, times(1)).findById(1L);
    }

    @Test
    void testGetAllEmployees() {
        List<Employee> employees = List.of(
                new Employee(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password"),
                new Employee(2L, "Jane", "Doe", "jane@example.com", "0987654321", "USER", "password"));
        when(employeeRepository.findAll()).thenReturn(employees);

        List<EmployeeDto> result = employeeService.getAllEmployees();

        assertThat(result).hasSize(2);
        verify(employeeRepository, times(1)).findAll();
    }

    @Test
    void testUpdateEmployee() {
        Employee existingEmployee = new Employee(1L, "John", "Doe", "john@example.com", "1234567890", "USER",
                "password");
        EmployeeDto dto = new EmployeeDto(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "newpassword");

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(existingEmployee));
        when(passwordEncoder.encode(dto.getPassword())).thenReturn("encryptedNewPassword");
        when(employeeRepository.save(any(Employee.class))).thenReturn(existingEmployee);

        EmployeeDto result = employeeService.updateEmployee(1L, dto);

        // Ensure the password was encoded and set correctly
        assertThat(existingEmployee.getPassword()).isEqualTo("encryptedNewPassword");
        verify(employeeRepository, times(1)).findById(1L);
        verify(employeeRepository, times(1)).save(existingEmployee);
    }

    @Test
    void testDeleteEmployee() {
        Employee employee = new Employee(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        doNothing().when(employeeRepository).delete(employee);

        employeeService.deleteEmployee(1L);

        verify(employeeRepository, times(1)).findById(1L);
        verify(employeeRepository, times(1)).delete(employee);
    }

}
