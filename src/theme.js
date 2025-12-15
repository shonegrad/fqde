import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2563eb', // Blue 600
            light: '#60a5fa', // Blue 400
            dark: '#1d4ed8', // Blue 700
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#4f46e5', // Indigo 600
            light: '#818cf8', // Indigo 400
            dark: '#3730a3', // Indigo 800
            contrastText: '#ffffff',
        },
        background: {
            default: '#f0f4f8', // Cool grey/blueish off-white
            paper: '#f8fafc', // Very light slate (not pure white)
        },
        text: {
            primary: '#1e293b', // Slate 800
            secondary: '#475569', // Slate 600
        },
        divider: '#e2e8f0', // Slate 200
        error: {
            main: '#ef4444', // Red 500
        },
        warning: {
            main: '#f59e0b', // Amber 500
        },
        info: {
            main: '#0ea5e9', // Sky 500
        },
        success: {
            main: '#22c55e', // Green 500
        },
        action: {
            hover: 'rgba(37, 99, 235, 0.04)',
            selected: 'rgba(37, 99, 235, 0.08)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
        },
    },
    typography: {
        fontFamily: '"Source Sans 3", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        h1: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 700,
            color: '#1e293b',
        },
        h2: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 700,
            color: '#1e293b',
        },
        h3: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 600,
            color: '#1e293b',
        },
        h4: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 600,
            color: '#1e293b',
        },
        h5: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 600,
            color: '#1e293b',
        },
        h6: {
            fontFamily: '"Source Serif 4", Georgia, serif',
            fontWeight: 600,
            color: '#1e293b',
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 16, // More expressive, larger border radius
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#f0f4f8',
                    scrollbarColor: '#cbd5e1 #f0f4f8',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 8,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#cbd5e1', // Slate 300
                    },
                    '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                        backgroundColor: '#f0f4f8',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '8px 20px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                contained: {
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#f8fafc', // Match paper
                    borderColor: '#e2e8f0',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        borderColor: '#cbd5e1',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
                elevation1: {
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: 'rgba(248, 250, 252, 0.8)', // Translucent paper color
                    backdropFilter: 'blur(8px)',
                    color: '#1e293b',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 500,
                },
                outlined: {
                    borderColor: '#cbd5e1',
                    backgroundColor: 'transparent',
                },
                filled: {
                    backgroundColor: '#e2e8f0',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#ffffff', // Slightly lighter than paper to pop
                        '& fieldset': {
                            borderColor: '#cbd5e1',
                        },
                        '&:hover fieldset': {
                            borderColor: '#94a3b8',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2563eb', // Primary
                        },
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#cbd5e1',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#94a3b8',
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#dbeafe', // Blue 100
                    color: '#1d4ed8', // Blue 700
                    fontWeight: 600,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f8fafc',
                    borderRight: '1px solid #e2e8f0',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#f8fafc',
                    borderRadius: 20,
                },
            },
        },
    },
});

export default theme;
