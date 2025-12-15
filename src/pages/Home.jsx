import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FeedItem from '../components/Home/FeedItem';
import QuickActions from '../components/Home/QuickActions';
import {
    Box,
    Container,
    Grid,
    Typography,
    Tabs,
    Tab,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Divider,
    Stack
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Home = () => {
    const { currentUser, feed } = useApp();
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (event, newValue) => {
        setFilter(newValue);
    };

    // Filter feed items
    const filteredFeed = feed.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    // Get user's institution
    const userOrg = { name: "Riverdale Leadership Institute", region: "Northeast", role: "Member" };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 600 }}>
                    Welcome back, {currentUser.name.split(' ')[0]}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Here's what's happening in your network today.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Main Feed Column */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    {/* Feed Filters */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                        <Tabs
                            value={filter}
                            onChange={handleFilterChange}
                            aria-label="feed filters"
                            textColor="primary"
                            indicatorColor="primary"
                        >
                            <Tab label="Your Feed" value="all" />
                            <Tab label="Announcements" value="announcement" />
                            <Tab label="Events" value="event" />
                            <Tab label="Resources" value="resource" />
                        </Tabs>
                    </Box>

                    {/* Feed Items */}
                    <Stack spacing={2}>
                        {filteredFeed.map(item => (
                            <FeedItem key={item.id} item={item} />
                        ))}
                        {filteredFeed.length === 0 && (
                            <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 4 }}>
                                No updates found.
                            </Typography>
                        )}
                    </Stack>
                </Grid>

                {/* Sidebar */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Stack spacing={3}>
                        {/* Quick Actions */}
                        <QuickActions />

                        {/* My Institution Card */}
                        <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
                            <CardContent>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, color: 'text.secondary' }}>
                                    <BusinessIcon fontSize="small" />
                                    <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: 'serif' }}>
                                        My Institution
                                    </Typography>
                                </Stack>

                                <Typography variant="h6" component="div" gutterBottom>
                                    {userOrg.name}
                                </Typography>

                                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 2, color: 'text.secondary' }}>
                                    <LocationOnIcon fontSize="small" sx={{ fontSize: 16 }} />
                                    <Typography variant="body2">{userOrg.region}</Typography>
                                </Stack>

                                <Divider sx={{ my: 1 }} />

                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                                    <Typography variant="body2" fontWeight={500}>Status</Typography>
                                    <Chip label="Active Member" color="success" size="small" variant="outlined" sx={{ bgcolor: '#dcfce7', color: '#166534', borderColor: 'transparent' }} />
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Button fullWidth variant="outlined" color="inherit">View Profile</Button>
                            </CardActions>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Home;
