import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createEmployee } from '../services/api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, User } from 'lucide-react';
import AbstractCanvas from './AbstractCanvas';

const InputField = ({ label, icon: Icon, type, field, placeholder, formData, setFormData, loading }) => (
  <div style={{ flex: 1, minWidth: '200px' }}>
    <label htmlFor={field} style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#e2e8f0', marginBottom: '0.5rem' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <Icon size={18} color="#64748b" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
      <input
        id={field}
        type={type}
        value={formData[field]}
        onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
        placeholder={placeholder}
        disabled={loading}
        required
        style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  </div>
);

export default function Signup() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', phone: '', role: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('First name, last name, email and password are required.');
      return;
    }
    setLoading(true);
    try {
      await createEmployee(formData);
      toast.success('Account created successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Creation failed');
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
        style={{ width: '100%', maxWidth: '500px', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', padding: '3rem', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', zIndex: 10, textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Create Account</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2.5rem' }}>Create your Catalyst account</p>

        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <InputField label="First Name *" icon={User} type="text" field="firstName" placeholder="John" formData={formData} setFormData={setFormData} loading={loading} />
            <InputField label="Last Name *" icon={User} type="text" field="lastName" placeholder="Doe" formData={formData} setFormData={setFormData} loading={loading} />
          </div>
          
          <InputField label="Email Address *" icon={Mail} type="email" field="email" placeholder="john.doe@catalyst.hr" formData={formData} setFormData={setFormData} loading={loading} />
          <InputField label="Password *" icon={Lock} type="password" field="password" placeholder="Create a strong password" formData={formData} setFormData={setFormData} loading={loading} />

          <button 
            type="submit" 
            disabled={loading}
            style={{ marginTop: '1.5rem', width: '100%', padding: '0.8rem', background: 'linear-gradient(to right, #3b82f6, #6366f1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1, transition: 'all 0.2s', boxShadow: '0 4px 14px 0 rgba(59,130,246,0.39)' }}
          >
            {loading ? <Loader2 className="spinner" size={18} /> : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>
          Already integrated? <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
