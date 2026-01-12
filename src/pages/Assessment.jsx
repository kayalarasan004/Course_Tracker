import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Assessment = () => {
    const { assessmentId } = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Mock Question Data
    const questions = [
        {
            id: 1,
            text: "What is the primary function of Redux?",
            options: [
                { id: 'a', text: "To replace React" },
                { id: 'b', text: "To manage application state" },
                { id: 'c', text: "To style components" },
                { id: 'd', text: "To make API calls" }
            ]
        },
        {
            id: 2,
            text: "Which hook is used for side effects in React?",
            options: [
                { id: 'a', text: "useState" },
                { id: 'b', text: "useReducer" },
                { id: 'c', text: "useEffect" },
                { id: 'd', text: "useContext" }
            ]
        },
        {
            id: 3,
            text: "What does JSX stand for?",
            options: [
                { id: 'a', text: "Javascript XML" },
                { id: 'b', text: "Java Syntax Extension" },
                { id: 'c', text: "JSON Xylophone" },
                { id: 'd', text: "Just Syntax" }
            ]
        }
    ];

    const handleOptionSelect = (optionId) => {
        if (submitted) return;
        setAnswers({ ...answers, [questions[currentQuestion].id]: optionId });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        // In a real app, dispatch to assessmentService.submitAssessment
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Assessment: React Fundamentals</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Question {currentQuestion + 1} of {questions.length}</p>
                </div>

                {submitted ? (
                    <div style={{
                        backgroundColor: 'var(--surface-dark)',
                        padding: '3rem',
                        borderRadius: 'var(--radius-lg)',
                        textAlign: 'center',
                        border: '1px solid var(--success-color)'
                    }}>
                        <CheckCircle size={64} color="var(--success-color)" style={{ margin: '0 auto 1.5rem' }} />
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Assessment Submitted!</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Your answers have been recorded. You will be notified of your grade shortly.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button onClick={() => navigate('/dashboard')} className="btn btn-primary">Return to Dashboard</button>
                            <button onClick={() => navigate(`/certificate/CERT-1234`)} className="btn btn-outline">View Certificate</button>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        backgroundColor: 'var(--surface-dark)',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--border-color)',
                        padding: '2rem'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                            {questions[currentQuestion].text}
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            {questions[currentQuestion].options.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option.id)}
                                    style={{
                                        padding: '1rem',
                                        border: `1px solid ${answers[questions[currentQuestion].id] === option.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        backgroundColor: answers[questions[currentQuestion].id] === option.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '2px solid var(--text-secondary)',
                                        marginRight: '1rem',
                                        borderColor: answers[questions[currentQuestion].id] === option.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {answers[questions[currentQuestion].id] === option.id && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></div>}
                                    </div>
                                    {option.text}
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button
                                onClick={handlePrev}
                                className="btn btn-outline"
                                disabled={currentQuestion === 0}
                                style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
                            >
                                Previous
                            </button>

                            {currentQuestion === questions.length - 1 ? (
                                <button onClick={handleSubmit} className="btn btn-primary">Submit Assessment</button>
                            ) : (
                                <button onClick={handleNext} className="btn btn-primary">Next Question</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Assessment;
