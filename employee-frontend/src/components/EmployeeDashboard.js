import React, { useState, useEffect } from 'react';
import { getEmployees, deleteEmployee, createEmployee, updateEmployee } from '../services/api';
import EmployeeForm from './EmployeeForm';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Edit2, LogOut, Users } from 'lucide-react';

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useAuth();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (err) {
      console.error("Load error", err);
      if (err.message?.includes('401') || err.message?.includes('403') || err.message?.includes('Unauthorized')) {
        toast.error("Session expired. Please log in again.");
        logout();
      } else {
        toast.error("Failed to load employees: " + (err.message || err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (empData) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, empData);
      toast.success("Employee updated successfully");
    } else {
      await createEmployee(empData);
      toast.success("Employee created successfully");
    }
    setIsFormOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((emp) => emp.id !== id));
        toast.success("Employee deleted");
      } catch (err) {
        toast.error("Deletion failed");
      }
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setIsFormOpen(true);
  };

  const filtered = employees.filter(e => 
    (e.firstName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (e.lastName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (e.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '2rem' }}>
      
      {/* Top Navbar */}
      <nav style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '0.6rem', borderRadius: '12px' }}>
            <Users size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Employee Dashboard</h1>
        </div>
        
        <button 
          onClick={logout} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.6rem 1.2rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <LogOut size={16} /> Logout
        </button>
      </nav>

      {/* Main Container */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem' }} />
            <input 
              type="text" 
              placeholder="Search directory..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none', transition: 'all 0.2s', backdropFilter: 'blur(10px)' }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          <button 
            onClick={() => { setEditingEmployee(null); setIsFormOpen(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#3b82f6', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)', transition: 'transform 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Plus size={18} /> Add Employee
          </button>
        </div>

        {/* Data Grid */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', backdropFilter: 'blur(24px)', overflow: 'hidden', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#94a3b8', gap: '1rem' }}>
              <div className="spinner"><Search size={24} /></div> Parsing data sets...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#64748b' }}>
              No records match your exact parameters.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Full Name</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Email</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Phone</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Role</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((emp) => (
                    <motion.tr 
                      key={emp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s', cursor: 'pointer' }}
                      onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)' }}>
                          {emp.firstName?.[0]}{emp.lastName?.[0]}
                        </div>
                        <div style={{ fontWeight: 600 }}>{emp.firstName} {emp.lastName}</div>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', color: '#cbd5e1' }}>{emp.email}</td>
                      <td style={{ padding: '1rem 1.5rem', color: '#cbd5e1' }}>{emp.phone || '-'}</td>
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <span style={{ padding: '0.3rem 0.8rem', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                          {emp.role || 'Unassigned'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleEdit(emp)} 
                          style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem', transition: 'color 0.2s' }}
                          title="Edit"
                          onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                          onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(emp.id)} 
                          style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '0.5rem', transition: 'color 0.2s', marginLeft: '0.5rem' }}
                          title="Delete"
                          onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
                          onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </main>

      {isFormOpen && (
        <EmployeeForm 
          initial={editingEmployee} 
          onCancel={() => setIsFormOpen(false)} 
          onSubmit={handleSave} 
        />
      )}
    </div>
  );
}
