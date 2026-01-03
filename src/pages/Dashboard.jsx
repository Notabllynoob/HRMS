import React from 'react';
import StatCard from '../components/StatCard';
import { Users, Briefcase, ClipboardList, DollarSign, UserPlus, FileText, Calendar, Megaphone } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { employees, leaves, notifications, addNotification } = useData();
    const navigate = useNavigate();

    const quickActions = [
        { label: 'Add Staff', icon: UserPlus, action: () => navigate('/employees') },
        { label: 'Reports', icon: FileText, action: () => addNotification('Generating latest HR reports...') },
        { label: 'Meeting', icon: Calendar, action: () => addNotification('Meeting invite sent to team') },
        { label: 'Announce', icon: Megaphone, action: () => addNotification('Broadcasting announcement...') },
    ];

    const handleStatClick = (title) => {
        if (title === 'Total Employees') navigate('/employees');
        if (title === 'On Leave') navigate('/leaves');
        if (title === 'Payroll Status') addNotification('Payroll is processed on the 1st of every month.');
    };

    return (
        <div className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div onClick={() => handleStatClick('Total Employees')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Total Employees" number={employees.length.toString()} trend="up" trendLabel="+4% this month" icon={Users} colorClass="purple" />
                </div>
                <StatCard title="Open Positions" number="8" trend="down" trendLabel="-2 filled recently" icon={Briefcase} colorClass="orange" />
                <div onClick={() => handleStatClick('On Leave')} style={{ cursor: 'pointer' }}>
                    <StatCard title="On Leave" number={leaves.filter(l => l.status === 'Approved').length.toString()} trend="neutral" trendLabel="Normal rate" icon={ClipboardList} colorClass="blue" />
                </div>
                <div onClick={() => handleStatClick('Payroll Status')} style={{ cursor: 'pointer' }}>
                    <StatCard title="Payroll Status" number="Done" trend="up" trendLabel="Paid on 1st" icon={DollarSign} colorClass="green" />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="card-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Recent Activity</h3>
                        <button style={{ color: 'var(--primary-color)', background: 'none', border: 'none', fontWeight: '500', cursor: 'pointer' }}>View All</button>
                    </div>
                    <ul style={{ listStyle: 'none' }}>
                        {notifications.slice(0, 5).map((note) => (
                            <li key={note.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    backgroundColor: '#f1f5f9',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0
                                }}>
                                    {note.text.includes('Leave') ? '📅' : note.text.includes('employee') ? '👤' : '🔔'}
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.95rem' }}>{note.text}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{note.time}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card-panel">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem' }}>Quick Actions</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {quickActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={action.action}
                                style={{
                                    padding: '1rem', backgroundColor: '#f8fafc', border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                                    cursor: 'pointer', transition: '0.2s', fontWeight: '500', color: 'var(--text-main)'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-color)'; e.currentTarget.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.color = 'var(--text-main)'; }}
                            >
                                <action.icon size={20} />
                                <span style={{ fontSize: '0.85rem' }}>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
