import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import { Coffee, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Leaves = () => {
    const { leaves, employees, requestLeave, updateLeaveStatus } = useData();
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [type, setType] = useState('Annual Leave');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [employeeId, setEmployeeId] = useState('1'); // Default to self (Admin)

    const handleRequest = (e) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            alert('End date cannot be earlier than start date!');
            return;
        }

        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const employee = employees.find(e => e.id.toString() === employeeId.toString());

        requestLeave({
            type,
            date: `${startDate} to ${endDate}`,
            days: diffDays,
            applicant: employee ? employee.name : 'Unknown'
        });

        if (diffDays > 10) {
            alert('Note: Leaves longer than 10 days have been flagged for manual review.');
        }

        setShowModal(false);
        setStartDate('');
        setEndDate('');
        setType('Annual Leave');
        setEmployeeId('1');
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Leave Management</h2>
                <button className="btn-primary" onClick={() => setShowModal(true)}>Request Leave</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Annual Leave" number="12" trend="neutral" trendLabel="Days Available" icon={Coffee} colorClass="blue" />
                <StatCard title="Sick Leave" number="5" trend="neutral" trendLabel="Days Available" icon={AlertCircle} colorClass="orange" />
                <StatCard title="Pending" number={leaves.filter(l => l.status === 'Pending').length} trend="neutral" trendLabel="Requests" icon={CheckCircle} colorClass="purple" />
            </div>

            <div className="card-panel" style={{ overflowX: 'auto', maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', padding: 0 }}>
                <div style={{ padding: '1.5rem', position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'white', borderBottom: '1px solid var(--border-color)', marginBottom: 0 }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Leave History</h3>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ position: 'sticky', top: '4.8rem', backgroundColor: '#f8fafc', zIndex: 9, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Employee</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Type</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Date</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Days</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Status</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map(leave => (
                            <tr key={leave.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: '600' }}>{leave.applicant || 'Sarah Jenkins'}</td>
                                <td style={{ padding: '1rem' }}>{leave.type}</td>
                                <td style={{ padding: '1rem' }}>{leave.date}</td>
                                <td style={{ padding: '1rem' }}>{leave.days}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '99px',
                                        fontSize: '0.85rem',
                                        backgroundColor: leave.status === 'Approved' ? '#dcfce7' : leave.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                                        color: leave.status === 'Approved' ? '#166534' : leave.status === 'Rejected' ? '#991b1b' : '#b45309'
                                    }}>
                                        {leave.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {(leave.status === 'Pending' || leave.status === 'Under Review') && (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => updateLeaveStatus(leave.id, 'Approved')}
                                                style={{ padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: '#dcfce7', color: '#166534', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => updateLeaveStatus(leave.id, 'Rejected')}
                                                style={{ padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: '#fee2e2', color: '#991b1b', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Request Modal */}
            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="card-panel fade-in" style={{ width: '450px', maxWidth: '90%' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Request Leave</h3>
                        <form onSubmit={handleRequest}>
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Request For</label>
                                <select
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                >
                                    {employees.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.name === 'Sarah Jenkins' ? 'Myself' : emp.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group" style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Leave Type</label>
                                <select
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option>Annual Leave</option>
                                    <option>Sick Leave</option>
                                    <option>Personal Leave</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>Start Date</label>
                                    <input
                                        type="date"
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontFamily: 'inherit' }}
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>End Date</label>
                                    <input
                                        type="date"
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontFamily: 'inherit' }}
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
                                <button type="submit" className="btn-primary">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaves;
