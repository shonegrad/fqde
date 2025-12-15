import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box,
    Stack
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const EventCard = ({ event }) => {
    return (
        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { borderColor: 'primary.main', boxShadow: 1 }, transition: 'all 0.2s' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box>
                        <Chip label={event.type} size="small" sx={{ mb: 1, bgcolor: 'secondary.light', color: 'secondary.contrastText' }} />
                        <Typography variant="h5" component="h3" sx={{ fontFamily: 'serif', fontWeight: 600 }}>
                            {event.title}
                        </Typography>
                    </Box>
                    <Chip
                        icon={<CalendarTodayIcon sx={{ fontSize: '14px !important' }} />}
                        label={event.dateRange}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                    />
                </Stack>

                <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body2">{event.location}</Typography>
                </Stack>

                <Button
                    component={Link}
                    to={`/events/${event.id}`}
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    size="small"
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};
export default EventCard;
