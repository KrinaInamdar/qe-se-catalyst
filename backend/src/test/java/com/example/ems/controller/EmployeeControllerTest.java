// package com.example.ems.controller;

// import com.example.ems.dto.EmployeeDto;
// import com.example.ems.service.EmployeeService;
// import org.junit.jupiter.api.Test;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.MediaType;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.*;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// @WebMvcTest(EmployeeController.class)
// @AutoConfigureMockMvc(addFilters = false)
// class EmployeeControllerTest {

//     @Autowired
//     private MockMvc mockMvc;

//     @MockBean
//     private EmployeeService employeeService;

//     @Autowired
//     private ObjectMapper objectMapper;

//     @MockBean
//     private JwtUtils jwtUtils;

//     @Test
//     void testCreateEmployee() throws Exception {
//         EmployeeDto dto = new EmployeeDto(null, "John", "Doe", "john@example.com", "1234567890", "USER", "password");
//         when(employeeService.createEmployee(any(EmployeeDto.class))).thenReturn(dto);

//         mockMvc.perform(post("/api/employees")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(dto)))
//                 .andExpect(status().isCreated())
//                 .andExpect(jsonPath("$.email").value("john@example.com"));

//         verify(employeeService, times(1)).createEmployee(any(EmployeeDto.class));
//     }
// }