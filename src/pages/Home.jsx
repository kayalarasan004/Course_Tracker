import React from 'react';
import Layout from '../components/layout/Layout';
import { Book, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_COURSES = [
    {
        id: 1,
        title: 'Complete React Developer Course',
        instructor: 'Jane Doe',
        price: '$49.99',
        rating: 4.8,
        duration: '24h',
        image: 'https://placehold.co/600x400/1e293b/white?text=React+Course'
    },
    {
        id: 2,
        title: 'Advanced Java Spring Boot',
        instructor: 'John Smith',
        price: '$59.99',
        rating: 4.9,
        duration: '32h',
        image: 'https://placehold.co/600x400/1e293b/white?text=Spring+Boot'
    },
    {
        id: 3,
        title: 'UI/UX Design Masterclass',
        instructor: 'Emily White',
        price: '$39.99',
        rating: 4.7,
        duration: '18h',
        image: 'https://placehold.co/600x400/1e293b/white?text=UI/UX+Design'
    }
];

const Home = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            {/* Hero Section */}
            <div style={{ backgroundColor: 'var(--surface-dark)', padding: '5rem 0', marginBottom: '3rem' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                        Expand Your Knowledge with <span style={{ color: 'var(--primary-color)' }}>Expert-Led Courses</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '700px', marginInline: 'auto' }}>
                        Join thousands of learners and start your journey today. Learn from the best instructors from around the world.
                    </p>
                    <button className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>
                        Browse Courses
                    </button>
                </div>
            </div>

            {/* Course Grid */}
            <div className="container" style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Featured Courses</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {MOCK_COURSES.map(course => (
                        <div key={course.id} style={{
                            backgroundColor: 'var(--surface-dark)',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                            border: '1px solid var(--border-color)',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                            onClick={() => navigate(`/course/${course.id}`)}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <img src={course.image} alt={course.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: 'var(--primary-color)',
                                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '2rem'
                                    }}>Development</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24' }}>
                                        <Star size={16} fill="#fbbf24" />
                                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{course.rating}</span>
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>{course.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>by {course.instructor}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                        <Clock size={16} />
                                        <span>{course.duration}</span>
                                    </div>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{course.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
