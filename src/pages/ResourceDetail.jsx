import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
    Container,
    Box,
    Typography,
    Button,
    Chip,
    Stack,
    Grid,
    Paper,
    Divider,
    IconButton,
    Avatar
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonIcon from '@mui/icons-material/Person';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LinkIcon from '@mui/icons-material/Link';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TableChartIcon from '@mui/icons-material/TableChart';
import ArticleIcon from '@mui/icons-material/Article';

const ResourceDetail = () => {
    const { resourceId } = useParams();
    const navigate = useNavigate();
    const { resources, savedResources, toggleSaveResource, dataLoading } = useApp();

    const resource = useMemo(() => {
        if (!resources) return null;
        return resources.find(r => r.id === resourceId);
    }, [resources, resourceId]);

    const isSaved = (savedResources || []).includes(resource?.id);

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

    if (dataLoading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Typography color="text.secondary">Loading resource...</Typography>
                </Box>
            </Container>
        );
    }

    if (!resource) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Resource Not Found
                    </Typography>
                    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/resources')} sx={{ mt: 2 }}>
                        Back to Library
                    </Button>
                </Box>
            </Container>
        );
    }

    const isVideo = resource.type?.toUpperCase() === 'VIDEO';

    return (
        <Container maxWidth="lg">
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/resources')}
                color="inherit"
                sx={{ mb: 3 }}
            >
                Back to Library
            </Button>

            <Grid container spacing={4}>
                {/* Main Content Area */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {/* Mock Viewer */}
                    <Paper
                        elevation={0}
                        sx={{
                            width: '100%',
                            aspectRatio: isVideo ? '16/9' : '4/3',
                            bgcolor: 'grey.900',
                            borderRadius: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'common.white',
                            mb: 4,
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        {isVideo ? (
                            <>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        opacity: 0.4
                                    }}
                                />
                                <IconButton sx={{ color: 'white', '&:hover': { transform: 'scale(1.1)' }, transition: 'transform 0.2s', zIndex: 1 }}>
                                    <PlayCircleOutlineIcon sx={{ fontSize: 80 }} />
                                </IconButton>
                                <Typography variant="h6" sx={{ mt: 2, zIndex: 1, fontWeight: 500 }}>Preview not available for mock content</Typography>
                            </>
                        ) : (
                            <Stack spacing={2} alignItems="center">
                                <InsertDriveFileIcon sx={{ fontSize: 64, opacity: 0.5 }} />
                                <Typography variant="h6" fontWeight={500}>Document Viewer Placeholder</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>This is a simulated {resource.type} preview.</Typography>
                                <Button variant="contained" startIcon={<DownloadIcon />} sx={{ mt: 2 }}>
                                    Download File
                                </Button>
                            </Stack>
                        )}
                    </Paper>

                    {/* Details */}
                    <Box sx={{ mb: 6 }}>
                        <Stack direction="row" spacing={2} alignItems="flex-start" justifyContent="space-between">
                            <Box>
                                <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                                    {resource.title}
                                </Typography>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                                    <Chip
                                        icon={getTypeIcon(resource.type)}
                                        label={resource.type || 'Document'}
                                        color="primary"
                                        variant="outlined"
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Added {new Date(resource.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                </Stack>
                            </Box>

                            {/* Actions */}
                            <Stack direction="row" spacing={1}>
                                <IconButton color="primary" sx={{ bgcolor: 'action.hover' }}>
                                    <ShareIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => toggleSaveResource(resource.id)}
                                    color={isSaved ? "primary" : "default"}
                                    sx={{ bgcolor: 'action.hover' }}
                                >
                                    {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                                </IconButton>
                            </Stack>
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" gutterBottom fontWeight={600}>About this Resource</Typography>
                        <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {resource.description || 'No description provided for this resource. This is mock data generated for testing purposes.'}
                        </Typography>

                        {resource.tags && resource.tags.length > 0 && (
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="subtitle2" gutterBottom color="text.secondary" fontWeight={600}>TAGS</Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {resource.tags.map(tag => (
                                        <Chip key={tag} label={tag} size="small" sx={{ mb: 1 }} />
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Box>
                </Grid>

                {/* Sidebar */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                            SHARED BY
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                                <PersonIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={600}>
                                    {resource.authorName || 'FQDE Network'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {resource.authorRole || 'Organization Member'}
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>

                    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                            RESOURCE DETAILS
                        </Typography>
                        <Stack spacing={2} sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Visibility</Typography>
                                <Typography variant="body2" fontWeight={500}>{resource.visibility || 'Public'}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Format</Typography>
                                <Typography variant="body2" fontWeight={500}>{resource.type || 'Unknown'}</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">File Size</Typography>
                                <Typography variant="body2" fontWeight={500}>{resource.size || '1.2 MB'}</Typography>
                            </Box>
                            <Button variant="contained" fullWidth startIcon={<DownloadIcon />} sx={{ mt: 2 }}>
                                Download Resource
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ResourceDetail;
