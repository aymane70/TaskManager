import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                <div style={styles.row}>
                    <Link to="/" style={styles.brand}>
                        <FaTasks />
                        <span>TaskManager</span>
                    </Link>

                    {user && (
                        <div style={styles.navLinks}>
                            <Link to="/dashboard" style={styles.link}>
                                Dashboard
                            </Link>
                            <Link to="/tasks" style={styles.link}>
                                My Tasks
                            </Link>
                            <div style={styles.userBlock}>
                                <span style={styles.userText}>Hello, {user.username}</span>
                                <button onClick={handleLogout} style={styles.logoutButton}>
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: '#2563eb',
        color: '#fff',
        boxShadow: '0 8px 20px rgba(15, 23, 42, 0.12)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
    },
    brand: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '20px',
        fontWeight: 700,
        textDecoration: 'none',
        color: '#fff',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
    },
    link: {
        color: '#e0e7ff',
        textDecoration: 'none',
        fontWeight: 600,
    },
    userBlock: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    userText: {
        fontSize: '14px',
    },
    logoutButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: '8px',
        backgroundColor: '#1d4ed8',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 600,
    },
};

export default Navbar;
