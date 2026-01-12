import React from 'react';
import Layout from '../components/layout/Layout';
import { useSelector } from 'react-redux';
import { PlayCircle, Award, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const { enrolledCourses } = useSelector(state => state.learning);
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Welcome back, <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{user?.name || 'Student'}</span>!
                        You have {enrolledCourses.length} active courses.
                    </p>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {enrolledCourses.length > 0 ? (
                        enrolledCourses.map(course => (
                            <div key={course.id} style={{
                                backgroundColor: 'var(--surface-dark)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                transition: 'all 0.2s'
                            }}>
                                {/* Thumbnail */}
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                                />

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{course.title}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                                        {course.completedLessons} / {course.totalLessons} lessons • Last accessed {course.lastAccessed}
                                    </p>

                                    {/* Progress Bar */}
                                    <div style={{ width: '100%', height: '8px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>
                                        <div style={{
                                            width: `${course.progress}%`,
                                            height: '100%',
                                            backgroundColor: course.progress === 100 ? 'var(--success-color)' : 'var(--primary-color)',
                                            borderRadius: '4px',
                                            transition: 'width 0.5s ease-in-out'
                                        }}></div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div>
                                    <button
                                        onClick={() => navigate(`/course/${course.id}/learn`)}
                                        className={course.progress > 0 ? "btn btn-primary" : "btn btn-outline"}
                                        style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}
                                    >
                                        <PlayCircle size={18} />
                                        {course.progress > 0 ? 'Continue' : 'Start'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            backgroundColor: 'var(--surface-dark)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px dashed var(--border-color)'
                        }}>
                            <BookOpen size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
                            <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>You aren't enrolled in any courses yet.</p>
                            <button onClick={() => navigate('/courses')} className="btn btn-primary">Browse Catalog</button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
