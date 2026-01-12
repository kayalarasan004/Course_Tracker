import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayCircle, CheckCircle, ChevronLeft, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProgress } from '../features/student/learningSlice';

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enrolledCourses } = useSelector(state => state.learning);

    // Check if enrolled
    const enrolledCourse = enrolledCourses.find(c => c.id == courseId);

    const [activeLesson, setActiveLesson] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (!enrolledCourse) {
            alert('You must be enrolled to access this content.');
            navigate(`/course/${courseId}`);
        }
    }, [enrolledCourse, courseId, navigate]);

    // Mock Data (matches Detail page roughly)
    const curriculum = [
        { title: 'What is React?', duration: '5:20', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }, // Placeholder ;)
        { title: 'Setting up Environment', duration: '10:15', url: '' },
        { title: 'JSX Basics', duration: '8:45', url: '' },
        { title: 'useState Hook', duration: '12:30', url: '' },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--background-dark)', color: 'var(--text-primary)' }}>

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{
                    height: '4rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1rem',
                    backgroundColor: 'var(--surface-dark)',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={() => navigate('/dashboard')} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                            <ChevronLeft size={16} /> Back
                        </button>
                        <h1 style={{ fontSize: '1rem', fontWeight: 600 }}>Complete React Developer Course</h1>
                    </div>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn btn-outline" style={{ padding: '0.25rem' }}>
                        <Menu size={20} />
                    </button>
                </div>

                {/* Player Stage */}
                <div style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                    <div style={{ width: '100%', maxWidth: '900px', backgroundColor: '#1e293b' }}>
                        <div style={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {curriculum[activeLesson].url ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={curriculum[activeLesson].url}
                                    title="Video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div style={{ textAlign: 'center' }}>
                                    <PlayCircle size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <p>Video Content Placeholder for "{curriculum[activeLesson].title}"</p>
                                    <button
                                        className="btn btn-primary"
                                        style={{ marginTop: '1rem' }}
                                        onClick={() => {
                                            const newProgress = Math.min(100, Math.round(((activeLesson + 1) / curriculum.length) * 100));
                                            dispatch(updateProgress({
                                                courseId,
                                                progress: newProgress,
                                                lessonId: `lesson-${activeLesson}`
                                            }));
                                            if (activeLesson < curriculum.length - 1) setActiveLesson(activeLesson + 1);
                                        }}
                                    >
                                        Mark Completed & Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar Curriculum */}
            {sidebarOpen && (
                <div style={{
                    width: '350px',
                    borderLeft: '1px solid var(--border-color)',
                    backgroundColor: 'var(--surface-dark)',
                    overflowY: 'auto'
                }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                        <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>Course Content</h2>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>0% Completed</p>
                    </div>

                    <div>
                        {curriculum.map((lesson, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveLesson(idx)}
                                style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid var(--border-color)',
                                    cursor: 'pointer',
                                    backgroundColor: activeLesson === idx ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                    borderLeft: activeLesson === idx ? '3px solid var(--primary-color)' : '3px solid transparent'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <div style={{ marginTop: '0.25rem' }}>
                                        <div style={{ width: '16px', height: '16px', border: '1px solid var(--text-secondary)', borderRadius: '50%' }}></div>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem', color: activeLesson === idx ? 'var(--primary-color)' : 'var(--text-primary)' }}>{lesson.title}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{lesson.duration}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursePlayer;
