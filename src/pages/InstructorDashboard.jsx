import React from 'react';
import Layout from '../components/layout/Layout';
import { Plus, FileText, Users, BarChart2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
    const navigate = useNavigate();

    // Mock Instructor Courses
    const courses = [
        {
            id: 1,
            title: 'Complete React Developer Course',
            students: 1234,
            rating: 4.8,
            revenue: '$61,450',
            status: 'Published'
        },
        {
            id: 2,
            title: 'Advanced State Management',
            students: 450,
            rating: 4.9,
            revenue: '$12,500',
            status: 'Draft'
        }
    ];

    return (
        <Layout>
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Instructor Dashboard</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Manage your content and students.</p>
                    </div>
                    <button onClick={() => navigate('/instructor/upload-course')} className="btn btn-primary" style={{ gap: '0.5rem' }}>
                        <Plus size={20} /> New Course
                    </button>
                </div>

                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div style={{ backgroundColor: 'var(--surface-dark)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Students</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1,684</p>
                    </div>
                    <div style={{ backgroundColor: 'var(--surface-dark)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Revenue</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>$73,950</p>
                    </div>
                    <div style={{ backgroundColor: 'var(--surface-dark)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Average Rating</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>4.85</p>
                    </div>
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Your Courses</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {courses.map(course => (
                        <div key={course.id} style={{
                            backgroundColor: 'var(--surface-dark)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{ flex: 1, minWidth: '250px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem' }}>{course.title}</h3>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '1rem',
                                        backgroundColor: course.status === 'Published' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                        color: course.status === 'Published' ? 'var(--success-color)' : '#fbbf24'
                                    }}>
                                        {course.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Users size={14} /> {course.students} students</span>
                                    <span>{course.revenue}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button onClick={() => navigate(`/instructor/course/${course.id}/assessments`)} className="btn btn-outline" style={{ gap: '0.5rem', fontSize: '0.875rem' }}>
                                    <FileText size={16} /> Add Assessment
                                </button>
                                <button onClick={() => navigate(`/instructor/course/${course.id}/grades`)} className="btn btn-outline" style={{ gap: '0.5rem', fontSize: '0.875rem' }}>
                                    <BarChart2 size={16} /> Gradebook
                                </button>
                                <button className="btn btn-outline" style={{ padding: '0.5rem' }}>
                                    <Edit size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default InstructorDashboard;
