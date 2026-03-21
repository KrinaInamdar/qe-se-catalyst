package com.example.ems.repository;

import com.example.ems.entity.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.List;

@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    void testFindByEmail() {
        Employee employee = new Employee(null, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
        employeeRepository.save(employee);

        Optional<Employee> found = employeeRepository.findByEmail("john@example.com");
        assertThat(found.isPresent()).isTrue();
        assertThat(found.get().getEmail()).isEqualTo("john@example.com");
    }

    @Test
    void testSaveAndRetrieveEmployee() {
        Employee employee = new Employee(null, "Jane", "Doe", "jane@example.com", "0987654321", "ADMIN", "password");
        Employee savedEmployee = employeeRepository.save(employee);

        Optional<Employee> found = employeeRepository.findById(savedEmployee.getId());
        assertThat(found.isPresent()).isTrue();
        assertThat(found.get().getEmail()).isEqualTo("jane@example.com");
    }

    @Test
    void testFindAllEmployees() {
        Employee employee1 = new Employee(null, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
        Employee employee2 = new Employee(null, "Jane", "Doe", "jane@example.com", "0987654321", "ADMIN", "password");
        employeeRepository.save(employee1);
        employeeRepository.save(employee2);

        List<Employee> employees = employeeRepository.findAll();
        assertThat(employees).hasSize(2);
    }

    @Test
    void testDeleteEmployee() {
        Employee employee = new Employee(null, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
        Employee savedEmployee = employeeRepository.save(employee);

        employeeRepository.delete(savedEmployee);

        Optional<Employee> found = employeeRepository.findById(savedEmployee.getId());
        assertThat(found.isEmpty()).isTrue();
    }

}