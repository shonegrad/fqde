import React, { createContext, useContext, useState, useEffect } from 'react';
import { USERS, EVENTS, RESOURCES, FEED_ITEMS } from '../data/seed';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // --- State Initialization ---

    // User/Role
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('ce_user');
        return saved ? JSON.parse(saved) : USERS[0]; // Default to Director
    });

    // Events & Schedule
    // We store "mySchedule" as list of session IDs
    const [mySchedule, setMySchedule] = useState(() => {
        const saved = localStorage.getItem('ce_schedule');
        return saved ? JSON.parse(saved) : [];
    });

    // Resources (including uploads)
    const [resources, setResources] = useState(() => {
        const saved = localStorage.getItem('ce_resources');
        return saved ? JSON.parse(saved) : RESOURCES;
    });

    // Saved Resources (bookmarks)
    const [savedResources, setSavedResources] = useState(() => {
        const saved = localStorage.getItem('ce_saved_resources');
        return saved ? JSON.parse(saved) : [];
    });

    // --- Persistence Effects ---
    useEffect(() => {
        localStorage.setItem('ce_user', JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('ce_schedule', JSON.stringify(mySchedule));
    }, [mySchedule]);

    useEffect(() => {
        localStorage.setItem('ce_resources', JSON.stringify(resources));
    }, [resources]);

    useEffect(() => {
        localStorage.setItem('ce_saved_resources', JSON.stringify(savedResources));
    }, [savedResources]);


    // --- Actions ---

    const switchRole = (userId) => {
        const user = USERS.find(u => u.id === userId);
        if (user) setCurrentUser(user);
    };

    const addToSchedule = (sessionId) => {
        if (!mySchedule.includes(sessionId)) {
            setMySchedule([...mySchedule, sessionId]);
        }
    };

    const removeFromSchedule = (sessionId) => {
        setMySchedule(mySchedule.filter(id => id !== sessionId));
    };

    const toggleSaveResource = (resourceId) => {
        if (savedResources.includes(resourceId)) {
            setSavedResources(savedResources.filter(id => id !== resourceId));
        } else {
            setSavedResources([...savedResources, resourceId]);
        }
    };

    const addResource = (newResource) => {
        setResources([newResource, ...resources]);
    };

    const value = {
        users: USERS,
        currentUser,
        switchRole,

        events: EVENTS, // Static for now, could be state if we edited events
        mySchedule,
        addToSchedule,
        removeFromSchedule,

        resources,
        savedResources,
        toggleSaveResource,
        addResource,

        feed: FEED_ITEMS // Static for now
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
