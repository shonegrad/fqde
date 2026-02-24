import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import { Box, Typography, Paper, Grid, Divider, useTheme } from '@mui/material';
import EventCard from './EventCard';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = ({ events }) => {
    const theme = useTheme();
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Map events by date string (YYYY-MM-DD) for quick lookup
    const eventsByDate = useMemo(() => {
        const map = {};
        events.forEach(event => {
            const d = new Date(event.startDateTime);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            if (!map[dateStr]) {
                map[dateStr] = [];
            }
            map[dateStr].push(event);
        });
        return map;
    }, [events]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const dayEvents = eventsByDate[dateStr];

            if (dayEvents && dayEvents.length > 0) {
                return (
                    <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {dayEvents.slice(0, 3).map((e, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'primary.main',
                                    boxShadow: 1
                                }}
                            />
                        ))}
                        {dayEvents.length > 3 && (
                            <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'primary.dark', fontWeight: 700, lineHeight: 1, mt: 0.2 }}>
                                +{dayEvents.length - 3}
                            </Typography>
                        )}
                    </Box>
                );
            }
        }
        return null;
    };

    const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    const selectedDateEvents = eventsByDate[selectedDateStr] || [];

    return (
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                <Paper sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }} elevation={0}>
                    <Box sx={{
                        '& .react-calendar': {
                            width: '100%',
                            border: 'none',
                            fontFamily: theme.typography.fontFamily,
                            backgroundColor: 'transparent',
                        },
                        '& .react-calendar__navigation': {
                            marginBottom: theme.spacing(2),
                        },
                        '& .react-calendar__navigation button': {
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            fontFamily: theme.typography.fontFamily,
                            borderRadius: theme.shape.borderRadius,
                            minWidth: '44px',
                            background: 'none',
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                            '&:focus': {
                                backgroundColor: theme.palette.action.selected,
                            }
                        },
                        '& .react-calendar__month-view__weekdays': {
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            fontSize: '0.8rem',
                            color: theme.palette.text.secondary,
                            paddingBottom: theme.spacing(1),
                            borderBottom: `1px solid ${theme.palette.divider}`,
                            textAlign: 'center'
                        },
                        '& .react-calendar__month-view__weekdays__weekday abbr': {
                            textDecoration: 'none',
                        },
                        '& .react-calendar__month-view__days__day': {
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            padding: theme.spacing(1),
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            border: `1px solid ${theme.palette.divider}`,
                            borderTop: 'none',
                            borderRight: 'none',
                            height: '100px',
                            position: 'relative',
                            background: 'none',
                            color: theme.palette.text.primary,
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            }
                        },
                        '& .react-calendar__month-view__days__day--neighboringMonth': {
                            color: theme.palette.text.disabled,
                        },
                        '& .react-calendar__tile--now': {
                            backgroundColor: theme.palette.primary.light + '20',
                            color: theme.palette.primary.main,
                            fontWeight: 700,
                        },
                        '& .react-calendar__tile--active': {
                            backgroundColor: theme.palette.primary.main + ' !important',
                            color: theme.palette.primary.contrastText + ' !important',
                            borderRadius: theme.shape.borderRadius,
                        },
                        '& .react-calendar__tile:focus': {
                            backgroundColor: 'transparent',
                        }
                    }}>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            tileContent={tileContent}
                            prev2Label={null}
                            next2Label={null}
                        />
                    </Box>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', height: '100%', minHeight: 400 }} elevation={0}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </Typography>
                    <Divider sx={{ mb: 3 }} />

                    {selectedDateEvents.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {selectedDateEvents.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ py: 6, textAlign: 'center' }}>
                            <Typography variant="body1" color="text.secondary">
                                No events scheduled for this day.
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Select highlighted dates to view events.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default EventCalendar;
