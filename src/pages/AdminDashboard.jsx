import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Users, BookOpen, Award, TrendingUp, Search, MoreVertical, CheckCircle, XCircle, Trash, Ban } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock Data
    const stats = [
        { title: 'Total Users', value: '1,234', icon: Users, color: '#6366f1' },
        { title: 'Active Courses', value: '42', icon: BookOpen, color: '#ec4899' },
        { title: 'Certificates Issued', value: '891', icon: Award, color: '#fbbf24' },
        { title: 'Revenue', value: '$12,450', icon: TrendingUp, color: '#22c55e' },
    ];

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Instructor', status: 'Active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', status: 'Inactive' },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', status: 'Active' },
    ]);

    const [pendingCourses, setPendingCourses] = useState([
        { id: 101, title: 'Advanced Docker Mastery', instructor: 'DevOps Dave', category: 'DevOps', submitted: '2025-01-10' },
        { id: 102, title: 'Figma for Developers', instructor: 'Design Guru', category: 'Design', submitted: '2025-01-12' },
    ]);

    const handleUserAction = (id, action) => {
        if (action === 'delete') {
            setUsers(users.filter(u => u.id !== id));
        } else if (action === 'ban') {
            setUsers(users.map(u => u.id === id ? { ...u, status: 'Banned' } : u));
        }
    };

    const handleCourseAction = (id, action) => {
        setPendingCourses(pendingCourses.filter(c => c.id !== id));
        // In real app, would call API to update status
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>System overview and management controls.</p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
                    {['overview', 'users', 'courses'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '1rem',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : '2px solid transparent',
                                color: activeTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
                                fontWeight: activeTab === tab ? 600 : 400,
                                cursor: 'pointer',
                                textTransform: 'capitalize'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '3rem'
                    }}>
                        {stats.map((stat, index) => (
                            <div key={index} style={{
                                backgroundColor: 'var(--surface-dark)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid var(--border-color)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    padding: '0.75rem',
                                    backgroundColor: `${stat.color}20`,
                                    borderRadius: 'var(--radius-md)',
                                    color: stat.color
                                }}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.title}</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* USERS TAB */}
                {activeTab === 'users' && (
                    <div style={{
                        backgroundColor: 'var(--surface-dark)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: '1.25rem' }}>System Users</h2>
                            <button className="btn btn-primary" style={{ fontSize: '0.875rem' }}>+ Add Admin</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                    <th style={{ padding: '1rem 1.5rem' }}>User</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Role</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <div style={{ fontWeight: 500 }}>{user.name}</div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '2rem',
                                                fontSize: '0.75rem',
                                                backgroundColor: user.role === 'Admin' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.05)',
                                                color: user.role === 'Admin' ? 'var(--primary-color)' : 'var(--text-primary)'
                                            }}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem 1.5rem' }}>{user.status}</td>
                                        <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => handleUserAction(user.id, 'ban')}
                                                    className="btn btn-outline"
                                                    title="Ban User"
                                                    style={{ color: '#fbbf24', borderColor: '#fbbf24' }}
                                                >
                                                    <Ban size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleUserAction(user.id, 'delete')}
                                                    className="btn btn-outline"
                                                    title="Delete User"
                                                    style={{ color: 'var(--error-color)', borderColor: 'var(--error-color)' }}
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* COURSES TAB */}
                {activeTab === 'courses' && (
                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Course Approvals</h2>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {pendingCourses.length > 0 ? pendingCourses.map(course => (
                                <div key={course.id} style={{
                                    backgroundColor: 'var(--surface-dark)',
                                    padding: '1.5rem',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--border-color)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{course.title}</h3>
                                        <p style={{ color: 'var(--text-secondary)' }}>Instructor: {course.instructor} • Category: {course.category}</p>
                                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Submitted on: {course.submitted}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button
                                            onClick={() => handleCourseAction(course.id, 'reject')}
                                            className="btn btn-outline"
                                            style={{ gap: '0.5rem', color: 'var(--error-color)', borderColor: 'var(--error-color)' }}
                                        >
                                            <XCircle size={18} /> Reject
                                        </button>
                                        <button
                                            onClick={() => handleCourseAction(course.id, 'approve')}
                                            className="btn btn-primary"
                                            style={{ gap: '0.5rem', backgroundColor: 'var(--success-color)', borderColor: 'var(--success-color)' }}
                                        >
                                            <CheckCircle size={18} /> Approve
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>No pending course approvals.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default AdminDashboard;
