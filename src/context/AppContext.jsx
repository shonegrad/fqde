import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadData, ROLES } from '../data/seedData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // --- Data Loading State ---
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataLoading, setDataLoading] = useState(true);

    // --- Core Data ---
    const [allData, setAllData] = useState({
        users: [],
        organizations: [],
        associations: [],
        events: [],
        sessions: [],
        resources: [],
        memberships: [],
        relationships: []
    });

    // --- User/Role ---
    const [currentUser, setCurrentUser] = useState(null);

    // --- Events & Schedule ---
    const [mySchedule, setMySchedule] = useState(() => {
        const saved = localStorage.getItem('ce_schedule');
        return saved ? JSON.parse(saved) : [];
    });

    // --- Resources (including uploads) ---
    const [resources, setResources] = useState([]);

    // --- Saved Resources (bookmarks) ---
    const [savedResources, setSavedResources] = useState(() => {
        const saved = localStorage.getItem('ce_saved_resources');
        return saved ? JSON.parse(saved) : [];
    });

    // --- Load Data on Mount ---
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                setDataLoading(true);
                const data = await loadData();

                if (!isMounted) return;

                setAllData({
                    users: data.users || [],
                    organizations: data.organizations || [],
                    associations: data.associations || [],
                    events: data.events || [],
                    sessions: data.sessions || [],
                    resources: data.resources || [],
                    memberships: data.memberships || [],
                    relationships: data.relationships || []
                });

                setResources(data.resources || []);

                // Set current user from localStorage or default to first user
                const savedUser = localStorage.getItem('ce_user');
                if (savedUser) {
                    setCurrentUser(JSON.parse(savedUser));
                } else if (data.users && data.users.length > 0) {
                    setCurrentUser(data.users[0]);
                }

                setDataLoaded(true);
            } catch (error) {
                console.error('Failed to load application data:', error);
            } finally {
                if (isMounted) {
                    setDataLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    // --- Persistence Effects ---
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('ce_user', JSON.stringify(currentUser));
        }
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
        const user = allData.users.find(u => u.id === userId);
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
        // Data loading state
        dataLoaded,
        dataLoading,

        // Core data
        users: allData.users,
        organizations: allData.organizations,
        associations: allData.associations,
        events: allData.events,
        sessions: allData.sessions,
        memberships: allData.memberships,
        relationships: allData.relationships,

        // User
        currentUser,
        switchRole,
        roles: ROLES,

        // Schedule
        mySchedule,
        addToSchedule,
        removeFromSchedule,

        // Resources
        resources,
        savedResources,
        toggleSaveResource,
        addResource,
    };

    // Show loading state while data is being fetched
    if (dataLoading) {
        return (
            <AppContext.Provider value={value}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    fontFamily: 'sans-serif'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <h2>Loading FQDE Network...</h2>
                        <p>Initializing  1200+ educators and 250+ organizations...</p>
                    </div>
                </div>
            </AppContext.Provider>
        );
    }

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
