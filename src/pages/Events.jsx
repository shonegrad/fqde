import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/Events/EventCard';
import {
    Container,
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Events = () => {
    const { events, dataLoading } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [cityFilter, setCityFilter] = useState('all');

    const cities = useMemo(() => {
        if (!events) return [];
        return [...new Set(events.map(e => e.city).filter(Boolean))].sort();
    }, [events]);

    const filteredEvents = useMemo(() => {
        if (!events) return [];
        let result = [...events];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(event =>
                event.title?.toLowerCase().includes(query) ||
                event.description?.toLowerCase().includes(query) ||
                event.city?.toLowerCase().includes(query) ||
                event.tags?.some(tag => tag.toLowerCase().includes(query))
            );
        }

        if (cityFilter !== 'all') {
            result = result.filter(event => event.city === cityFilter);
        }

        return result.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
    }, [events, searchQuery, cityFilter]);

    const upcomingCount = useMemo(() => {
        if (!events) return 0;
        return events.filter(e => new Date(e.startDateTime) > new Date()).length;
    }, [events]);

    if (dataLoading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="h5" color="text.secondary">Loading events...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>Events</Typography>
                <Typography variant="body1" color="text.secondary">
                    {events?.length || 0} events across Quebec • {upcomingCount} upcoming
                </Typography>
            </Box>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                <TextField
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                    size="small"
                    sx={{ flexGrow: 1 }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>City</InputLabel>
                    <Select value={cityFilter} label="City" onChange={(e) => setCityFilter(e.target.value)}>
                        <MenuItem value="all">All Cities</MenuItem>
                        {cities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
                    </Select>
                </FormControl>
            </Stack>

            {(searchQuery || cityFilter !== 'all') && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing {filteredEvents.length} of {events?.length || 0} events
                        {cityFilter !== 'all' && <Chip label={cityFilter} size="small" sx={{ ml: 1 }} onDelete={() => setCityFilter('all')} />}
                    </Typography>
                </Box>
            )}

            <Grid container spacing={3}>
                {filteredEvents.length > 0 ? filteredEvents.map(event => (
                    <Grid size={{ xs: 12, md: 6 }} key={event.id}>
                        <EventCard event={event} />
                    </Grid>
                )) : (
                    <Grid size={12}>
                        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                            No events found matching your criteria.
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Events;
