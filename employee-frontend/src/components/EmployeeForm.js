import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Briefcase, X, Loader2 } from 'lucide-react';

const InputField = ({ label, icon: Icon, type, field, placeholder, required, form, change, submitting }) => (
  <div style={{ flex: 1, minWidth: '200px', marginBottom: '1.25rem' }}>
    <label htmlFor={field} style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, color: '#e2e8f0', marginBottom: '0.5rem' }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <Icon size={18} color="#64748b" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
      <input
        id={field}
        type={type}
        value={form[field]}
        onChange={change(field)}
        required={required}
        disabled={submitting}
        placeholder={placeholder}
        style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
    </div>
  </div>
);

export default function EmployeeForm({ initial, onCancel, onSubmit }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', role: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setForm({
        firstName: initial.firstName || '',
        lastName: initial.lastName || '',
        email: initial.email || '',
        phone: initial.phone || '',
        role: initial.role || ''
      });
    } else {
      setForm({ firstName: '', lastName: '', email: '', phone: '', role: '' });
    }
    setError('');
  }, [initial]);

  const change = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError('First name, last name and email are required.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        id: initial?.id,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role.trim()
      });
    } catch (err) {
      setError(err?.message || 'Save failed');
    } finally {
      if(document.body) { } // Keeps form state clean
      setSubmitting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{ width: '100%', maxWidth: '600px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.1)', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', position: 'relative' }}
      >
        <button 
          onClick={onCancel}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
          onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
        >
          <X size={24} />
        </button>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          {initial ? 'Edit Employee' : 'Add Employee'}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '2rem' }}>
          Enter employee details below.
        </p>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <InputField label="First Name" icon={User} type="text" field="firstName" placeholder="Jane" required form={form} change={change} submitting={submitting} />
            <InputField label="Last Name" icon={User} type="text" field="lastName" placeholder="Doe" required form={form} change={change} submitting={submitting} />
          </div>
          <InputField label="Email Address" icon={Mail} type="email" field="email" placeholder="jane@catalyst.hr" required form={form} change={change} submitting={submitting} />
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <InputField label="Phone" icon={Phone} type="text" field="phone" placeholder="+1 (555) 000-0000" form={form} change={change} submitting={submitting} />
            <InputField label="Role" icon={Briefcase} type="text" field="role" placeholder="Senior Developer" form={form} change={change} submitting={submitting} />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              onClick={onCancel}
              disabled={submitting}
              style={{ padding: '0.8rem 1.5rem', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 500, cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              style={{ padding: '0.8rem 2rem', background: 'linear-gradient(to right, #3b82f6, #6366f1)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center', boxShadow: '0 4px 14px 0 rgba(59,130,246,0.39)', opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? <><Loader2 className="spinner" size={18} /> Processing...</> : (initial ? 'Save' : 'Create')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}