import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as apiLogin } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import AbstractCanvas from './AbstractCanvas';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await apiLogin(email, password);
      login();
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <AbstractCanvas />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ width: '100%', maxWidth: '420px', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', padding: '3rem', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', zIndex: 10, textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Welcome Back</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2.5rem' }}>Sign in to Catalyst</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#e2e8f0', marginBottom: '0.5rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#64748b" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@catalyst.hr"
                disabled={loading}
                required
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#e2e8f0', marginBottom: '0.5rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#64748b" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                required
                style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ marginTop: '1rem', width: '100%', padding: '0.8rem', background: 'linear-gradient(to right, #3b82f6, #6366f1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1, transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(59,130,246,0.39)' }}
          >
            {loading ? <Loader2 className="spinner" size={18} /> : 'Sign In'}
          </button>
        </form>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          New to Catalyst? <Link to="/signup" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}>Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
