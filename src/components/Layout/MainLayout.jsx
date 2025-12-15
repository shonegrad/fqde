import React from 'react';
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
    InputLabel
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Using Dashboard as fallback for Layout
import { version } from '../../../package.json';

const APP_VERSION = version;

const MainLayout = () => {
    const { currentUser, switchRole, users } = useApp();
    const location = useLocation();

    // Helper to check active state for MUI buttons
    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        {/* Logo Area */}
                        <Box sx={{ display: 'flex', items: 'center', gap: 1 }}>
                            <DashboardIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component={RouterLink}
                                to="/"
                                sx={{
                                    mr: 2,
                                    fontFamily: 'serif',
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                }}
                            >
                                Connecting Educators
                            </Typography>
                        </Box>

                        {/* Navigation */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
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
                                    sx={{
                                        fontWeight: isActive(page.path) ? 600 : 400,
                                        bgcolor: isActive(page.path) ? 'action.selected' : 'transparent'
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* User Controls */}
                        <Box sx={{ display: 'flex', items: 'center', gap: 2 }}>
                            <FormControl size="small" variant="standard" sx={{ minWidth: 200, display: { xs: 'none', sm: 'flex' } }}>
                                <InputLabel id="role-select-label">Viewing as</InputLabel>
                                <Select
                                    labelId="role-select-label"
                                    value={currentUser.id}
                                    onChange={(e) => switchRole(e.target.value)}
                                    label="Viewing as"
                                >
                                    {users.map(u => (
                                        <MenuItem key={u.id} value={u.id}>
                                            {u.name} ({u.role})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: 14 }}>
                                {currentUser.avatar}
                            </Avatar>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Outlet />
            </Box>

            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', borderTop: 1, borderColor: 'divider', textAlign: 'center', bgcolor: 'background.paper' }}>
                <Typography variant="caption" color="text.secondary">
                    Connecting Educators v{APP_VERSION}
                </Typography>
            </Box>
        </Box>
    );
};

export default MainLayout;
