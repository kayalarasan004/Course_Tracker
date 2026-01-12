# LMS Project Architecture & Data Flow

This document explains how the Learning Management System (LMS) works, how the different parts connect, and the flow of data from the User's click to the Database storage.

## 1. High-Level Architecture

The project follows a standard **3-Tier Architecture**:

1.  **Frontend (Presentation Layer)**: Built with **React**. This is what the user sees (UI).
2.  **Backend (Application Layer)**: Built with **Spring Boot (Java)**. This processes logic and security.
3.  **Database (Data Layer)**: Built with **MySQL**. This stores all the data permanently.

```mermaid
graph LR
    User -->|Clicks in Browser| Frontend[React App (Port 5173)]
    Frontend -->|REST API (JSON)| Backend[Spring Boot API (Port 8080)]
    Backend -->|JPA / JDBC| Database[(MySQL Database (Port 3306))]
```

---

## 2. How Components Connect

### A. Frontend ↔ Backend (REST API)
*   **The Bridge**: use **Axios** (an HTTP client library) in React to talk to the Backend.
*   **The Protocol**: They speak **JSON** over HTTP.
*   **File**: `src/services/api.js` acts as the gateway. It knows the Backend URL (`http://localhost:8080/api`) and automatically attaches security tokens.

### B. Backend ↔ Database (JPA/Hibernate)
*   **The Bridge**: Spring Boot uses **Spring Data JPA** (Hibernate) to talk to MySQL.
*   **The Configuration**: `application.properties` contains the credentials (`password@123`, `jdbc:mysql://...`).
*   **The Magic**: We don't write raw SQL queries like `SELECT *`. Instead, we create a Java Interface called a `Repository` (e.g., `CourseRepository`), and Java automatically converts Java commands into SQL queries.

---

## 3. Key API Workflows

Here is exactly what happens when you perform key actions in the app:

### Workflow 1: Viewing the Course List
*   **Goal**: Show available courses on the Home/Dashboard page.
1.  **Frontend**: Page loads -> `courseService.getAllCourses()` runs.
2.  **Network Request**: `GET http://localhost:8080/api/courses`
3.  **Backend Controller**: `CourseController.getAllCourses()` receives the request.
4.  **Backend Logic**: Calls `courseRepository.findAll()`.
5.  **Database**: Executes SQL: `SELECT * FROM courses;`
6.  **Response**: List of Course objects (JSON) -> Sent back to React.
7.  **Result**: React loops through the data and renders `<CourseCard />` for each one.

### Workflow 2: Enrolling in a Course
*   **Goal**: A student clicks "Enroll".
1.  **Frontend**: User clicks button -> `courseService.enrollStudent(courseId, studentId)`.
2.  **Network Request**: `POST http://localhost:8080/api/enrollments/enroll`
    *   *Body*: `{ "userId": 1, "courseId": 2 }`
3.  **Backend Controller**: `EnrollmentController.enrollStudent()` receives the data.
4.  **Backend Logic**: 
    *   Finds User 1.
    *   Finds Course 2.
    *   Creates a new `Enrollment` entity.
5.  **Database**: Executes SQL: `INSERT INTO enrollments (user_id, course_id, ...) VALUES (1, 2, ...);`
6.  **Response**: "Success" (200 OK).
7.  **Result**: Frontend redirects user to the Course Player.

---

## 4. Why This Architecture?

*   **Security**: The Database is hidden behind the Backend. Users cannot run SQL commands directly from the browser (preventing SQL Injection).
*   **Scalability**: If the site gets popular, we can add more Backend servers without changing the Frontend code.
*   **Separation of Concerns**:
    *   **React** focuses purely on looking good (UI/UX).
    *   **Spring Boot** focuses purely on logic (Rules, Calculations, Security).
    *   **MySQL** focuses purely on data integrity (Storage).
