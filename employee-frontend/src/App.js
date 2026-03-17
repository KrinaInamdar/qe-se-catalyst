import React from 'react';
import EmployeeDashboard from './components/EmployeeDashboard';
import './index.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return <EmployeeDashboard />;
  <>
  <EmployeeDashboard />
  <ToastContainer position="top-right" autoClose={3000} />
</>
}