package com.example.ems.controller;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HelloWordController {
    @GetMapping("/hello")
    //httap://localhost:8080/hello-world
    public String sayHello(Model model) {
        model.addAttribute("message", "Hello, Thymeleaf!");
        return "hello"; // This refers to a Thymeleaf template named "hello.html"
    }
}
