import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarCheck, Coffee, Layers } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/employees', icon: Users, label: 'Employees' },
        { path: '/attendance', icon: CalendarCheck, label: 'Attendance' },
        { path: '/leaves', icon: Coffee, label: 'Leaves' },
    ];

    return (
        <nav style={{
            backgroundColor: 'rgba(30, 27, 75, 0.85)',
            backdropFilter: 'blur(20px)',
            color: '#e0e7ff',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <Layers color="#a78bfa" size={24} />
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', letterSpacing: '-0.5px', color: 'white' }}>
                    ClueCorp
                </h2>
            </div>

            <ul style={{ listStyle: 'none', flex: 1 }}>
                {navItems.map((item) => (
                    <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                        <NavLink
                            to={item.path}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.85rem 1rem',
                                color: isActive ? 'white' : '#94a3b8',
                                textDecoration: 'none',
                                borderRadius: 'var(--radius-md)',
                                transition: '0.2s',
                                backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                                boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none',
                                fontWeight: '500'
                            })}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: 'var(--radius-md)', cursor: 'pointer'
            }}>
                <img
                    src="https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff"
                    alt="Profile"
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                />
                <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '500' }}>Admin User</h4>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>HR Manager</p>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
