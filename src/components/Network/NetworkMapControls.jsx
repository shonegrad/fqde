import React from 'react';
import { Box, Stack, Typography, IconButton, ToggleButtonGroup, ToggleButton, Tooltip, Chip } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import LabelIcon from '@mui/icons-material/Label';
import LabelOffIcon from '@mui/icons-material/LabelOff';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';

const NetworkMapControls = ({
    onZoomIn,
    onZoomOut,
    onResetView,
    onFitToScreen,
    showLabels,
    onToggleLabels,
    showPeople,
    onTogglePeople,
    orgTypeFilter,
    onOrgTypeFilterChange,
    orgTypes = []
}) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}
        >
            {/* Zoom Controls */}
            <Box
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    p: 0.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.08)'
                }}
            >
                <Stack direction="column" spacing={0.5}>
                    <Tooltip title="Zoom In" placement="left">
                        <IconButton size="small" onClick={onZoomIn}>
                            <ZoomInIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom Out" placement="left">
                        <IconButton size="small" onClick={onZoomOut}>
                            <ZoomOutIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Reset View" placement="left">
                        <IconButton size="small" onClick={onResetView}>
                            <CenterFocusStrongIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Fit to Screen" placement="left">
                        <IconButton size="small" onClick={onFitToScreen}>
                            <FitScreenIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>

            {/* Display Toggles */}
            <Box
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '12px',
                    p: 0.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(0,0,0,0.08)'
                }}
            >
                <Stack direction="column" spacing={0.5}>
                    <Tooltip title={showLabels ? "Hide Labels" : "Show Labels"} placement="left">
                        <IconButton size="small" onClick={onToggleLabels} color={showLabels ? "primary" : "default"}>
                            {showLabels ? <LabelIcon fontSize="small" /> : <LabelOffIcon fontSize="small" />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={showPeople ? "Hide People" : "Show People"} placement="left">
                        <IconButton size="small" onClick={onTogglePeople} color={showPeople ? "primary" : "default"}>
                            <PeopleIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
        </Box>
    );
};

export default NetworkMapControls;
