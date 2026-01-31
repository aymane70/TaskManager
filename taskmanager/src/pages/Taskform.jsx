import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchTask();
        }
        // eslint-disable-next-line
    }, [id]);

    const fetchTask = async () => {
        try {
            const response = await taskAPI.getTaskById(id);
            const task = response.data.data;
            setFormData({
                title: task.title,
                description: task.description || '',
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
            });
        } catch (error) {
            toast.error('Failed to fetch task');
            navigate('/tasks');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                ...formData,
                dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
            };

            if (isEdit) {
                await taskAPI.updateTask(id, data);
                toast.success('Task updated successfully');
            } else {
                await taskAPI.createTask(data);
                toast.success('Task created successfully');
            }

            navigate('/tasks');
        } catch (error) {
            toast.error(isEdit ? 'Failed to update task' : 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.inner}>
                        <h1 style={styles.title}>
                            {isEdit ? 'Edit Task' : 'Create New Task'}
                        </h1>

                        <div style={styles.card}>
                            <form onSubmit={handleSubmit} style={styles.form}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        maxLength="200"
                                        style={styles.input}
                                        placeholder="Enter task title"
                                    />
                                </div>

                                <div style={styles.field}>
                                    <label style={styles.label}>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        maxLength="1000"
                                        style={{ ...styles.input, minHeight: '120px' }}
                                        placeholder="Enter task description"
                                    />
                                </div>

                                <div style={styles.gridTwo}>
                                    <div style={styles.field}>
                                        <label style={styles.label}>Status</label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            style={styles.input}
                                        >
                                            <option value="TODO">To Do</option>
                                            <option value="IN_PROGRESS">In Progress</option>
                                            <option value="DONE">Done</option>
                                        </select>
                                    </div>

                                    <div style={styles.field}>
                                        <label style={styles.label}>Priority</label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            style={styles.input}
                                        >
                                            <option value="LOW">Low</option>
                                            <option value="MEDIUM">Medium</option>
                                            <option value="HIGH">High</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={styles.field}>
                                    <label style={styles.label}>Due Date</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.buttonRow}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            ...styles.primaryButton,
                                            ...(loading ? styles.buttonDisabled : {}),
                                        }}
                                    >
                                        {loading ? 'Saving...' : (isEdit ? 'Update Task' : 'Create Task')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate('/tasks')}
                                        style={styles.secondaryButton}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
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
    inner: {
        maxWidth: '720px',
        margin: '0 auto',
    },
    title: {
        fontSize: '32px',
        fontWeight: 800,
        color: '#1f2937',
        marginBottom: '24px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 14px 32px rgba(15, 23, 42, 0.1)',
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
        borderRadius: '10px',
        border: '1px solid #d1d5db',
        fontSize: '14px',
    },
    gridTwo: {
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    },
    buttonRow: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    },
    primaryButton: {
        flex: 1,
        minWidth: '160px',
        padding: '12px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: '#fff',
        fontSize: '15px',
        fontWeight: 700,
        cursor: 'pointer',
    },
    secondaryButton: {
        flex: 1,
        minWidth: '160px',
        padding: '12px',
        borderRadius: '10px',
        border: '1px solid #d1d5db',
        backgroundColor: '#e5e7eb',
        color: '#374151',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
    },
    buttonDisabled: {
        opacity: 0.7,
        cursor: 'not-allowed',
    },
};

export default TaskForm;
