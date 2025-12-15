import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0f172a', // Slate 900
            light: '#334155',
            dark: '#020617',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#475569', // Slate 600
            light: '#94a3b8',
            dark: '#1e293b',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc', // Slate 50
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a',
            secondary: '#475569',
        },
        divider: '#e2e8f0',
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        h1: {
            fontFamily: '"Georgia", serif',
            fontWeight: 600,
        },
        h2: {
            fontFamily: '"Georgia", serif',
            fontWeight: 600,
        },
        h3: {
            fontFamily: '"Georgia", serif',
            fontWeight: 600,
        },
        h4: {
            fontFamily: '"Georgia", serif',
            fontWeight: 600,
        },
        h5: {
            fontFamily: '"Georgia", serif',
            fontWeight: 600,
        },
        h6: {
            fontFamily: '"Georgia", serif',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                },
            },
        },
    },
});

export default theme;
