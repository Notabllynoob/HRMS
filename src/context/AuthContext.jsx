import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('hrms_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock login logic - in real world this would hit an API
        // For now, accept any email that ends with @nexus.com and password 'password'
        // OR just simple bypass for demo purposes

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const mockUser = {
                        id: 0,
                        name: 'Pradhyudh',
                        email: email,
                        role: 'Founder',
                        avatar: `https://ui-avatars.com/api/?name=Pradhyudh&background=6366f1&color=fff`
                    };
                    setUser(mockUser);
                    localStorage.setItem('hrms_user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 800); // Simulate network delay
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hrms_user');
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('hrms_user', JSON.stringify(updatedUser));
    };

    const value = {
        user,
        login,
        logout,
        updateProfile,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
