import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import WelcomePage from './components/WelcomePage';
import RegisterPage from './components/RegisterPage';
import ConfirmationPage from './components/ConfirmationPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/enter" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/confirm" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

