import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, Typography, IconButton, Chip, Box, Stack, Avatar } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LinkIcon from '@mui/icons-material/Link';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TableChartIcon from '@mui/icons-material/TableChart';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const ResourceCard = ({ resource }) => {
    const { savedResources, toggleSaveResource } = useApp();
    const isSaved = (savedResources || []).includes(resource.id);
    const visibility = resource.visibility || resource.access || 'Public';
    const tags = resource.tags || [];

    const getVisibilityIcon = (vis) => {
        if (vis === 'Public') return <PublicIcon sx={{ fontSize: 14 }} />;
        if (vis === 'Network') return <GroupIcon sx={{ fontSize: 14 }} />;
        return <LockIcon sx={{ fontSize: 14 }} />;
    };

    const getVisibilityColor = (vis) => {
        if (vis === 'Public') return 'success';
        if (vis === 'Network') return 'info';
        return 'default';
    };

    const getTypeIcon = (type) => {
        switch (type?.toUpperCase()) {
            case 'PDF': return <PictureAsPdfIcon />;
            case 'VIDEO': return <VideoLibraryIcon />;
            case 'LINK': return <LinkIcon />;
            case 'PRESENTATION': return <SlideshowIcon />;
            case 'SPREADSHEET': return <TableChartIcon />;
            default: return <ArticleIcon />;
        }
    };

    return (
        <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main' } }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Avatar sx={{ bgcolor: 'action.selected' }}>{getTypeIcon(resource.type)}</Avatar>

                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Typography variant="h6" sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {resource.title}
                        </Typography>
                        <IconButton onClick={() => toggleSaveResource(resource.id)} color={isSaved ? "primary" : "default"} size="small">
                            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                    </Stack>

                    {resource.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {resource.description}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Chip icon={getVisibilityIcon(visibility)} label={visibility} size="small" color={getVisibilityColor(visibility)} variant="outlined" />
                        <Chip label={resource.type || 'DOC'} size="small" variant="outlined" />
                    </Stack>

                    {tags.length > 0 && (
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                            {tags.slice(0, 3).map(tag => <Chip key={tag} label={`#${tag}`} size="small" />)}
                            {tags.length > 3 && <Chip label={`+${tags.length - 3}`} size="small" />}
                        </Stack>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ResourceCard;
