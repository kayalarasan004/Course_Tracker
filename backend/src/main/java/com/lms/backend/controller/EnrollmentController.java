package com.lms.backend.controller;

import com.lms.backend.model.Enrollment;
import com.lms.backend.model.User;
import com.lms.backend.model.Course;
import com.lms.backend.repository.EnrollmentRepository;
import com.lms.backend.repository.CourseRepository;
import com.lms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{userId}")
    public List<Enrollment> getUserEnrollments(@PathVariable Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollStudent(@RequestBody EnrollmentRequest request) {
        // Simple mock implementation
        User user = userRepository.findById(request.getUserId()).orElseThrow();
        Course course = courseRepository.findById(request.getCourseId()).orElseThrow();

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);

        return ResponseEntity.ok(enrollmentRepository.save(enrollment));
    }

    // Helper DTO class
    public static class EnrollmentRequest {
        private Long userId;
        private Long courseId;

        // getters and setters
        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }

        public Long getCourseId() {
            return courseId;
        }

        public void setCourseId(Long courseId) {
            this.courseId = courseId;
        }
    }
}
