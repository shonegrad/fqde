/**
 * Data Loader Utility
 * Loads and caches mock data from JSON files
 */

let dataCache = {};

/**
 * Load JSON data file
 * @param {string} filename - Name of the JSON file to load
 * @returns {Promise<any>} - Parsed JSON data
 */
async function loadDataFile(filename) {
    if (dataCache[filename]) {
        return dataCache[filename];
    }

    try {
        // In production (GitHub Pages), use the base path
        const basePath = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${basePath}data/${filename}`);

        if (!response.ok) {
            throw new Error(`Failed to load ${filename}: ${response.statusText}`);
        }

        const data = await response.json();
        dataCache[filename] = data;
        return data;
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
    }
}

/**
 * Load all data files
 * @returns {Promise<object>} - Object containing all data
 */
export async function loadAllData() {
    const [
        associations,
        organizations,
        people,
        memberships,
        events,
        sessions,
        resources,
        relationships
    ] = await Promise.all([
        loadDataFile('associations.json'),
        loadDataFile('organizations.json'),
        loadDataFile('people.json'),
        loadDataFile('memberships.json'),
        loadDataFile('events.json'),
        loadDataFile('sessions.json'),
        loadDataFile('resources.json'),
        loadDataFile('relationships.json')
    ]);

    return {
        associations,
        organizations,
        people,
        memberships,
        events,
        sessions,
        resources,
        relationships
    };
}

// Individual loaders for specific data types
export const loadAssociations = () => loadDataFile('associations.json');
export const loadOrganizations = () => loadDataFile('organizations.json');
export const loadPeople = () => loadDataFile('people.json');
export const loadMemberships = () => loadDataFile('memberships.json');
export const loadEvents = () => loadDataFile('events.json');
export const loadSessions = () => loadDataFile('sessions.json');
export const loadResources = () => loadDataFile('resources.json');
export const loadRelationships = () => loadDataFile('relationships.json');

/**
 * Clear data cache (useful for refreshing)
 */
export function clearDataCache() {
    dataCache = {};
}
