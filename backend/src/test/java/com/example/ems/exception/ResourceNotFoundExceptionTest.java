package com.example.ems.exception;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ResourceNotFoundExceptionTest {

    @Test
    void testResourceNotFoundException() {
        assertThatThrownBy(() -> {
            throw new ResourceNotFoundException("Resource not found");
        }).isInstanceOf(ResourceNotFoundException.class)
          .hasMessage("Resource not found");
    }
}