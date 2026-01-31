import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <span style={styles.loadingText}>Loading...</span>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" />;
};

const styles = {
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        color: '#1f2937',
        fontSize: '16px',
    },
    spinner: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: '4px solid #e5e7eb',
        borderTopColor: '#2563eb',
    },
    loadingText: {
        fontWeight: 600,
    },
};

export default PrivateRoute;
