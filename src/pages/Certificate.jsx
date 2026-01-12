import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Award, Download, Share2, Lock } from 'lucide-react';
import { useSelector } from 'react-redux';

const Certificate = () => {
    const { certificateId } = useParams();
    const { enrolledCourses } = useSelector(state => state.learning);

    // Logic: Check if the course associated with this certificate is completed.
    // For demo simplicity, we assume certificateId matches courseId.
    const associatedCourse = enrolledCourses.find(c => c.id == certificateId);
    const isUnlocked = associatedCourse && associatedCourse.status === 'completed';

    if (!isUnlocked) {
        return (
            <Layout>
                <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                    <div style={{ backgroundColor: 'var(--surface-dark)', padding: '3rem', borderRadius: 'var(--radius-lg)', maxWidth: '600px', margin: '0 auto', border: '1px solid var(--border-color)' }}>
                        <Lock size={64} style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }} />
                        <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Certificate Locked</h1>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            You must complete 100% of the course to unlock this certificate.
                        </p>
                        <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
                    </div>
                </div>
            </Layout>
        );
    }

    // Mock Certificate Data
    const certificate = {
        id: certificateId,
        studentName: "John Doe",
        courseName: associatedCourse?.title || "Course Title",
        issueDate: new Date().toLocaleDateString(),
        instructor: "Jane Doe"
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Certificate</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Congratulations on completing the course!</p>
                </div>

                <div style={{
                    width: '100%',
                    maxWidth: '800px',
                    padding: '3rem',
                    backgroundColor: '#fff',
                    color: '#1e293b',
                    textAlign: 'center',
                    borderRadius: 'var(--radius-lg)',
                    position: 'relative',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    border: '8px double #6366f1' // Fancy border
                }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <Award size={64} color="#6366f1" />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', fontFamily: 'serif' }}>Certificate of Completion</h2>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>This is to certify that</p>
                    <h3 style={{ fontSize: '3rem', fontFamily: 'serif', color: '#6366f1', marginBottom: '1rem' }}>{certificate.studentName}</h3>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>has successfully completed the course</p>
                    <h4 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '3rem' }}>{certificate.courseName}</h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4rem', marginTop: '2rem' }}>
                        <div style={{ textAlign: 'center', borderTop: '1px solid #94a3b8', paddingTop: '0.5rem', width: '200px' }}>
                            <p style={{ fontWeight: 'bold' }}>{certificate.instructor}</p>
                            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Instructor</span>
                        </div>
                        <div style={{ textAlign: 'center', borderTop: '1px solid #94a3b8', paddingTop: '0.5rem', width: '200px' }}>
                            <p style={{ fontWeight: 'bold' }}>{certificate.issueDate}</p>
                            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Date</span>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary" style={{ gap: '0.5rem' }}>
                        <Download size={18} /> Download PDF
                    </button>
                    <button className="btn btn-outline" style={{ gap: '0.5rem' }}>
                        <Share2 size={18} /> Share
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default Certificate;
