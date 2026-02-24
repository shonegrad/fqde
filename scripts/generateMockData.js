#!/usr/bin/env node

/**
 * FQDE Mock Data Generator
 * Generates large-scale realistic Quebec-based educational network data
 * 
 * Usage: node scripts/generateMockData.js [--seed 12345]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAvatar } from './avatarGenerator.js';
import { generateLogo } from './logoGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
let SEED = 12345; // Default seed
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--seed' && args[i + 1]) {
        SEED = parseInt(args[i + 1], 10);
    }
}

console.log(`🌱 Generating mock data with seed: ${SEED}\n`);

/**
 * Seeded random number generator
 */
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }

    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    nextInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    choice(array) {
        return array[Math.floor(this.next() * array.length)];
    }

    shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
}

const rng = new SeededRandom(SEED);

// ===== QUEBEC DATA =====

const QUEBEC_CITIES = [
    { name: 'Montréal', region: 'Montréal', postalPrefix: 'H', areaCodes: ['514', '438'] },
    { name: 'Québec', region: 'Capitale-Nationale', postalPrefix: 'G', areaCodes: ['418', '581'] },
    { name: 'Laval', region: 'Laval', postalPrefix: 'H', areaCodes: ['450', '579'] },
    { name: 'Gatineau', region: 'Outaouais', postalPrefix: 'J', areaCodes: ['819', '873'] },
    { name: 'Longueuil', region: 'Montérégie', postalPrefix: 'J', areaCodes: ['450', '579'] },
    { name: 'Sherbrooke', region: 'Estrie', postalPrefix: 'J', areaCodes: ['819', '873'] },
    { name: 'Trois-Rivières', region: 'Mauricie', postalPrefix: 'G', areaCodes: ['819', '873'] },
    { name: 'Saguenay', region: 'Saguenay–Lac-Saint-Jean', postalPrefix: 'G', areaCodes: ['418', '581'] },
    { name: 'Lévis', region: 'Chaudière-Appalaches', postalPrefix: 'G', areaCodes: ['418', '581'] },
    { name: 'Rimouski', region: 'Bas-Saint-Laurent', postalPrefix: 'G', areaCodes: ['418', '581'] },
    { name: 'Saint-Jérôme', region: 'Laurentides', postalPrefix: 'J', areaCodes: ['450', '579'] },
    { name: 'Chicoutimi', region: 'Saguenay–Lac-Saint-Jean', postalPrefix: 'G', areaCodes: ['418', '581'] },
];

const FIRST_NAMES_FRENCH = [
    'Marie', 'Sophie', 'Isabelle', 'Nathalie', 'Julie', 'Catherine', 'Émilie', 'Mélanie', 'Stéphanie', 'Valérie',
    'Gabrielle', 'Léa', 'Camille', 'Charlotte', 'Emma', 'Olivia', 'Florence', 'Rosalie', 'Juliette', 'Alice',
    'Jean', 'Pierre', 'Marc', 'Luc', 'François', 'Michel', 'André', 'Philippe', 'Alain', 'Daniel',
    'Gabriel', 'Louis', 'Antoine', 'Maxime', 'Alexandre', 'Thomas', 'Nicolas', 'Simon', 'Mathieu', 'Olivier',
    'Éric', 'Martin', 'Robert', 'Jacques', 'Claude', 'Benoit', 'Sébastien', 'Pascal', 'Yves', 'Denis'
];

const FIRST_NAMES_ENGLISH = [
    'Jennifer', 'Sarah', 'Emily', 'Emma', 'Michelle', 'Laura', 'Jessica', 'Amanda', 'Lisa', 'Nicole',
    'Michael', 'David', 'John', 'Robert', 'James', 'Christopher', 'Daniel', 'Matthew', 'Andrew', 'Joseph',
    'William', 'Richard', 'Thomas', 'Charles', 'Steven', 'Kevin', 'Brian', 'Mark', 'Donald', 'Paul'
];

const LAST_NAMES_FRENCH = [
    'Tremblay', 'Gagnon', 'Roy', 'Côté', 'Bouchard', 'Gauthier', 'Morin', 'Lavoie', 'Fortin', 'Gagné',
    'Ouellet', 'Pelletier', 'Bélanger', 'Lévesque', 'Bergeron', 'Leblanc', 'Paquette', 'Girard', 'Simard', 'Boucher',
    'Lefebvre', 'Cloutier', 'Poulin', 'Fournier', 'Leclerc', 'Caron', 'Beaulieu', 'Dubois', 'Nadeau', 'Lemieux'
];

const LAST_NAMES_ENGLISH = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson'
];

const ORG_TYPES = ['School', 'Institute', 'Academy', 'Consortium', 'Network', 'Association', 'Council', 'Foundation', 'Lab', 'Center'];

const ORG_ADJECTIVES_FR = ['Nationale', 'Régionale', 'Communautaire', 'Innovante', 'Stratégique', 'Avancée', 'Inclusive', 'Future', 'Globale', 'Digitale'];
const ORG_ADJECTIVES_EN = ['National', 'Regional', 'Community', 'Innovative', 'Strategic', 'Advanced', 'Inclusive', 'Future', 'Global', 'Digital'];

const ROLES = ['Director', 'Admin Team', 'Event Organizer', 'Association Rep', 'Teacher Leader', 'Principal', 'Researcher', 'Coordinator', 'Board Member', 'Program Lead'];

// Expanded tag taxonomy for richer graph clustering
const TAG_CATEGORIES = {
    // Pedagogical Approaches
    pedagogy: ['Project-Based Learning', 'Inquiry-Based Learning', 'Differentiated Instruction', 'Collaborative Learning', 'Flipped Classroom', 'Experiential Learning'],

    // Subject Areas
    subjects: ['STEM', 'Mathematics', 'Science', 'Literacy', 'French Language', 'English Language', 'Social Studies', 'Arts', 'Music', 'Physical Education', 'History'],

    // Technology & Innovation
    technology: ['EdTech', 'Digital Literacy', 'AI in Education', 'Coding & Robotics', 'Blended Learning', 'LMS Integration', 'Game-Based Learning'],

    // Student Support
    support: ['Special Education', 'Gifted Education', 'ESL/ELL', 'Social-Emotional Learning', 'Mental Health', 'Accessibility', 'Behavioral Support'],

    // Administration & Leadership
    admin: ['Leadership', 'Curriculum Development', 'Assessment & Evaluation', 'Professional Development', 'School Finance', 'Policy & Advocacy', 'School Safety'],

    // Grade Levels
    levels: ['Early Childhood', 'Elementary', 'Secondary', 'Post-Secondary', 'Adult Education', 'Vocational Training'],

    // Special Themes
    themes: ['Equity & Inclusion', 'Indigenous Education', 'Environmental Education', 'Global Citizenship', 'Community Engagement', 'Bilingual Education', 'Rural Education']
};

// Flatten all tags for easy access
const ALL_TAGS = Object.values(TAG_CATEGORIES).flat();

const EVENT_TYPES = ['Conference', 'Workshop', 'Seminar', 'Summit', 'Forum', 'Symposium', 'Training', 'Networking Event'];

const RESOURCE_TYPES = ['PDF', 'DOC', 'LINK', 'VIDEO', 'PRESENTATION', 'SPREADSHEET'];

// ===== UTILITY FUNCTIONS =====

function generatePostalCode(city) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    return `${city.postalPrefix}${rng.nextInt(1, 9)}${letters[rng.nextInt(0, 25)]} ${rng.nextInt(1, 9)}${letters[rng.nextInt(0, 25)]}${rng.nextInt(0, 9)}`;
}

function generatePhoneNumber(city) {
    const areaCode = rng.choice(city.areaCodes);
    const exchange = rng.nextInt(200, 999);
    const number = rng.nextInt(1000, 9999);
    return `+1 (${areaCode}) ${exchange}-${number}`;
}

function generateEmail(firstName, lastName, domain = 'example.com') {
    const first = firstName.toLowerCase().replace(/[éèêë]/g, 'e').replace(/[àâ]/g, 'a');
    const last = lastName.toLowerCase().replace(/[éèêë]/g, 'e').replace(/[àâ]/g, 'a');
    return `${first}.${last}@${domain}`;
}

function generateDate(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const timestamp = start + rng.next() * (end - start);
    return new Date(timestamp).toISOString();
}

function generateRecentDate() {
    // Generate date within last 90 days
    const now = new Date();
    const daysAgo = rng.nextInt(0, 90);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toISOString();
}

// ===== DATA GENERATION =====

function generateAssociations(count) {
    console.log(`📋 Generating ${count} associations...`);
    const associations = [];

    const assocTypes = ['Association', 'Network', 'Federation', 'Alliance', 'Coalition'];
    const focusAreas = ['Educators', 'Teachers', 'Principals', 'Administrators', 'Professionals'];
    const regionNames = ['Quebec', 'Montreal', 'Provincial', 'National', 'Regional'];

    for (let i = 0; i < count; i++) {
        const id = `assoc${i + 1}`;
        const adjective = rng.choice(ORG_ADJECTIVES_EN);
        const type = rng.choice(assocTypes);
        const focus = rng.choice(focusAreas);
        const region = rng.choice(regionNames);

        const name = `${region} ${adjective} ${focus} ${type}`;

        const shortName = name.split(' ').slice(0, 3).join(' ');
        const city = rng.choice(QUEBEC_CITIES);

        associations.push({
            id,
            name,
            shortName,
            description: `${name} represents educational professionals across Quebec, fostering collaboration and professional development.`,
            website: `https://www.${id}.qc.ca`,
            contactEmail: `info@${id}.qc.ca`,
            phone: generatePhoneNumber(city),
            address: `${rng.nextInt(100, 9999)} Education Street`,
            city: city.name,
            region: city.region,
            logoPath: `/assets/logos/${id}.svg`,
            lastActivityAt: generateRecentDate()
        });
    }

    return associations;
}

function generateOrganizations(count, associations) {
    console.log(`🏫 Generating ${count} organizations...`);
    const organizations = [];

    // Create hub organizations (larger, more central orgs)
    const numHubs = Math.min(10, Math.floor(count * 0.03));
    const hubIndices = new Set();
    while (hubIndices.size < numHubs) {
        hubIndices.add(rng.nextInt(0, count - 1));
    }

    for (let i = 0; i < count; i++) {
        const id = `org${i + 1}`;
        const isHub = hubIndices.has(i);
        const adjective = rng.choice(ORG_ADJECTIVES_EN);
        const type = rng.choice(ORG_TYPES);
        const city = rng.choice(QUEBEC_CITIES);

        const name = isHub
            ? `${city.region} ${adjective} ${type}` // Hub orgs named after regions
            : `${city.name} ${adjective} ${type}`;

        // FIXED: Ensure 80%+ of orgs have at least 1 association (was 0%)
        // Hub orgs belong to 2-4 associations, regular orgs 0-3 with 75% having at least 1
        let numAssociations;
        if (isHub) {
            numAssociations = rng.nextInt(2, 4);
        } else {
            numAssociations = rng.next() > 0.25 ? rng.nextInt(1, 3) : 0;
        }

        const associationIds = [];
        // Prefer associations in same region for clustering
        const regionalAssocs = associations.filter(a => a.region === city.region);
        const assocPool = regionalAssocs.length > 0 && rng.next() > 0.3
            ? regionalAssocs
            : associations;

        for (let j = 0; j < numAssociations; j++) {
            const assoc = rng.choice(assocPool);
            if (!associationIds.includes(assoc.id)) {
                associationIds.push(assoc.id);
            }
        }

        // Generate tags - pick from 1-2 related categories for coherent profiles
        const categoryKeys = Object.keys(TAG_CATEGORIES);
        const primaryCategory = rng.choice(categoryKeys);
        const secondaryCategory = rng.next() > 0.5 ? rng.choice(categoryKeys) : primaryCategory;

        const numTags = isHub ? rng.nextInt(4, 6) : rng.nextInt(2, 4);
        const tags = [];
        for (let j = 0; j < numTags; j++) {
            const category = j < 2 ? primaryCategory : secondaryCategory;
            const tag = rng.choice(TAG_CATEGORIES[category]);
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }

        organizations.push({
            id,
            name,
            type,
            isHub, // Mark hub orgs for special treatment
            description: `${name} is a leading educational institution committed to excellence in teaching and learning.`,
            website: `https://www.${id}.qc.ca`,
            contactEmail: `contact@${id}.qc.ca`,
            phone: generatePhoneNumber(city),
            address: `${rng.nextInt(100, 9999)} Education Street`,
            city: city.name,
            region: city.region,
            postalCode: generatePostalCode(city),
            logoPath: `/assets/logos/${id}.svg`,
            associationIds,
            tags,
            lastActivityAt: generateRecentDate()
        });
    }

    return organizations;
}

function generatePeople(count, organizations, associations) {
    console.log(`👥 Generating ${count} people...`);
    const people = [];

    for (let i = 0; i < count; i++) {
        const id = `p${i + 1}`;
        const useFrench = rng.next() > 0.3; // 70% French names

        const firstName = useFrench ? rng.choice(FIRST_NAMES_FRENCH) : rng.choice(FIRST_NAMES_ENGLISH);
        const lastName = useFrench ? rng.choice(LAST_NAMES_FRENCH) : rng.choice(LAST_NAMES_ENGLISH);
        const displayName = `${firstName} ${lastName}`;

        const city = rng.choice(QUEBEC_CITIES);
        const title = rng.choice(ROLES);

        // Generate coherent tag profiles from 1-2 related categories
        const categoryKeys = Object.keys(TAG_CATEGORIES);
        const primaryCategory = rng.choice(categoryKeys);
        const secondaryCategory = rng.next() > 0.4 ? rng.choice(categoryKeys) : primaryCategory;

        const numTags = rng.nextInt(2, 5);
        const tags = [];
        for (let j = 0; j < numTags; j++) {
            const category = j < 2 ? primaryCategory : secondaryCategory;
            const tag = rng.choice(TAG_CATEGORIES[category]);
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }

        people.push({
            id,
            firstName,
            lastName,
            displayName,
            title,
            bio: `${displayName} is a dedicated ${title} passionate about transforming education through collaboration and innovation.`,
            email: generateEmail(firstName, lastName, 'qc.ca'),
            phone: generatePhoneNumber(city),
            city: city.name,
            region: city.region,
            avatarPath: `/assets/avatars/${id}.svg`,
            tags,
            primaryExpertise: primaryCategory, // Track for clustering
            lastActivityAt: generateRecentDate()
        });
    }

    return people;
}

function generateMemberships(people, organizations, associations) {
    console.log(`🔗 Generating memberships...`);
    const memberships = [];
    let id = 1;

    // Build indices for clustering
    const orgsByRegion = {};
    const hubOrgs = organizations.filter(o => o.isHub);
    organizations.forEach(org => {
        if (!orgsByRegion[org.region]) orgsByRegion[org.region] = [];
        orgsByRegion[org.region].push(org);
    });

    const assocsByRegion = {};
    associations.forEach(assoc => {
        if (!assocsByRegion[assoc.region]) assocsByRegion[assoc.region] = [];
        assocsByRegion[assoc.region].push(assoc);
    });

    // Each person belongs to 1-6 organizations/associations with regional preference
    for (const person of people) {
        const numMemberships = rng.nextInt(2, 6); // Increased minimum from 1 to 2
        const usedEntities = new Set();
        const personRegion = person.region;

        // Get regional pools with fallbacks
        const regionalOrgs = orgsByRegion[personRegion] || [];
        const regionalAssocs = assocsByRegion[personRegion] || [];

        for (let i = 0; i < numMemberships; i++) {
            // 50% chance of association membership (increased from 30%)
            const useAssociation = rng.next() > 0.5;

            if (useAssociation && associations.length > 0) {
                // 70% chance to pick regional association for clustering
                const useRegional = regionalAssocs.length > 0 && rng.next() > 0.3;
                const assocPool = useRegional ? regionalAssocs : associations;
                const assoc = rng.choice(assocPool);
                const key = `association:${assoc.id}`;
                if (!usedEntities.has(key)) {
                    memberships.push({
                        id: `m${id++}`,
                        personId: person.id,
                        entityType: 'association',
                        entityId: assoc.id,
                        role: rng.choice(ROLES),
                        startDate: generateDate('2015-01-01', '2024-01-01'),
                        isPrimary: i === 0
                    });
                    usedEntities.add(key);
                }
            } else {
                // 30% chance to join hub org, 50% regional org, 20% any org
                const roll = rng.next();
                let org;
                if (roll < 0.3 && hubOrgs.length > 0) {
                    org = rng.choice(hubOrgs);
                } else if (roll < 0.8 && regionalOrgs.length > 0) {
                    org = rng.choice(regionalOrgs);
                } else {
                    org = rng.choice(organizations);
                }

                const key = `org:${org.id}`;
                if (!usedEntities.has(key)) {
                    memberships.push({
                        id: `m${id++}`,
                        personId: person.id,
                        entityType: 'org',
                        entityId: org.id,
                        role: rng.choice(ROLES),
                        startDate: generateDate('2015-01-01', '2024-01-01'),
                        isPrimary: i === 0
                    });
                    usedEntities.add(key);
                }
            }
        }
    }

    console.log(`  Generated ${memberships.length} memberships`);
    return memberships;
}

function generateEvents(count, organizations, associations) {
    console.log(`📅 Generating ${count} events...`);
    const events = [];

    for (let i = 0; i < count; i++) {
        const id = `evt${i + 1}`;
        const eventType = rng.choice(EVENT_TYPES);
        const topic = rng.choice(ALL_TAGS);

        const title = `${topic} ${eventType}`;

        const city = rng.choice(QUEBEC_CITIES);
        const org = rng.choice(organizations);
        const hasAssociation = rng.next() > 0.5;
        const assoc = hasAssociation ? rng.choice(associations) : null;

        // Event duration: 1-3 days
        const durationDays = rng.nextInt(1, 3);
        const currentYear = new Date().getFullYear();
        // Generate events between current year and 2 years from now to ensure upcoming events
        const eventYear = currentYear + rng.nextInt(0, 2);
        const startDate = new Date(eventYear, rng.nextInt(0, 11), rng.nextInt(1, 28), 9, 0, 0);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + durationDays - 1);
        endDate.setHours(17, 0, 0);

        const numTags = rng.nextInt(2, 4);
        const tags = [];
        for (let j = 0; j < numTags; j++) {
            const tag = rng.choice(ALL_TAGS);
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }

        events.push({
            id,
            title,
            description: `Join us for an engaging ${eventType.toLowerCase()} focused on ${topic} and educational excellence.`,
            startDateTime: startDate.toISOString(),
            endDateTime: endDate.toISOString(),
            locationName: `${city.name} Convention Center`,
            address: `${rng.nextInt(100, 999)} Main Boulevard`,
            city: city.name,
            region: city.region,
            organizerOrgId: org.id,
            associationId: assoc ? assoc.id : null,
            tags,
            registrationEnabled: rng.next() > 0.2
        });
    }

    return events;
}

function generateSessions(events, people) {
    console.log(`🎤 Generating sessions... (this may take a moment)`);
    const sessions = [];
    let sessionId = 1;

    for (const event of events) {
        const startDate = new Date(event.startDateTime);
        const endDate = new Date(event.endDateTime);
        const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        // 5-20 sessions per event per day
        const sessionsPerDay = rng.nextInt(5, 20);

        for (let day = 0; day < durationDays; day++) {
            const dayDate = new Date(startDate);
            dayDate.setDate(dayDate.getDate() + day);

            for (let i = 0; i < sessionsPerDay; i++) {
                const id = `sess${sessionId++}`;
                const topic = rng.choice(ALL_TAGS);

                const sessionTypes = ['Workshop', 'Panel', 'Presentation', 'Discussion', 'Lecture'];
                const sessionType = rng.choice(sessionTypes);
                const title = `${sessionType}: ${topic}`;

                // Sessions between 9 AM and 5 PM, 30-90 min duration
                const startHour = rng.nextInt(9, 16);
                const startMin = rng.choice([0, 30]);
                const durationMin = rng.choice([30, 60, 90]);

                const sessionStart = new Date(dayDate);
                sessionStart.setHours(startHour, startMin, 0);

                const sessionEnd = new Date(sessionStart);
                sessionEnd.setMinutes(sessionEnd.getMinutes() + durationMin);

                // 1-3 speakers
                const numSpeakers = rng.nextInt(1, 3);
                const speakerPersonIds = [];
                for (let j = 0; j < numSpeakers; j++) {
                    const speaker = rng.choice(people);
                    if (!speakerPersonIds.includes(speaker.id)) {
                        speakerPersonIds.push(speaker.id);
                    }
                }

                const rooms = ['A', 'B', 'C', 'D', '101', '102', '201', 'Main Hall', 'Auditorium'];
                const tracks = ['Leadership', 'Pedagogy', 'Technology', 'Assessment', 'Inclusion', 'Innovation'];

                sessions.push({
                    id,
                    eventId: event.id,
                    title,
                    description: `An engaging session exploring ${topic} and best practices in education.`,
                    speakerPersonIds,
                    startDateTime: sessionStart.toISOString(),
                    endDateTime: sessionEnd.toISOString(),
                    room: rng.choice(rooms),
                    track: rng.choice(tracks),
                    tags: [topic],
                    capacity: rng.nextInt(20, 100)
                });
            }
        }
    }

    console.log(`  Generated ${sessions.length} sessions`);
    return sessions;
}

function generateResources(count, organizations, people) {
    console.log(`📚 Generating ${count} resources...`);
    const resources = [];

    const resourcePrefixes = ['Guide to', 'Handbook on', 'Introduction to', 'Best Practices for', 'Essentials of'];

    for (let i = 0; i < count; i++) {
        const id = `res${i + 1}`;
        const type = rng.choice(RESOURCE_TYPES);
        const topic = rng.choice(ALL_TAGS);
        const prefix = rng.choice(resourcePrefixes);

        const title = `${prefix} ${topic}`;

        const org = rng.choice(organizations);
        const hasAuthor = rng.next() > 0.3;
        const author = hasAuthor ? rng.choice(people) : null;

        const visibilities = ['Public', 'Network', 'Org-only'];
        const visibility = rng.choice(visibilities);

        const numTags = rng.nextInt(2, 4);
        const tags = [];
        for (let j = 0; j < numTags; j++) {
            const tag = rng.choice(ALL_TAGS);
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }

        resources.push({
            id,
            title,
            description: `A comprehensive ${type} resource covering ${topic} and practical strategies for educators.`,
            type,
            tags,
            visibility,
            ownerOrgId: org.id,
            authorPersonId: author ? author.id : null,
            createdAt: generateRecentDate()
        });
    }

    return resources;
}

function generateRelationships(organizations, people, memberships) {
    console.log(`🌐 Generating relationships...`);
    const relationships = [];
    let id = 1;

    // Org <-> Org relationships (partnerships)
    const orgRelationshipCount = rng.nextInt(500, 1000);
    const relationshipTypes = ['Partnership', 'Collaboration', 'Affiliation', 'Network Member'];

    for (let i = 0; i < orgRelationshipCount; i++) {
        const org1 = rng.choice(organizations);
        const org2 = rng.choice(organizations);

        if (org1.id !== org2.id) {
            relationships.push({
                id: `rel${id++}`,
                sourceType: 'org',
                sourceId: org1.id,
                targetType: 'org',
                targetId: org2.id,
                relationshipType: rng.choice(relationshipTypes),
                strength: rng.nextInt(1, 10)
            });
        }
    }

    // Person <-> Person relationships (collaborations)
    // People who work at the same org are connected
    const orgMemberships = {};
    for (const membership of memberships) {
        if (membership.entityType === 'org') {
            if (!orgMemberships[membership.entityId]) {
                orgMemberships[membership.entityId] = [];
            }
            orgMemberships[membership.entityId].push(membership.personId);
        }
    }

    for (const orgId in orgMemberships) {
        const members = orgMemberships[orgId];
        // Connect some members within the org
        const connectionsToMake = Math.min(members.length * 2, 50);
        for (let i = 0; i < connectionsToMake; i++) {
            const p1 = rng.choice(members);
            const p2 = rng.choice(members);
            if (p1 !== p2) {
                relationships.push({
                    id: `rel${id++}`,
                    sourceType: 'person',
                    sourceId: p1,
                    targetType: 'person',
                    targetId: p2,
                    relationshipType: 'Colleague',
                    strength: rng.nextInt(3, 10)
                });
            }
        }
    }

    console.log(`  Generated ${relationships.length} relationships`);
    return relationships;
}

// ===== FILE WRITING =====

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

function writeJSON(filePath, data) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`  ✓ Wrote ${filePath}`);
}

function writeSVG(filePath, svgContent) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, svgContent);
}

// ===== MAIN =====

async function main() {
    const projectRoot = path.join(__dirname, '..');
    const publicDir = path.join(projectRoot, 'public');
    const dataDir = path.join(publicDir, 'data');
    const avatarsDir = path.join(publicDir, 'assets', 'avatars');
    const logosDir = path.join(publicDir, 'assets', 'logos');

    // Generate data
    const numAssociations = rng.nextInt(20, 40);
    const numOrganizations = rng.nextInt(250, 600);
    const numPeople = rng.nextInt(800, 2000);
    const numEvents = rng.nextInt(120, 300);
    const numResources = rng.nextInt(600, 1500);

    console.log(`📊 Target dataset sizes:`);
    console.log(`   Associations: ${numAssociations}`);
    console.log(`   Organizations: ${numOrganizations}`);
    console.log(`   People: ${numPeople}`);
    console.log(`   Events: ${numEvents}`);
    console.log(`   Resources: ${numResources}\n`);

    const associations = generateAssociations(numAssociations);
    const organizations = generateOrganizations(numOrganizations, associations);
    const people = generatePeople(numPeople, organizations, associations);
    const memberships = generateMemberships(people, organizations, associations);
    const events = generateEvents(numEvents, organizations, associations);
    const sessions = generateSessions(events, people);
    const resources = generateResources(numResources, organizations, people);
    const relationships = generateRelationships(organizations, people, memberships);

    // Write JSON files
    console.log(`\n💾 Writing JSON files...`);
    writeJSON(path.join(dataDir, 'associations.json'), associations);
    writeJSON(path.join(dataDir, 'organizations.json'), organizations);
    writeJSON(path.join(dataDir, 'people.json'), people);
    writeJSON(path.join(dataDir, 'memberships.json'), memberships);
    writeJSON(path.join(dataDir, 'events.json'), events);
    writeJSON(path.join(dataDir, 'sessions.json'), sessions);
    writeJSON(path.join(dataDir, 'resources.json'), resources);
    writeJSON(path.join(dataDir, 'relationships.json'), relationships);

    // Generate SVG avatars
    console.log(`\n🎨 Generating ${people.length} avatars...`);
    for (const person of people) {
        const svg = generateAvatar(person);
        writeSVG(path.join(avatarsDir, `${person.id}.svg`), svg);
    }
    console.log(`  ✓ Generated ${people.length} avatars`);

    // Generate SVG logos
    console.log(`\n🏢 Generating ${organizations.length + associations.length} logos...`);
    for (const org of organizations) {
        const svg = generateLogo(org);
        writeSVG(path.join(logosDir, `${org.id}.svg`), svg);
    }
    for (const assoc of associations) {
        const svg = generateLogo(assoc);
        writeSVG(path.join(logosDir, `${assoc.id}.svg`), svg);
    }
    console.log(`  ✓ Generated ${organizations.length + associations.length} logos`);

    // Summary
    console.log(`\n✅ Mock data generation complete!`);
    console.log(`\n📈 Final counts:`);
    console.log(`   Associations: ${associations.length}`);
    console.log(`   Organizations: ${organizations.length}`);
    console.log(`   People: ${people.length}`);
    console.log(`   Memberships: ${memberships.length}`);
    console.log(`   Events: ${events.length}`);
    console.log(`   Sessions: ${sessions.length}`);
    console.log(`   Resources: ${resources.length}`);
    console.log(`   Relationships: ${relationships.length}`);
    console.log(`   Avatars: ${people.length}`);
    console.log(`   Logos: ${organizations.length + associations.length}`);
    console.log(`\n🎯 Seed used: ${SEED}`);
}

main().catch(console.error);
