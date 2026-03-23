package com.example.ems.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(org.springframework.security.config.Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/employees/login").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/employees").permitAll()
                .anyRequest().authenticated()
            );
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public org.springframework.security.authentication.dao.DaoAuthenticationProvider authenticationProvider(com.example.ems.repository.EmployeeRepository employeeRepository) {
        org.springframework.security.authentication.dao.DaoAuthenticationProvider authProvider = new org.springframework.security.authentication.dao.DaoAuthenticationProvider();
        authProvider.setUserDetailsService(email -> employeeRepository.findByEmail(email)
            .map(employee -> org.springframework.security.core.userdetails.User.builder()
                .username(employee.getEmail())
                .password(employee.getPassword() == null ? "" : employee.getPassword())
                .roles("USER")
                .build())
            .orElseThrow(() -> new org.springframework.security.core.userdetails.UsernameNotFoundException("Employee not found")));
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }
}