import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search, Bell, Settings } from 'lucide-react';

const Layout = () => {
    return (
        <div className="flex h-screen bg-[#f3f4f6]" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', height: '100vh' }}>
            <Sidebar />
            <main className="flex flex-col h-full overflow-hidden">
                <header className="flex justify-between items-center py-6 px-8 bg-transparent" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)' }}>Nexus HR</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Welcome back, Admin</p>
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

                        <button className="btn-icon" style={{ backgroundColor: 'white', boxShadow: 'var(--shadow-sm)', width: '45px', height: '45px' }}>
                            <Bell size={20} />
                        </button>
                        <button className="btn-icon" style={{ backgroundColor: 'white', boxShadow: 'var(--shadow-sm)', width: '45px', height: '45px' }}>
                            <Settings size={20} />
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
