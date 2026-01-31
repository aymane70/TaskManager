import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await register(formData);

        if (result.success) {
            toast.success('Registration successful!');
            navigate('/dashboard');
        } else {
            toast.error(result.message);
        }

        setLoading(false);
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            minLength="3"
                            style={styles.input}
                            placeholder="Choose a username"
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                            style={styles.input}
                            placeholder="Choose a password (min 6 characters)"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.submitButton,
                            ...(loading ? styles.submitButtonDisabled : {}),
                        }}
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.link}>
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        padding: '24px',
    },
    card: {
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 16px 40px rgba(15, 23, 42, 0.12)',
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#1f2937',
        textAlign: 'center',
        marginBottom: '28px',
    },
    form: {
        display: 'grid',
        gap: '18px',
    },
    field: {
        display: 'grid',
        gap: '8px',
    },
    label: {
        fontSize: '14px',
        fontWeight: 600,
        color: '#374151',
    },
    input: {
        width: '100%',
        padding: '12px 14px',
        boxSizing: 'border-box',
        borderRadius: '10px',
        border: '1px solid #d1d5db',
        fontSize: '14px',
    },
    submitButton: {
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 700,
        cursor: 'pointer',
    },
    submitButtonDisabled: {
        opacity: 0.7,
        cursor: 'not-allowed',
    },
    footer: {
        marginTop: '24px',
        textAlign: 'center',
        color: '#6b7280',
    },
    link: {
        color: '#2563eb',
        textDecoration: 'none',
        fontWeight: 600,
    },
};

export default Register;
