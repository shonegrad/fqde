import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ORGANIZATIONS, USERS } from '../data/seed';
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
    Tab,
    Tabs
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';

const Network = () => {
    const [view, setView] = useState('list'); // 'map' or 'list'
    const [contentType, setContentType] = useState('orgs'); // 'orgs' or 'members'
    const [selectedNode, setSelectedNode] = useState(null);

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    const handleContentTypeChange = (event, newValue) => {
        if (newValue !== null) {
            setContentType(newValue);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', pb: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 600 }}>
                        Network Directory
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Connecting {ORGANIZATIONS.length} institutions and {USERS.length} educators.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2}>
                    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 1 }}>
                        <ToggleButtonGroup
                            value={contentType}
                            exclusive
                            onChange={handleContentTypeChange}
                            size="small"
                            color="primary"
                        >
                            <ToggleButton value="orgs">
                                <BusinessIcon sx={{ mr: 1, fontSize: 20 }} /> Orgs
                            </ToggleButton>
                            <ToggleButton value="members">
                                <PeopleIcon sx={{ mr: 1, fontSize: 20 }} /> Members
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>

                    <Paper elevation={0} variant="outlined" sx={{ borderRadius: 1 }}>
                        <ToggleButtonGroup
                            value={view}
                            exclusive
                            onChange={handleViewChange}
                            aria-label="view mode"
                            size="small"
                            color="primary"
                        >
                            <ToggleButton value="map" aria-label="map view" disabled={contentType === 'members'}>
                                <MapIcon sx={{ mr: 1, fontSize: 20 }} /> Map
                            </ToggleButton>
                            <ToggleButton value="list" aria-label="list view">
                                <ListIcon sx={{ mr: 1, fontSize: 20 }} /> List
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>
                </Stack>
            </Stack>

            <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
                {view === 'map' && contentType === 'orgs' ? (
                    <Box sx={{ height: '100%', width: '100%' }}>
                        <NetworkMap onNodeClick={setSelectedNode} />
                    </Box>
                ) : (
                    <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
                        <Grid container spacing={3}>
                            {contentType === 'orgs' ? (
                                ORGANIZATIONS.map(org => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={org.id}>
                                        <OrgCard org={org} onClick={setSelectedNode} />
                                    </Grid>
                                ))
                            ) : (
                                USERS.map(member => (
                                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={member.id}>
                                        <MemberCard member={member} onClick={setSelectedNode} />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Box>
                )}
            </Box>

            {selectedNode && (
                <OrgProfileModal node={selectedNode} onClose={() => setSelectedNode(null)} />
            )}
        </Container>
    );
};
export default Network;
