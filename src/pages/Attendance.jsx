import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, LogOut } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
    const { employees, attendance, markAttendance, updateEmployeeAttendance } = useData();
    const { user } = useAuth();
    // Default to 0 (Pradhyudh) if no user logged in, or handle empty state
    const currentUserId = user ? user.id : 0;

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
    };

    const myAttendance = attendance[currentUserId] || { status: 'Absent', sessions: [] };

    return (
        <div className="fade-in">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>Attendance Tracker</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card-panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '0.5rem', fontVariantNumeric: 'tabular-nums' }}>
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{formatDate(currentTime)}</p>

                    {myAttendance.status === 'Present' ? (
                        <button
                            onClick={() => markAttendance('out', currentUserId)}
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.85rem', backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }}
                        >
                            <LogOut size={18} /> Clock Out
                        </button>
                    ) : (
                        <button
                            onClick={() => markAttendance('in', currentUserId)}
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.85rem' }}
                        >
                            <Clock size={18} /> Clock In
                        </button>
                    )}
                </div>

                <div className="card-panel">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>My Logs (Today)</h3>
                    <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                        {myAttendance.sessions.length > 0 ? (
                            myAttendance.sessions.map((session, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '500' }}>Segment {idx + 1}</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>{session.in} - {session.out || '...'}</span>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No logs for today</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Team Attendance</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Employees: {employees.length}</div>
                </div>
                <div style={{ overflowX: 'auto', maxHeight: '400px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8fafc', zIndex: 10, borderBottom: '1px solid var(--border-color)' }}>
                            <tr>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Employee</th>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Status</th>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Latest Log</th>
                                <th style={{ padding: '1rem', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(emp => {
                                const stats = attendance[emp.id] || { status: 'Absent', sessions: [] };
                                const lastSession = stats.sessions[stats.sessions.length - 1];
                                return (
                                    <tr key={emp.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: '600' }}>{emp.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{emp.dept}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: '600',
                                                backgroundColor: stats.status === 'Present' ? '#dcfce7' : stats.status === 'Clocked Out' ? '#fef9c3' : '#f1f5f9',
                                                color: stats.status === 'Present' ? '#166534' : stats.status === 'Clocked Out' ? '#854d0e' : '#64748b'
                                            }}>
                                                {stats.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            {lastSession ? `${lastSession.in} - ${lastSession.out || 'Ongoing'}` : '---'}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => updateEmployeeAttendance(emp.id, 'Present')}
                                                    style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer', backgroundColor: stats.status === 'Present' ? '#8b5cf6' : 'white', color: stats.status === 'Present' ? 'white' : 'black' }}>
                                                    Mark Present
                                                </button>
                                                <button
                                                    onClick={() => updateEmployeeAttendance(emp.id, 'Absent')}
                                                    style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', cursor: 'pointer', backgroundColor: stats.status === 'Absent' ? '#f43f5e' : 'white', color: stats.status === 'Absent' ? 'white' : 'black' }}>
                                                    Mark Absent
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
