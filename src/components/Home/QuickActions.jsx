import React from 'react';
import { Card, CardContent, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom color="primary">Quick Actions</Typography>
                <List disablePadding>
                    {actions.map((action, idx) => (
                        <ListItemButton key={idx} sx={{ borderRadius: 1, mb: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>{action.icon}</ListItemIcon>
                            <ListItemText primary={action.label} primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} />
                        </ListItemButton>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default QuickActions;
