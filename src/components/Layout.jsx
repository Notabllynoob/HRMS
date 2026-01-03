import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Bell, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Layout = () => {
    const { user, logout } = useAuth();
    const { notifications, clearNotifications } = useData();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#f3f4f6]" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', height: '100vh' }}>
            <Sidebar />
            <main className="flex flex-col h-full overflow-hidden">
                <header className="flex justify-between items-center py-6 px-8 bg-transparent" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>Nexus HR</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Welcome back, {user?.name.split(' ')[0]}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '99px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            width: '250px',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <Search size={18} color="var(--text-secondary)" />
                            <input
                                type="text"
                                placeholder="Search..."
                                style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit' }}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <button
                                className="btn-icon"
                                style={{ backgroundColor: 'white', boxShadow: 'var(--shadow-sm)', width: '45px', height: '45px', position: 'relative' }}
                                onClick={() => setShowNotifications(!showNotifications)}
                            >
                                <Bell size={20} />
                                {notifications.length > 0 && (
                                    <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--danger)', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{notifications.length}</span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifications && (
                                <div className="card-panel fade-in" style={{ position: 'absolute', right: 0, top: '55px', width: '320px', padding: '0', zIndex: 50 }}>
                                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h4 style={{ fontWeight: '600', fontSize: '0.95rem' }}>Notifications</h4>
                                        <button onClick={clearNotifications} style={{ fontSize: '0.75rem', color: 'var(--primary-color)', background: 'none', border: 'none', cursor: 'pointer' }}>Clear all</button>
                                    </div>
                                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {notifications.length === 0 ? (
                                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No new notifications</div>
                                        ) : (
                                            notifications.map(note => (
                                                <div key={note.id} style={{ padding: '1rem', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' }}>
                                                    <p style={{ marginBottom: '0.25rem' }}>{note.text}</p>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{note.time}</span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            className="btn-icon"
                            style={{ backgroundColor: 'white', boxShadow: 'var(--shadow-sm)', width: '45px', height: '45px' }}
                            onClick={() => navigate('/settings')}
                            title="Settings"
                        >
                            <Settings size={20} />
                        </button>

                        <button
                            className="btn-icon"
                            style={{ backgroundColor: 'white', boxShadow: 'var(--shadow-sm)', width: '45px', height: '45px', color: 'var(--danger)' }}
                            onClick={handleLogout}
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </header>

                <div style={{ padding: '0 2rem 2rem 2rem', overflowY: 'auto', flex: 1 }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
