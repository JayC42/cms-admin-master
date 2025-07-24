import '@mui/material/styles/styled';
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Lab } from './components/Lab.tsx';
import Login from './components/Login.tsx';
import AppShell from './components/appShell/AppShell.tsx';
import Dashboard from './components/dashboard/Dashboard.tsx';
import { Pool } from './components/pool/Pool.tsx';
import { Settings } from './components/settings/Settings.tsx';
import { Winner } from './components/winner/Winner.tsx';
import useSessionTimeout from './hooks/useSessionTimeout.tsx';
import { Gift } from './components/gift/Gift.tsx';
import { Notification } from './components/notification/Notification.tsx';
import { Inventory } from './components/inventory/Inventory.tsx';
import { ToastContainer } from 'react-toastify';
import ForgotPassword from './components/ForgotPassword.tsx';
import FirstTimeLogin from './components/FirstTimeLogin.tsx';
import { OfflineEvent } from './components/offlineEvent/OfflineEvent.tsx';

const App = (): JSX.Element => {
  useSessionTimeout();

  const generateToken = () => {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  };

  // Protects the development environment with a passcode
  const devEnvCheckPasscode = () => {
    const PASSCODE = 'exact7ly';
    const TOKEN_KEY = 'dev_access_token';

    if (!import.meta.env.DEV) {
      return;
    }

    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      const userInput = prompt('Please enter the development passcode:');

      if (userInput === PASSCODE) {
        const token = generateToken();
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        alert('Incorrect passcode. Access denied.');
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // I wonder what this link is...
      }
    }
  };

  useEffect(() => {
    devEnvCheckPasscode();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/first-login" element={<FirstTimeLogin />} />
        <Route path="/app" element={<AppShell />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gift" element={<Gift />} />
          <Route path="pool" element={<Pool />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="winner" element={<Winner />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notification" element={<Notification />} />
          <Route path="offline-event" element={<OfflineEvent />} />
          <Route path="logout" element={<div>Here is a logout</div>} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Development environment only routes */}
        {import.meta.env.DEV && <Route path="/lab" element={<Lab />} />}
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
