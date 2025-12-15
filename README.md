# Connecting Educators Prototype

A working interactive front-end prototype for a Quebec education network, featuring 1200+ educators, 250+ organizations, and comprehensive event/resource management.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the Local URL shown in the terminal (usually http://localhost:5173 or http://localhost:5174)

## Data Generation

The prototype uses large-scale realistic Quebec-based mock data. All data is pre-generated and committed to the repository.

### Regenerating Data

If you need to regenerate the mock data (e.g., with a different seed or scale):

```bash
node scripts/generateMockData.js --seed 12345
```

This will generate:
- **28 Associations** - Quebec educational associations
- **254 Organizations** - Educational institutions (schools, institutes, networks)
- **1222 People** - Educators and administrators with Quebec-realistic names
- **5469 Memberships** - Person ↔ Organization/Association relationships
- **159 Events** - Educational conferences, workshops, seminars
- **3982 Sessions** - Event sessions with schedules and speakers
- **838 Resources** - Mock educational resources
- **8052 Relationships** - Org ↔ Org and Person ↔ Person collaboration edges
- **1504 SVG Assets** - Deterministic avatars (1222) and logos (282)

**Note:** Generation takes ~20-30 seconds. Generated files total ~5.5MB JSON + 1504 SVG files.

### Quebec-Realistic Data

All generated data features:
- French/English bilingual names (70% French)
- Quebec cities (Montréal, Québec, Laval, Gatineau, etc.)
- Canadian postal codes (H2X 1Y7 format)
- Canadian phone numbers (514, 418, 450, 819 area codes)
- Realistic organizational structure and relationships

## Demo Guide

Use this guide to showcase the platform's key features.

### 1. Directory Search & Filtering
**Goal:** Find people and organizations quickly.
- **Navigate:** Go to **Network** (or Directory if implemented).
- **Action:** Toggle to **List View** to see the directory.
- **Action:** Search for "Marie" to see Quebec-realistic French names.
- **Observe:** Results update in real-time from 1222 people.
- **Action:** Apply filters (region, role, expertise tags).
- **Observe:** Directory narrows to matching results with virtual scrolling for performance.

### 2. Person & Organization Profiles
**Goal:** Show depth of network information.
- **Action:** Click on any person card in the directory.
- **Observe:** Person detail shows:
  - Contact information (email, phone, location)
  - Memberships across multiple organizations
  - Roles for each membership
  - Expertise tags
- **Action:** Navigate to an organization profile.
- **Observe:** Organization detail shows:
  - Association affiliations
  - Key contacts (directors, coordinators)
  - Hosted events
  - Published resources

### 3. Events & Timeline Visualization
**Goal:** Demonstrate multi-day event scheduling.
- **Navigate:** Go to **Events**.
- **Action:** Click on any multi-day event.
- **Observe:** Event detail page shows:
  - Event overview with dates and location
  - Timeline visualization with session blocks
  - Sessions organized by day (if multi-day)
  - Sessions displayed in timeline lanes to show overlaps
- **Action:** Click on a session block in the timeline.
- **Observe:** Session detail panel opens showing speakers, time, room, and track.

### 4. Resources Library
**Goal:** Show resource management and discovery.
- **Navigate:** Go to **Resources**.
- **Action:** Browse 838 mock resources across multiple organizations.
- **Action:** Filter by type (PDF, DOC, LINK, VIDEO, etc.).
- **Action:** Filter by visibility (Public, Network, Org-only).
- **Action:** Click on a resource.
- **Observe:** Preview modal shows resource details, author, owner org, and mock  "Open" action.

### 5. Interactive Network Map
**Goal:** Visualize the educational ecosystem.
- **Navigate:** Go to **Network**, ensure **Map View** is active.
- **Action:** Observe the force-directed graph with 254 organizations.
- **Action:** Zoom and pan to explore different areas.
- **Action:** Hover over a node to see connected relationships highlighted.
- **Action:** Click an organization node.
- **Observe:** Profile modal/panel opens with organization summary.
- **Note:** The graph uses clustering and performance optimizations to handle large datasets smoothly.

## Tech Stack
- React 19 + Vite
- Material UI (MUI)
- react-force-graph-2d (Network visualization)
- react-window (Virtual scrolling for large lists)
- date-fns (Date manipulation)
- LocalStorage (Activity persistence)

## Deployment

We use a unified deployment script to ensure consistency.

1. **Bump Version**: Update `version` in `package.json`.
2. **Update Changelog**: Add a line to `CHANGELOG.md`.
3. **Commit**: Be sure your git status is clean.
4. **Deploy**:
   ```bash
   npm run deploy
   ```
   This will:
   - Check for a dirty working tree (fails if dirty).
   - Build the project.
   - Tag the release (e.g., `v1.0.1`) and push to origin.

## Troubleshooting

### Localhost Port
If `http://localhost:5173` is already in use, Vite will automatically switch to the next available port (e.g., `5174`). Check your terminal output to confirm the correct URL.

### Data Loading Issues
If data fails to load in development:
- Ensure the dev server is running (`npm run dev`)
- Check browser console for fetch errors
- Verify JSON files exist in `public/data/`

### Large Dataset Performance
With 1200+ entities:
- Initial page load may take 1-2 seconds
- Virtual scrolling keeps lists performant
- Network graph uses progressive rendering
- All optimizations preserve smooth interactions
