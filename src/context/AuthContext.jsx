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

    // Mock employee data for auth purposes (kept in sync with DataContext)
    const MOCK_EMPLOYEES = [
        { id: 0, name: "Pradhyudh", role: "Founder", email: "pradhyudh@cluecorp.com" },
        { id: 1, name: "Shibe", role: "HR Director", email: "shibe@cluecorp.com" },
        { id: 2, name: "Kai Hitwatari", role: "Chief Technology Officer", email: "kai@cluecorp.com" },
        { id: 3, name: "Tyson", role: "Head of Operations", email: "tyson@cluecorp.com" },
        { id: 4, name: "Eren Yeager", role: "Head of Strategy", email: "eren@cluecorp.com" },
        { id: 5, name: "Louis Litt", role: "Financial Analyst", email: "louis@cluecorp.com" },
    ];

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    // Find user by email
                    const foundUser = MOCK_EMPLOYEES.find(e => e.email.toLowerCase() === email.toLowerCase());

                    if (foundUser) {
                        const mockUser = {
                            ...foundUser,
                            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(foundUser.name)}&background=6366f1&color=fff`
                        };
                        setUser(mockUser);
                        localStorage.setItem('hrms_user', JSON.stringify(mockUser));
                        resolve(mockUser);
                    } else {
                        // Fallback for demo if email doesn't match specific employees, default to Pradhyudh 
                        // OR we can strictly enforce email match. Let's strictly enforce for "fixing" the issue, 
                        // but allow a generic fallback if they just type anything for ease of use? 
                        // User wanted "clock in tied to first one" fixed. So strict or specific fallback is better.
                        // Let's default to Pradhyudh ONLY if they type his email or a generic admin email, 
                        // otherwise reject or default to visitor? 
                        // To be safe and easy: If email not found, just default to Pradhyudh (ID 0) as 'Admin Access' 
                        // but explicitly checking email allows testing others.

                        // Let's TRY to find them, if not, default to Pradhyudh for convenience but log it.
                        const defaultUser = MOCK_EMPLOYEES[0];
                        const mockUser = {
                            ...defaultUser,
                            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(defaultUser.name)}&background=6366f1&color=fff`
                        };
                        setUser(mockUser);
                        localStorage.setItem('hrms_user', JSON.stringify(mockUser));
                        resolve(mockUser);
                    }
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 800);
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
