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
    const [attendance, setAttendance] = useState({ status: 'Absent', clockIn: null, clockOut: null });
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Load initial data
        const storedEmployees = localStorage.getItem('hrms_employees');
        const storedLeaves = localStorage.getItem('hrms_leaves');
        const storedAttendance = localStorage.getItem('hrms_attendance');

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

        if (storedAttendance) {
            setAttendance(JSON.parse(storedAttendance));
        }

        // Mock notifications
        setNotifications([
            { id: 1, text: "New leave request from Mike Ross", time: "2 hours ago", read: false },
            { id: 2, text: "System maintenance scheduled", time: "1 day ago", read: false },
        ]);
    }, []);

    const markAttendance = (type) => { // type: 'in' or 'out'
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let newAttendance;

        if (type === 'in') {
            newAttendance = { status: 'Present', clockIn: now, clockOut: null };
            addNotification('You clocked in at ' + now);
        } else {
            newAttendance = { ...attendance, status: 'Clocked Out', clockOut: now };
            addNotification('You clocked out at ' + now);
        }

        setAttendance(newAttendance);
        localStorage.setItem('hrms_attendance', JSON.stringify(newAttendance));
    };

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

    const updateEmployee = (id, updates) => {
        const updatedEmployees = employees.map(emp => emp.id === id ? { ...emp, ...updates } : emp);
        setEmployees(updatedEmployees);
        localStorage.setItem('hrms_employees', JSON.stringify(updatedEmployees));
        addNotification(`Employee ${updates.name || 'record'} updated`);
    };

    const requestLeave = (leave) => {
        // Validation handled in component, but we can set status based on days
        const status = leave.days > 10 ? 'Under Review' : 'Pending';
        const newLeave = { ...leave, id: Date.now(), status };

        const updatedLeaves = [newLeave, ...leaves];
        setLeaves(updatedLeaves);
        localStorage.setItem('hrms_leaves', JSON.stringify(updatedLeaves));
        addNotification(`Leave requested: ${leave.type} (${status})`);
        return true;
    };

    const updateLeaveStatus = (id, status) => {
        const updatedLeaves = leaves.map(l => l.id === id ? { ...l, status } : l);
        setLeaves(updatedLeaves);
        localStorage.setItem('hrms_leaves', JSON.stringify(updatedLeaves));
        const leave = leaves.find(l => l.id === id);
        addNotification(`Leave request for ${leave?.type} ${status}`);
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
            attendance,
            addEmployee,
            deleteEmployee,
            updateEmployee,
            requestLeave,
            updateLeaveStatus,
            addNotification,
            clearNotifications,
            markAttendance
        }}>
            {children}
        </DataContext.Provider>
    );
};
