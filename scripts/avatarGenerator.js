/**
 * Deterministic SVG Avatar Generator
 * Generates consistent avatars based on person ID and name
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

    return function () {
        hash = (hash * 9301 + 49297) % 233280;
        return hash / 233280;
    };
}

/**
 * Generate a color palette based on seed
 * @param {string} seed - Seed for color generation
 * @returns {object} Color palette with background and text colors
 */
function generateColorPalette(seed) {
    const rng = seededRandom(seed);

    const palettes = [
        { bg: '#2563eb', text: '#ffffff' }, // Blue
        { bg: '#7c3aed', text: '#ffffff' }, // Purple
        { bg: '#dc2626', text: '#ffffff' }, // Red
        { bg: '#059669', text: '#ffffff' }, // Green
        { bg: '#d97706', text: '#ffffff' }, // Orange
        { bg: '#0891b2', text: '#ffffff' }, // Cyan
        { bg: '#db2777', text: '#ffffff' }, // Pink
        { bg: '#4f46e5', text: '#ffffff' }, // Indigo
        { bg: '#0d9488', text: '#ffffff' }, // Teal
        { bg: '#ea580c', text: '#ffffff' }, // Dark Orange
        { bg: '#be123c', text: '#ffffff' }, // Rose
        { bg: '#1d4ed8', text: '#ffffff' }, // Dark Blue
    ];

    const index = Math.floor(rng() * palettes.length);
    return palettes[index];
}

/**
 * Get initials from name
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} Initials (e.g., "JD")
 */
function getInitials(firstName, lastName) {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
}

/**
 * Generate a deterministic SVG avatar
 * @param {object} person - Person object with id, firstName, lastName
 * @returns {string} SVG as string
 */
export function generateAvatar(person) {
    const { id, firstName, lastName } = person;
    const initials = getInitials(firstName, lastName);
    const colors = generateColorPalette(id);

    const size = 200;
    const radius = size / 2;
    const fontSize = size * 0.4;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <circle cx="${radius}" cy="${radius}" r="${radius}" fill="${colors.bg}"/>
  <text 
    x="50%" 
    y="50%" 
    dominant-baseline="central" 
    text-anchor="middle" 
    font-family="Arial, sans-serif" 
    font-size="${fontSize}" 
    font-weight="600" 
    fill="${colors.text}"
  >${initials}</text>
</svg>`;
}
