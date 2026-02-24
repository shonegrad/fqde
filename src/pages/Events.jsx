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
    Chip,
    InputBase,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
                    mb: 3,
                    borderRadius: 1, // Consistent sizing
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden'
                }}
            >
                <InputBase
                    sx={{ flex: 1, fontSize: '0.95rem', pl: 2, pr: 1, py: 1.25 }}
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon color="primary" sx={{ opacity: 0.5, fontSize: 20 }} />
                        </InputAdornment>
                    }
                    endAdornment={
                        searchQuery ? (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={() => setSearchQuery('')} edge="end">
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    }
                />
                <Box sx={{ width: 1, height: 32, bgcolor: 'divider' }} />
                <FormControl size="small" variant="standard" sx={{ minWidth: 160, px: 2 }}>
                    <Select
                        value={cityFilter}
                        displayEmpty
                        onChange={(e) => setCityFilter(e.target.value)}
                        disableUnderline
                        sx={{
                            fontWeight: 600,
                            color: cityFilter === 'all' ? 'text.secondary' : 'primary.main',
                            fontSize: '0.9rem',
                            '& .MuiSelect-select': { py: 1.25, px: 0 }
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
