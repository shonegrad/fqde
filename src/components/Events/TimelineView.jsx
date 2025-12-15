import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SessionCard from './SessionCard';
import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Stack,
    Typography,
    Paper
} from '@mui/material';
import LayersIcon from '@mui/icons-material/Layers';
import PersonIcon from '@mui/icons-material/Person';

const TimelineView = ({ event }) => {
    const { mySchedule } = useApp();
    const [viewMode, setViewMode] = useState('master'); // 'master' or 'personal'

    // Filter sessions
    const sessions = viewMode === 'personal'
        ? event.sessions.filter(s => mySchedule.includes(s.id))
        : event.sessions;

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setViewMode(newView);
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            {/* View Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Paper elevation={0} variant="outlined" sx={{ borderRadius: 1 }}>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="schedule view"
                        size="small"
                        color="primary"
                    >
                        <ToggleButton value="personal" aria-label="for you">
                            <PersonIcon sx={{ mr: 1, fontSize: 18 }} /> For You
                        </ToggleButton>
                        <ToggleButton value="master" aria-label="master schedule">
                            <LayersIcon sx={{ mr: 1, fontSize: 18 }} /> Master Schedule
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Paper>
            </Box>

            {/* Timeline Content */}
            <Stack spacing={2}>
                {sessions.length === 0 ? (
                    <Box sx={{
                        textAlign: 'center',
                        py: 6,
                        bgcolor: 'background.default',
                        borderRadius: 2,
                        border: '1px dashed',
                        borderColor: 'divider'
                    }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {viewMode === 'personal' ? 'Your schedule is empty.' : 'No sessions found.'}
                        </Typography>
                        {viewMode === 'personal' && (
                            <Typography variant="body2" color="text.secondary">
                                Switch to Master Schedule to add sessions.
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Stack spacing={2}>
                        {sessions
                            .sort((a, b) => new Date(a.start) - new Date(b.start))
                            .map(session => (
                                <SessionCard
                                    key={session.id}
                                    session={session}
                                    eventId={event.id}
                                    isForYouView={viewMode === 'personal'}
                                />
                            ))}
                    </Stack>
                )}
            </Stack>
        </Box>
    );
};

export default TimelineView;
