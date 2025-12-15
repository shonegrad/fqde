import React from 'react';
import { Plus, Upload, Calendar, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROLES } from '../../data/seed';

const QuickActions = () => {
    const { currentUser } = useApp();

    const actions = [];

    if (currentUser.role === ROLES.ADMIN) {
        actions.push({ label: 'Upload Resource', icon: <Upload size={18} /> });
        actions.push({ label: 'Manage Users', icon: <Users size={18} /> }); // Users icon not imported? Fixed below
    }

    if (currentUser.role === ROLES.ORGANIZER) {
        actions.push({ label: 'Create Event', icon: <Calendar size={18} /> });
        actions.push({ label: 'Post Update', icon: <Send size={18} /> });
    }

    if (currentUser.role === ROLES.REP) {
        actions.push({ label: 'Post Announcement', icon: <Bell size={18} /> });
    }

    // Common actions
    actions.push({ label: 'Invite Colleague', icon: <Plus size={18} /> });

    return (
        <div className="card">
            <h3 className="font-heading font-bold text-lg mb-4 text-accent">Quick Actions</h3>
            <div className="flex flex-col gap-2">
                {actions.map((action, idx) => (
                    <button key={idx} className="btn btn-secondary w-full justify-start text-left">
                        {action.icon}
                        {action.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// Need to import missing icons or rely on parent imports?
// It's a module, needs its own imports.
import { Users, Bell } from 'lucide-react';

export default QuickActions;
