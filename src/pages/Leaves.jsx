import React from 'react';
import StatCard from '../components/StatCard';
import { Coffee, CheckCircle, AlertCircle } from 'lucide-react';

const Leaves = () => {
    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>My Leaves</h2>
                <button className="btn-primary">Request Leave</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Annual Leave" number="12" trend="neutral" trendLabel="Days Available" icon={Coffee} colorClass="blue" />
                <StatCard title="Sick Leave" number="5" trend="neutral" trendLabel="Days Available" icon={AlertCircle} colorClass="orange" />
                <StatCard title="Pending" number="2" trend="neutral" trendLabel="Requests" icon={CheckCircle} colorClass="purple" />
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
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '1rem', fontWeight: '500' }}>Annual Leave</td>
                            <td style={{ padding: '1rem' }}>Oct 30 - Nov 2, 2026</td>
                            <td style={{ padding: '1rem' }}>3</td>
                            <td style={{ padding: '1rem' }}><span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', backgroundColor: '#fef3c7', color: '#b45309', fontSize: '0.85rem' }}>Pending</span></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ padding: '1rem', fontWeight: '500' }}>Sick Leave</td>
                            <td style={{ padding: '1rem' }}>Sep 12, 2026</td>
                            <td style={{ padding: '1rem' }}>1</td>
                            <td style={{ padding: '1rem' }}><span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', backgroundColor: '#dcfce7', color: '#166534', fontSize: '0.85rem' }}>Approved</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaves;
