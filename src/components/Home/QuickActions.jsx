import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SendIcon from '@mui/icons-material/Send';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useApp } from '../../context/AppContext';
import { ROLES } from '../../data/seed';

const QuickActions = () => {
    const { currentUser } = useApp();

    const actions = [];

    if (currentUser.role === ROLES.ADMIN) {
        actions.push({ label: 'Upload Resource', icon: <UploadIcon fontSize="small" /> });
        actions.push({ label: 'Manage Users', icon: <GroupIcon fontSize="small" /> });
    }

    if (currentUser.role === ROLES.ORGANIZER) {
        actions.push({ label: 'Create Event', icon: <CalendarTodayIcon fontSize="small" /> });
        actions.push({ label: 'Post Update', icon: <SendIcon fontSize="small" /> });
    }

    if (currentUser.role === ROLES.REP) {
        actions.push({ label: 'Post Announcement', icon: <NotificationsIcon fontSize="small" /> });
    }

    // Common actions
    actions.push({ label: 'Invite Colleague', icon: <AddIcon fontSize="small" /> });

    return (
        <Card variant="outlined" sx={{ bgcolor: 'background.default' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 600, color: 'primary.main' }}>
                    Quick Actions
                </Typography>
                <List disablePadding>
                    {actions.map((action, idx) => (
                        <ListItemButton
                            key={idx}
                            sx={{
                                borderRadius: 1,
                                mb: 0.5,
                                border: 1,
                                borderColor: 'divider',
                                bgcolor: 'background.paper',
                                '&:hover': {
                                    bgcolor: 'action.hover',
                                    borderColor: 'primary.light'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
                                {action.icon}
                            </ListItemIcon>
                            <ListItemText primary={action.label} primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} />
                        </ListItemButton>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default QuickActions;
