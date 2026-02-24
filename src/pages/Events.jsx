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
    IconButton,
    ToggleButtonGroup,
    ToggleButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventCalendar from '../components/Events/EventCalendar';

const Events = () => {
    const { events, dataLoading } = useApp();
    const [searchQuery, setSearchQuery] = useState('');
    const [cityFilter, setCityFilter] = useState('all');
    const [viewMode, setViewMode] = useState('list');

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
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>Events</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {events?.length || 0} events across Quebec • {upcomingCount} upcoming
                    </Typography>
                </Box>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newView) => { if (newView) setViewMode(newView); }}
                    aria-label="view mode"
                    size="small"
                >
                    <ToggleButton value="list" aria-label="list view">
                        <ViewListIcon fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="calendar" aria-label="calendar view">
                        <CalendarMonthIcon fontSize="small" />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box
                sx={{
                    p: 1.5,
                    mb: 4,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        fullWidth
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon color="primary" sx={{ opacity: 0.5, fontSize: 20 }} /></InputAdornment>,
                            endAdornment: searchQuery ? (
                                <InputAdornment position="end">
                                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ) : null,
                            disableUnderline: true
                        }}
                        variant="standard"
                        sx={{ flex: 1 }}
                    />
                    <FormControl size="small" variant="standard" sx={{ minWidth: 160 }}>
                        <InputLabel>City</InputLabel>
                        <Select
                            value={cityFilter}
                            label="City"
                            onChange={(e) => setCityFilter(e.target.value)}
                            disableUnderline
                            sx={{ fontWeight: 600, color: 'primary.main' }}
                        >
                            <MenuItem value="all">All Cities</MenuItem>
                            {cities.map(city => <MenuItem key={city} value={city}>{city}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
            </Box>

            {(searchQuery || cityFilter !== 'all') && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Showing {filteredEvents.length} of {events?.length || 0} events
                        {cityFilter !== 'all' && <Chip label={cityFilter} size="small" sx={{ ml: 1 }} onDelete={() => setCityFilter('all')} />}
                    </Typography>
                </Box>
            )}

            {viewMode === 'list' ? (
                <LazyList
                    items={filteredEvents}
                    renderItem={renderEventCard}
                    batchSize={12}
                    gridColumns={{ xs: 12, md: 6, lg: 6 }}
                    gridSpacing={3}
                    emptyMessage="No events found matching your criteria."
                    loadingMessage="Loading more events..."
                />
            ) : (
                <EventCalendar events={filteredEvents} />
            )}
        </Container>
    );
};

export default Events;
