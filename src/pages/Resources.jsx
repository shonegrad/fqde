import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ResourceCard from '../components/Resources/ResourceCard';
import UploadModal from '../components/Resources/UploadModal';
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
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import FilterListIcon from '@mui/icons-material/FilterList';

const Resources = () => {
    const { resources, currentUser, dataLoading } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [visibilityFilter, setVisibilityFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    const resourceTypes = useMemo(() => {
        if (!resources) return [];
        return [...new Set(resources.map(r => r.type).filter(Boolean))].sort();
    }, [resources]);

    const filteredResources = useMemo(() => {
        if (!resources) return [];
        return resources.filter(r => {
            const matchesSearch = !searchTerm ||
                r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (r.tags || []).some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesVisibility = visibilityFilter === 'All' || r.visibility === visibilityFilter;
            const matchesType = typeFilter === 'All' || r.type === typeFilter;
            return matchesSearch && matchesVisibility && matchesType;
        });
    }, [resources, searchTerm, visibilityFilter, typeFilter]);

    const canUpload = useMemo(() => {
        if (!currentUser) return false;
        const role = (currentUser.role || currentUser.title || '').toLowerCase();
        return role.includes('admin') || role.includes('director') || role.includes('coordinator');
    }, [currentUser]);

    if (dataLoading) {
        return (
            <Container maxWidth="lg">
                <Box sx={{ py: 8, textAlign: 'center' }}>
                    <Typography variant="h5" color="text.secondary">Loading resources...</Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 4 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>Resource Library</Typography>
                    <Typography variant="body1" color="text.secondary">
                        {resources?.length || 0} resources shared across the network
                    </Typography>
                </Box>
                {canUpload && (
                    <Button variant="contained" startIcon={<UploadIcon />} onClick={() => setShowUpload(true)}>
                        Upload Resource
                    </Button>
                )}
            </Stack>

            <Box
                sx={{
                    p: 1.5,
                    mb: 4,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider'
                }}
            >
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        fullWidth
                        placeholder="Search by title, description, or tag..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon color="primary" sx={{ opacity: 0.5, fontSize: 20 }} /></InputAdornment>,
                            disableUnderline: true
                        }}
                        variant="standard"
                        sx={{ flex: 1 }}
                    />
                    <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={typeFilter}
                            label="Type"
                            onChange={(e) => setTypeFilter(e.target.value)}
                            disableUnderline
                            sx={{ fontWeight: 600, color: 'primary.main' }}
                        >
                            <MenuItem value="All">All Types</MenuItem>
                            {resourceTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <FilterListIcon color="action" />
                        {['All', 'Public', 'Network', 'Org-only'].map(f => (
                            <Chip
                                key={f}
                                label={f}
                                onClick={() => setVisibilityFilter(f)}
                                color={visibilityFilter === f ? "primary" : "default"}
                                variant={visibilityFilter === f ? "filled" : "outlined"}
                                clickable
                                sx={{ border: 'none', fontWeight: 500 }}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Box>

            {(searchTerm || visibilityFilter !== 'All' || typeFilter !== 'All') && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Showing {filteredResources.length} of {resources?.length || 0} resources
                </Typography>
            )}

            <Grid container spacing={2}>
                {filteredResources.length > 0 ? filteredResources.slice(0, 50).map(resource => (
                    <Grid size={{ xs: 12, md: 6 }} key={resource.id}>
                        <ResourceCard resource={resource} />
                    </Grid>
                )) : (
                    <Grid size={12}>
                        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 6 }}>
                            No resources found matching your criteria.
                        </Typography>
                    </Grid>
                )}
                {filteredResources.length > 50 && (
                    <Grid size={12}>
                        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                            Showing first 50 of {filteredResources.length} results. Use filters to narrow down.
                        </Typography>
                    </Grid>
                )}
            </Grid>

            {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
        </Container>
    );
};

export default Resources;
