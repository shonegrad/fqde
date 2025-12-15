import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import NetworkMap from '../components/Network/NetworkMap';
import OrgCard from '../components/Network/OrgCard';
import MemberCard from '../components/Network/MemberCard';
import OrgProfileModal from '../components/Network/OrgProfileModal';
import {
    Container,
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Grid,
    Stack,
    Paper,
    TextField,
    InputAdornment
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';

const Network = () => {
    const { organizations, users: people, dataLoading } = useApp();
    const [view, setView] = useState('list');
    const [contentType, setContentType] = useState('orgs');
    const [selectedNode, setSelectedNode] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredOrganizations = useMemo(() => {
        if (!searchQuery) return organizations;
        const query = searchQuery.toLowerCase();
        return organizations.filter(org =>
            org.name.toLowerCase().includes(query) ||
            org.city?.toLowerCase().includes(query) ||
            org.region?.toLowerCase().includes(query) ||
            org.tags?.some(tag => tag.toLowerCase().includes(query))
        );
    }, [organizations, searchQuery]);

    const filteredPeople = useMemo(() => {
        if (!searchQuery) return people;
        const query = searchQuery.toLowerCase();
        return people.filter(person =>
            person.displayName?.toLowerCase().includes(query) ||
            person.firstName?.toLowerCase().includes(query) ||
            person.lastName?.toLowerCase().includes(query) ||
            person.city?.toLowerCase().includes(query) ||
            person.title?.toLowerCase().includes(query) ||
            person.tags?.some(tag => tag.toLowerCase().includes(query))
        );
    }, [people, searchQuery]);

    if (dataLoading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">Loading network data...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', pb: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>Network Directory</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Connecting {organizations.length} institutions and {people.length.toLocaleString()} educators across Quebec.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2}>
                    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
                        <ToggleButtonGroup value={contentType} exclusive onChange={(e, v) => v && setContentType(v)} size="small" color="primary">
                            <ToggleButton value="orgs"><BusinessIcon sx={{ mr: 1, fontSize: 18 }} /> Orgs</ToggleButton>
                            <ToggleButton value="members"><PeopleIcon sx={{ mr: 1, fontSize: 18 }} /> Members</ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>
                    <Paper variant="outlined" sx={{ borderRadius: 2 }}>
                        <ToggleButtonGroup value={view} exclusive onChange={(e, v) => v && setView(v)} size="small" color="primary">
                            <ToggleButton value="map" disabled={contentType === 'members'}><MapIcon sx={{ mr: 1, fontSize: 18 }} /> Map</ToggleButton>
                            <ToggleButton value="list"><ListIcon sx={{ mr: 1, fontSize: 18 }} /> List</ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>
                </Stack>
            </Stack>

            <TextField
                fullWidth
                placeholder={`Search ${contentType === 'orgs' ? 'organizations' : 'people'} by name, location, or expertise...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                size="small"
                sx={{ mb: 2 }}
            />
            {searchQuery && (
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Found {contentType === 'orgs' ? filteredOrganizations.length : filteredPeople.length} results
                </Typography>
            )}

            <Paper variant="outlined" sx={{ flexGrow: 1, minHeight: 0, overflow: 'hidden', borderRadius: 2 }}>
                {view === 'map' && contentType === 'orgs' ? (
                    <Box sx={{ height: '100%' }}>
                        <NetworkMap onNodeClick={setSelectedNode} organizations={organizations} />
                    </Box>
                ) : (
                    <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
                        <Grid container spacing={2}>
                            {contentType === 'orgs' ? (
                                filteredOrganizations.length > 0 ? filteredOrganizations.map(org => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={org.id}>
                                        <OrgCard org={org} onClick={setSelectedNode} />
                                    </Grid>
                                )) : (
                                    <Grid size={12}>
                                        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                                            No organizations found matching "{searchQuery}"
                                        </Typography>
                                    </Grid>
                                )
                            ) : (
                                filteredPeople.length > 0 ? filteredPeople.map(member => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={member.id}>
                                        <MemberCard member={member} onClick={setSelectedNode} />
                                    </Grid>
                                )) : (
                                    <Grid size={12}>
                                        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                                            No people found matching "{searchQuery}"
                                        </Typography>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Box>
                )}
            </Paper>

            {selectedNode && <OrgProfileModal node={selectedNode} onClose={() => setSelectedNode(null)} />}
        </Container>
    );
};

export default Network;
