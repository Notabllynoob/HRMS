import React from 'react';
import StatCard from '../components/StatCard';
import { Users, Briefcase, ClipboardList, DollarSign } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Employees" number="124" trend="up" trendLabel="+4% this month" icon={Users} colorClass="purple" />
                <StatCard title="Open Positions" number="8" trend="down" trendLabel="-2 filled recently" icon={Briefcase} colorClass="orange" />
                <StatCard title="On Leave" number="12" trend="neutral" trendLabel="Normal rate" icon={ClipboardList} colorClass="blue" />
                <StatCard title="Payroll Status" number="Done" trend="up" trendLabel="Paid on 1st" icon={DollarSign} colorClass="green" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="card-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Recent Activity</h3>
                        <button style={{ color: 'var(--primary-color)', background: 'none', border: 'none', fontWeight: '500', cursor: 'pointer' }}>View All</button>
                    </div>
                    <ul style={{ listStyle: 'none' }}>
                        {[
                            { text: 'Sarah Jenkins joined as Senior Designer', time: '2 hours ago', type: 'add' },
                            { text: 'Mike Ross requested sick leave', time: '5 hours ago', type: 'alert' },
                            { text: 'Performance reviews completed for Engineering', time: '1 day ago', type: 'info' }
                        ].map((item, index) => (
                            <li key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    backgroundColor: item.type === 'add' ? '#dcfce7' : item.type === 'alert' ? '#fee2e2' : '#fef3c7',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0
                                }}>
                                    {item.type === 'add' ? '+' : item.type === 'alert' ? '!' : '★'}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.95rem' }}>{item.text}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.time}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card-panel">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Quick Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {['Add Staff', 'Generate Report', 'Team Meeting', 'Announce'].map((action) => (
                            <button key={action} style={{
                                padding: '1.5rem', backgroundColor: '#f8fafc', border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                                cursor: 'pointer', transition: '0.2s', fontWeight: '500', color: 'var(--text-main)'
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-color)'; e.currentTarget.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.color = 'var(--text-main)'; }}
                            >
                                <span>{action}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
