import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { LogOut, User, BookOpen } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav style={{
            backgroundColor: 'var(--surface-dark)',
            borderBottom: '1px solid var(--border-color)',
            position: 'sticky',
            top: 0,
            zIndex: 50
        }}>
            <div className="container" style={{
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)'
                }}>
                    <BookOpen />
                    <span>LMS Platform</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/courses" style={{ color: 'var(--text-secondary)' }}>Courses</Link>
                    {isAuthenticated ? (
                        <>
                            {user?.role === 'student' && <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>}
                            {user?.role === 'instructor' && <Link to="/instructor" style={{ color: 'var(--secondary-color)' }}>Instructor Panel</Link>}
                            {user?.role === 'admin' && <Link to="/admin" style={{ color: 'var(--primary-color)' }}>Admin Panel</Link>}

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem' }}>{user?.name || 'User'}</span>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline"
                                    style={{ padding: '0.25rem 0.5rem', gap: '0.25rem' }}
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <Link to="/login" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
                                Log in
                            </Link>
                            <Link to="/register" className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
