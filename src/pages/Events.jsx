import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/Events/EventCard';
import LazyList from '../components/common/LazyList';
import {
    Container,
    Box,
    Typography,
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

    const renderEventCard = (event) => (
        <EventCard event={event} />
    );

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

            <Box
                sx={{
                    p: 1, // Compact padding
                    mb: 3,
                    borderRadius: 2, // 16px if base is 8, or just consistent sizing
                    bgcolor: 'rgba(241, 245, 249, 0.6)', // Theme paper with transparency
                    backdropFilter: 'blur(12px)',
                    border: '1px solid',
                    borderColor: 'rgba(15, 23, 42, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <TextField
                    fullWidth
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon color="primary" sx={{ opacity: 0.7 }} /></InputAdornment>,
                        disableUnderline: true,
                        sx: { fontSize: '0.95rem' }
                    }}
                    variant="standard"
                    sx={{
                        flexGrow: 1,
                        px: 1,
                        py: 0.5
                    }}
                />
                <Box sx={{ width: 1, height: 24, bgcolor: 'divider' }} />
                <FormControl size="small" variant="standard" sx={{ minWidth: 150, mr: 1 }}>
                    <Select
                        value={cityFilter}
                        displayEmpty
                        onChange={(e) => setCityFilter(e.target.value)}
                        disableUnderline
                        sx={{
                            fontWeight: 600,
                            color: cityFilter === 'all' ? 'text.secondary' : 'primary.main',
                            fontSize: '0.9rem',
                            '& .MuiSelect-select': { py: 0.5 }
                        }}
                    >
                        <MenuItem value="all">All Cities</MenuItem>
                        {cities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>

            {(searchQuery || cityFilter !== 'all') && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing {filteredEvents.length} of {events?.length || 0} events
                        {cityFilter !== 'all' && <Chip label={cityFilter} size="small" sx={{ ml: 1 }} onDelete={() => setCityFilter('all')} />}
                    </Typography>
                </Box>
            )}

            <LazyList
                items={filteredEvents}
                renderItem={renderEventCard}
                batchSize={12}
                gridColumns={{ xs: 12, md: 6, lg: 6 }}
                gridSpacing={3}
                emptyMessage="No events found matching your criteria."
                loadingMessage="Loading more events..."
            />
        </Container>
    );
};

export default Events;
