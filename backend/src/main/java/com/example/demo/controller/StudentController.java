package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
    // GET endpoint to fetch all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        try {
            List<Student> students = studentService.getAllStudents();
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET endpoint to fetch a student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") Integer id) {
        try {
            Optional<Student> studentData = studentService.getStudentById(id);
            if (studentData.isPresent()) {
                return new ResponseEntity<>(studentData.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // POST endpoint to create a new student
    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        try {
            Student savedStudent = studentService.createStudent(student);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // PUT endpoint to update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable("id") Integer id, @RequestBody Student student) {
        try {
            Student updatedStudent = studentService.updateStudent(id, student);
            return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // DELETE endpoint to delete a student
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable("id") Integer id) {
        try {
            studentService.deleteStudent(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET endpoint to search students by name or email
    @GetMapping("/search")
    public ResponseEntity<List<Student>> searchStudents(@RequestParam(required = false) String term) {
        try {
            List<Student> students = studentService.searchStudents(term);
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET endpoint to get students by registration year
    @GetMapping("/year/{year}")
    public ResponseEntity<List<Student>> getStudentsByYear(@PathVariable("year") int year) {
        try {
            List<Student> students = studentService.getStudentsByRegistrationYear(year);
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET endpoint to get today's registrations
    @GetMapping("/today")
    public ResponseEntity<List<Student>> getTodaysRegistrations() {
        try {
            List<Student> students = studentService.getTodaysRegistrations();
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET endpoint to get registration statistics
    @GetMapping("/stats")
    public ResponseEntity<StudentService.StudentRegistrationStats> getRegistrationStats() {
        try {
            StudentService.StudentRegistrationStats stats = studentService.getRegistrationStatistics();
            return new ResponseEntity<>(stats, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // POST endpoint for bulk registration
    @PostMapping("/bulk")
    public ResponseEntity<?> bulkRegisterStudents(@RequestBody List<Student> students) {
        try {
            List<Student> savedStudents = studentService.bulkRegisterStudents(students);
            return new ResponseEntity<>(savedStudents, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // GET endpoint to get students by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<Student>> getStudentsByDateRange(
            @RequestParam String startDate, 
            @RequestParam String endDate) {
        try {
            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);
            List<Student> students = studentService.getStudentsByDateRange(start, end);
            return new ResponseEntity<>(students, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}