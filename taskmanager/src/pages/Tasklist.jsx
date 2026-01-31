import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taskAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
    });
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
        sortBy: 'createdAt',
        sortDir: 'desc',
    });

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line
    }, [pagination.page, filters]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const params = {
                page: pagination.page,
                size: pagination.size,
                ...filters,
            };

            // Remove empty filters
            Object.keys(params).forEach(key => {
                if (params[key] === '') delete params[key];
            });

            const response = await taskAPI.getTasks(params);
            setTasks(response.data.data.content);
            setPagination(prev => ({
                ...prev,
                totalPages: response.data.data.totalPages,
            }));
        } catch (error) {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskAPI.deleteTask(id);
                toast.success('Task deleted successfully');
                fetchTasks();
            } catch (error) {
                toast.error('Failed to delete task');
            }
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            TODO: { backgroundColor: '#fef3c7', color: '#92400e' },
            IN_PROGRESS: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
            DONE: { backgroundColor: '#dcfce7', color: '#166534' },
        };
        return colors[status] || { backgroundColor: '#f3f4f6', color: '#374151' };
    };

    const getPriorityColor = (priority) => {
        const colors = {
            HIGH: { color: '#dc2626' },
            MEDIUM: { color: '#ca8a04' },
            LOW: { color: '#16a34a' },
        };
        return colors[priority] || { color: '#6b7280' };
    };

    return (
        <>
            <Navbar />
            <div style={styles.page}>
                <div style={styles.container}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>My Tasks</h1>
                        <Link to="/tasks/new" style={styles.primaryButton}>
                            <FaPlus />
                            <span>New Task</span>
                        </Link>
                    </div>

                    <div style={styles.filtersCard}>
                        <div style={styles.filtersGrid}>
                            <div style={styles.searchField}>
                                <FaSearch style={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    style={styles.searchInput}
                                />
                            </div>

                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                style={styles.select}
                            >
                                <option value="">All Status</option>
                                <option value="TODO">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="DONE">Done</option>
                            </select>

                            <select
                                value={filters.priority}
                                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                                style={styles.select}
                            >
                                <option value="">All Priorities</option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>

                            <select
                                value={`${filters.sortBy}-${filters.sortDir}`}
                                onChange={(e) => {
                                    const [sortBy, sortDir] = e.target.value.split('-');
                                    setFilters({ ...filters, sortBy, sortDir });
                                }}
                                style={styles.select}
                            >
                                <option value="createdAt-desc">Newest First</option>
                                <option value="createdAt-asc">Oldest First</option>
                                <option value="title-asc">Title A-Z</option>
                                <option value="title-desc">Title Z-A</option>
                                <option value="dueDate-asc">Due Date</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div style={styles.loadingRow}>
                            <div style={styles.spinner} />
                            <span style={styles.loadingText}>Loading tasks...</span>
                        </div>
                    ) : tasks.length === 0 ? (
                        <div style={styles.emptyState}>
                            <p style={styles.emptyText}>No tasks found. Create your first task!</p>
                        </div>
                    ) : (
                        <div style={styles.list}>
                            {tasks.map((task) => (
                                <div key={task.id} style={styles.taskCard}>
                                    <div style={styles.taskRow}>
                                        <div style={styles.taskMain}>
                                            <h3 style={styles.taskTitle}>{task.title}</h3>
                                            <p style={styles.taskDescription}>{task.description || 'No description'}</p>

                                            <div style={styles.metaRow}>
                                                <span style={{ ...styles.badge, ...getStatusColor(task.status) }}>
                                                    {task.status.replace('_', ' ')}
                                                </span>
                                                <span
                                                    style={{
                                                        ...styles.badge,
                                                        border: '2px solid #e5e7eb',
                                                        ...getPriorityColor(task.priority),
                                                    }}
                                                >
                                                    {task.priority} Priority
                                                </span>
                                                {task.dueDate && (
                                                    <span style={styles.dueDate}>
                                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div style={styles.actions}>
                                            <Link to={`/tasks/edit/${task.id}`} style={styles.actionButton}>
                                                <FaEdit />
                                            </Link>
                                            <button onClick={() => handleDelete(task.id)} style={styles.deleteButton}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {pagination.totalPages > 1 && (
                        <div style={styles.pagination}>
                            <button
                                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                                disabled={pagination.page === 0}
                                style={{
                                    ...styles.pageButton,
                                    ...(pagination.page === 0 ? styles.pageButtonDisabled : {}),
                                }}
                            >
                                Previous
                            </button>
                            <span style={styles.pageInfo}>
                                Page {pagination.page + 1} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                                disabled={pagination.page >= pagination.totalPages - 1}
                                style={{
                                    ...styles.pageButton,
                                    ...(pagination.page >= pagination.totalPages - 1 ? styles.pageButtonDisabled : {}),
                                }}
                            >
                                Next
                            </button>
                        </div>
                    )}
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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '24px',
    },
    title: {
        fontSize: '32px',
        fontWeight: 800,
        color: '#1f2937',
    },
    primaryButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#2563eb',
        color: '#fff',
        padding: '10px 18px',
        borderRadius: '10px',
        textDecoration: 'none',
        fontWeight: 700,
    },
    filtersCard: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
        marginBottom: '20px',
    },
    filtersGrid: {
        display: 'grid',
        gap: '12px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    },
    searchField: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: '12px',
        color: '#9ca3af',
    },
    searchInput: {
        width: '100%',
        padding: '10px 12px 10px 36px',
        borderRadius: '10px',
        border: '1px solid #d1d5db',
        fontSize: '14px',
    },
    select: {
        padding: '10px 12px',
        borderRadius: '10px',
        border: '1px solid #d1d5db',
        fontSize: '14px',
        backgroundColor: '#fff',
    },
    loadingRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        padding: '40px 0',
        color: '#374151',
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
    emptyState: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
    },
    emptyText: {
        color: '#6b7280',
        fontSize: '16px',
        margin: 0,
    },
    list: {
        display: 'grid',
        gap: '16px',
    },
    taskCard: {
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
    },
    taskRow: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap',
    },
    taskMain: {
        flex: 1,
        minWidth: '240px',
    },
    taskTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#1f2937',
        marginBottom: '8px',
    },
    taskDescription: {
        color: '#6b7280',
        marginBottom: '12px',
    },
    metaRow: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        alignItems: 'center',
    },
    badge: {
        padding: '6px 12px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 700,
    },
    dueDate: {
        fontSize: '12px',
        color: '#6b7280',
    },
    actions: {
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-start',
    },
    actionButton: {
        backgroundColor: '#dbeafe',
        color: '#2563eb',
        padding: '8px',
        borderRadius: '8px',
        textDecoration: 'none',
    },
    deleteButton: {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        padding: '8px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
    },
    pagination: {
        marginTop: '28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
    },
    pageButton: {
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    pageButtonDisabled: {
        opacity: 0.6,
        cursor: 'not-allowed',
    },
    pageInfo: {
        padding: '8px 16px',
        borderRadius: '8px',
        backgroundColor: '#2563eb',
        color: '#fff',
        fontWeight: 700,
    },
};

export default TaskList;
