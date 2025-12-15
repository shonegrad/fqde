import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import QuickActions from '../components/Home/QuickActions';
import {
    Box,
    Container,
    Grid,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Divider,
    Stack,
    Avatar,
    Paper
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import FolderIcon from '@mui/icons-material/Folder';

const StatCard = ({ icon, value, label, color }) => (
    <Paper sx={{ p: 2.5, textAlign: 'center', height: '100%' }}>
        <Box sx={{ color: `${color}.main`, mb: 1 }}>{icon}</Box>
        <Typography variant="h4" fontWeight="bold" color="text.primary">{value}</Typography>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Paper>
);

const Home = () => {
    const { currentUser, users, organizations, events, resources, dataLoading, dataLoaded } = useApp();

    const firstName = useMemo(() => {
        if (!currentUser) return 'Guest';
        return currentUser.firstName || currentUser.displayName?.split(' ')[0] || 'Guest';
    }, [currentUser]);

    const upcomingEvents = useMemo(() => {
        if (!events?.length) return [];
        const now = new Date();
        return events
            .filter(e => new Date(e.startDateTime) > now)
            .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
            .slice(0, 5);
    }, [events]);

    const recentResources = useMemo(() => {
        if (!resources?.length) return [];
        return resources
            .filter(r => r.visibility === 'Public')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
    }, [resources]);

    if (dataLoading || !dataLoaded) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="h5" color="text.secondary">Loading your network...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome back, {firstName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Explore {users?.length?.toLocaleString() || 0} educators and {organizations?.length || 0} organizations across Quebec.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, lg: 8 }}>
                    {/* Stats */}
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <StatCard icon={<PeopleIcon fontSize="large" />} value={users?.length?.toLocaleString() || 0} label="Educators" color="primary" />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <StatCard icon={<BusinessIcon fontSize="large" />} value={organizations?.length || 0} label="Organizations" color="secondary" />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <StatCard icon={<EventIcon fontSize="large" />} value={events?.length || 0} label="Events" color="success" />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <StatCard icon={<FolderIcon fontSize="large" />} value={resources?.length || 0} label="Resources" color="warning" />
                        </Grid>
                    </Grid>

                    {/* Upcoming Events */}
                    <Card elevation={2} sx={{ mb: 3 }}>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6">Upcoming Events</Typography>
                                <Button component={RouterLink} to="/events" size="small">View All</Button>
                            </Stack>
                            <Stack spacing={2}>
                                {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                                    <Box key={event.id} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Paper sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 1, textAlign: 'center', minWidth: 50, borderRadius: 1 }}>
                                            <Typography variant="caption" display="block">
                                                {new Date(event.startDateTime).toLocaleDateString('en-US', { month: 'short' })}
                                            </Typography>
                                            <Typography variant="h6">{new Date(event.startDateTime).getDate()}</Typography>
                                        </Paper>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={500}>{event.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">{event.city} • {event.locationName}</Typography>
                                        </Box>
                                    </Box>
                                )) : (
                                    <Typography variant="body2" color="text.secondary">No upcoming events</Typography>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>

                    {/* Recent Resources */}
                    <Card elevation={2}>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                                <Typography variant="h6">Recent Resources</Typography>
                                <Button component={RouterLink} to="/resources" size="small">View All</Button>
                            </Stack>
                            <Stack spacing={1} divider={<Divider />}>
                                {recentResources.length > 0 ? recentResources.map(resource => (
                                    <Box key={resource.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                                        <Box>
                                            <Typography variant="body1">{resource.title}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {resource.type} • {resource.tags?.slice(0, 2).join(', ')}
                                            </Typography>
                                        </Box>
                                        <Chip label={resource.type} size="small" variant="outlined" />
                                    </Box>
                                )) : (
                                    <Typography variant="body2" color="text.secondary">No resources available</Typography>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Sidebar */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Stack spacing={3}>
                        <QuickActions />

                        {currentUser && (
                            <Card elevation={2}>
                                <CardContent>
                                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                        <Avatar
                                            src={currentUser.avatarPath ? `/fqde${currentUser.avatarPath}` : undefined}
                                            sx={{ width: 56, height: 56 }}
                                        >
                                            {currentUser.firstName?.charAt(0)}{currentUser.lastName?.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6">
                                                {currentUser.displayName || `${currentUser.firstName} ${currentUser.lastName}`}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">{currentUser.title}</Typography>
                                        </Box>
                                    </Stack>
                                    <Divider sx={{ my: 2 }} />
                                    <Stack spacing={1}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <LocationOnIcon fontSize="small" color="action" />
                                            <Typography variant="body2">{currentUser.city}, {currentUser.region}</Typography>
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary">{currentUser.email}</Typography>
                                    </Stack>
                                    {currentUser.tags?.length > 0 && (
                                        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                                            {currentUser.tags.slice(0, 3).map(tag => (
                                                <Chip key={tag} label={tag} size="small" variant="outlined" />
                                            ))}
                                        </Stack>
                                    )}
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant="outlined" component={RouterLink} to="/network">View Network</Button>
                                </CardActions>
                            </Card>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
