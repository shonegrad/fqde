import React, { useMemo } from 'react';
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
import RoomIcon from '@mui/icons-material/Room';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const SessionCard = ({ session, eventId, isForYouView }) => {
    const { mySchedule, addToSchedule, removeFromSchedule, sessions } = useApp();

    const isScheduled = mySchedule.includes(session.id);

    // Get all sessions for this event from context
    const eventSessions = useMemo(() => {
        if (!sessions || !eventId) return [];
        return sessions.filter(s => s.eventId === eventId);
    }, [sessions, eventId]);

    // Conflict detection - check if any other scheduled session in this event overlaps
    const hasConflict = useMemo(() => {
        if (isScheduled || isForYouView) return false;

        return mySchedule.some(scheduledId => {
            // Find the scheduled session object
            const scheduledSession = eventSessions.find(s => s.id === scheduledId);
            if (!scheduledSession) return false;

            // Check time overlap
            const sStart = new Date(session.startDateTime);
            const sEnd = new Date(session.endDateTime);
            const oStart = new Date(scheduledSession.startDateTime);
            const oEnd = new Date(scheduledSession.endDateTime);

            return (sStart < oEnd && sEnd > oStart);
        });
    }, [isScheduled, isForYouView, mySchedule, eventSessions, session]);

    const formatTime = (isoString) => {
        if (!isoString) return '--:--';
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
                <Box sx={{ minWidth: 0, flex: 1, pr: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {session.title}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                        <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                            <AccessTimeIcon sx={{ fontSize: 16 }} />
                            <Typography variant="body2">
                                {formatTime(session.startDateTime)} - {formatTime(session.endDateTime)}
                            </Typography>
                        </Stack>
                        {session.room && (
                            <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                                <RoomIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2">{session.room}</Typography>
                            </Stack>
                        )}
                        {session.track && (
                            <Chip label={session.track} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                        )}
                    </Stack>
                    {session.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {session.description}
                        </Typography>
                    )}
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

