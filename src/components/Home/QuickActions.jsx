import React from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SendIcon from '@mui/icons-material/Send';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { useApp } from '../../context/AppContext';

const QuickActions = () => {
    const { currentUser } = useApp();
    const actions = [];
    const userRole = (currentUser?.role || currentUser?.title || '').toLowerCase();

    if (userRole.includes('admin')) {
        actions.push({ label: 'Upload Resource', icon: <UploadIcon /> });
        actions.push({ label: 'Manage Users', icon: <GroupIcon /> });
    }
    if (userRole.includes('organizer')) {
        actions.push({ label: 'Create Event', icon: <CalendarTodayIcon /> });
        actions.push({ label: 'Post Update', icon: <SendIcon /> });
    }
    if (userRole.includes('rep') || userRole.includes('director')) {
        actions.push({ label: 'Post Announcement', icon: <NotificationsIcon /> });
    }
    actions.push({ label: 'Find Colleagues', icon: <SearchIcon /> });
    actions.push({ label: 'Browse Network', icon: <PeopleIcon /> });
    actions.push({ label: 'Invite Member', icon: <AddIcon /> });

    return (
        <Card variant="outlined" sx={{ borderRadius: 1 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom color="primary">Quick Actions</Typography>
                <Grid container spacing={1}>
                    {actions.map((action, idx) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                            <Button
                                variant="outlined"
                                color="inherit"
                                fullWidth
                                startIcon={action.icon}
                                sx={{
                                    justifyContent: 'flex-start',
                                    textAlign: 'left',
                                    textTransform: 'none',
                                    py: 1,
                                    borderColor: 'divider',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: 'action.hover'
                                    }
                                }}
                            >
                                {action.label}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default QuickActions;
