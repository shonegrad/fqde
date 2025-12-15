import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ResourceCard from '../components/Resources/ResourceCard';
import UploadModal from '../components/Resources/UploadModal';
import { ROLES } from '../data/seed';
import {
    Container,
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Chip,
    Stack,
    Grid,
    Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import FilterListIcon from '@mui/icons-material/FilterList';

const Resources = () => {
    const { resources, currentUser } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All'); // All, Public, Network, Institution-Only

    // Filter logic
    const filteredResources = resources.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

        if (activeFilter !== 'All' && r.access !== activeFilter) return false;

        return matchesSearch;
    });

    const canUpload = [ROLES.ADMIN, ROLES.DIRECTOR].includes(currentUser.role);

    return (
        <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 4 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 600 }}>
                        Resource Library
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Shared knowledge and tools across the network.
                    </Typography>
                </Box>

                {canUpload ? (
                    <Button
                        variant="contained"
                        startIcon={<UploadIcon />}
                        onClick={() => setShowUpload(true)}
                    >
                        Upload Resource
                    </Button>
                ) : (
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Switch to Admin/Director to upload
                    </Typography>
                )}
            </Stack>

            {/* Search & Filters */}
            <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 4 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        fullWidth
                        placeholder="Search by title or tag..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                        sx={{ flex: 1 }}
                    />

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: '100%', md: 'auto' }, overflowX: 'auto', pb: { xs: 1, md: 0 } }}>
                        <FilterListIcon color="action" />
                        {['All', 'Public', 'Network', 'Institution-Only'].map(f => (
                            <Chip
                                key={f}
                                label={f}
                                onClick={() => setActiveFilter(f)}
                                color={activeFilter === f ? "primary" : "default"}
                                variant={activeFilter === f ? "filled" : "outlined"}
                                clickable
                            />
                        ))}
                    </Stack>
                </Stack>
            </Paper>

            {/* Results */}
            <Grid container spacing={2}>
                {filteredResources.map(resource => (
                    <Grid size={{ xs: 12, md: 6 }} key={resource.id}>
                        <ResourceCard resource={resource} />
                    </Grid>
                ))}
                {filteredResources.length === 0 && (
                    <Grid size={{ xs: 12 }}>
                        <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
                            No resources found matching your criteria.
                        </Typography>
                    </Grid>
                )}
            </Grid>

            {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
        </Container>
    );
};

export default Resources;
