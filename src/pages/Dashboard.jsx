import React from 'react';
import StatCard from '../components/StatCard';
import { Users, Briefcase, ClipboardList, DollarSign, UserPlus, FileText, Calendar, Megaphone } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { employees, leaves, notifications, addNotification } = useData();
    const navigate = useNavigate();

    const [showAnnounce, setShowAnnounce] = React.useState(false);
    const [showMeeting, setShowMeeting] = React.useState(false);
    const [inputVal, setInputVal] = React.useState('');

    const quickActions = [
        { label: 'Add Staff', icon: UserPlus, action: () => navigate('/employees') },
        { label: 'Reports', icon: FileText, action: () => addNotification('Generating latest HR reports...') },
        { label: 'Meeting', icon: Calendar, action: () => setShowMeeting(true) },
        { label: 'Announce', icon: Megaphone, action: () => setShowAnnounce(true) },
    ];

    const handleStatClick = (title) => {
        if (title === 'Total Employees') navigate('/employees');
        if (title === 'On Leave') navigate('/leaves');
        if (title === 'Payroll Status') addNotification('Payroll is processed on the 1st of every month.');
    };

    const handleAnnounce = (e) => {
        e.preventDefault();
        addNotification(`📢 Announcement: ${inputVal}`);
        setShowAnnounce(false);
        setInputVal('');
    }

    const handleMeeting = (e) => {
        e.preventDefault();
        addNotification(`📅 Meeting scheduled for: ${inputVal}`);
        setShowMeeting(false);
        setInputVal('');
    }

    // Deduplicate notifications for display
    const uniqueNotifications = Array.from(new Set(notifications.map(n => n.text)))
        .map(text => notifications.find(n => n.text === text));

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
                        {uniqueNotifications.slice(0, 5).map((note) => (
                            <li key={note.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid white',
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
                                    padding: '1rem', backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.6)',
                                    borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                                    cursor: 'pointer', transition: '0.2s', fontWeight: '500', color: 'var(--text-main)',
                                    backdropFilter: 'blur(5px)'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-color)'; e.currentTarget.style.color = 'white'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                            >
                                <action.icon size={20} />
                                <span style={{ fontSize: '0.85rem' }}>{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {(showAnnounce || showMeeting) && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
                    <div className="card-panel fade-in" style={{ width: '400px' }}>
                        <h3 style={{ marginBottom: '1rem' }}>{showAnnounce ? 'Make Announcement' : 'Schedule Meeting'}</h3>
                        <form onSubmit={showAnnounce ? handleAnnounce : handleMeeting}>
                            {showAnnounce ? (
                                <textarea
                                    required autoFocus
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', minHeight: '100px', marginBottom: '1rem', fontFamily: 'inherit' }}
                                    placeholder="Type your announcement here..."
                                    value={inputVal} onChange={e => setInputVal(e.target.value)}
                                />
                            ) : (
                                <input
                                    type="datetime-local" required
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '1rem', fontFamily: 'inherit' }}
                                    value={inputVal} onChange={e => setInputVal(e.target.value)}
                                />
                            )}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                <button type="button" onClick={() => { setShowAnnounce(false); setShowMeeting(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>Cancel</button>
                                <button type="submit" className="btn-primary">{showAnnounce ? 'Post' : 'Schedule'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
