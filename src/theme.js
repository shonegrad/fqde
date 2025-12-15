import { createTheme } from '@mui/material/styles';

// Noise texture data URI - subtle monochromatic noise
const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`;

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1d4ed8', // Blue 700 - deeper, richer blue
            light: '#3b82f6', // Blue 500
            dark: '#1e40af', // Blue 800
            contrastText: '#f8fafc',
        },
        secondary: {
            main: '#6366f1', // Indigo 500
            light: '#818cf8', // Indigo 400
            dark: '#4f46e5', // Indigo 600
            contrastText: '#f8fafc',
        },
        background: {
            default: '#e2e8f0', // Slate 200 - deeper, warmer base
            paper: '#f1f5f9', // Slate 100 - slightly darker than before
        },
        text: {
            primary: '#0f172a', // Slate 900 - deep navy, not pure black
            secondary: '#334155', // Slate 700 - stronger secondary
        },
        divider: 'rgba(15, 23, 42, 0.08)', // Very subtle divider using text color
        error: {
            main: '#dc2626', // Red 600
            light: '#f87171',
            dark: '#b91c1c',
        },
        warning: {
            main: '#d97706', // Amber 600
            light: '#fbbf24',
            dark: '#b45309',
        },
        info: {
            main: '#0284c7', // Sky 600
            light: '#38bdf8',
            dark: '#0369a1',
        },
        success: {
            main: '#16a34a', // Green 600
            light: '#4ade80',
            dark: '#15803d',
        },
        action: {
            hover: 'rgba(29, 78, 216, 0.08)', // Primary with low opacity
            selected: 'rgba(29, 78, 216, 0.12)',
            disabled: 'rgba(15, 23, 42, 0.26)',
            disabledBackground: 'rgba(15, 23, 42, 0.12)',
        },
    },
    typography: {
        fontFamily: '"Source Sans 3", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h1: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 800,
            color: '#0f172a',
            fontSize: '3.5rem',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 700,
            color: '#0f172a',
            fontSize: '2.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 700,
            color: '#0f172a',
            fontSize: '2rem',
            lineHeight: 1.2,
        },
        h4: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 600,
            color: '#0f172a',
            fontSize: '1.5rem',
        },
        h5: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 600,
            color: '#0f172a',
            fontSize: '1.25rem',
        },
        h6: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 600,
            color: '#0f172a',
            fontSize: '1.125rem',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 12, // Reduced from 16 for a sharper, more professional look
    },
    shadows: [
        'none',
        '0 1px 2px 0 rgba(15, 23, 42, 0.05)', // elevation 1 - finer
        '0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px -1px rgba(15, 23, 42, 0.1)', // elevation 2
        '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)', // elevation 3
        '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)', // elevation 4
        '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)', // elevation 5
        '0 25px 50px -12px rgba(15, 23, 42, 0.25)', // elevation 6
        '0 35px 60px -15px rgba(15, 23, 42, 0.3)', // elevation 7
        '0 40px 70px -20px rgba(15, 23, 42, 0.35)', // elevation 8
        '0 45px 80px -25px rgba(15, 23, 42, 0.4)', // elevation 9
        '0 50px 90px -30px rgba(15, 23, 42, 0.45)', // elevation 10
        '0 55px 100px -35px rgba(15, 23, 42, 0.5)', // elevation 11
        '0 60px 110px -40px rgba(15, 23, 42, 0.55)', // elevation 12
        '0 65px 120px -45px rgba(15, 23, 42, 0.6)', // elevation 13
        '0 70px 130px -50px rgba(15, 23, 42, 0.65)', // elevation 14
        '0 75px 140px -55px rgba(15, 23, 42, 0.7)', // elevation 15
        '0 80px 150px -60px rgba(15, 23, 42, 0.75)', // elevation 16
        '0 85px 160px -65px rgba(15, 23, 42, 0.8)', // elevation 17
        '0 90px 170px -70px rgba(15, 23, 42, 0.85)', // elevation 18
        '0 95px 180px -75px rgba(15, 23, 42, 0.9)', // elevation 19
        '0 100px 190px -80px rgba(15, 23, 42, 0.95)', // elevation 20
        '0 105px 200px -85px rgba(15, 23, 42, 1)', // elevation 21
        '0 110px 210px -90px rgba(15, 23, 42, 1)', // elevation 22
        '0 115px 220px -95px rgba(15, 23, 42, 1)', // elevation 23
        '0 120px 230px -100px rgba(15, 23, 42, 1)', // elevation 24
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#e2e8f0',
                    scrollbarColor: '#94a3b8 #e2e8f0',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: -1,
                        backgroundImage: noiseTexture,
                        opacity: 0.6,
                    },
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 8,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#94a3b8',
                    },
                    '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                        backgroundColor: '#e2e8f0',
                    },
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 8, // Sharper button radius
                    padding: '8px 20px',
                    textTransform: 'none',
                    fontWeight: 600,
                },
                contained: {
                    boxShadow: '0 1px 2px 0 rgba(29, 78, 216, 0.3)',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(29, 78, 216, 0.4), 0 2px 4px -1px rgba(29, 78, 216, 0.2)',
                        transform: 'translateY(-1px)',
                    },
                },
                outlined: {
                    borderWidth: 1.5,
                    '&:hover': {
                        borderWidth: 1.5,
                        backgroundColor: 'rgba(29, 78, 216, 0.04)',
                    },
                },
                text: {
                    '&:hover': {
                        backgroundColor: 'rgba(29, 78, 216, 0.06)',
                    },
                },
            },
        },
        MuiCard: {
            defaultProps: {
                elevation: 1,
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(241, 245, 249, 0.7)', // Semi-transparent for noise visibility
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: 12, // Consistent sharp radius
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.25s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
                        backgroundColor: 'rgba(241, 245, 249, 0.85)', // Slightly more opaque on hover
                    },
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                outlined: {
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                },
                elevation1: {
                    boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px 0 rgba(15, 23, 42, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                },
            },
        },
        MuiAppBar: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(241, 245, 249, 0.9)',
                    backdropFilter: 'blur(16px)',
                    color: '#0f172a',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6, // Very sharp chips
                    fontWeight: 500,
                    border: 'none',
                },
                outlined: {
                    border: '1px solid rgba(15, 23, 42, 0.1)',
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'rgba(29, 78, 216, 0.05)',
                    },
                },
                filled: {
                    backgroundColor: 'rgba(15, 23, 42, 0.06)',
                },
                colorPrimary: {
                    backgroundColor: '#1d4ed8',
                    color: '#f8fafc',
                },
                colorSecondary: {
                    backgroundColor: '#6366f1',
                    color: '#f8fafc',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        backgroundColor: '#f8fafc',
                        '& fieldset': {
                            borderColor: 'rgba(15, 23, 42, 0.15)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(15, 23, 42, 0.25)',
                        },
                        '&.Mui-focused fieldset': {
                            borderWidth: 2,
                            borderColor: '#1d4ed8',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#bfdbfe', // Blue 200
                    color: '#1e40af', // Blue 800
                    fontWeight: 600,
                    boxShadow: '0 1px 2px 0 rgba(15, 23, 42, 0.1)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f1f5f9',
                    borderRight: '1px solid rgba(15, 23, 42, 0.06)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f1f5f9',
                    borderRadius: 16, // Dialogs slightly softer than cards
                    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    borderRadius: 12,
                    backgroundColor: '#f8fafc',
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(15, 23, 42, 0.08)',
                    borderRadius: 8,
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(29, 78, 216, 0.1)',
                        color: '#1d4ed8',
                        border: '1px solid rgba(29, 78, 216, 0.2)',
                        '&:hover': {
                            backgroundColor: 'rgba(29, 78, 216, 0.15)',
                        },
                    },
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    gap: 4,
                },
                grouped: {
                    margin: 0,
                    border: '1px solid rgba(15, 23, 42, 0.08) !important',
                    borderRadius: '8px !important',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '&:hover': {
                        backgroundColor: 'rgba(29, 78, 216, 0.06)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(29, 78, 216, 0.1)',
                        '&:hover': {
                            backgroundColor: 'rgba(29, 78, 216, 0.14)',
                        },
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: 'rgba(15, 23, 42, 0.08)',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#64748b', // Slate 500
                    '&.Mui-focused': {
                        color: '#1d4ed8',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#1e293b',
                    borderRadius: 6,
                    padding: '8px 12px',
                    fontSize: '0.875rem',
                },
                arrow: {
                    color: '#1e293b',
                },
            },
        },
    },
});

export default theme;
