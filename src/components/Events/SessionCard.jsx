import React from 'react';
import { useApp } from '../../context/AppContext';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Box,
    Stack,
    Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const SessionCard = ({ session, eventId, isForYouView }) => {
    const { mySchedule, addToSchedule, removeFromSchedule, events } = useApp();

    const isScheduled = mySchedule.includes(session.id);
    const event = events.find(e => e.id === eventId);

    // Conflict detection (simple version)
    // Check if any other scheduled session in this event overlaps
    const hasConflict = !isScheduled && !isForYouView && mySchedule.some(scheduledId => {
        // Find the scheduled session object
        const scheduledSession = event.sessions.find(s => s.id === scheduledId);
        if (!scheduledSession) return false;

        // Check time overlap
        const sStart = new Date(session.start);
        const sEnd = new Date(session.end);
        const oStart = new Date(scheduledSession.start);
        const oEnd = new Date(scheduledSession.end);

        return (sStart < oEnd && sEnd > oStart);
    });

    const formatTime = (isoString) => {
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                bgcolor: isScheduled ? 'info.light' : (hasConflict ? 'warning.light' : 'background.paper'),
                borderColor: isScheduled ? 'info.main' : (hasConflict ? 'warning.main' : 'divider'),
                transition: 'all 0.2s',
                '&:hover': { boxShadow: 1 }
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {session.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                            <AccessTimeIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                                {formatTime(session.start)} - {formatTime(session.end)}
                            </Typography>
                        </Stack>
                        <Chip label={session.track} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                    </Stack>
                </Box>

                <IconButton
                    onClick={() => isScheduled ? removeFromSchedule(session.id) : addToSchedule(session.id)}
                    color={isScheduled ? "success" : "default"}
                    sx={{
                        bgcolor: isScheduled ? 'background.paper' : 'action.hover',
                        '&:hover': { bgcolor: isScheduled ? 'background.paper' : 'action.selected' }
                    }}
                    size="small"
                >
                    {isScheduled ? <CheckIcon /> : <AddIcon />}
                </IconButton>
            </Stack>

            {hasConflict && (
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 1, color: 'warning.dark' }}>
                    <WarningAmberIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" fontWeight={500}>
                        Time conflict with another session
                    </Typography>
                </Stack>
            )}
        </Paper>
    );
};

export default SessionCard;
