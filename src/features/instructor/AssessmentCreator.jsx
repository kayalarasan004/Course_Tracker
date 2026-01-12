import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Plus, Trash, Save } from 'lucide-react';

const AssessmentCreator = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([
        { id: 1, text: '', options: [{ id: 'a', text: '' }, { id: 'b', text: '' }], correctOption: 'a' }
    ]);

    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                id: questions.length + 1,
                text: '',
                options: [{ id: 'a', text: '' }, { id: 'b', text: '' }],
                correctOption: 'a'
            }
        ]);
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const updateOption = (qId, oId, value) => {
        setQuestions(questions.map(q =>
            q.id === qId
                ? { ...q, options: q.options.map(o => o.id === oId ? { ...o, text: value } : o) }
                : q
        ));
    };

    const handleSave = async () => {
        // Simulate API save
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/instructor');
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '800px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem' }}>Create Assessment</h1>
                    <button onClick={handleSave} className="btn btn-primary" style={{ gap: '0.5rem' }}>
                        <Save size={18} /> Publish Quiz
                    </button>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Assessment Title</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="e.g., Mid-term Exam"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {questions.map((q, idx) => (
                        <div key={q.id} style={{
                            backgroundColor: 'var(--surface-dark)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-color)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.125rem' }}>Question {idx + 1}</h3>
                                {questions.length > 1 && (
                                    <button className="btn btn-outline" style={{ color: 'var(--error-color)', borderColor: 'var(--error-color)' }}>
                                        <Trash size={16} />
                                    </button>
                                )}
                            </div>

                            <input
                                type="text"
                                className="input"
                                placeholder="Enter question text..."
                                style={{ marginBottom: '1rem' }}
                                value={q.text}
                                onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                            />

                            <div style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--border-color)' }}>
                                <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Options</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {q.options.map((opt) => (
                                        <div key={opt.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <input
                                                type="radio"
                                                name={`correct-${q.id}`}
                                                checked={q.correctOption === opt.id}
                                                onChange={() => updateQuestion(q.id, 'correctOption', opt.id)}
                                            />
                                            <input
                                                type="text"
                                                className="input"
                                                style={{ padding: '0.5rem' }}
                                                placeholder={`Option ${opt.id.toUpperCase()}`}
                                                value={opt.text}
                                                onChange={(e) => updateOption(q.id, opt.id, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    <button onClick={addQuestion} className="btn btn-outline" style={{ borderStyle: 'dashed', justifyContent: 'center', padding: '1rem' }}>
                        <Plus size={20} /> Add Question
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default AssessmentCreator;
