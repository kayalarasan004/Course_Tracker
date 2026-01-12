import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Clock, Star, BookOpen, CheckCircle, PlayCircle, Lock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { enrollCourse } from '../features/student/learningSlice';

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [enrolling, setEnrolling] = useState(false);
    const { isAuthenticated } = useSelector(state => state.auth);
    const { enrolledCourses } = useSelector(state => state.learning);

    // Check if already enrolled
    // Note: In real app, IDs would be consistent types. Mock data uses strings/numbers loosely.
    const isEnrolled = enrolledCourses.some(c => c.id == courseId);

    // Mock Course Data
    const course = {
        id: courseId,
        title: 'Complete React Developer Course',
        description: 'Master React v18 including Hooks, Redux, and Context API. Build real-world applications and deploy them to production.',
        instructor: 'Jane Doe',
        price: '49.99',
        rating: 4.8,
        students: 1234,
        lastUpdated: 'October 2025',
        thumbnail: 'https://placehold.co/800x400/1e293b/white?text=React+Course',
        curriculum: [
            {
                title: 'Introduction to React',
                lessons: [
                    { title: 'What is React?', duration: '5:20', type: 'video', free: true },
                    { title: 'Setting up Environment', duration: '10:15', type: 'video', free: true },
                    { title: 'JSX Basics', duration: '8:45', type: 'video', free: false },
                ]
            },
            {
                title: 'State Management',
                lessons: [
                    { title: 'useState Hook', duration: '12:30', type: 'video', free: false },
                    { title: 'Props and State', duration: '15:10', type: 'video', free: false },
                ]
            }
        ]
    };

    const handleEnroll = async () => {
        if (!isAuthenticated) return navigate('/login');
        if (isEnrolled) return navigate(`/course/${courseId}/learn`);

        setEnrolling(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        dispatch(enrollCourse({
            id: course.id,
            title: course.title,
            thumbnail: course.thumbnail,
            totalLessons: 12 // Mock total
        }));

        setEnrolling(false);
        navigate(`/course/${courseId}/learn`);
    };

    return (
        <Layout>
            {/* Hero Header */}
            <div style={{ backgroundColor: 'var(--surface-dark)', padding: '3rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>{course.title}</h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{course.description}</p>

                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                <Star size={18} fill="#fbbf24" />
                                <span style={{ fontWeight: 'bold' }}>{course.rating}</span>
                                <span style={{ color: 'var(--text-secondary)' }}>({course.students} ratings)</span>
                            </div>
                            <span style={{ color: 'var(--text-secondary)' }}>Created by <span style={{ color: 'var(--primary-color)' }}>{course.instructor}</span></span>
                            <span style={{ color: 'var(--text-secondary)' }}>Last updated {course.lastUpdated}</span>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button onClick={handleEnroll} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>
                                {enrolling ? 'Processing...' : isEnrolled ? 'Go to Course' : `Enroll Now for $${course.price}`}
                            </button>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>30-Day Money-Back Guarantee</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Content */}
            <div className="container" style={{ padding: '3rem 1.5rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>

                {/* Curriculum */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Course Content</h2>
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                        {course.curriculum.map((module, idx) => (
                            <div key={idx}>
                                <div style={{
                                    padding: '1rem 1.5rem',
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    borderBottom: '1px solid var(--border-color)',
                                    fontWeight: 600
                                }}>
                                    {module.title}
                                </div>
                                <div>
                                    {module.lessons.map((lesson, lIdx) => (
                                        <div key={lIdx} style={{
                                            padding: '0.75rem 1.5rem',
                                            borderBottom: idx === course.curriculum.length - 1 && lIdx === module.lessons.length - 1 ? 'none' : '1px solid var(--border-color)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: lesson.free ? 'pointer' : 'default',
                                            backgroundColor: lesson.free ? 'rgba(99, 102, 241, 0.05)' : 'transparent'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                {lesson.type === 'video' ? <PlayCircle size={16} color={lesson.free ? 'var(--primary-color)' : 'var(--text-secondary)'} /> : <BookOpen size={16} />}
                                                <span style={{ color: lesson.free ? 'var(--primary-color)' : 'var(--text-primary)' }}>{lesson.title}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                {!lesson.free && <Lock size={14} color="var(--text-secondary)" />}
                                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{lesson.duration}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div>
                    <div style={{
                        backgroundColor: 'var(--surface-dark)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                        position: 'sticky',
                        top: '6rem'
                    }}>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>This course includes:</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> 24 hours on-demand video</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={16} /> 15 articles</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={16} /> Certificate of completion</li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={16} /> Full lifetime access</li>
                        </ul>
                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default CourseDetail;
