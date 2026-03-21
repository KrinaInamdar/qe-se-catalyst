package com.example.ems.dto;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmployeeDtoTest {

    @Test
    void testEmployeeDto() {
        EmployeeDto dto = new EmployeeDto(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password");

        assertThat(dto.getEmail()).isEqualTo("john@example.com");
        assertThat(dto.getFirstName()).isEqualTo("John");
    }

     @Test
    void testEmployeeDtoGettersAndSetters() {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(1L);
        dto.setFirstName("John");
        dto.setLastName("Doe");
        dto.setEmail("john@example.com");
        dto.setPhone("1234567890");
        dto.setRole("USER");
        dto.setPassword("password");

        assertThat(dto.getId()).isEqualTo(1L);
        assertThat(dto.getFirstName()).isEqualTo("John");
        assertThat(dto.getLastName()).isEqualTo("Doe");
        assertThat(dto.getEmail()).isEqualTo("john@example.com");
        assertThat(dto.getPhone()).isEqualTo("1234567890");
        assertThat(dto.getRole()).isEqualTo("USER");
        assertThat(dto.getPassword()).isEqualTo("password");
    }

    @Test
void testEmployeeDtoConstructor() {
    EmployeeDto dto = new EmployeeDto(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password");

    assertThat(dto.getId()).isEqualTo(1L);
    assertThat(dto.getFirstName()).isEqualTo("John");
    assertThat(dto.getLastName()).isEqualTo("Doe");
    assertThat(dto.getEmail()).isEqualTo("john@example.com");
    assertThat(dto.getPhone()).isEqualTo("1234567890");
    assertThat(dto.getRole()).isEqualTo("USER");
    assertThat(dto.getPassword()).isEqualTo("password");
}

@Test
void testEmployeeDtoEquality() {
    EmployeeDto dto1 = new EmployeeDto(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
    EmployeeDto dto2 = new EmployeeDto(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password");

    assertThat(dto1).isEqualTo(dto2);
    assertThat(dto1.hashCode()).isEqualTo(dto2.hashCode());
}

@Test
void testEmployeeDtoWithNullValues() {
    EmployeeDto dto = new EmployeeDto();
    dto.setId(null);
    dto.setFirstName(null);
    dto.setLastName(null);
    dto.setEmail(null);
    dto.setPhone(null);
    dto.setRole(null);
    dto.setPassword(null);

    assertThat(dto.getId()).isNull();
    assertThat(dto.getFirstName()).isNull();
    assertThat(dto.getLastName()).isNull();
    assertThat(dto.getEmail()).isNull();
    assertThat(dto.getPhone()).isNull();
    assertThat(dto.getRole()).isNull();
    assertThat(dto.getPassword()).isNull();
}

@Test
void testEmployeeDtoToString() {
    EmployeeDto dto = new EmployeeDto(1L, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
    String expected = "EmployeeDto(id=1, firstName=John, lastName=Doe, email=john@example.com, phone=1234567890, role=USER, password=password)";
    assertThat(dto.toString()).isEqualTo(expected);
}
}