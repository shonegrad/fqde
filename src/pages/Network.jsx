import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import NetworkMap from '../components/Network/NetworkMap';
import OrgCard from '../components/Network/OrgCard';
import MemberCard from '../components/Network/MemberCard';
import OrgProfileModal from '../components/Network/OrgProfileModal';
import LazyList from '../components/common/LazyList';
import {
    Container,
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Stack,
    Paper,
    TextField,
    InputAdornment,
    Fade
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

    const renderOrgCard = (org) => (
        <OrgCard org={org} onClick={setSelectedNode} />
    );

    const renderMemberCard = (member) => (
        <MemberCard member={member} onClick={setSelectedNode} />
    );

    if (dataLoading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">Loading network data...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{
            // Only fix height if map view is active to allow efficient scrolling for list
            height: view === 'map' ? 'calc(100vh - 80px)' : 'auto',
            display: 'flex',
            flexDirection: 'column',
            pb: 2
        }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                        Network Directory
                    </Typography>
                    <Typography variant="h6" color="text.secondary" fontWeight={400}>
                        Connecting {organizations.length} institutions and {people.length.toLocaleString()} educators.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                    <ToggleButtonGroup
                        value={contentType}
                        exclusive
                        onChange={(e, v) => v && setContentType(v)}
                        size="small"
                        color="primary"
                        sx={{
                            bgcolor: 'rgba(241, 245, 249, 0.6)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid',
                            borderColor: 'rgba(15, 23, 42, 0.06)',
                            borderRadius: '12px', // Explicit 12px
                            p: 0.5,
                            '& .MuiToggleButton-root': { border: 'none', borderRadius: '8px', px: 1.5, py: 0.5, fontSize: '0.85rem' } // Explicit 8px
                        }}
                    >
                        <ToggleButton value="orgs"><BusinessIcon sx={{ mr: 0.5, fontSize: 18 }} /> Organizations</ToggleButton>
                        <ToggleButton value="members"><PeopleIcon sx={{ mr: 0.5, fontSize: 18 }} /> Members</ToggleButton>
                    </ToggleButtonGroup>

                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={(e, v) => v && setView(v)}
                        size="small"
                        color="primary"
                        sx={{
                            bgcolor: 'rgba(241, 245, 249, 0.6)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid',
                            borderColor: 'rgba(15, 23, 42, 0.06)',
                            borderRadius: '12px', // Explicit 12px
                            p: 0.5,
                            '& .MuiToggleButton-root': { border: 'none', borderRadius: '8px', px: 1.5, py: 0.5, fontSize: '0.85rem' } // Explicit 8px
                        }}
                    >
                        <ToggleButton value="map" disabled={contentType === 'members'}><MapIcon sx={{ mr: 0.5, fontSize: 18 }} /> Map</ToggleButton>
                        <ToggleButton value="list"><ListIcon sx={{ mr: 0.5, fontSize: 18 }} /> List</ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Stack>

            <Paper
                component={Fade} in={true}
                elevation={0}
                sx={{
                    p: 1.5,
                    mb: 4,
                    borderRadius: '12px', // Explicit 12px
                    bgcolor: 'rgba(241, 245, 249, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid',
                    borderColor: 'rgba(15, 23, 42, 0.06)',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <TextField
                    fullWidth
                    placeholder={`Search ${contentType === 'orgs' ? 'organizations' : 'people'} by name, location, or expertise...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon color="primary" sx={{ opacity: 0.7 }} /></InputAdornment>,
                        disableUnderline: true,
                        sx: { fontSize: '1rem' }
                    }}
                    variant="standard"
                />
            </Paper>

            {searchQuery && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                    Found <strong>{contentType === 'orgs' ? filteredOrganizations.length : filteredPeople.length}</strong> results matching "{searchQuery}"
                </Typography>
            )}

            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                {view === 'map' && contentType === 'orgs' ? (
                    <Paper elevation={0} sx={{ height: '100%', borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                        <NetworkMap onNodeClick={setSelectedNode} organizations={organizations} />
                    </Paper>
                ) : (
                    <Box sx={{ pb: 4 }}>
                        {contentType === 'orgs' ? (
                            <LazyList
                                items={filteredOrganizations}
                                renderItem={renderOrgCard}
                                batchSize={24}
                                emptyMessage={`No organizations found matching "${searchQuery}"`}
                                loadingMessage="Loading more organizations..."
                            />
                        ) : (
                            <LazyList
                                items={filteredPeople}
                                renderItem={renderMemberCard}
                                batchSize={30}
                                emptyMessage={`No people found matching "${searchQuery}"`}
                                loadingMessage="Loading more people..."
                            />
                        )}
                    </Box>
                )}
            </Box>

            {selectedNode && <OrgProfileModal node={selectedNode} onClose={() => setSelectedNode(null)} />}
        </Container>
    );
};

export default Network;
