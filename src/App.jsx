import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Dashboard from './pages/Dashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CourseUpload from './features/instructor/CourseUpload';
import AssessmentCreator from './features/instructor/AssessmentCreator';
import Gradebook from './features/instructor/Gradebook';
import Assessment from './pages/Assessment';
import Certificate from './pages/Certificate';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<Home />} />
      <Route path="/course/:courseId" element={<CourseDetail />} />

      {/* Protected Routes */}
      <Route
        path="/course/:courseId/learn"
        element={
          <ProtectedRoute>
            <CoursePlayer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor"
        element={
          <ProtectedRoute>
            <InstructorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/upload-course"
        element={
          <ProtectedRoute>
            <CourseUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/course/:courseId/assessments"
        element={
          <ProtectedRoute>
            <AssessmentCreator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/course/:courseId/grades"
        element={
          <ProtectedRoute>
            <Gradebook />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/course/:courseId/assessment/:assessmentId"
        element={
          <ProtectedRoute>
            <Assessment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/certificate/:certificateId"
        element={
          <ProtectedRoute>
            <Certificate />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
