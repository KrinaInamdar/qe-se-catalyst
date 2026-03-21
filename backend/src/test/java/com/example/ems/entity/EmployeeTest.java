package com.example.ems.entity;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmployeeTest {

    @Test
    void testEmployee() {
        Employee employee = new Employee(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password");

        assertThat(employee.getEmail()).isEqualTo("john@example.com");
        assertThat(employee.getFirstName()).isEqualTo("John");
    }
    @Test
void testEmployeeConstructor() {
    Employee employee = new Employee(1L, "Jane", "Doe", "jane@example.com", "0987654321", "ADMIN", "password");

    assertThat(employee.getId()).isEqualTo(1L);
    assertThat(employee.getFirstName()).isEqualTo("Jane");
    assertThat(employee.getLastName()).isEqualTo("Doe");
    assertThat(employee.getEmail()).isEqualTo("jane@example.com");
    assertThat(employee.getPhone()).isEqualTo("0987654321");
    assertThat(employee.getRole()).isEqualTo("ADMIN");
    assertThat(employee.getPassword()).isEqualTo("password");
}

@Test
void testEmployeeEquality() {
    Employee emp1 = new Employee(1L, "Jane", "Doe", "jane@example.com", "0987654321", "ADMIN", "password");
    Employee emp2 = new Employee(1L, "Jane", "Doe", "jane@example.com", "0987654321", "ADMIN", "password");

    assertThat(emp1).isEqualTo(emp2);
    assertThat(emp1.hashCode()).isEqualTo(emp2.hashCode());
}

@Test
void testEmployeeWithNullValues() {
    Employee employee = new Employee();
    employee.setId(null);
    employee.setFirstName(null);
    employee.setLastName(null);
    employee.setEmail(null);
    employee.setPhone(null);
    employee.setRole(null);
    employee.setPassword(null);

    assertThat(employee.getId()).isNull();
    assertThat(employee.getFirstName()).isNull();
    assertThat(employee.getLastName()).isNull();
    assertThat(employee.getEmail()).isNull();
    assertThat(employee.getPhone()).isNull();
    assertThat(employee.getRole()).isNull();
    assertThat(employee.getPassword()).isNull();
}

@Test
void testEmployeeToString() {
    Employee employee = new Employee(1L, "Jane", "Doe", "jane@example.com", "0987654321", "ADMIN", "password");
    String expected = "Employee(id=1, firstName=Jane, lastName=Doe, email=jane@example.com, phone=0987654321, role=ADMIN, password=password)";
    assertThat(employee.toString()).isEqualTo(expected);
}
}