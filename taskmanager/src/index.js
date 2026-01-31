import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

document.body.style.margin = '0';
document.body.style.fontFamily = "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
document.body.style.backgroundColor = '#f8fafc';
document.body.style.color = '#111827';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
