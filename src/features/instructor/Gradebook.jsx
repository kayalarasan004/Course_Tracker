import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { ChevronLeft, Save, Search, Download } from 'lucide-react';

const Gradebook = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // Mock Submissions
    const [submissions, setSubmissions] = useState([
        { id: 1, student: 'Alice Johnson', email: 'alice@test.com', assessment: 'React Basics Quiz', score: 85, status: 'Graded' },
        { id: 2, student: 'Bob Smith', email: 'bob@test.com', assessment: 'React Basics Quiz', score: 92, status: 'Graded' },
        { id: 3, student: 'Charlie Brown', email: 'charlie@test.com', assessment: 'Mid-term Exam', score: null, status: 'Pending' },
    ]);

    const handleGradeChange = (id, newScore) => {
        setSubmissions(submissions.map(s => s.id === id ? { ...s, score: newScore } : s));
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => navigate('/instructor')} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>
                        <ChevronLeft size={16} /> Back
                    </button>
                    <div>
                        <h1 style={{ fontSize: '2rem', lineHeight: 1 }}>Gradebook</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Complete React Developer Course</p>
                    </div>
                </div>

                {/* Toolbar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input type="text" className="input" placeholder="Search students..." style={{ paddingLeft: '2.5rem', width: '300px' }} />
                    </div>
                    <button className="btn btn-outline" style={{ gap: '0.5rem' }}>
                        <Download size={16} /> Export CSV
                    </button>
                </div>

                {/* Data Table */}
                <div style={{
                    backgroundColor: 'var(--surface-dark)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '1rem 1.5rem' }}>Student Details</th>
                                <th style={{ padding: '1rem 1.5rem' }}>Assessment</th>
                                <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                                <th style={{ padding: '1rem 1.5rem' }}>Grade (%)</th>
                                <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((sub) => (
                                <tr key={sub.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <div style={{ fontWeight: 500 }}>{sub.student}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{sub.email}</div>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>{sub.assessment}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '2rem',
                                            backgroundColor: sub.status === 'Graded' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: sub.status === 'Graded' ? 'var(--success-color)' : 'var(--error-color)'
                                        }}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        <input
                                            type="number"
                                            className="input"
                                            style={{ width: '80px', padding: '0.5rem' }}
                                            value={sub.score || ''}
                                            placeholder="-"
                                            onChange={(e) => handleGradeChange(sub.id, e.target.value)}
                                        />
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                        <button className="btn btn-primary" style={{ padding: '0.5rem', fontSize: '0.875rem' }}>
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Gradebook;
