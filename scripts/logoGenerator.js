/**
 * Deterministic SVG Logo Generator
 * Generates consistent organization logos based on org ID and name
 */

/**
 * Simple seeded random number generator
 * @param {string} seed - Seed string
 * @returns {function} Random function that returns 0-1
 */
function seededRandom(seed) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    // Ensure hash is positive
    hash = Math.abs(hash);

    return function () {
        hash = (hash * 9301 + 49297) % 233280;
        return Math.abs(hash) / 233280;
    };
}

/**
 * Generate organization color palette based on type
 * @param {string} seed - Seed for color generation
 * @param {string} type - Organization type
 * @returns {object} Color palette
 */
function generateOrgColors(seed, type = 'School') {
    const rng = seededRandom(seed);

    // Color palettes by organization type
    const typePalettes = {
        School: [
            { primary: '#1e40af', secondary: '#3b82f6' },
            { primary: '#7c2d12', secondary: '#ea580c' },
            { primary: '#065f46', secondary: '#10b981' },
        ],
        Association: [
            { primary: '#6b21a8', secondary: '#a855f7' },
            { primary: '#be123c', secondary: '#f43f5e' },
            { primary: '#0e7490', secondary: '#06b6d4' },
        ],
        Institute: [
            { primary: '#1e3a8a', secondary: '#60a5fa' },
            { primary: '#881337', secondary: '#fb7185' },
            { primary: '#14532d', secondary: '#4ade80' },
        ],
        Network: [
            { primary: '#581c87', secondary: '#c084fc' },
            { primary: '#9f1239', secondary: '#fda4af' },
            { primary: '#134e4a', secondary: '#5eead4' },
        ],
        Consortium: [
            { primary: '#1e293b', secondary: '#64748b' },
            { primary: '#713f12', secondary: '#fbbf24' },
            { primary: '#312e81', secondary: '#818cf8' },
        ],
        Academy: [
            { primary: '#155e75', secondary: '#22d3ee' },
            { primary: '#4c1d95', secondary: '#a78bfa' },
            { primary: '#166534', secondary: '#86efac' },
        ],
        Foundation: [
            { primary: '#0f766e', secondary: '#2dd4bf' },
            { primary: '#7e22ce', secondary: '#d8b4fe' },
            { primary: '#b91c1c', secondary: '#fca5a5' },
        ],
        Lab: [
            { primary: '#0369a1', secondary: '#38bdf8' },
            { primary: '#c026d3', secondary: '#f0abfc' },
            { primary: '#15803d', secondary: '#4ade80' },
        ],
        Center: [
            { primary: '#1d4ed8', secondary: '#93c5fd' },
            { primary: '#a21caf', secondary: '#e879f9' },
            { primary: '#047857', secondary: '#6ee7b7' },
        ],
        Council: [
            { primary: '#0c4a6e', secondary: '#7dd3fc' },
            { primary: '#86198f', secondary: '#f5d0fe' },
            { primary: '#064e3b', secondary: '#a7f3d0' },
        ],
    };

    // Fallback to Association palette if type is not found
    const palettes = typePalettes[type] || typePalettes.Association;
    const index = Math.floor(rng() * palettes.length);
    return palettes[index];
}

/**
 * Get initials from organization name
 * @param {string} name - Organization name
 * @returns {string} Initials (2-3 letters)
 */
function getOrgInitials(name) {
    const words = name.split(' ').filter(w => w.length > 0);
    if (words.length >= 2) {
        return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

/**
 * Generate logo shapes based on seed
 * @param {string} seed - Seed for shape generation
 * @param {object} colors - Color palette
 * @param {number} size - Logo size
 * @returns {string} SVG shapes
 */
function generateLogoShapes(seed, colors, size) {
    const rng = seededRandom(seed + '_shape');
    const shapeType = Math.floor(rng() * 3);

    const center = size / 2;
    const radius = size * 0.35;

    switch (shapeType) {
        case 0: // Concentric circles
            return `
        <circle cx="${center}" cy="${center}" r="${radius}" fill="${colors.primary}"/>
        <circle cx="${center}" cy="${center}" r="${radius * 0.6}" fill="${colors.secondary}"/>
      `;

        case 1: // Geometric shape
            const points = `${center},${size * 0.15} ${size * 0.85},${center} ${center},${size * 0.85} ${size * 0.15},${center}`;
            return `
        <polygon points="${points}" fill="${colors.primary}"/>
        <circle cx="${center}" cy="${center}" r="${radius * 0.4}" fill="${colors.secondary}"/>
      `;

        case 2: // Rounded square
            const rectSize = radius * 1.6;
            const rectX = center - rectSize / 2;
            const rectY = center - rectSize / 2;
            return `
        <rect x="${rectX}" y="${rectY}" width="${rectSize}" height="${rectSize}" rx="20" fill="${colors.primary}"/>
        <rect x="${rectX + rectSize * 0.2}" y="${rectY + rectSize * 0.2}" width="${rectSize * 0.6}" height="${rectSize * 0.6}" rx="10" fill="${colors.secondary}"/>
      `;

        default:
            return `<circle cx="${center}" cy="${center}" r="${radius}" fill="${colors.primary}"/>`;
    }
}

/**
 * Generate a deterministic SVG logo
 * @param {object} org - Organization object with id, name, type
 * @returns {string} SVG as string
 */
export function generateLogo(org) {
    const { id, name, type } = org;

    // Validate inputs
    if (!id || !name) {
        console.error('Invalid org object:', org);
        throw new Error('Organization must have id and name');
    }

    const initials = getOrgInitials(name);
    const orgType = type || 'Association'; // Default to Association if no type specified
    let colors = generateOrgColors(id, orgType);

    // Safety check
    if (!colors || !colors.primary) {
        console.error(`Failed to generate colors for org: ${id}, type: ${orgType}`);
        // Fallback colors
        colors = { primary: '#1e40af', secondary: '#3b82f6' };
    }

    const rng = seededRandom(id);

    const size = 200;
    const useShapes = rng() > 0.5; // 50% chance for shapes vs initials

    if (useShapes) {
        // Logo with geometric shapes
        const shapes = generateLogoShapes(id, colors, size);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="white"/>
  ${shapes}
</svg>`;
    } else {
        // Logo with initials
        const fontSize = size * 0.5;
        const bgColor = colors.primary;
        const textColor = 'white';

        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${bgColor}"/>
  <text 
    x="50%" 
    y="50%" 
    dominant-baseline="central" 
    text-anchor="middle" 
    font-family="Arial, sans-serif" 
    font-size="${fontSize}" 
    font-weight="700" 
    fill="${textColor}"
  >${initials}</text>
</svg>`;
    }
}
