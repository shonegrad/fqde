# Visual Rules & Design System

## Core Philosophy: "Sharper Expressive"
This design system merges the depth and hierarchy of Material Design 3 with a sharper, more professional aesthetic. It emphasizes subtle texture and purposeful containment.

## 1. Shape & Corner Radius
- **Base Radius**: `12px` (reduced from standard Material 16px/24px).
- **Buttons**: `8px` (sharp but friendly).
- **Cards/Surfaces**: `12px`.
- **Dialogs/Modals**: `16px` (slightly rounder to distinct them as overlays).
- **Chips**: `6px`.
- **Inputs**: `8px`.

**Rationale**: Smaller radii create a more mature, data-density-friendly look suitable for professional tools while retaining friendliness.

## 2. Surface & Texture
- **Noise Texture**: A subtle monochromatic noise filter is applied to the main background and key surfaces.
    - Opacity: ~10-15%.
    - Blend Mode: Overlay or Soft Light.
- **Elevation**:
    - Uses a combination of shadow and subtle border/highlight (1px `rgba(255,255,255,0.1)` inset) to define depth without heavy shadows.
    - **Glassmorphism**: Used sparingly on sticky headers or floating overlays (`backdrop-filter: blur(12px)`).

## 3. Color & Contrast
- **Palette**: Preserving the existing Blue/Slate theme.
- **Text**:
    - Primary: Slate 900 `#0f172a`.
    - Secondary: Slate 700 `#334155`.
- **Borders**: subtle `rgba(15, 23, 42, 0.08)` for definition.

## 4. Typography
- **Headings**: `Source Serif 4` - conveying authority and classic elegance.
- **Body/UI**: `Source Sans 3` - highly legible, neutral geometric.

## 5. Spacing
- Base unit: `4px`.
- Common padding: `16px` (4), `24px` (6).
- Section spacing: `48px` or `64px`.

## Maintenance
- ALL visual changes must check against these rules.
- Do NOT introduce new border radii outside the 4px grid system (e.g., don't use 13px).
