import { createTheme } from '@mui/material/styles';

// Noise texture data URI - subtle monochromatic noise
const noiseTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`;

const getTheme = (mode = 'dark') => {
    const isDark = mode === 'dark';

    // Palette definitions
    const palette = {
        mode,
        primary: {
            main: '#3b82f6', // Blue 500 - brighter blue for dark mode
            light: '#60a5fa', // Blue 400
            dark: '#2563eb', // Blue 600
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#818cf8', // Indigo 400
            light: '#a5b4fc', // Indigo 300
            dark: '#6366f1', // Indigo 500
            contrastText: '#ffffff',
        },
        background: {
            default: isDark ? '#0f172a' : '#e2e8f0', // Slate 900 vs Slate 200
            paper: isDark ? '#1e293b' : '#f1f5f9', // Slate 800 vs Slate 100
        },
        text: {
            primary: isDark ? '#f8fafc' : '#0f172a', // Slate 50 vs Slate 900
            secondary: isDark ? '#cbd5e1' : '#334155', // Slate 300 vs Slate 700
        },
        divider: isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(15, 23, 42, 0.08)',
        error: {
            main: '#ef4444', // Red 500
            light: '#f87171',
            dark: '#dc2626',
        },
        warning: {
            main: '#f59e0b', // Amber 500
            light: '#fbbf24',
            dark: '#d97706',
        },
        info: {
            main: '#0ea5e9', // Sky 500
            light: '#38bdf8',
            dark: '#0284c7',
        },
        success: {
            main: '#22c55e', // Green 500
            light: '#4ade80',
            dark: '#16a34a',
        },
        action: {
            hover: isDark ? 'rgba(59, 130, 246, 0.08)' : 'rgba(29, 78, 216, 0.08)',
            selected: isDark ? 'rgba(59, 130, 246, 0.16)' : 'rgba(29, 78, 216, 0.12)',
            disabled: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(15, 23, 42, 0.26)',
            disabledBackground: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)',
        },
    };

    return createTheme({
        palette,
        typography: {
            fontFamily: '"Source Sans 3", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            h1: {
                fontFamily: '"Source Serif 4", Georgia, serif',
                fontWeight: 800,
                color: isDark ? '#f8fafc' : '#0f172a',
                fontSize: '3.5rem',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
            },
            h2: {
                fontFamily: '"Source Serif 4", Georgia, serif',
                fontWeight: 700,
                color: isDark ? '#f8fafc' : '#0f172a',
                fontSize: '2.5rem',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
            },
            h3: {
                fontFamily: '"Source Serif 4", Georgia, serif',
                fontWeight: 700,
                color: isDark ? '#f8fafc' : '#0f172a',
                fontSize: '2rem',
                lineHeight: 1.2,
            },
            h4: {
                fontFamily: '"Source Serif 4", Georgia, serif',
                fontWeight: 600,
                color: isDark ? '#f1f5f9' : '#0f172a',
                fontSize: '1.5rem',
            },
            h5: {
                fontFamily: '"Source Serif 4", Georgia, serif',
                fontWeight: 600,
                color: isDark ? '#f1f5f9' : '#0f172a',
                fontSize: '1.25rem',
            },
            h6: {
                fontFamily: '"Source Serif 4", Georgia, serif',
                fontWeight: 600,
                color: isDark ? '#f1f5f9' : '#0f172a',
                fontSize: '1.125rem',
            },
            button: {
                fontWeight: 600,
                textTransform: 'none',
            },
        },
        shape: {
            borderRadius: 12,
        },
        shadows: isDark ? [
            'none',
            '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
            '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
            '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
            '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
            '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
            'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none' // Fallbacks
        ] : createTheme({}).shadows, // Use default or define explicit ones if needed. 

        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: palette.background.default,
                        scrollbarColor: isDark ? '#475569 #0f172a' : '#94a3b8 #e2e8f0',
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
                            opacity: isDark ? 0.05 : 0.6, // Less noise in dark mode
                        },
                        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                            width: 8,
                        },
                        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                            borderRadius: 8,
                            backgroundColor: isDark ? '#475569' : '#94a3b8',
                        },
                        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                            backgroundColor: palette.background.default,
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
                        borderRadius: 8,
                        padding: '8px 20px',
                        textTransform: 'none',
                        fontWeight: 600,
                    },
                    contained: {
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(241, 245, 249, 0.7)',
                        backdropFilter: 'blur(12px)',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.5)',
                        borderRadius: 12,
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.25s ease-in-out, background-color 0.2s',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: isDark
                                ? '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)'
                                : '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
                            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(241, 245, 249, 0.85)',
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
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(15, 23, 42, 0.08)',
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(241, 245, 249, 0.9)',
                        backdropFilter: 'blur(16px)',
                        color: isDark ? '#f8fafc' : '#0f172a',
                        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(15, 23, 42, 0.06)',
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 6,
                        fontWeight: 500,
                    },
                    outlined: {
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(15, 23, 42, 0.1)',
                        backgroundColor: 'transparent',
                        color: isDark ? '#cbd5e1' : '#334155',
                    },
                    filled: {
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.06)',
                        color: isDark ? '#f8fafc' : '#0f172a',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                            '& fieldset': {
                                borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)',
                            },
                        },
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(15, 23, 42, 0.08)',
                    },
                },
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.8)',
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: palette.background.paper,
                        borderRight: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(15, 23, 42, 0.06)',
                    },
                },
            },
        },
    });
};

export default getTheme;
