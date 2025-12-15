import React from 'react';
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
    const { events } = useApp();

    const event = events.find(e => e.id === eventId);

    if (!event) return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
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

            <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 2 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />} >
                    <Box sx={{ flex: 1 }}>
                        <Chip label={event.type} size="small" sx={{ mb: 2, bgcolor: 'secondary.light', color: 'secondary.contrastText' }} />
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 700 }}>
                            {event.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'sm' }}>
                            {event.description}
                        </Typography>
                    </Box>

                    <Stack spacing={2} minWidth={250}>
                        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                            <CalendarTodayIcon color="primary" />
                            <Typography variant="subtitle1" fontWeight={500}>
                                {event.dateRange}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" color="text.secondary">
                            <LocationOnIcon color="primary" />
                            <Typography variant="subtitle1" fontWeight={500}>
                                {event.location}
                            </Typography>
                        </Stack>

                        <Button variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
                            Register Now
                        </Button>
                    </Stack>
                </Stack>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" component="h2" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 600 }}>
                    Schedule
                </Typography>
                <TimelineView event={event} />
            </Paper>
        </Container>
    );
};
export default EventDetail;
