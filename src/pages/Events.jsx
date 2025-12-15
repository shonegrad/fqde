import React from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/Events/EventCard';
import { Container, Box, Typography, Grid } from '@mui/material';

const Events = () => {
    const { events } = useApp();

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 600 }}>
                    Upcoming Events
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Connect, learn, and lead with peers across the network.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {events.map(event => (
                    <Grid size={{ xs: 12, md: 6 }} key={event.id}>
                        <EventCard event={event} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
export default Events;
