import React, { useState, useEffect } from 'react';

export default function EmployeeForm({ initial, onCancel, onSubmit }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: ''
  });
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
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role.trim()
      });
      // parent is expected to close the form on success
    } catch (err) {
      setError(err?.message || 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{initial ? 'Edit Employee' : 'Add Employee'}</h2>

        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

        <label>
          First name
          <input
            name="firstName"
            value={form.firstName}
            onChange={change('firstName')}
            required
            disabled={submitting}
          />
        </label>

        <label>
          Last name
          <input
            name="lastName"
            value={form.lastName}
            onChange={change('lastName')}
            required
            disabled={submitting}
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={change('email')}
            required
            disabled={submitting}
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={change('phone')}
            disabled={submitting}
          />
        </label>

        <label>
          Role
          <input
            name="role"
            value={form.role}
            onChange={change('role')}
            disabled={submitting}
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="save" disabled={submitting}>
            {submitting ? 'Saving...' : (initial ? 'Save' : 'Create')}
          </button>
          <button type="button" className="cancel" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}