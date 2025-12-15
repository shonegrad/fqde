# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

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
