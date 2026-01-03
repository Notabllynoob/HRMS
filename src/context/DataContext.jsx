import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const INITIAL_EMPLOYEES = [
    { id: 1, name: "Sarah Jenkins", role: "Senior Designer", dept: "Design", email: "sarah@nexus.com", status: "Active" },
    { id: 2, name: "Mike Ross", role: "Software Engineer", dept: "Engineering", email: "mike@nexus.com", status: "On Leave" },
    { id: 3, name: "Jessica Pearson", role: "Head of HR", dept: "HR", email: "jessica@nexus.com", status: "Active" },
    { id: 4, name: "Harvey Specter", role: "Legal Consultant", dept: "Legal", email: "harvey@nexus.com", status: "Active" },
    { id: 5, name: "Louis Litt", role: "Financial Analyst", dept: "Finance", email: "louis@nexus.com", status: "Active" },
];

const INITIAL_LEAVES = [
    { id: 101, type: "Annual Leave", date: "Oct 30 - Nov 2, 2026", days: 3, status: "Pending" },
    { id: 102, type: "Sick Leave", date: "Sep 12, 2026", days: 1, status: "Approved" },
];

export const DataProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Load initial data
        const storedEmployees = localStorage.getItem('hrms_employees');
        const storedLeaves = localStorage.getItem('hrms_leaves');

        if (storedEmployees) {
            setEmployees(JSON.parse(storedEmployees));
        } else {
            setEmployees(INITIAL_EMPLOYEES);
            localStorage.setItem('hrms_employees', JSON.stringify(INITIAL_EMPLOYEES));
        }

        if (storedLeaves) {
            setLeaves(JSON.parse(storedLeaves));
        } else {
            setLeaves(INITIAL_LEAVES);
            localStorage.setItem('hrms_leaves', JSON.stringify(INITIAL_LEAVES));
        }

        // Mock notifications
        setNotifications([
            { id: 1, text: "New leave request from Mike Ross", time: "2 hours ago", read: false },
            { id: 2, text: "System maintenance scheduled", time: "1 day ago", read: false },
        ]);
    }, []);

    const addEmployee = (employee) => {
        const newEmployee = { ...employee, id: Date.now(), status: 'Active' };
        const updatedEmployees = [...employees, newEmployee];
        setEmployees(updatedEmployees);
        localStorage.setItem('hrms_employees', JSON.stringify(updatedEmployees));
        addNotification(`New employee ${employee.name} added`);
    };

    const deleteEmployee = (id) => {
        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
        localStorage.setItem('hrms_employees', JSON.stringify(updatedEmployees));
    };

    const requestLeave = (leave) => {
        const newLeave = { ...leave, id: Date.now(), status: 'Pending' };
        const updatedLeaves = [newLeave, ...leaves];
        setLeaves(updatedLeaves);
        localStorage.setItem('hrms_leaves', JSON.stringify(updatedLeaves));
        addNotification(`Leave requested: ${leave.type}`);
    };

    const addNotification = (text) => {
        const newNote = { id: Date.now(), text, time: 'Just now', read: false };
        setNotifications([newNote, ...notifications]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <DataContext.Provider value={{
            employees,
            leaves,
            notifications,
            addEmployee,
            deleteEmployee,
            requestLeave,
            addNotification,
            clearNotifications
        }}>
            {children}
        </DataContext.Provider>
    );
};
