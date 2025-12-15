import React from 'react';
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    Chip,
    Stack,
    Avatar,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';

const OrgProfileModal = ({ node, onClose }) => {
    // node can be an Org or a Person
    const isOrg = node.group === 'org' || node.type; // Check if it's from graph or list

    return (
        <Drawer
            anchor="right"
            open={Boolean(node)}
            onClose={onClose}
            PaperProps={{ sx: { width: { xs: '100%', sm: 400 } } }}
        >
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Box sx={{ px: 4, pb: 4 }}>
                <Box sx={{ mb: 4 }}>
                    {isOrg ? (
                        node.logo ? (
                            <Avatar src={node.logo} sx={{ width: 64, height: 64, mb: 2 }} variant="rounded" />
                        ) : (
                            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.light', mb: 2 }}>
                                <BusinessIcon fontSize="large" />
                            </Avatar>
                        )
                    ) : (
                        <Avatar
                            src={node.avatar}
                            sx={{ width: 64, height: 64, bgcolor: 'secondary.main', mb: 2, fontSize: '1.5rem' }}
                        >
                            {node.name ? node.name.charAt(0) : '?'}
                        </Avatar>
                    )}

                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontFamily: 'serif', fontWeight: 600 }}>
                        {node.name}
                    </Typography>
                    {isOrg ? (
                        <Typography variant="body2" color="text.secondary">
                            {node.type} • {node.region}
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            {node.role} • {node.institutionId}
                        </Typography>
                    )}
                </Box>

                <Stack spacing={4}>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            About
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {node.description || node.bio || "No description available."}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Detailed Info
                        </Typography>
                        {node.tags && (
                            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                {node.tags.map(tag => (
                                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                                ))}
                            </Stack>
                        )}
                    </Box>
                </Stack>
            </Box>

            <Box sx={{ mt: 'auto', p: 3, borderTop: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" fullWidth size="large">
                        {isOrg ? "Request Partnership" : "Connect"}
                    </Button>
                    <IconButton variant="outlined" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                        <LinkIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Drawer>
    );
};

export default OrgProfileModal;
