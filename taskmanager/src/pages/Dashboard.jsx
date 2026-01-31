import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { FaTasks, FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStatistics();
    }, []);

    const fetchStatistics = async () => {
        try {
            const response = await taskAPI.getStatistics();
            setStatistics(response.data.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner} />
                    <span style={styles.loadingText}>Loading statistics...</span>
                </div>
            </>
        );
    }

    const stats = statistics || {};

    return (
        <>
            <Navbar />
            <div style={styles.page}>
                <div style={styles.container}>
                    <h1 style={styles.pageTitle}>Dashboard</h1>

                    <div style={styles.statsGrid}>
                        <div style={styles.card}>
                            <div style={styles.cardRow}>
                                <div>
                                    <p style={styles.cardLabel}>Total Tasks</p>
                                    <p style={styles.cardValue}>{stats.totalTasks || 0}</p>
                                </div>
                                <FaTasks style={{ ...styles.cardIcon, color: '#3b82f6' }} />
                            </div>
                        </div>

                        <div style={styles.card}>
                            <div style={styles.cardRow}>
                                <div>
                                    <p style={styles.cardLabel}>To Do</p>
                                    <p style={styles.cardValue}>{stats.todoTasks || 0}</p>
                                </div>
                                <FaExclamationCircle style={{ ...styles.cardIcon, color: '#f59e0b' }} />
                            </div>
                        </div>

                        <div style={styles.card}>
                            <div style={styles.cardRow}>
                                <div>
                                    <p style={styles.cardLabel}>In Progress</p>
                                    <p style={styles.cardValue}>{stats.inProgressTasks || 0}</p>
                                </div>
                                <FaSpinner style={{ ...styles.cardIcon, color: '#fb923c' }} />
                            </div>
                        </div>

                        <div style={styles.card}>
                            <div style={styles.cardRow}>
                                <div>
                                    <p style={styles.cardLabel}>Completed</p>
                                    <p style={styles.cardValue}>{stats.doneTasks || 0}</p>
                                </div>
                                <FaCheckCircle style={{ ...styles.cardIcon, color: '#22c55e' }} />
                            </div>
                        </div>
                    </div>

                    <div style={styles.secondaryGrid}>
                        <div style={styles.card}>
                            <h3 style={styles.sectionHeading}>Priority Distribution</h3>
                            <div style={styles.priorityRow}>
                                <span style={{ ...styles.priorityLabel, color: '#dc2626' }}>High Priority</span>
                                <span style={styles.priorityValue}>{stats.highPriorityTasks || 0}</span>
                            </div>
                            <div style={styles.priorityRow}>
                                <span style={{ ...styles.priorityLabel, color: '#ca8a04' }}>Medium Priority</span>
                                <span style={styles.priorityValue}>{stats.mediumPriorityTasks || 0}</span>
                            </div>
                            <div style={styles.priorityRow}>
                                <span style={{ ...styles.priorityLabel, color: '#16a34a' }}>Low Priority</span>
                                <span style={styles.priorityValue}>{stats.lowPriorityTasks || 0}</span>
                            </div>
                        </div>

                        <div style={styles.quickActions}>
                            <h3 style={styles.quickTitle}>Quick Actions</h3>
                            <div style={styles.quickGrid}>
                                <Link to="/tasks" style={styles.quickCard}>
                                    <FaTasks style={styles.quickIcon} />
                                    <p style={styles.quickText}>View All Tasks</p>
                                </Link>
                                <Link to="/tasks/new" style={styles.quickCard}>
                                    <FaTasks style={styles.quickIcon} />
                                    <p style={styles.quickText}>Create New Task</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        padding: '32px 0 48px',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    },
    pageTitle: {
        fontSize: '36px',
        fontWeight: 800,
        color: '#1f2937',
        marginBottom: '28px',
    },
    statsGrid: {
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        marginBottom: '28px',
    },
    secondaryGrid: {
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
    },
    cardRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
    },
    cardLabel: {
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '6px',
    },
    cardValue: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#111827',
    },
    cardIcon: {
        fontSize: '32px',
    },
    sectionHeading: {
        fontSize: '18px',
        fontWeight: 700,
        color: '#1f2937',
        marginBottom: '16px',
    },
    priorityRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
    },
    priorityLabel: {
        fontWeight: 600,
    },
    priorityValue: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#111827',
    },
    quickActions: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        borderRadius: '16px',
        padding: '24px',
        color: '#fff',
        boxShadow: '0 16px 36px rgba(37, 99, 235, 0.3)',
    },
    quickTitle: {
        fontSize: '20px',
        fontWeight: 700,
        marginBottom: '16px',
    },
    quickGrid: {
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    },
    quickCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '16px',
        textDecoration: 'none',
        color: '#fff',
        textAlign: 'center',
    },
    quickIcon: {
        fontSize: '28px',
        marginBottom: '8px',
    },
    quickText: {
        fontWeight: 600,
    },
    loadingContainer: {
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        color: '#1f2937',
    },
    spinner: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '4px solid #e5e7eb',
        borderTopColor: '#2563eb',
    },
    loadingText: {
        fontWeight: 600,
    },
};

export default Dashboard;
