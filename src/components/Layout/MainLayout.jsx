import React, { useMemo } from 'react';
import { Outlet, NavLink as RouterLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Select,
    MenuItem,
    Avatar,
    Container,
    FormControl,
    InputLabel,
    CircularProgress,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../../context/ThemeContext';
import { version } from '../../../package.json';

const APP_VERSION = version;

const ROLE_TYPES = [
    'Director',
    'Principal',
    'Coordinator',
    'Teacher Leader',
    'Researcher',
    'Admin Team'
];

const MainLayout = () => {
    const { currentUser, switchRole, users, dataLoading } = useApp();
    const { mode, toggleTheme } = useThemeContext();
    const location = useLocation();

    const roleUsers = useMemo(() => {
        if (!users || users.length === 0) return [];
        const representatives = [];
        for (const roleType of ROLE_TYPES) {
            const user = users.find(u =>
                (u.title || u.role || '').toLowerCase().includes(roleType.toLowerCase())
            );
            if (user) representatives.push(user);
        }
        return representatives;
    }, [users]);

    // Ensure the currentUser's id is valid for the Select, otherwise use first roleUser
    const selectValue = useMemo(() => {
        if (!currentUser) return '';
        const isValidSelection = roleUsers.some(u => u.id === currentUser.id);
        if (isValidSelection) return currentUser.id;
        // If current user not in roleUsers but we have roleUsers, use first one
        if (roleUsers.length > 0) {
            return roleUsers[0].id;
        }
        return '';
    }, [currentUser, roleUsers]);

    // Auto-switch to a valid user if current selection is invalid
    React.useEffect(() => {
        if (selectValue && currentUser && selectValue !== currentUser.id) {
            switchRole(selectValue);
        }
    }, [selectValue, currentUser, switchRole]);

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const getUserDisplayName = (user) => {
        if (!user) return 'Loading...';
        return user.displayName || user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
    };

    const getUserInitials = (user) => {
        if (!user) return '?';
        if (user.firstName && user.lastName) {
            return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
        }
        const name = user.displayName || user.name || '';
        return name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2) || '?';
    };

    const getUserRole = (user) => user?.role || user?.title || '';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar
                position="sticky"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: 'rgba(241, 245, 249, 0.9)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(0,0,0,0.06)',
                    py: 1
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                                component={RouterLink}
                                to="/"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                    transition: 'opacity 0.2s',
                                    '&:hover': { opacity: 0.8 }
                                }}
                            >
                                <DashboardIcon sx={{ fontSize: 32 }} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'text.primary' }}>
                                        FQDE Network
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                                        v{APP_VERSION}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 0.5,
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            bgcolor: 'rgba(241, 245, 249, 0.8)', // Theme paper alpha
                            backdropFilter: 'blur(12px)',
                            p: 0.5,
                            borderRadius: 4,
                            border: '1px solid',
                            borderColor: 'rgba(15, 23, 42, 0.08)',
                            boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.05)'
                        }}>
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Events', path: '/events' },
                                { name: 'Resources', path: '/resources' },
                                { name: 'Network', path: '/network' }
                            ].map((page) => (
                                <Button
                                    key={page.name}
                                    component={RouterLink}
                                    to={page.path}
                                    color={isActive(page.path) ? "primary" : "inherit"}
                                    variant={isActive(page.path) ? "contained" : "text"}
                                    size="medium"
                                    disableElevation
                                    sx={{
                                        borderRadius: 3.5, // rounded-full feel inside the pill
                                        px: 2.5,
                                        py: 0.75,
                                        fontWeight: 600,
                                        minWidth: 'auto',
                                        color: isActive(page.path) ? 'white' : 'text.secondary',
                                        '&:hover': {
                                            bgcolor: isActive(page.path) ? 'primary.dark' : 'rgba(15, 23, 42, 0.04)'
                                        }
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Tooltip title={mode === 'dark' ? 'Generic Light Mode' : 'Generic Dark Mode'}>
                                <IconButton onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
                                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Tooltip>
                            {dataLoading ? (
                                <CircularProgress size={24} color="primary" />
                            ) : (
                                <>
                                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                        <Typography variant="body2" fontWeight={500}>Viewing as</Typography>
                                        <Select
                                            value={selectValue}
                                            onChange={(e) => switchRole(e.target.value)}
                                            variant="standard"
                                            disableUnderline
                                            sx={{
                                                fontWeight: 700,
                                                color: 'primary.main',
                                                fontSize: '0.9rem',
                                                '& .MuiSelect-select': { py: 0 }
                                            }}
                                        >
                                            {roleUsers.map(u => (
                                                <MenuItem key={u.id} value={u.id}>{getUserRole(u)}</MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                    <Avatar
                                        src={currentUser?.avatarPath ? `/fqde${currentUser.avatarPath}` : undefined}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            border: '2px solid white'
                                        }}
                                    >
                                        {getUserInitials(currentUser)}
                                    </Avatar>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 6, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </Box>

            <Box component="footer" sx={{ py: 6, px: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center', bgcolor: 'background.paper' }}>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    FQDE Education Network
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Connecting {(users || []).length.toLocaleString()} educators across Quebec
                </Typography>
            </Box>
        </Box>
    );
};

export default MainLayout;
