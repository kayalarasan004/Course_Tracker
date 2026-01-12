import api from './api';

const COURSE_API_URL = '/courses'; // Base URL for course-service if using gateway, or just /courses

const courseService = {
  // Get all courses
  getAllCourses: async () => {
    const response = await api.get(COURSE_API_URL);
    return response.data;
  },

  // Get course by ID
  getCourseById: async (courseId) => {
    const response = await api.get(`${COURSE_API_URL}/${courseId}`);
    return response.data;
  },

  // Create - Instructor only
  createCourse: async (courseData) => {
    const response = await api.post(COURSE_API_URL, courseData);
    return response.data;
  },

  // Enroll Student
  enrollStudent: async (courseId, studentId) => {
    // Matches EnrollmentController.java: @PostMapping("/enroll") with body {userId, courseId}
    const response = await api.post('/enrollments/enroll', {
      userId: studentId,
      courseId: courseId
    });
    return response.data;
  },

  // Get Enrolled Courses
  getEnrolledCourses: async (studentId) => {
    const response = await api.get(`${COURSE_API_URL}/student/${studentId}`);
    return response.data;
  }
};

export default courseService;
