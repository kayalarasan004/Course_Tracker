import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--surface-dark)',
            padding: '2rem 0',
            marginTop: 'auto',
            borderTop: '1px solid var(--border-color)'
        }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <p>&copy; {new Date().getFullYear()} LMS Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
