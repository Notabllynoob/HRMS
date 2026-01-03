import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit } from 'lucide-react';
import { useData } from '../context/DataContext';

const Employees = () => {
    const { employees, addEmployee, deleteEmployee, updateEmployee } = useData();
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // Form State
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [dept, setDept] = useState('Engineering');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            updateEmployee(currentId, { name, role, dept, email });
        } else {
            addEmployee({ name, role, dept, email });
        }
        resetForm();
    };

    const resetForm = () => {
        setName('');
        setRole('');
        setDept('Engineering');
        setEmail('');
        setShowModal(false);
        setIsEditing(false);
        setCurrentId(null);
    };

    const handleEdit = (emp) => {
        setName(emp.name);
        setRole(emp.role);
        setDept(emp.dept);
        setEmail(emp.email);
        setCurrentId(emp.id);
        setIsEditing(true);
        setShowModal(true);
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Employees</h2>
                <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    <Plus size={18} /> Add Employee
                </button>
            </div>

            <div className="card-panel" style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 250px)', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Employee</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Role</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Department</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Status</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#818cf8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {emp.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{emp.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{emp.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem' }}>{emp.role}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.85rem' }}>{emp.dept}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '500',
                                        backgroundColor: emp.status === 'Active' ? '#dcfce7' : '#fee2e2',
                                        color: emp.status === 'Active' ? '#166534' : '#991b1b'
                                    }}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            className="btn-icon"
                                            style={{ width: '32px', height: '32px' }}
                                            onClick={() => handleEdit(emp)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="btn-icon"
                                            style={{ width: '32px', height: '32px', color: 'var(--danger)' }}
                                            onClick={() => {
                                                if (window.confirm('Are you sure you want to delete this employee?')) {
                                                    deleteEmployee(emp.id);
                                                }
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="card-panel fade-in" style={{ width: '500px', maxWidth: '90%' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>{isEditing ? 'Edit Employee' : 'Add New Employee'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                                />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Role</label>
                                    <input
                                        type="text"
                                        required
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Department</label>
                                    <select
                                        value={dept}
                                        onChange={e => setDept(e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                                    >
                                        <option>Engineering</option>
                                        <option>HR</option>
                                        <option>Design</option>
                                        <option>Finance</option>
                                        <option>Legal</option>
                                        <option>Marketing</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <button type="button" onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
                                <button type="submit" className="btn-primary">{isEditing ? 'Update Employee' : 'Save Employee'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
