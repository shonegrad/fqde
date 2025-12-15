import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    IconButton,
    Chip,
    Avatar
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArticleIcon from '@mui/icons-material/Article';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { useApp } from '../../context/AppContext';

const FeedItem = ({ item }) => {
    const { events, resources, savedResources, toggleSaveResource } = useApp();

    let content;
    let icon;
    let action;

    if (item.type === 'announcement') {
        icon = (
            <Avatar sx={{ bgcolor: 'info.light', color: 'info.contrastText' }}>
                <NotificationsIcon />
            </Avatar>
        );
        content = (
            <Box>
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                    {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {item.date} • {item.author}
                </Typography>
            </Box>
        );
    } else if (item.type === 'resource') {
        const resource = resources.find(r => r.id === item.resourceId);
        if (!resource) return null;

        const isSaved = savedResources.includes(resource.id);

        icon = (
            <Avatar sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}>
                <ArticleIcon />
            </Avatar>
        );
        content = (
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                    {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    {item.date} • Resource: {resource.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip label={resource.type} size="small" variant="outlined" />
                    <Chip label={resource.access} size="small" color={resource.access === 'Public' ? 'default' : 'warning'} variant="outlined" />
                </Stack>
            </Box>
        );
        action = (
            <IconButton onClick={() => toggleSaveResource(resource.id)} color={isSaved ? "primary" : "default"}>
                {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
        )
    } else if (item.type === 'event') {
        const event = events.find(e => e.id === item.eventId);
        if (!event) return null;

        icon = (
            <Avatar sx={{ bgcolor: 'warning.light', color: 'warning.contrastText' }}>
                <CalendarTodayIcon />
            </Avatar>
        );
        content = (
            <Box>
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                    {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                    {item.date} • {event.dateRange}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {event.title}
                </Typography>
            </Box>
        );
    }

    return (
        <Card variant="outlined" sx={{ '&:hover': { boxShadow: 1, borderColor: 'primary.main' }, transition: 'all 0.2s' }}>
            <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', pb: '16px !important' }}>
                {icon}
                <Box sx={{ flexGrow: 1 }}>
                    {content}
                </Box>
                {action && <Box>{action}</Box>}
            </CardContent>
        </Card>
    );
};

export default FeedItem;
