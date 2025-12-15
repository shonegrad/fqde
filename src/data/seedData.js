/**
 * Mock Data Exports
 * This file maintains backwards compatibility with existing code
 * while loading from the generated JSON files
 */

import { loadAllData } from '../utils/dataLoader.js';

// Export roles (static data)
export const ROLES = {
    "DIRECTOR": "Director",
    "ADMIN": "Admin Team",
    "ORGANIZER": "Event Organizer",
    "REP": "Association Rep",
    "TEACHER": "Teacher Leader",
    "PRINCIPAL": "Principal",
    "RESEARCHER": "Researcher",
    "COORDINATOR": "Coordinator",
    "BOARD_MEMBER": "Board Member",
    "PROGRAM_LEAD": "Program Lead"
};

// Initialize with empty arrays - will be populated by loadData()
export let ASSOCIATIONS = [];
export let ORGANIZATIONS = [];
export let USERS = []; // Maps to "people" in new data
export let EVENTS = [];
export let SESSIONS = [];
export let RESOURCES = [];
export let MEMBERSHIPS = [];
export let RELATIONSHIPS = [];

// Track loading state
let dataLoaded = false;
let loadingPromise = null;

/**
 * Load all data from JSON files
 * @returns {Promise<object>} Loaded data
 */
export async function loadData() {
    // Return existing promise if already loading
    if (loadingPromise) {
        return loadingPromise;
    }

    // Return immediately if already loaded
    if (dataLoaded) {
        return {
            associations: ASSOCIATIONS,
            organizations: ORGANIZATIONS,
            users: USERS,
            events: EVENTS,
            sessions: SESSIONS,
            resources: RESOURCES,
            memberships: MEMBERSHIPS,
            relationships: RELATIONSHIPS
        };
    }

    // Start loading
    loadingPromise = loadAllData()
        .then(data => {
            ASSOCIATIONS = data.associations || [];
            ORGANIZATIONS = data.organizations || [];
            USERS = data.people || []; // Map "people" to "USERS" for compatibility
            EVENTS = data.events || [];
            SESSIONS = data.sessions || [];
            RESOURCES = data.resources || [];
            MEMBERSHIPS = data.memberships || [];
            RELATIONSHIPS = data.relationships || [];

            dataLoaded = true;
            loadingPromise = null;

            console.log('✅ Data loaded:', {
                associations: ASSOCIATIONS.length,
                organizations: ORGANIZATIONS.length,
                users: USERS.length,
                events: EVENTS.length,
                sessions: SESSIONS.length,
                resources: RESOURCES.length,
                memberships: MEMBERSHIPS.length,
                relationships: RELATIONSHIPS.length
            });

            return {
                associations: ASSOCIATIONS,
                organizations: ORGANIZATIONS,
                users: USERS,
                events: EVENTS,
                sessions: SESSIONS,
                resources: RESOURCES,
                memberships: MEMBERSHIPS,
                relationships: RELATIONSHIPS
            };
        })
        .catch(error => {
            console.error('Failed to load data:', error);
            loadingPromise = null;
            throw error;
        });

    return loadingPromise;
}

/**
 * Check if data is loaded
 * @returns {boolean}
 */
export function isDataLoaded() {
    return dataLoaded;
}
