import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Stack,
    Typography,
    Paper,
    Chip,
    IconButton,
    Collapse,
    alpha,
    useTheme
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import LayersIcon from '@mui/icons-material/Layers';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Track color mapping with gradients
const trackColors = {
    'Technology': { main: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' },
    'Pedagogy': { main: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' },
    'Innovation': { main: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' },
    'Leadership': { main: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' },
    'Assessment': { main: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' },
    'Inclusion': { main: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' },
};

// Track icon mapping
const trackIcons = {
    'Technology': ScienceIcon,
    'Pedagogy': SchoolIcon,
    'Innovation': LightbulbIcon,
    'Leadership': GroupsIcon,
    'Assessment': AssessmentIcon,
    'Inclusion': GroupsIcon,
};

const getTrackColor = (track) => trackColors[track] || { main: '#64748b', gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)' };
const getTrackIcon = (track) => trackIcons[track] || SchoolIcon;

const TimelineView = ({ sessions = [], eventId }) => {
    const theme = useTheme();
    const { mySchedule, addToSchedule, removeFromSchedule } = useApp();
    const [viewMode, setViewMode] = useState('master');
    const [expandedDays, setExpandedDays] = useState({});

    // Filter sessions based on view mode
    const filteredSessions = useMemo(() => {
        if (viewMode === 'personal') {
            return sessions.filter(s => mySchedule.includes(s.id));
        }
        return sessions;
    }, [sessions, viewMode, mySchedule]);

    // Sort sessions by start time
    const sortedSessions = useMemo(() => {
        return [...filteredSessions].sort((a, b) =>
            new Date(a.startDateTime) - new Date(b.startDateTime)
        );
    }, [filteredSessions]);

    // Group sessions by day
    const sessionsByDay = useMemo(() => {
        const groups = {};
        sortedSessions.forEach(session => {
            const date = new Date(session.startDateTime);
            const dayKey = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
            if (!groups[dayKey]) {
                groups[dayKey] = [];
            }
            groups[dayKey].push(session);
        });
        return groups;
    }, [sortedSessions]);

    // Initialize expanded days
    useMemo(() => {
        const initial = {};
        Object.keys(sessionsByDay).forEach((day, idx) => {
            initial[day] = idx === 0; // First day expanded by default
        });
        if (Object.keys(expandedDays).length === 0) {
            setExpandedDays(initial);
        }
    }, [sessionsByDay]);

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewMode(newView);
        }
    };

    const toggleDay = (day) => {
        setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));
    };

    const formatTime = (isoString) => {
        if (!isoString) return '--:--';
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getDurationMinutes = (start, end) => {
        if (!start || !end) return 30;
        return (new Date(end) - new Date(start)) / 60000;
    };

    const myScheduleCount = sessions.filter(s => mySchedule.includes(s.id)).length;

    return (
        <Box sx={{ mt: 2 }}>
            {/* Modern View Toggle */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 4,
            }}>
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        background: alpha(theme.palette.primary.main, 0.05),
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        p: 0.5,
                    }}
                >
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="schedule view"
                        size="small"
                        sx={{
                            '& .MuiToggleButton-root': {
                                border: 'none',
                                borderRadius: 2,
                                px: 3,
                                py: 1,
                                textTransform: 'none',
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                                '&.Mui-selected': {
                                    background: theme.palette.primary.main,
                                    color: 'white',
                                    boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    '&:hover': {
                                        background: theme.palette.primary.dark,
                                    }
                                }
                            }
                        }}
                    >
                        <ToggleButton value="personal" aria-label="my schedule">
                            <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                            My Schedule
                            <Chip
                                label={myScheduleCount}
                                size="small"
                                sx={{
                                    ml: 1,
                                    height: 20,
                                    fontSize: '0.75rem',
                                    bgcolor: viewMode === 'personal' ? alpha('#fff', 0.2) : alpha(theme.palette.primary.main, 0.1),
                                    color: viewMode === 'personal' ? 'inherit' : 'primary.main',
                                }}
                            />
                        </ToggleButton>
                        <ToggleButton value="master" aria-label="all sessions">
                            <LayersIcon sx={{ mr: 1, fontSize: 20 }} />
                            All Sessions
                            <Chip
                                label={sessions.length}
                                size="small"
                                sx={{
                                    ml: 1,
                                    height: 20,
                                    fontSize: '0.75rem',
                                    bgcolor: viewMode === 'master' ? alpha('#fff', 0.2) : alpha(theme.palette.primary.main, 0.1),
                                    color: viewMode === 'master' ? 'inherit' : 'primary.main',
                                }}
                            />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Paper>
            </Box>

            {/* Empty State */}
            {sortedSessions.length === 0 ? (
                <Box sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 4,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
                    borderRadius: 4,
                    border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
                }}>
                    <PersonIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h5" color="text.secondary" gutterBottom fontWeight={600}>
                        {viewMode === 'personal' ? 'Your schedule is empty' : 'No sessions found'}
                    </Typography>
                    {viewMode === 'personal' && (
                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
                            Switch to "All Sessions" to browse and add sessions to your personalized schedule.
                        </Typography>
                    )}
                </Box>
            ) : (
                <Stack spacing={3}>
                    {Object.entries(sessionsByDay).map(([day, daySessions], dayIndex) => (
                        <Paper
                            key={day}
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                overflow: 'hidden',
                                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                background: alpha(theme.palette.background.paper, 0.8),
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {/* Day Header */}
                            <Box
                                onClick={() => toggleDay(day)}
                                sx={{
                                    p: 2,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
                                    borderBottom: expandedDays[day] ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                                    }
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Box sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 1.5, // 12px
                                        background: theme.palette.primary.main,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '1.rem',
                                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                                    }}>
                                        {new Date(daySessions[0].startDateTime).getDate()}
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
                                            {day.split(',')[0]}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {day.split(',').slice(1).join(',')} • {daySessions.length} session{daySessions.length !== 1 ? 's' : ''}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <IconButton size="small">
                                    {expandedDays[day] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>

                            {/* Sessions Timeline */}
                            <Collapse in={expandedDays[day]}>
                                <Timeline sx={{
                                    p: 2,
                                    m: 0,
                                    '& .MuiTimelineItem-root:before': { flex: 0, padding: 0 }
                                }}>
                                    {daySessions.map((session, idx) => {
                                        const isScheduled = mySchedule.includes(session.id);
                                        const trackColor = getTrackColor(session.track);
                                        const TrackIcon = getTrackIcon(session.track);
                                        const duration = getDurationMinutes(session.startDateTime, session.endDateTime);

                                        return (
                                            <TimelineItem key={session.id}>
                                                <TimelineOppositeContent sx={{
                                                    flex: 0.15,
                                                    minWidth: 80,
                                                    pr: 2,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-end',
                                                    pt: 1.5,
                                                }}>
                                                    <Typography variant="body2" fontWeight={700} color="text.primary">
                                                        {formatTime(session.startDateTime)}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.disabled">
                                                        {duration} min
                                                    </Typography>
                                                </TimelineOppositeContent>

                                                <TimelineSeparator>
                                                    <TimelineDot
                                                        sx={{
                                                            background: trackColor.gradient,
                                                            boxShadow: `0 4px 10px ${alpha(trackColor.main, 0.3)}`,
                                                            p: 0.75,
                                                            border: 'none',
                                                            m: '12px 0'
                                                        }}
                                                    >
                                                        <TrackIcon sx={{ fontSize: 16, color: 'white' }} />
                                                    </TimelineDot>
                                                    {idx < daySessions.length - 1 && (
                                                        <TimelineConnector sx={{
                                                            background: alpha(theme.palette.divider, 0.1),
                                                            width: 2,
                                                        }} />
                                                    )}
                                                </TimelineSeparator>

                                                <TimelineContent sx={{ py: 1, px: 2 }}>
                                                    <Paper
                                                        elevation={0}
                                                        sx={{
                                                            p: 2,
                                                            borderRadius: 2, // 16px -> 12px/16px consistency (using theme shape usually, here explicit 2 = 16px, lets keep 2 for cards)
                                                            border: `1px solid ${isScheduled ? trackColor.main : alpha(theme.palette.divider, 0.08)}`,
                                                            background: isScheduled
                                                                ? alpha(trackColor.main, 0.04)
                                                                : alpha(theme.palette.background.paper, 0.6),
                                                            transition: 'all 0.2s ease',
                                                            cursor: 'pointer',
                                                            position: 'relative',
                                                            overflow: 'hidden',
                                                            '&:hover': {
                                                                transform: 'translateY(-2px)',
                                                                boxShadow: `0 8px 16px -4px ${alpha(trackColor.main, 0.15)}`,
                                                                borderColor: trackColor.main,
                                                            },
                                                            '&::before': isScheduled ? {
                                                                content: '""',
                                                                position: 'absolute',
                                                                left: 0,
                                                                top: 0,
                                                                bottom: 0,
                                                                width: 3,
                                                                background: trackColor.gradient,
                                                            } : {},
                                                        }}
                                                    >
                                                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                                                    <Chip
                                                                        label={session.track}
                                                                        size="small"
                                                                        sx={{
                                                                            height: 20,
                                                                            fontSize: '0.7rem',
                                                                            fontWeight: 600,
                                                                            background: alpha(trackColor.main, 0.1),
                                                                            color: trackColor.main,
                                                                            border: 'none',
                                                                            '& .MuiChip-label': { px: 1 }
                                                                        }}
                                                                    />
                                                                    {session.room && (
                                                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                                            <RoomIcon sx={{ fontSize: 14 }} /> {session.room}
                                                                        </Typography>
                                                                    )}
                                                                </Stack>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    fontWeight={600}
                                                                    sx={{
                                                                        mb: 0.5,
                                                                        lineHeight: 1.3,
                                                                    }}
                                                                >
                                                                    {session.title}
                                                                </Typography>
                                                                {session.description && (
                                                                    <Typography
                                                                        variant="body2"
                                                                        color="text.secondary"
                                                                        sx={{
                                                                            display: '-webkit-box',
                                                                            WebkitLineClamp: 2,
                                                                            WebkitBoxOrient: 'vertical',
                                                                            overflow: 'hidden',
                                                                            fontSize: '0.875rem'
                                                                        }}
                                                                    >
                                                                        {session.description}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    isScheduled ? removeFromSchedule(session.id) : addToSchedule(session.id);
                                                                }}
                                                                sx={{
                                                                    ml: 1,
                                                                    p: 0.5,
                                                                    border: `1px solid ${isScheduled ? 'transparent' : alpha(theme.palette.divider, 0.2)}`,
                                                                    background: isScheduled
                                                                        ? trackColor.gradient
                                                                        : 'transparent',
                                                                    color: isScheduled ? 'white' : 'text.secondary',
                                                                    '&:hover': {
                                                                        background: isScheduled
                                                                            ? trackColor.main
                                                                            : alpha(theme.palette.action.hover, 0.1),
                                                                    }
                                                                }}
                                                                size="small"
                                                            >
                                                                {isScheduled ? <CheckIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                                                            </IconButton>
                                                        </Stack>
                                                    </Paper>
                                                </TimelineContent>
                                            </TimelineItem>
                                        );
                                    })}
                                </Timeline>
                            </Collapse>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default TimelineView;
