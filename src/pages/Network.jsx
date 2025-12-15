import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import NetworkMap from '../components/Network/NetworkMap';
import OrgProfileModal from '../components/Network/OrgProfileModal';
import {
    Container,
    Box,
    Typography,
    Paper,
    TextField,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
    Chip,
    Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PlaceIcon from '@mui/icons-material/Place';
import CategoryIcon from '@mui/icons-material/Category';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import GridViewIcon from '@mui/icons-material/GridView';
import HubIcon from '@mui/icons-material/Hub';

const GROUPING_OPTIONS = [
    { value: 'tags', label: 'Tag', icon: LocalOfferIcon },
    { value: 'region', label: 'Region', icon: PlaceIcon },
    { value: 'type', label: 'Type', icon: CategoryIcon },
    { value: 'association', label: 'Assoc', icon: GroupWorkIcon }
];

const VIEW_OPTIONS = [
    { value: 'pack', label: 'Bubble', icon: BubbleChartIcon },
    { value: 'treemap', label: 'Treemap', icon: GridViewIcon },
    { value: 'force', label: 'Force', icon: HubIcon }
];

const Network = () => {
    const { organizations, users, associations, memberships, dataLoading } = useApp();
    const [selectedNode, setSelectedNode] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [groupBy, setGroupBy] = useState('tags');
    const [selectedTag, setSelectedTag] = useState(null);
    const [viewType, setViewType] = useState('pack');

    // Extract all unique tags
    const allTags = React.useMemo(() => {
        const tagSet = new Set();
        organizations.forEach(org => {
            (org.tags || []).forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort();
    }, [organizations]);

    if (dataLoading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">Loading network data...</Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100vh - 180px)',
                minHeight: 500,
                pb: 2
            }}
        >
            {/* Compact Header Row */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1.5,
                    gap: 2,
                    flexWrap: 'wrap'
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{ fontWeight: 800, color: 'primary.main', whiteSpace: 'nowrap' }}
                >
                    Network Explorer
                </Typography>

                <Paper
                    elevation={0}
                    sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '10px',
                        bgcolor: 'rgba(241, 245, 249, 0.8)',
                        border: '1px solid rgba(15, 23, 42, 0.06)',
                        width: 280,
                        flexShrink: 0
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Search organizations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ opacity: 0.5, fontSize: 18 }} /></InputAdornment>,
                            disableUnderline: true,
                            sx: { fontSize: '0.85rem' }
                        }}
                        variant="standard"
                    />
                </Paper>
            </Box>

            {/* Compact Controls Bar */}
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    py: 0.75,
                    mb: 1.5,
                    borderRadius: '12px',
                    bgcolor: 'rgba(241, 245, 249, 0.6)',
                    border: '1px solid rgba(15, 23, 42, 0.04)',
                    flexWrap: 'wrap'
                }}
            >
                {/* View Type Selector */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        View:
                    </Typography>
                    <ToggleButtonGroup
                        value={viewType}
                        exclusive
                        onChange={(e, v) => v && setViewType(v)}
                        size="small"
                        sx={{
                            '& .MuiToggleButton-root': {
                                border: 'none',
                                borderRadius: '8px !important',
                                px: 1,
                                py: 0.25,
                                fontSize: '0.7rem',
                                textTransform: 'none',
                                color: 'text.secondary',
                                '&.Mui-selected': { bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } },
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                            }
                        }}
                    >
                        {VIEW_OPTIONS.map(({ value, label, icon: Icon }) => (
                            <ToggleButton key={value} value={value}>
                                <Icon sx={{ mr: 0.5, fontSize: 14 }} />
                                {label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>

                {/* Group By Selector */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        Group:
                    </Typography>
                    <ToggleButtonGroup
                        value={groupBy}
                        exclusive
                        onChange={(e, v) => { if (v) { setGroupBy(v); setSelectedTag(null); } }}
                        size="small"
                        sx={{
                            '& .MuiToggleButton-root': {
                                border: 'none',
                                borderRadius: '8px !important',
                                px: 1,
                                py: 0.25,
                                fontSize: '0.7rem',
                                textTransform: 'none',
                                color: 'text.secondary',
                                '&.Mui-selected': { bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } },
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                            }
                        }}
                    >
                        {GROUPING_OPTIONS.map(({ value, label, icon: Icon }) => (
                            <ToggleButton key={value} value={value}>
                                <Icon sx={{ mr: 0.5, fontSize: 14 }} />
                                {label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>

                {/* Tag filter chips */}
                {groupBy === 'tags' && (
                    <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5, alignItems: 'center' }}>
                        <Chip label="All" size="small" variant={!selectedTag ? 'filled' : 'outlined'} color={!selectedTag ? 'primary' : 'default'} onClick={() => setSelectedTag(null)} sx={{ height: 22, fontSize: '0.7rem' }} />
                        {allTags.slice(0, 6).map(tag => (
                            <Chip key={tag} label={tag.length > 10 ? tag.slice(0, 8) + '…' : tag} size="small" variant={selectedTag === tag ? 'filled' : 'outlined'} color={selectedTag === tag ? 'primary' : 'default'} onClick={() => setSelectedTag(tag)} sx={{ height: 22, fontSize: '0.7rem' }} />
                        ))}
                        {allTags.length > 6 && <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>+{allTags.length - 6}</Typography>}
                    </Stack>
                )}

                {/* Stats */}
                <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                    {organizations.length} orgs
                </Typography>
            </Paper>

            {/* Visualization Canvas */}
            <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                <Paper elevation={0} sx={{ height: '100%', borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                    <NetworkMap
                        onNodeClick={setSelectedNode}
                        organizations={organizations}
                        users={users}
                        associations={associations}
                        memberships={memberships}
                        searchQuery={searchQuery}
                        groupBy={groupBy}
                        selectedTag={selectedTag}
                        viewType={viewType}
                    />
                </Paper>
            </Box>

            {selectedNode && <OrgProfileModal node={selectedNode} onClose={() => setSelectedNode(null)} />}
        </Container>
    );
};

export default Network;
