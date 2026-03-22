import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createEmployee } from '../services/api';
import { toast } from 'react-toastify';

export default function Signup() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const change = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password) {
      toast.error('First name, last name, email and password are required.');
      return;
    }
    setLoading(true);
    try {
      await createEmployee(form);
      toast.success('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card signup-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join our platform today!</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                value={form.firstName}
                onChange={change('firstName')}
                placeholder="John"
                disabled={loading}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                value={form.lastName}
                onChange={change('lastName')}
                placeholder="Doe"
                disabled={loading}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={change('email')}
              placeholder="e.g. john.doe@example.com"
              disabled={loading}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                value={form.phone}
                onChange={change('phone')}
                placeholder="+1 234 567 8900"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <input
                value={form.role}
                onChange={change('role')}
                placeholder="e.g. Engineer"
                disabled={loading}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={change('password')}
              placeholder="Create a strong password"
              disabled={loading}
              required
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}
