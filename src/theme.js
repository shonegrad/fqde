import { createTheme } from '@mui/material/styles';

// Material Expressive Theme - Deeper Light Mode
// Color Palette from Coolors: Blue dominant with supporting slate tones
// Avoids pure blacks (#000) and pure whites (#fff) for accessible, softer contrast
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
        borderRadius: 16,
    },
    shadows: [
        'none',
        '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px 0 rgba(15, 23, 42, 0.04)', // elevation 1
        '0 2px 4px 0 rgba(15, 23, 42, 0.1), 0 1px 3px 0 rgba(15, 23, 42, 0.06)', // elevation 2
        '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -1px rgba(15, 23, 42, 0.06)', // elevation 3
        '0 6px 10px -2px rgba(15, 23, 42, 0.12), 0 3px 5px -1px rgba(15, 23, 42, 0.08)', // elevation 4
        '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)', // elevation 5
        '0 12px 20px -4px rgba(15, 23, 42, 0.15), 0 5px 8px -3px rgba(15, 23, 42, 0.1)', // elevation 6
        '0 14px 24px -5px rgba(15, 23, 42, 0.18), 0 6px 10px -4px rgba(15, 23, 42, 0.1)', // elevation 7
        '0 16px 28px -5px rgba(15, 23, 42, 0.2), 0 8px 12px -4px rgba(15, 23, 42, 0.12)', // elevation 8
        '0 18px 32px -6px rgba(15, 23, 42, 0.22), 0 10px 14px -5px rgba(15, 23, 42, 0.12)', // elevation 9
        '0 20px 36px -6px rgba(15, 23, 42, 0.24), 0 12px 16px -5px rgba(15, 23, 42, 0.14)', // elevation 10
        '0 22px 40px -7px rgba(15, 23, 42, 0.26), 0 14px 18px -6px rgba(15, 23, 42, 0.14)', // elevation 11
        '0 24px 44px -7px rgba(15, 23, 42, 0.28), 0 16px 20px -6px rgba(15, 23, 42, 0.16)', // elevation 12
        '0 26px 48px -8px rgba(15, 23, 42, 0.30), 0 18px 22px -7px rgba(15, 23, 42, 0.16)', // elevation 13
        '0 28px 52px -8px rgba(15, 23, 42, 0.32), 0 20px 24px -7px rgba(15, 23, 42, 0.18)', // elevation 14
        '0 30px 56px -9px rgba(15, 23, 42, 0.34), 0 22px 26px -8px rgba(15, 23, 42, 0.18)', // elevation 15
        '0 32px 60px -9px rgba(15, 23, 42, 0.36), 0 24px 28px -8px rgba(15, 23, 42, 0.20)', // elevation 16
        '0 34px 64px -10px rgba(15, 23, 42, 0.38), 0 26px 30px -9px rgba(15, 23, 42, 0.20)', // elevation 17
        '0 36px 68px -10px rgba(15, 23, 42, 0.40), 0 28px 32px -9px rgba(15, 23, 42, 0.22)', // elevation 18
        '0 38px 72px -11px rgba(15, 23, 42, 0.42), 0 30px 34px -10px rgba(15, 23, 42, 0.22)', // elevation 19
        '0 40px 76px -11px rgba(15, 23, 42, 0.44), 0 32px 36px -10px rgba(15, 23, 42, 0.24)', // elevation 20
        '0 42px 80px -12px rgba(15, 23, 42, 0.46), 0 34px 38px -11px rgba(15, 23, 42, 0.24)', // elevation 21
        '0 44px 84px -12px rgba(15, 23, 42, 0.48), 0 36px 40px -11px rgba(15, 23, 42, 0.26)', // elevation 22
        '0 46px 88px -13px rgba(15, 23, 42, 0.50), 0 38px 42px -12px rgba(15, 23, 42, 0.26)', // elevation 23
        '0 48px 92px -13px rgba(15, 23, 42, 0.52), 0 40px 44px -12px rgba(15, 23, 42, 0.28)', // elevation 24
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#e2e8f0',
                    scrollbarColor: '#94a3b8 #e2e8f0',
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
                disableElevation: false,
            },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '10px 24px',
                },
                contained: {
                    boxShadow: '0 2px 8px 0 rgba(29, 78, 216, 0.25)',
                    '&:hover': {
                        boxShadow: '0 6px 16px 0 rgba(29, 78, 216, 0.35)',
                        transform: 'translateY(-1px)',
                    },
                },
                outlined: {
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2,
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
                elevation: 2,
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    borderRadius: 16,
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.25s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 24px -4px rgba(29, 78, 216, 0.15), 0 4px 8px -2px rgba(15, 23, 42, 0.08)',
                    },
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 1,
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: 'none',
                },
                outlined: {
                    border: 'none',
                    boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px 0 rgba(15, 23, 42, 0.04)',
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
                    backgroundColor: 'rgba(241, 245, 249, 0.85)',
                    backdropFilter: 'blur(12px)',
                    color: '#0f172a',
                    boxShadow: '0 1px 3px 0 rgba(15, 23, 42, 0.06)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                    border: 'none',
                },
                outlined: {
                    border: 'none',
                    backgroundColor: 'rgba(15, 23, 42, 0.06)',
                    '&:hover': {
                        backgroundColor: 'rgba(29, 78, 216, 0.1)',
                    },
                },
                filled: {
                    backgroundColor: 'rgba(29, 78, 216, 0.1)',
                    color: '#1d4ed8',
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
                        backgroundColor: '#f8fafc',
                        border: 'none',
                        boxShadow: 'inset 0 1px 2px 0 rgba(15, 23, 42, 0.06)',
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover': {
                            boxShadow: 'inset 0 1px 3px 0 rgba(15, 23, 42, 0.1)',
                        },
                        '&.Mui-focused': {
                            boxShadow: '0 0 0 3px rgba(29, 78, 216, 0.2), inset 0 1px 2px 0 rgba(15, 23, 42, 0.06)',
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f8fafc',
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none',
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#bfdbfe', // Blue 200
                    color: '#1e40af', // Blue 800
                    fontWeight: 600,
                    boxShadow: '0 2px 4px 0 rgba(15, 23, 42, 0.08)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f1f5f9',
                    border: 'none',
                    boxShadow: '4px 0 16px 0 rgba(15, 23, 42, 0.1)',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f1f5f9',
                    borderRadius: 20,
                    boxShadow: '0 24px 48px -12px rgba(15, 23, 42, 0.25)',
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f8fafc',
                    border: 'none',
                    boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.15)',
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    border: 'none',
                    borderRadius: 12,
                    backgroundColor: 'transparent',
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(29, 78, 216, 0.12)',
                        color: '#1d4ed8',
                        '&:hover': {
                            backgroundColor: 'rgba(29, 78, 216, 0.18)',
                        },
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(15, 23, 42, 0.04)',
                    },
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(15, 23, 42, 0.04)',
                    borderRadius: 12,
                    padding: 4,
                    gap: 4,
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
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
                    borderColor: 'rgba(15, 23, 42, 0.06)',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#475569',
                },
            },
        },
    },
});

export default theme;
