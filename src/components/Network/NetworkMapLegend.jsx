import React from 'react';
import { Box, Typography, Stack, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Color scheme for organization types
export const ORG_TYPE_COLORS = {
    'Institution': '#3b82f6',      // Blue
    'Association': '#10b981',      // Emerald  
    'Think Tank': '#8b5cf6',       // Violet
    'Research Center': '#f59e0b',  // Amber
    'Network': '#ec4899',          // Pink
    'Foundation': '#06b6d4',       // Cyan
    'default': '#6b7280'           // Gray fallback
};

export const PERSON_COLOR = '#475569';  // Slate gray

const NetworkMapLegend = ({ expanded = true, onToggle }) => {
    const orgTypes = Object.entries(ORG_TYPE_COLORS).filter(([key]) => key !== 'default');

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                zIndex: 10,
                bgcolor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: 1,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0,0,0,0.08)',
                minWidth: 180,
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 1.5,
                    py: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                }}
                onClick={onToggle}
            >
                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Legend
                </Typography>
                <IconButton size="small" sx={{ p: 0 }}>
                    {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                </IconButton>
            </Box>

            <Collapse in={expanded}>
                <Box sx={{ px: 1.5, pb: 1.5 }}>
                    {/* Node Types Section */}
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, mt: 0.5 }}>
                        Organization Types
                    </Typography>
                    <Stack spacing={0.5}>
                        {orgTypes.map(([type, color]) => (
                            <Stack key={type} direction="row" alignItems="center" spacing={1}>
                                <Box
                                    sx={{
                                        width: 14,
                                        height: 14,
                                        borderRadius: '4px',
                                        bgcolor: color,
                                        flexShrink: 0
                                    }}
                                />
                                <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                    {type}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>

                    {/* People */}
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, mt: 1.5 }}>
                        People
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box
                            sx={{
                                width: 14,
                                height: 14,
                                borderRadius: '50%',
                                bgcolor: PERSON_COLOR,
                                flexShrink: 0
                            }}
                        />
                        <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                            Member
                        </Typography>
                    </Stack>

                    {/* Size meaning */}
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, mt: 1.5 }}>
                        Node Size
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.secondary' }} />
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'text.secondary' }} />
                            <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: 'text.secondary' }} />
                        </Box>
                        <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                            = Connections
                        </Typography>
                    </Stack>

                    {/* Connection types */}
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, mt: 1.5 }}>
                        Connections
                    </Typography>
                    <Stack spacing={0.5}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ width: 20, height: 2, bgcolor: 'rgba(100, 116, 139, 0.6)', borderRadius: 1 }} />
                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                Membership
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ width: 20, height: 2, background: 'linear-gradient(90deg, #3b82f6, #10b981)', borderRadius: 1 }} />
                            <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                                Partnership
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            </Collapse>
        </Box>
    );
};

export default NetworkMapLegend;
