/**
 * Deterministic SVG Avatar Generator
 * Generates consistent avatars based on person ID and name
 * Supports both initials-based avatars and stylized profile pictures
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
 * Get skin and hair color palette
 * @param {string} seed - Seed for color generation
 * @returns {object} Skin and hair colors
 */
function getSkinHairPalette(seed) {
    const rng = seededRandom(seed + '_skin');

    const skinTones = [
        '#fce7d6', // Light
        '#f5d6c6', // Fair
        '#deb887', // Medium
        '#c19a6b', // Olive
        '#a0785a', // Tan
        '#8b6914', // Brown
        '#6b4423', // Dark brown
        '#4a3728', // Deep brown
    ];

    const hairColors = [
        '#1a1a1a', // Black
        '#3d2314', // Dark brown
        '#5a3825', // Medium brown
        '#8b4513', // Chestnut
        '#b8860b', // Dark blonde
        '#daa520', // Blonde
        '#cd853f', // Light brown
        '#a52a2a', // Auburn
        '#c0c0c0', // Grey
        '#ffffff', // White
    ];

    const skinIndex = Math.floor(rng() * skinTones.length);
    const hairIndex = Math.floor(rng() * hairColors.length);

    return {
        skin: skinTones[skinIndex],
        hair: hairColors[hairIndex]
    };
}

/**
 * Generate a stylized profile picture SVG
 * @param {string} id - Person ID for deterministic generation
 * @param {object} colors - Background color palette
 * @returns {string} SVG as string
 */
function generateProfilePicture(id, colors) {
    const rng = seededRandom(id + '_profile');
    const size = 200;
    const center = size / 2;

    const skinHair = getSkinHairPalette(id);

    // Different hairstyles
    const hairStyle = Math.floor(rng() * 6);

    // Face shape variations
    const faceWidth = 55 + Math.floor(rng() * 15);
    const faceHeight = 65 + Math.floor(rng() * 15);

    let hairSvg = '';

    switch (hairStyle) {
        case 0: // Short hair (male style)
            hairSvg = `
                <ellipse cx="${center}" cy="65" rx="${faceWidth + 5}" ry="40" fill="${skinHair.hair}"/>
                <ellipse cx="${center}" cy="70" rx="${faceWidth}" ry="35" fill="${skinHair.skin}"/>
            `;
            break;
        case 1: // Medium length wavy
            hairSvg = `
                <ellipse cx="${center}" cy="60" rx="${faceWidth + 8}" ry="45" fill="${skinHair.hair}"/>
                <ellipse cx="${center - 30}" cy="85" rx="20" ry="35" fill="${skinHair.hair}"/>
                <ellipse cx="${center + 30}" cy="85" rx="20" ry="35" fill="${skinHair.hair}"/>
            `;
            break;
        case 2: // Long straight
            hairSvg = `
                <ellipse cx="${center}" cy="55" rx="${faceWidth + 10}" ry="40" fill="${skinHair.hair}"/>
                <rect x="${center - faceWidth - 8}" y="55" width="25" height="80" rx="10" fill="${skinHair.hair}"/>
                <rect x="${center + faceWidth - 17}" y="55" width="25" height="80" rx="10" fill="${skinHair.hair}"/>
            `;
            break;
        case 3: // Bun/updo
            hairSvg = `
                <ellipse cx="${center}" cy="65" rx="${faceWidth + 5}" ry="40" fill="${skinHair.hair}"/>
                <circle cx="${center}" cy="30" r="25" fill="${skinHair.hair}"/>
            `;
            break;
        case 4: // Curly/afro
            hairSvg = `
                <circle cx="${center}" cy="60" r="${faceWidth + 15}" fill="${skinHair.hair}"/>
            `;
            break;
        case 5: // Bald/very short
            hairSvg = `
                <ellipse cx="${center}" cy="68" rx="${faceWidth + 2}" ry="38" fill="${skinHair.hair}" opacity="0.3"/>
            `;
            break;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <!-- Background -->
  <circle cx="${center}" cy="${center}" r="${center}" fill="${colors.bg}"/>
  
  <!-- Hair (back layer) -->
  ${hairSvg}
  
  <!-- Face -->
  <ellipse cx="${center}" cy="95" rx="${faceWidth}" ry="${faceHeight}" fill="${skinHair.skin}"/>
  
  <!-- Neck -->
  <rect x="${center - 20}" y="140" width="40" height="30" fill="${skinHair.skin}"/>
  
  <!-- Shoulders -->
  <ellipse cx="${center}" cy="185" rx="55" ry="30" fill="${colors.bg}" opacity="0.9"/>
  
  <!-- Shirt collar -->
  <path d="M ${center - 40} 165 Q ${center} 175 ${center + 40} 165 L ${center + 55} 200 L ${center - 55} 200 Z" fill="#ffffff" opacity="0.9"/>
  
  <!-- Eyes -->
  <ellipse cx="${center - 18}" cy="90" rx="7" ry="5" fill="#ffffff"/>
  <ellipse cx="${center + 18}" cy="90" rx="7" ry="5" fill="#ffffff"/>
  <circle cx="${center - 17}" cy="90" r="4" fill="#3d2314"/>
  <circle cx="${center + 19}" cy="90" r="4" fill="#3d2314"/>
  <circle cx="${center - 16}" cy="89" r="1.5" fill="#ffffff"/>
  <circle cx="${center + 20}" cy="89" r="1.5" fill="#ffffff"/>
  
  <!-- Eyebrows -->
  <path d="M ${center - 28} 82 Q ${center - 18} 78 ${center - 8} 82" stroke="${skinHair.hair}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M ${center + 8} 82 Q ${center + 18} 78 ${center + 28} 82" stroke="${skinHair.hair}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  
  <!-- Nose -->
  <path d="M ${center} 90 Q ${center + 4} 100 ${center} 105 Q ${center - 4} 100 ${center} 90" fill="${skinHair.skin}" stroke="#00000020" stroke-width="0.5"/>
  
  <!-- Mouth -->
  <path d="M ${center - 12} 118 Q ${center} 125 ${center + 12} 118" stroke="#c08080" stroke-width="3" fill="none" stroke-linecap="round"/>
  
  <!-- Ears -->
  <ellipse cx="${center - faceWidth + 5}" cy="95" rx="8" ry="12" fill="${skinHair.skin}"/>
  <ellipse cx="${center + faceWidth - 5}" cy="95" rx="8" ry="12" fill="${skinHair.skin}"/>
</svg>`;
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
    const colors = generateColorPalette(id);
    const rng = seededRandom(id + '_type');

    // 40% chance to get a profile picture, 60% get initials
    const useProfilePic = rng() < 0.4;

    if (useProfilePic) {
        return generateProfilePicture(id, colors);
    }

    // Initials-based avatar
    const initials = getInitials(firstName, lastName);
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
