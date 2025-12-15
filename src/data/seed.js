export const ROLES = {
  DIRECTOR: 'Director',
  ADMIN: 'Admin Team',
  ORGANIZER: 'Event Organizer',
  REP: 'Association Rep'
};

export const USERS = [
  { id: 'u1', name: 'Dr. Sarah Chen', role: ROLES.DIRECTOR, avatar: 'SC', institutionId: 'org1' },
  { id: 'u2', name: 'Admin Team', role: ROLES.ADMIN, avatar: 'AT', institutionId: 'org1' },
  { id: 'u3', name: 'Marcus Rivera', role: ROLES.ORGANIZER, avatar: 'MR', institutionId: 'org1' },
  { id: 'u4', name: 'Elena Popova', role: ROLES.REP, avatar: 'EP', institutionId: 'org2' }
];

export const ORGANIZATIONS = [
  { id: 'org1', name: 'Riverdale Leadership Institute', type: 'Institution', region: 'Northeast', tags: ['Leadership', 'Policy'] },
  { id: 'org2', name: 'National Educators Assoc.', type: 'Association', region: 'National', tags: ['Professional Development'] },
  { id: 'org3', name: 'Tech for Schools', type: 'Partner', region: 'West', tags: ['Technology', 'Innovation'] },
  { id: 'org4', name: 'Inclusive Learning Lab', type: 'Institution', region: 'South', tags: ['Inclusion', 'Special Ed'] },
  { id: 'org5', name: 'Future Policy Group', type: 'Think Tank', region: 'DC', tags: ['Policy', 'Assessment'] }
];

export const EVENTS = [
  {
    id: 'evt1',
    title: 'EdConnect 2025 Flagship',
    dateRange: 'Oct 12-14, 2025',
    location: 'Chicago, IL',
    type: 'Conference',
    description: 'The premier gathering for educational leaders.',
    sessions: [
      { id: 's1', eventId: 'evt1', title: 'Keynote: The Future of Learning', start: '2025-10-12T09:00', end: '2025-10-12T10:30', track: 'Main Stage' },
      { id: 's2', eventId: 'evt1', title: 'AI in the Classroom', start: '2025-10-12T11:00', end: '2025-10-12T12:00', track: 'Tech' },
      { id: 's3', eventId: 'evt1', title: 'Inclusive Leadership', start: '2025-10-12T11:00', end: '2025-10-12T12:00', track: 'Leadership' },
      { id: 's4', eventId: 'evt1', title: 'Policy Roundtable', start: '2025-10-12T13:00', end: '2025-10-12T14:30', track: 'Policy' },
      { id: 's5', eventId: 'evt1', title: 'Budgeting for Impact', start: '2025-10-12T13:00', end: '2025-10-12T14:30', track: 'Operations' },
    ]
  },
  {
    id: 'evt2',
    title: 'Spring Leadership Retreat',
    dateRange: 'April 5, 2025',
    location: 'Denver, CO',
    type: 'Workshop',
    description: 'Intensive workshop for new principals.',
    sessions: [
        { id: 's6', eventId: 'evt2', title: 'Full Day Workshop', start: '2025-04-05T09:00', end: '2025-04-05T16:00', track: 'General' }
    ]
  },
  {
    id: 'evt3',
    title: 'Virtual Policy Update',
    dateRange: 'June 10, 2025',
    location: 'Online',
    type: 'Webinar',
    description: 'Updates on federal education policy changes.',
    sessions: [
        { id: 's7', eventId: 'evt3', title: 'Live Webinar', start: '2025-06-10T14:00', end: '2025-06-10T15:30', track: 'Online' }
    ]
  }
];

export const RESOURCES = [
  { id: 'r1', title: '2025 Strategic Planning Guide', type: 'PDF', access: 'Public', owner: 'org1', tags: ['Leadership', 'Planning'] },
  { id: 'r2', title: 'Inclusive Hiring Framework', type: 'Doc', access: 'Network', owner: 'org4', tags: ['Inclusion', 'HR'] },
  { id: 'r3', title: 'Budget Template v4', type: 'Sheet', access: 'Institution-Only', owner: 'org1', tags: ['Operations', 'Finance'] },
  { id: 'r4', title: 'AI Policy Draft', type: 'PDF', access: 'Public', owner: 'org3', tags: ['Technology', 'Policy'] },
  { id: 'r5', title: 'Community Engagement Toolkit', type: 'Link', access: 'Network', owner: 'org2', tags: ['Community'] },
];

export const FEED_ITEMS = [
    { id: 'f1', type: 'announcement', title: 'Welcome to the new Network Portal', date: '2 hours ago', author: 'System' },
    { id: 'f2', type: 'resource', title: 'New Resource Added: AI Policy Draft', date: '5 hours ago', resourceId: 'r4' },
    { id: 'f3', type: 'event', title: 'Registration open for Spring Retreat', date: '1 day ago', eventId: 'evt2' }
];

// Graph Nodes/Links
export const GRAPH_DATA = {
    nodes: [
        ...ORGANIZATIONS.map(o => ({ id: o.id, name: o.name, group: 'org', val: 10 })),
        ...USERS.map(u => ({ id: u.id, name: u.name, group: 'person', val: 5 }))
    ],
    links: [
        { source: 'u1', target: 'org1' },
        { source: 'u2', target: 'org1' },
        { source: 'u3', target: 'org1' },
        { source: 'u4', target: 'org2' },
        { source: 'org1', target: 'org2' }, // Partnership
        { source: 'org1', target: 'org3' },
        { source: 'org4', target: 'org2' },
        { source: 'org5', target: 'org1' }
    ]
};
