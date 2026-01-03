import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, LogOut } from 'lucide-react';
import { useData } from '../context/DataContext';

const Attendance = () => {
    const { attendance, markAttendance } = useData();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="fade-in">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>Attendance Tracker</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                <div className="card-panel" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '0.5rem', fontVariantNumeric: 'tabular-nums' }}>
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{formatDate(currentTime)}</p>

                    {attendance.status === 'Present' ? (
                        <>
                            <button
                                onClick={() => markAttendance('out')}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem', padding: '1rem', backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }}
                            >
                                <LogOut size={20} /> Clock Out
                            </button>
                            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Clocked in at <span style={{ fontWeight: '600' }}>{attendance.clockIn}</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => markAttendance('in')}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}
                            >
                                <Clock size={20} /> Clock In
                            </button>
                            {attendance.clockOut && (
                                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    Last clocked out at <span style={{ fontWeight: '600' }}>{attendance.clockOut}</span>
                                </p>
                            )}
                        </>
                    )}
                </div>

                <div className="card-panel">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>This Week</h3>

                    {/* Today's status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ padding: '0.5rem', backgroundColor: attendance.status === 'Present' ? '#dcfce7' : '#f1f5f9', borderRadius: '50%', color: attendance.status === 'Present' ? '#166534' : '#64748b' }}>
                                <CheckCircle size={18} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.95rem' }}>Today, {currentTime.getDate()} {currentTime.toLocaleDateString('en-US', { month: 'short' })}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    {attendance.status === 'Present' ? `${attendance.clockIn} - Present` : attendance.clockOut ? `${attendance.clockIn} - ${attendance.clockOut}` : 'Not started'}
                                </span>
                            </div>
                        </div>
                        <span style={{ fontWeight: '600', color: attendance.status === 'Present' ? 'var(--success)' : 'var(--text-secondary)' }}>
                            {attendance.status}
                        </span>
                    </div>

                    {/* Mock past entries */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'white', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '50%', color: '#166534' }}><CheckCircle size={18} /></div>
                            <div>
                                <h4 style={{ fontSize: '0.95rem' }}>Yesterday</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>09:00 AM - 05:30 PM</span>
                            </div>
                        </div>
                        <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>8h 30m</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
