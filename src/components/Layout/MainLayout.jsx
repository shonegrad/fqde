import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Layout, Calendar, BookOpen, Users, LogOut, ChevronDown, Plus } from 'lucide-react';
import './MainLayout.css';
import { version } from '../../../package.json';

const APP_VERSION = version;

const MainLayout = () => {
    const { currentUser, switchRole, users } = useApp();

    return (
        <div className="app-shell">
            <header className="top-bar">
                <div className="container top-bar-inner">
                    <div className="logo">
                        <Layout className="logo-icon" />
                        <span className="logo-text">Connecting Educators</span>
                    </div>

                    <nav className="main-nav">
                        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            Home
                        </NavLink>
                        <NavLink to="/events" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            Events
                        </NavLink>
                        <NavLink to="/resources" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            Resources
                        </NavLink>
                        <NavLink to="/network" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            Network
                        </NavLink>
                    </nav>

                    <div className="user-controls">
                        <div className="role-switcher">
                            <span className="role-label">Viewing as:</span>
                            <select
                                value={currentUser.id}
                                onChange={(e) => switchRole(e.target.value)}
                                className="role-select"
                            >
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {u.name} ({u.role})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="avatar">
                            {currentUser.avatar}
                        </div>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="py-4 text-center text-xs text-gray-400 border-t border-gray-100">
                Connecting Educators v{APP_VERSION}
            </footer>
        </div>
    );
};

export default MainLayout;
