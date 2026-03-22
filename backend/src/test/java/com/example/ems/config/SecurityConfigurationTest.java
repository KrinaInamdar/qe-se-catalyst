package com.example.ems.config;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class SecurityConfigurationTest {

    // No @SpringBootTest, no @Autowired. Just pure Java.
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    void testPasswordEncoder() {
        String rawPassword = "password123";
        
        // Requirement: Hashed Password (Never store in plain text)
        String encodedPassword = passwordEncoder.encode(rawPassword);
        
        assertNotNull(encodedPassword);
        assertNotEquals(rawPassword, encodedPassword); // Verify it is hashed
        assertTrue(passwordEncoder.matches(rawPassword, encodedPassword)); // Verify it works
    }
}