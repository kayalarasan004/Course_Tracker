import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Upload, Plus, FileText, DollarSign, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseUpload = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: 'Development',
        thumbnail: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call to courseService.createCourse
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        navigate('/instructor'); // Go back to dashboard
    };

    return (
        <Layout>
            <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create New Course</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Fill in the details to publish your course.</p>
                </div>

                <form onSubmit={handleSubmit} style={{
                    backgroundColor: 'var(--surface-dark)',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                }}>

                    {/* Title */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Course Title</label>
                        <div style={{ position: 'relative' }}>
                            <FileText size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Advanced React Patterns"
                                className="input"
                                style={{ paddingLeft: '2.5rem' }}
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="What will students learn?"
                            className="input"
                            style={{ minHeight: '120px', fontFamily: 'inherit' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {/* Price */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Price ($)</label>
                            <div style={{ position: 'relative' }}>
                                <DollarSign size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="49.99"
                                    className="input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="input"
                            >
                                <option value="Development">Development</option>
                                <option value="Design">Design</option>
                                <option value="Business">Business</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                    </div>

                    {/* Tuple/Image Placeholder */}
                    <div style={{
                        border: '2px dashed var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    >
                        <ImageIcon size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
                        <p style={{ fontWeight: 500 }}>Upload Course Thumbnail</p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>PNG, JPG up to 5MB</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" onClick={() => navigate('/instructor')} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Course'}
                        </button>
                    </div>

                </form>
            </div>
        </Layout>
    );
};

export default CourseUpload;
