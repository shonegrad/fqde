# Connecting Educators Prototype

A working interactive front-end prototype for an education-leadership network.

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

## Demo Guide

Use this guide to walk through the key features.

### 1. Role-Based Experience
**Goal:** Show how the interface adapts to different users.
- **Action:** Click the dropdown in the top right (e.g., "Dr. Sarah Chen (Director)").
- **Observe:**
    - Switch to **Admin Team**: "Upload Resource" appears in Quick Actions.
    - Switch to **Event Organizer**: "Create Event" appears.
    - Switch to **Association Rep**: "Post Announcement" appears.

### 2. Events & Dual Timeline
**Goal:** Demonstrate the "For You" vs "Master Schedule" clarity.
- **Navigate:** Go to **Events** and click "View Details" on _EdConnect 2025 Flagship_.
- **Action:** Scroll to the Schedule. Toggle between **Master Schedule** and **For You**.
- **Action:** In Master Schedule, click the "+" on a session.
- **Observe:** Switch to "For You" – the session is now listed.
- **Action:** Add a conflicting session.
- **Observe:** A warning "Time conflict with another session" appears.

### 3. Resource Sharing
**Goal:** Show easy resource management and simulated upload.
- **Navigate:** Go to **Resources**.
- **Action:** Use the filters (Public, Network, Institution-Only).
- **Action:** Switch role to **Admin**. Click **Upload Resource**.
- **Action:** Fill out the form (faked file) and Submit.
- **Observe:** The new resource appears immediately in the grid.

### 4. Interactive Network Map
**Goal:** Visualize the ecosystem.
- **Navigate:** Go to **Network**.
- **Action:** View the force-directed graph.
- **Action:** Click a node (Person or Org) to center it.
- **Action:** Click an Org node to open the **Profile Sidebar**.
- **Action:** Toggle to **List View** to see the directory grid.

## Tech Stack
- React (Vite)
- Vanilla CSS (Publication Aesthetic)
- Recharts / Force Graph
- Lucide React Icons
- LocalStorage Persistence

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

