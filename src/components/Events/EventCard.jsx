import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box, Stack, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const EventCard = ({ event }) => {
    const formatDateRange = () => {
        if (event.dateRange) return event.dateRange;
        if (!event.startDateTime) return 'TBD';
        const start = new Date(event.startDateTime);
        const end = event.endDateTime ? new Date(event.endDateTime) : null;
        const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (!end || start.toDateString() === end.toDateString()) return formatDate(start);
        return `${formatDate(start)} - ${formatDate(end)}`;
    };

    const location = event.location || event.locationName || event.city || 'Location TBD';
    const eventType = event.type || (event.tags?.[0]) || 'Event';

    return (
        <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Box sx={{ minWidth: 0, flex: 1, pr: 1 }}>
                        <Chip label={eventType} size="small" color="secondary" sx={{ mb: 1 }} />
                        <Typography variant="h6" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {event.title}
                        </Typography>
                    </Box>
                    <Chip icon={<CalendarTodayIcon />} label={formatDateRange()} size="small" variant="outlined" color="primary" sx={{ flexShrink: 0 }} />
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mb: 1 }}>
                    {event.description}
                </Typography>

                {event.tags?.length > 1 && (
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                        {event.tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                    </Stack>
                )}
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary" noWrap>{location}</Typography>
                </Stack>
                <Button component={Link} to={`/events/${event.id}`} variant="contained" endIcon={<ArrowForwardIcon />} size="small">
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default EventCard;
