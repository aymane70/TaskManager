import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Privateroute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/Tasklist';
import TaskForm from './pages/Taskform';

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <div style={styles.app}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
              />

              <Route
                  path="/tasks"
                  element={
                    <PrivateRoute>
                      <TaskList />
                    </PrivateRoute>
                  }
              />

              <Route
                  path="/tasks/new"
                  element={
                    <PrivateRoute>
                      <TaskForm />
                    </PrivateRoute>
                  }
              />

              <Route
                  path="/tasks/edit/:id"
                  element={
                    <PrivateRoute>
                      <TaskForm />
                    </PrivateRoute>
                  }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
          </div>
        </BrowserRouter>
      </AuthProvider>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
};

export default App;
