import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit } from 'lucide-react';

const Employees = () => {
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState([
        { id: 1, name: "Sarah Jenkins", role: "Senior Designer", dept: "Design", email: "sarah@nexus.com", status: "Active" },
        { id: 2, name: "Mike Ross", role: "Software Engineer", dept: "Engineering", email: "mike@nexus.com", status: "On Leave" },
        { id: 3, name: "Jessica Pearson", role: "Head of HR", dept: "HR", email: "jessica@nexus.com", status: "Active" },
        { id: 4, name: "Harvey Specter", role: "Legal Consultant", dept: "Legal", email: "harvey@nexus.com", status: "Active" },
        { id: 5, name: "Louis Litt", role: "Financial Analyst", dept: "Finance", email: "louis@nexus.com", status: "Active" },
    ]);

    const handleAdd = (e) => {
        e.preventDefault();
        alert("Employee added!");
        setShowModal(false);
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Employees</h2>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} /> Add Employee
                </button>
            </div>

            <div className="card-panel" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
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
                                        <button className="btn-icon" style={{ width: '32px', height: '32px' }}><Edit size={16} /></button>
                                        <button className="btn-icon" style={{ width: '32px', height: '32px', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="card-panel fade-in" style={{ width: '500px', maxWidth: '90%' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Employee</h3>
                        <form onSubmit={handleAdd}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                                <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Role</label>
                                    <input type="text" required style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Department</label>
                                    <select style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <option>Engineering</option>
                                        <option>HR</option>
                                        <option>Design</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
                                <button type="submit" className="btn-primary">Save Employee</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
