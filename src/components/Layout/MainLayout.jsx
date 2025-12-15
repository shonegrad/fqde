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
    Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
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
            <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DashboardIcon color="primary" />
                            <Typography
                                variant="h6"
                                component={RouterLink}
                                to="/"
                                color="primary"
                                sx={{ textDecoration: 'none', fontWeight: 700 }}
                            >
                                FQDE Network
                            </Typography>
                            <Chip label={`v${APP_VERSION}`} size="small" variant="outlined" />
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 4 }}>
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
                                    size="small"
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {dataLoading ? (
                                <CircularProgress size={20} color="primary" />
                            ) : (
                                <>
                                    <FormControl size="small" variant="outlined" sx={{ minWidth: 160, display: { xs: 'none', sm: 'flex' } }}>
                                        <InputLabel>Viewing as</InputLabel>
                                        <Select
                                            value={currentUser?.id || ''}
                                            onChange={(e) => switchRole(e.target.value)}
                                            label="Viewing as"
                                        >
                                            {roleUsers.map(u => (
                                                <MenuItem key={u.id} value={u.id}>{getUserRole(u)}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Avatar
                                        src={currentUser?.avatarPath ? `/fqde${currentUser.avatarPath}` : undefined}
                                        sx={{ width: 36, height: 36 }}
                                    >
                                        {getUserInitials(currentUser)}
                                    </Avatar>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Outlet />
            </Box>

            <Box component="footer" sx={{ py: 3, px: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center', bgcolor: 'background.paper' }}>
                <Typography variant="caption" color="text.secondary">
                    © 2025 FQDE Education Network — {(users || []).length.toLocaleString()} educators across Quebec
                </Typography>
            </Box>
        </Box>
    );
};

export default MainLayout;
