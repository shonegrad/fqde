import React from 'react';
import { useApp } from '../../context/AppContext';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Chip,
    Box,
    Stack,
    Avatar
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const ResourceCard = ({ resource }) => {
    const { savedResources, toggleSaveResource } = useApp();
    const isSaved = savedResources.includes(resource.id);

    const getAccessIcon = (access) => {
        if (access === 'Public') return <PublicIcon sx={{ fontSize: 16 }} />;
        if (access === 'Network') return <GroupIcon sx={{ fontSize: 16 }} />;
        return <LockIcon sx={{ fontSize: 16 }} />;
    };

    const getAccessColor = (access) => {
        if (access === 'Public') return 'success';
        if (access === 'Network') return 'info';
        return 'default';
    }

    return (
        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 1, borderColor: 'primary.main' }, transition: 'all 0.2s' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Avatar sx={{ bgcolor: 'action.selected', color: 'text.secondary', width: 48, height: 48 }}>
                    <ArticleIcon />
                    {/* Hacky way to show type below if needed, or just rely on icon */}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h6" component="h3" sx={{ fontFamily: 'serif', fontWeight: 600, lineHeight: 1.2, mb: 1 }}>
                            {resource.title}
                        </Typography>
                        <IconButton
                            onClick={() => toggleSaveResource(resource.id)}
                            color={isSaved ? "primary" : "default"}
                            size="small"
                        >
                            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                        <Chip
                            icon={getAccessIcon(resource.access)}
                            label={resource.access}
                            size="small"
                            color={getAccessColor(resource.access)}
                            variant="outlined"
                        />
                        <Typography variant="caption" color="text.secondary">
                            by {resource.owner}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                        {resource.tags.map(tag => (
                            <Chip
                                key={tag}
                                label={`#${tag}`}
                                size="small"
                                sx={{ height: 20, fontSize: '0.7rem', bgcolor: 'action.hover' }}
                            />
                        ))}
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ResourceCard;
