import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import { Coffee, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Leaves = () => {
    const { leaves, requestLeave } = useData();
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [type, setType] = useState('Annual Leave');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleRequest = (e) => {
        e.preventDefault();
        // Simple day calculation
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        requestLeave({
            type,
            date: `${startDate} to ${endDate}`,
            days: diffDays > 0 ? diffDays : 1
        });

        setShowModal(false);
        setStartDate('');
        setEndDate('');
        setType('Annual Leave');
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>My Leaves</h2>
                <button className="btn-primary" onClick={() => setShowModal(true)}>Request Leave</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Annual Leave" number="12" trend="neutral" trendLabel="Days Available" icon={Coffee} colorClass="blue" />
                <StatCard title="Sick Leave" number="5" trend="neutral" trendLabel="Days Available" icon={AlertCircle} colorClass="orange" />
                <StatCard title="Pending" number={leaves.filter(l => l.status === 'Pending').length} trend="neutral" trendLabel="Requests" icon={CheckCircle} colorClass="purple" />
            </div>

            <div className="card-panel">
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Leave History</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Type</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Date</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Days</th>
                            <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map(leave => (
                            <tr key={leave.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{leave.type}</td>
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
                            <div className="form-group">
                                <label>Leave Type</label>
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
