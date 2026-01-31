import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTasks, FaCheckCircle, FaChartLine, FaLock } from 'react-icons/fa';

const Home = () => {
    const { user } = useAuth();

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.hero}>
                    <h1 style={styles.title}>TaskManager</h1>
                    <p style={styles.subtitle}>Organize your tasks efficiently and boost productivity</p>

                    {!user ? (
                        <div style={styles.ctaRow}>
                            <Link to="/register" style={styles.primaryButton}>
                                Get Started
                            </Link>
                            <Link to="/login" style={styles.secondaryButton}>
                                Login
                            </Link>
                        </div>
                    ) : (
                        <Link to="/dashboard" style={styles.primaryButton}>
                            Go to Dashboard
                        </Link>
                    )}
                </div>

                <div style={styles.featureGrid}>
                    <div style={styles.featureCard}>
                        <FaTasks style={styles.featureIcon} />
                        <h3 style={styles.featureTitle}>Task Management</h3>
                        <p style={styles.featureText}>Create, update, and organize your tasks with ease</p>
                    </div>

                    <div style={styles.featureCard}>
                        <FaCheckCircle style={styles.featureIcon} />
                        <h3 style={styles.featureTitle}>Track Progress</h3>
                        <p style={styles.featureText}>Monitor task status from To Do to completion</p>
                    </div>

                    <div style={styles.featureCard}>
                        <FaChartLine style={styles.featureIcon} />
                        <h3 style={styles.featureTitle}>Statistics</h3>
                        <p style={styles.featureText}>View insights and analytics about your tasks</p>
                    </div>

                    <div style={styles.featureCard}>
                        <FaLock style={styles.featureIcon} />
                        <h3 style={styles.featureTitle}>Secure</h3>
                        <p style={styles.featureText}>Your data is protected with JWT authentication</p>
                    </div>
                </div>

                <div style={styles.featuresSection}>
                    <h2 style={styles.sectionTitle}>Features</h2>
                    <div style={styles.featuresList}>
                        <div style={styles.featureItem}>✓ Complete CRUD operations for task management</div>
                        <div style={styles.featureItem}>✓ Advanced search, filtering, and sorting</div>
                        <div style={styles.featureItem}>✓ Pagination for better performance</div>
                        <div style={styles.featureItem}>✓ Priority and status tracking</div>
                        <div style={styles.featureItem}>✓ Real-time statistics dashboard</div>
                        <div style={styles.featureItem}>✓ Responsive design for all devices</div>
                        <div style={styles.featureItem}>✓ Secure authentication with JWT</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
        color: '#fff',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 20px 80px',
    },
    hero: {
        textAlign: 'center',
        marginBottom: '64px',
    },
    title: {
        fontSize: '56px',
        fontWeight: 800,
        marginBottom: '12px',
    },
    subtitle: {
        fontSize: '22px',
        marginBottom: '32px',
        color: '#e2e8f0',
    },
    ctaRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        flexWrap: 'wrap',
    },
    primaryButton: {
        backgroundColor: '#fff',
        color: '#1d4ed8',
        padding: '14px 32px',
        borderRadius: '10px',
        fontSize: '18px',
        fontWeight: 700,
        textDecoration: 'none',
        display: 'inline-block',
    },
    secondaryButton: {
        border: '2px solid #fff',
        color: '#fff',
        padding: '14px 32px',
        borderRadius: '10px',
        fontSize: '18px',
        fontWeight: 700,
        textDecoration: 'none',
        display: 'inline-block',
    },
    featureGrid: {
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        marginBottom: '64px',
    },
    featureCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        padding: '24px',
        backdropFilter: 'blur(12px)',
    },
    featureIcon: {
        fontSize: '36px',
        marginBottom: '16px',
    },
    featureTitle: {
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '8px',
    },
    featureText: {
        color: '#f1f5f9',
    },
    featuresSection: {
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: '32px',
        fontWeight: 800,
        marginBottom: '24px',
    },
    featuresList: {
        maxWidth: '720px',
        margin: '0 auto',
        display: 'grid',
        gap: '12px',
        textAlign: 'left',
        fontSize: '18px',
        color: '#e2e8f0',
    },
    featureItem: {
        padding: '4px 0',
    },
};

export default Home;
