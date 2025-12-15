import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ORGANIZATIONS } from '../data/seed';
import NetworkMap from '../components/Network/NetworkMap';
import OrgCard from '../components/Network/OrgCard';
import OrgProfileModal from '../components/Network/OrgProfileModal';
import {
    Container,
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Grid,
    Stack,
    Paper
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';

const Network = () => {
    const [view, setView] = useState('map'); // 'map' or 'list'
    const [selectedNode, setSelectedNode] = useState(null);

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
            setView(newView);
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
                        Explore connections between {ORGANIZATIONS.length} institutions.
                    </Typography>
                </Box>

                <Paper elevation={0} variant="outlined" sx={{ borderRadius: 1 }}>
                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={handleViewChange}
                        aria-label="view mode"
                        size="small"
                        color="primary"
                    >
                        <ToggleButton value="map" aria-label="map view">
                            <MapIcon sx={{ mr: 1, fontSize: 20 }} /> Map
                        </ToggleButton>
                        <ToggleButton value="list" aria-label="list view">
                            <ListIcon sx={{ mr: 1, fontSize: 20 }} /> List
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Paper>
            </Stack>

            <Box sx={{ flexGrow: 1, minHeight: 0, position: 'relative', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
                {view === 'map' ? (
                    <Box sx={{ height: '100%', width: '100%' }}>
                        <NetworkMap onNodeClick={setSelectedNode} />
                    </Box>
                ) : (
                    <Box sx={{ height: '100%', overflowY: 'auto', p: 3 }}>
                        <Grid container spacing={3}>
                            {ORGANIZATIONS.map(org => (
                                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={org.id}>
                                    <OrgCard org={org} onClick={setSelectedNode} />
                                </Grid>
                            ))}
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
