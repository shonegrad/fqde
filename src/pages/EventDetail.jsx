import React, { useMemo } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import TimelineView from '../components/Events/TimelineView';
import {
    Container,
    Box,
    Typography,
    Button,
    Chip,
    Stack,
    Paper,
    Link,
    Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const EventDetail = () => {
    const { eventId } = useParams();
    const { events, sessions, dataLoading } = useApp();

    const event = events?.find(e => e.id === eventId);

    // Get sessions for this event from the sessions data
    const eventSessions = useMemo(() => {
        if (!sessions || !eventId) return [];
        return sessions.filter(s => s.eventId === eventId);
    }, [sessions, eventId]);

    // Compute date range from event data
    const dateRange = useMemo(() => {
        if (!event) return 'TBD';
        if (event.dateRange) return event.dateRange;
        if (!event.startDateTime) return 'TBD';
        const start = new Date(event.startDateTime);
        const end = event.endDateTime ? new Date(event.endDateTime) : null;
        const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (!end || start.toDateString() === end.toDateString()) return formatDate(start);
        return `${formatDate(start)} - ${formatDate(end)}`;
    }, [event]);

    if (dataLoading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography>Loading event...</Typography>
            </Container>
        );
    }

    if (!event) return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                component={RouterLink}
                to="/events"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 2, color: 'text.secondary', textTransform: 'none' }}
            >
                Back to Events
            </Button>
            <Typography>Event not found</Typography>
        </Container>
    );

    return (
        <Container maxWidth="lg">
            <Button
                component={RouterLink}
                to="/events"
                startIcon={<ArrowBackIcon />}
                sx={{ mb: 2, color: 'text.secondary', textTransform: 'none' }}
            >
                Back to Events
            </Button>

            <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 1 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start" divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />} >
                    <Box sx={{ flex: 1 }}>
                        <Chip label={event.type || event.tags?.[0] || 'Event'} size="small" sx={{ mb: 2, bgcolor: 'secondary.light', color: 'secondary.contrastText' }} />
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                            {event.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'sm' }}>
                            {event.description}
                        </Typography>

                        {eventSessions.length > 0 && (
                            <Box sx={{ mt: 6 }}>
                                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                                    Schedule ({eventSessions.length} sessions)
                                </Typography>
                                <TimelineView sessions={eventSessions} eventId={eventId} />
                            </Box>
                        )}
                    </Box>

                    <Stack spacing={2} minWidth={250} sx={{ position: 'sticky', top: 24 }}>
                        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                            <CalendarTodayIcon color="primary" />
                            <Typography variant="subtitle1" fontWeight={500}>
                                {dateRange}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                            <LocationOnIcon color="primary" />
                            <Typography variant="subtitle1" fontWeight={500}>
                                {event.location || event.locationName || event.city || 'Location TBD'}
                            </Typography>
                        </Stack>

                        {event.registrationEnabled && (
                            <Button variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
                                Register Now
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    );
};
export default EventDetail;
