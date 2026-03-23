import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDashboard from './components/EmployeeDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} limit={1} theme="dark" />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}