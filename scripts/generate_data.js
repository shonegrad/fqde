

const FIRST_NAMES = ['Sarah', 'Michael', 'David', 'Jessica', 'Emily', 'Robert', 'William', 'Jennifer', 'Emma', 'Christopher', 'Daniel', 'Elizabeth', 'Matthew', 'Olivia', 'George', 'Sophia', 'Alice', 'James', 'Charlotte', 'Arthur', 'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Mason', 'Levi', 'Sebastian', 'Jack', 'Alexander', 'Owen', 'Theodore', 'Aiden', 'Samuel', 'Joseph', 'John', 'David', 'Wyatt', 'Matthew', 'Luke', 'Asher', 'Carter', 'Julian', 'Grayson', 'Leo', 'Jayden', 'Gabriel', 'Isaac', 'Lincoln', 'Anthony', 'Hudson', 'Dylan', 'Ezra', 'Thomas', 'Charles', 'Christopher', 'Jaxon', 'Maverick', 'Josiah', 'Isaiah', 'Andrew', 'Elias', 'Joshua', 'Nathan', 'Caleb', 'Ryan', 'Adrian', 'Miles', 'Eli', 'Nolan', 'Christian', 'Aaron', 'Cameron', 'Ezekiel', 'Colton', 'Luca', 'Landon', 'Hunter', 'Jonathan', 'Santiago', 'Axel', 'Easton', 'Cooper', 'Jeremiah', 'Angel', 'Roman', 'Connor', 'Jameson', 'Robert', 'Greyson', 'Jordan', 'Ian', 'Carson', 'Jaxson', 'Leonardo'];
const LAST_NAMES = ['Chen', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes', 'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper', 'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson', 'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes', 'Price', 'Alvarez', 'Castillo'];
const ORG_PREFIXES = ['National', 'Regional', 'Global', 'Community', 'Future', 'Innovative', 'Digital', 'Inclusive', 'Advanced', 'Strategic'];
const ORG_TYPES = ['Institute', 'Association', 'Foundation', 'Schools', 'Academy', 'Lab', 'Center', 'Consortium', 'Network', 'Council'];
const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte', 'Indianapolis', 'Seattle', 'Denver', 'Washington'];

const ROLES = {
    DIRECTOR: 'Director',
    ADMIN: 'Admin Team',
    ORGANIZER: 'Event Organizer',
    REP: 'Association Rep',
    TEACHER: 'Teacher Leader',
    PRINCIPAL: 'Principal',
    RESEARCHER: 'Researcher',
    COORDINATOR: 'Coordinator'
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomSubset = (arr, max = 3) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * max) + 1);
};

const generateId = (prefix, index) => `${prefix}${index + 1}`;

// Generate Orgs
const ORGS = [];
for (let i = 0; i < 25; i++) {
    const name = `${getRandom(ORG_PREFIXES)} ${getRandom(ORG_TYPES)}`;
    ORGS.push({
        id: generateId('org', i),
        name: name,
        type: ['Institution', 'Association', 'Partner', 'Think Tank'][Math.floor(Math.random() * 4)],
        region: getRandom(['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West', 'National', 'International']),
        tags: getRandomSubset(['Leadership', 'Policy', 'Technology', 'Inclusion', 'Assessment', 'Finance', 'Community', 'Innovation']),
        logo: `https://placehold.co/100x100/2563eb/ffffff?text=${name.match(/\b(\w)/g).join('')}`,
        description: `A leading ${getRandom(ORG_TYPES).toLowerCase()} focused on ${getRandom(['educational excellence', 'student success', 'innovative policy', 'community engagement'])}.`
    });
}

// Generate Users
const USERS = [];
for (let i = 0; i < 120; i++) {
    const firstName = getRandom(FIRST_NAMES);
    const lastName = getRandom(LAST_NAMES);
    const role = getRandom(Object.values(ROLES));
    const org = getRandom(ORGS);
    USERS.push({
        id: generateId('u', i),
        name: `${firstName} ${lastName}`,
        role: role,
        avatar: `https://i.pravatar.cc/150?u=${generateId('u', i)}`,
        bio: `${firstName} is a dedicated ${role} at ${org.name} with a passion for transforming education through better systems.`,
        institutionId: org.id
    });
}

// Generate Events
const EVENT_TYPES = ['Conference', 'Workshop', 'Webinar', 'Retreat', 'Symposium', 'Panel'];
const EVENTS = [];
for (let i = 0; i < 20; i++) {
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const year = new Date().getFullYear() + 1 + (Math.random() > 0.5 ? 1 : 0);
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    EVENTS.push({
        id: generateId('evt', i),
        title: `${getRandom(['Annual', 'Spring', 'Fall', 'Winter', 'Regional', 'Global'])} ${getRandom(['Leadership', 'EdTech', 'Policy', 'Curriculum', 'Inclusion'])} ${getRandom(EVENT_TYPES)}`,
        dateRange: `${new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        location: getRandom(CITIES),
        type: getRandom(EVENT_TYPES),
        description: `Join us for an immersive experience focusing on the latest trends in education.`,
        sessions: [ // Add a dummy session
            { id: `s${i}_1`, eventId: `evt${i}`, title: 'Opening Keynote', start: `${dateStr}T09:00`, end: `${dateStr}T10:30`, track: 'Main Stage' }
        ]
    });
}

// Generate Output String
const fileContent = `
export const ROLES = ${JSON.stringify(ROLES, null, 2)};

export const USERS = ${JSON.stringify(USERS, null, 2)};

export const ORGANIZATIONS = ${JSON.stringify(ORGS, null, 2)};

export const EVENTS = ${JSON.stringify(EVENTS, null, 2)};

export const RESOURCES = [
  { id: 'r1', title: '2025 Strategic Planning Guide', type: 'PDF', access: 'Public', owner: 'org1', tags: ['Leadership', 'Planning'] },
  { id: 'r2', title: 'Inclusive Hiring Framework', type: 'Doc', access: 'Network', owner: 'org4', tags: ['Inclusion', 'HR'] },
  { id: 'r3', title: 'Budget Template v4', type: 'Sheet', access: 'Institution-Only', owner: 'org1', tags: ['Operations', 'Finance'] },
  { id: 'r4', title: 'AI Policy Draft', type: 'PDF', access: 'Public', owner: 'org3', tags: ['Technology', 'Policy'] },
  { id: 'r5', title: 'Community Engagement Toolkit', type: 'Link', access: 'Network', owner: 'org2', tags: ['Community'] },
  { id: 'r6', title: 'Remote Learning Best Practices', type: 'PDF', access: 'Public', owner: 'org5', tags: ['Remote', 'Teaching'] },
  { id: 'r7', title: 'Mental Health in Schools', type: 'Video', access: 'Network', owner: 'org2', tags: ['Health', 'Wellness'] },
];

export const FEED_ITEMS = [
    { id: 'f1', type: 'announcement', title: 'Welcome to the new Network Portal', date: '2 hours ago', author: 'System' },
    { id: 'f2', type: 'resource', title: 'New Resource Added: AI Policy Draft', date: '5 hours ago', resourceId: 'r4' },
    { id: 'f3', type: 'event', title: 'Registration open for Spring Retreat', date: '1 day ago', eventId: 'evt2' },
    { id: 'f4', type: 'member', title: 'Dr. Sarah Chen updated her profile', date: '2 days ago', memberId: 'u1' },
    { id: 'f5', type: 'organization', title: 'National Educators Assoc. posted a new report', date: '3 days ago', orgId: 'org2' }
];

// Graph Nodes/Links
export const GRAPH_DATA = {
    nodes: [
        ...ORGANIZATIONS.map(o => ({ id: o.id, name: o.name, group: 'org', val: 10 + (Math.random() * 10) })),
        ...USERS.map(u => ({ id: u.id, name: u.name, group: 'person', val: 5 }))
    ],
    links: [
        // User to their Org
        ...USERS.map(u => ({ source: u.id, target: u.institutionId })),
        // Random inter-org connections (partnerships)
        ...ORGANIZATIONS.map(o => {
            const potentialPartner = ORGANIZATIONS[Math.floor(Math.random() * ORGANIZATIONS.length)];
            if (potentialPartner.id !== o.id && Math.random() > 0.7) {
                return { source: o.id, target: potentialPartner.id };
            }
            return null;
        }).filter(l => l !== null),
        // Random cross-disciplinary connections (users connected to other orgs or events - simplified here)
    ]
};
`;

console.log(fileContent);
