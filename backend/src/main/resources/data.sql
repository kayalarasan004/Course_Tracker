-- USERS (Password is 'password' for all, but effectively unused by simulated frontend login)
INSERT INTO users (email, password_hash, full_name, role, status) VALUES 
('student@test.com', 'hashed_pw_placeholder', 'Demo Student', 'STUDENT', 'ACTIVE'),
('instructor@test.com', 'hashed_pw_placeholder', 'Dr. Angela Yu', 'INSTRUCTOR', 'ACTIVE'),
('admin@test.com', 'hashed_pw_placeholder', 'System Admin', 'ADMIN', 'ACTIVE');

-- COURSES
INSERT INTO courses (title, description, price, instructor_id, status, thumbnail_url) VALUES 
('Complete React Developer Course', 'Master React v18 including Hooks, Redux, and Context API. Build real-world applications.', 49.99, 2, 'PUBLISHED', 'https://placehold.co/800x400/1e293b/white?text=React+Course'),
('Spring Boot Masterclass', 'Go from zero to hero with Java Spring Boot microservices.', 59.99, 2, 'PUBLISHED', 'https://placehold.co/800x400/1e293b/white?text=Spring+Boot'),
('UI/UX Design Fundamentals', 'Learn the basics of Figma and design theory.', 29.99, 2, 'DRAFT', 'https://placehold.co/800x400/1e293b/white?text=UI/UX');

-- ENROLLMENTS (Student enrolled in React Course)
INSERT INTO enrollments (user_id, course_id, progress, status) VALUES 
(1, 1, 35, 'ACTIVE');
