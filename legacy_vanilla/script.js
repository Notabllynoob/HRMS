// DOM Elements
const navLinks = document.querySelectorAll('.nav-links li');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtns = document.querySelectorAll('.close-modal');
const employeeForm = document.getElementById('employee-form');
const pageHeader = document.getElementById('page-header');
const pageSubtitle = document.getElementById('page-subtitle');
const appContent = document.getElementById('app-content');

// Navigation Logic
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active to clicked
        link.classList.add('active');

        const page = link.getAttribute('data-page');
        loadPage(page);
    });
});

// Mock Database
const employees = [
    { id: 1, name: "Sarah Jenkins", role: "Senior Designer", dept: "Design", email: "sarah@nexus.com", status: "Active" },
    { id: 2, name: "Mike Ross", role: "Software Engineer", dept: "Engineering", email: "mike@nexus.com", status: "On Leave" },
    { id: 3, name: "Jessica Pearson", role: "Head of HR", dept: "HR", email: "jessica@nexus.com", status: "Active" },
    { id: 4, name: "Harvey Specter", role: "Legal Consultant", dept: "Legal", email: "harvey@nexus.com", status: "Active" },
    { id: 5, name: "Louis Litt", role: "Financial Analyst", dept: "Finance", email: "louis@nexus.com", status: "Active" },
];

function loadPage(page) {
    // Fade out current content
    appContent.classList.remove('fade-in');

    setTimeout(() => {
        if (page === 'dashboard') {
            loadDashboard();
        } else if (page === 'employees') {
            loadEmployees();
        } else if (page === 'leaves') {
            loadLeaves();
        } else {
            appContent.innerHTML = `<div class="card-panel fade-in"><h3>Coming Soon</h3><p>This module is under development.</p></div>`;
            updateHeader(page.charAt(0).toUpperCase() + page.slice(1), "Module under construction");
        }
    }, 100);
}

function updateHeader(title, subtitle) {
    pageHeader.innerText = title;
    pageSubtitle.innerText = subtitle;
}

function loadDashboard() {
    updateHeader("Dashboard", "Overview of your organization's health");
    // Re-inject the dashboard HTML (simplified for prototype, usually this is persistent or re-fetched)
    appContent.innerHTML = `
    <div class="dashboard-view fade-in">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon purple"><i class="fa-solid fa-users"></i></div>
                <div class="stat-info"><h3>Total Employees</h3><p class="number">${employees.length + 119}</p><span class="trend up">+4% <span class="text">this month</span></span></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon orange"><i class="fa-solid fa-briefcase"></i></div>
                <div class="stat-info"><h3>Open Positions</h3><p class="number">8</p><span class="trend down">-2 <span class="text">filled recently</span></span></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon blue"><i class="fa-solid fa-clipboard-user"></i></div>
                <div class="stat-info"><h3>On Leave</h3><p class="number">12</p><span class="trend neutral">Normal rate</span></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon green"><i class="fa-solid fa-money-bill-wave"></i></div>
                <div class="stat-info"><h3>Payroll Status</h3><p class="number">Done</p><span class="trend up">Paid on 1st</span></div>
            </div>
        </div>
        <div class="dashboard-split">
            <div class="recent-activity card-panel">
                <div class="card-header"><h3>Recent Activity</h3><button class="more-btn">View All</button></div>
                <ul class="activity-list">
                    <li class="activity-item"><div class="activity-icon add"><i class="fa-solid fa-plus"></i></div><div class="activity-content"><p><strong>Sarah Jenkins</strong> joined as Senior Designer</p><span class="time">2 hours ago</span></div></li>
                    <li class="activity-item"><div class="activity-icon leave"><i class="fa-solid fa-plane"></i></div><div class="activity-content"><p><strong>Mike Ross</strong> requested sick leave</p><span class="time">5 hours ago</span></div></li>
                    <li class="activity-item"><div class="activity-icon review"><i class="fa-solid fa-star"></i></div><div class="activity-content"><p>Performance reviews completed for <strong>Engineering</strong></p><span class="time">1 day ago</span></div></li>
                </ul>
            </div>
            <div class="quick-links card-panel">
                <div class="card-header"><h3>Quick Actions</h3></div>
                <div class="action-grid">
                    <button class="action-btn" onclick="openAddEmployeeModal()"><i class="fa-solid fa-user-plus"></i><span>Add Staff</span></button>
                    <button class="action-btn"><i class="fa-solid fa-file-contract"></i><span>Generate Report</span></button>
                    <button class="action-btn"><i class="fa-solid fa-calendar-plus"></i><span>Team Meeting</span></button>
                    <button class="action-btn"><i class="fa-solid fa-bullhorn"></i><span>Announce</span></button>
                </div>
            </div>
        </div>
    </div>`;
}

function loadEmployees() {
    updateHeader("Employees", "Manage your team members");

    let tableRows = employees.map(emp => `
        <tr>
            <td>
                <div class="user-cell">
                    <div class="user-avatar">${emp.name.charAt(0)}</div>
                    <div>
                        <div class="font-bold">${emp.name}</div>
                        <div class="text-sm text-gray">${emp.email}</div>
                    </div>
                </div>
            </td>
            <td>${emp.role}</td>
            <td><span class="badge-dept">${emp.dept}</span></td>
            <td><span class="status-indicator ${emp.status === 'Active' ? 'active' : 'inactive'}">${emp.status}</span></td>
            <td>
                <button class="action-icon"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="action-icon delete"><i class="fa-regular fa-trash-can"></i></button>
            </td>
        </tr>
    `).join('');

    appContent.innerHTML = `
    <div class="fade-in">
        <div class="card-panel" style="overflow-x: auto;">
             <table class="data-table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
        
        <style>
        .data-table { width: 100%; border-collapse: collapse; text-align: left; }
        .data-table th { padding: 1rem; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-weight: 500; font-size: 0.85rem; text-transform: uppercase; }
        .data-table td { padding: 1rem; border-bottom: 1px solid var(--border-color); color: var(--text-main); vertical-align: middle; }
        .user-cell { display: flex; align-items: center; gap: 1rem; }
        .user-avatar { width: 40px; height: 40px; background-color: var(--primary-light); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .text-sm { font-size: 0.85rem; }
        .text-gray { color: var(--text-secondary); }
        .badge-dept { background-color: #f3f4f6; padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.85rem; color: #4b5563; border: 1px solid #e5e7eb; }
        .status-indicator { padding: 0.25rem 0.75rem; border-radius: 99px; font-size: 0.85rem; font-weight: 500; }
        .status-indicator.active { background-color: #dcfce7; color: #166534; }
        .status-indicator.inactive { background-color: #fee2e2; color: #991b1b; }
        .action-icon { background: none; border: none; cursor: pointer; color: var(--text-secondary); padding: 0.5rem; border-radius: 0.5rem; transition: background 0.2s; }
        .action-icon:hover { background-color: #f3f4f6; color: var(--primary-color); }
        .action-icon.delete:hover { color: var(--danger); }
        </style>
    </div>`;
}

function loadLeaves() {
    updateHeader("Leave Management", "Track and approve time off");

    appContent.innerHTML = `
    <div class="fade-in">
        <div class="stats-grid" style="margin-bottom: 2rem;">
             <div class="stat-card">
                <div class="stat-icon purple"><i class="fa-solid fa-clock"></i></div>
                <div class="stat-info"><h3>Pending</h3><p class="number">4</p></div>
            </div>
             <div class="stat-card">
                <div class="stat-icon green"><i class="fa-solid fa-check"></i></div>
                <div class="stat-info"><h3>Approved</h3><p class="number">28</p></div>
            </div>
             <div class="stat-card">
                <div class="stat-icon orange"><i class="fa-solid fa-umbrella-beach"></i></div>
                <div class="stat-info"><h3>On Leave Today</h3><p class="number">12</p></div>
            </div>
        </div>
        
        <div class="card-panel">
            <div class="card-header"><h3>Leave Requests</h3></div>
             <!-- Reusing table style -->
             <table class="data-table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Type</th>
                        <th>Dates</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div class="user-cell"><div class="user-avatar" style="background-color: #f59e0b">M</div><div>Mike Ross</div></div></td>
                        <td>Sick Leave</td>
                        <td>Oct 24 - Oct 26</td>
                        <td><span class="status-indicator inactive" style="background-color: #fef3c7; color: #b45309">Pending</span></td>
                        <td>
                            <button class="btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">Approve</button>
                            <button class="btn-cancel" style="padding: 0.25rem 0.75rem; font-size: 0.8rem; border: none;">Deny</button>
                        </td>
                    </tr>
                </tbody>
             </table>
        </div>
    </div>`;
}


// Modal Logic
function openAddEmployeeModal() {
    modalOverlay.classList.remove('hidden');
}

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modalOverlay.classList.add('hidden');
    });
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
    }
});

// Form Submission
employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, gather data and API call
    alert("Employee added successfully! (Prototype)");
    modalOverlay.classList.add('hidden');
    employeeForm.reset();

    // Refresh list if on employee page
    // if active page is employees... logic 
});
