# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [0.2.5] - 2025-12-15
### Added
- **Directory View**: New list-based interface for browsing Organizations and Members in the Network page.
- **Organization Cards**: Dedicated card components for organization listings.
- **Member Search**: Enhanced search functionality in Network page to filter users by name, role, and tags.

## [0.2.4] - 2025-12-15
### Added
- **Dark Mode**: Complete support with a toggle switch in the header.
- **Theme Improvements**: Enhanced UI with glassmorphism, noise textures, and dynamic palette colors.

### Changed
- **UI Standardization**: Unified search bar styles across Network, Events, and Resources pages.
- **Events UI**: Modernized Event Cards and Details views to remove hardcoded styles and align with the design system.
- **Navigation**: Improved routing stability by replacing `NavLink` with `Link`.

## [0.2.0] - 2025-12-14
### Added
- Expanded mock dataset: 120+ members, 25 organizations, 20+ events.
- New `MemberCard` component for displaying user profiles in the directory.
- `OrgProfileModal` updated to support Member profiles with bios and avatars.
- Toggle between "Organizations" and "Members" view in the Network page.
- Visual thumbnails (avatars/logos) for all network entities.
- Comprehensive `DEVELOPMENT.md` with non-negotiable development rules.
- Auto-sync of `.version` file in deploy script.

### Changed
- `NetworkMap` visual improvements and MUI migration.
- `seed.js` populated with generated realistic data.
- UI theme updates with Material Expressive design principles.

## [0.1.0] - 2025-12-14
- **Material UI Migration**: Complete UI overhaul using Material UI components and a custom theme.
- **New Features**:
    - Global theming with `ThemeProvider` and `CssBaseline`.
    - Responsive `AppBar` with navigation and user role controls.
    - Grid-based layouts for Home, Events, Resources, and Network pages.
    - Interactive `TimelineView` for events with "For You" and "Master Schedule" toggle.
    - Improved `Network` visualization and profile drawers.

## [0.0.0] - 2025-12-14
- Initial prototype release.
- Added role-based UI, dual-timeline events, resource library, and network map.
