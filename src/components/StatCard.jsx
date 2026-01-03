import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatCard = ({ title, number, trend, trendLabel, icon: Icon, colorClass }) => {
    const getTrendIcon = () => {
        if (trend === 'up') return <TrendingUp size={14} />;
        if (trend === 'down') return <TrendingDown size={14} />;
        return <Minus size={14} />;
    };

    const getTrendColor = () => {
        if (trend === 'up') return 'var(--success)';
        if (trend === 'down') return 'var(--danger)';
        return 'var(--text-secondary)';
    };

    const colors = {
        purple: { bg: '#e0e7ff', text: '#4f46e5' },
        orange: { bg: '#ffedd5', text: '#c2410c' },
        blue: { bg: '#dbeafe', text: '#2563eb' },
        green: { bg: '#d1fae5', text: '#059669' },
    };

    const theme = colors[colorClass] || colors.purple;

    return (
        <div style={{
            backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '1.5rem',
            boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: '1.25rem',
            transition: 'transform 0.2s', cursor: 'default'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{
                width: '56px', height: '56px', borderRadius: '1rem',
                backgroundColor: theme.bg, color: theme.text,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon size={24} />
            </div>
            <div>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ fontSize: '2rem', fontWeight: '700', lineHeight: '1.2', color: 'var(--text-main)' }}>{number}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: '600', color: getTrendColor() }}>
                    {getTrendIcon()}
                    <span>{trendLabel}</span>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
