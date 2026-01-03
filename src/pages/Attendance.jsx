import React from 'react';
import { Clock, Calendar, CheckCircle } from 'lucide-react';

const Attendance = () => {
    return (
        <div className="fade-in">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>Attendance Tracker</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
                <div className="card-panel" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '0.5rem' }}>09:41 AM</div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Monday, 24 Oct 2026</p>

                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1.1rem', padding: '1rem' }}>
                        <Clock size={20} /> Clock Out
                    </button>
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Clocked in at 09:00 AM</p>
                </div>

                <div className="card-panel">
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>This Week</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '50%', color: '#166534' }}><CheckCircle size={18} /></div>
                            <div>
                                <h4 style={{ fontSize: '0.95rem' }}>Mon, 24 Oct</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>09:00 AM - Present</span>
                            </div>
                        </div>
                        <span style={{ fontWeight: '600', color: 'var(--success)' }}>On Time</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'white', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ padding: '0.5rem', backgroundColor: '#dcfce7', borderRadius: '50%', color: '#166534' }}><CheckCircle size={18} /></div>
                            <div>
                                <h4 style={{ fontSize: '0.95rem' }}>Fri, 21 Oct</h4>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>09:05 AM - 05:30 PM</span>
                            </div>
                        </div>
                        <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>8h 25m</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
