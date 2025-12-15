import React from 'react';
import { Drawer, Box, Typography, IconButton, Button, Chip, Stack, Avatar, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const OrgProfileModal = ({ node, onClose }) => {
    if (!node) return null;

    const isOrg = Boolean(node.type) || node.group === 'org';
    const displayName = node.name || node.displayName || `${node.firstName || ''} ${node.lastName || ''}`.trim() || 'Unknown';
    const logoPath = node.logoPath ? `/fqde${node.logoPath}` : node.logo;
    const avatarPath = node.avatarPath ? `/fqde${node.avatarPath}` : node.avatar;
    const role = node.title || node.role || '';
    const location = node.city ? `${node.city}${node.region ? ', ' + node.region : ''}` : node.region || '';
    const tags = node.tags || [];
    const initials = node.firstName && node.lastName
        ? `${node.firstName.charAt(0)}${node.lastName.charAt(0)}`
        : displayName?.charAt(0) || '?';

    return (
        <Drawer anchor="right" open={Boolean(node)} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 400 } } }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </Box>

            <Box sx={{ px: 4, pb: 4 }}>
                <Box sx={{ mb: 4 }}>
                    {isOrg ? (
                        logoPath ? (
                            <Avatar src={logoPath} sx={{ width: 80, height: 80, mb: 2 }} variant="rounded" />
                        ) : (
                            <Avatar sx={{ width: 80, height: 80, mb: 2 }} variant="rounded"><BusinessIcon fontSize="large" /></Avatar>
                        )
                    ) : (
                        <Avatar src={avatarPath} sx={{ width: 80, height: 80, mb: 2 }}>{initials}</Avatar>
                    )}

                    <Typography variant="h5" component="h2" gutterBottom>{displayName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {isOrg ? node.type : role}{location ? ` • ${location}` : ''}
                    </Typography>
                </Box>

                <Stack spacing={3}>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>About</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {node.description || node.bio || "No description available."}
                        </Typography>
                    </Box>

                    {(node.email || node.phone || node.contactEmail) && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>Contact</Typography>
                            <Stack spacing={1}>
                                {(node.email || node.contactEmail) && (
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <EmailIcon fontSize="small" color="action" />
                                        <Typography variant="body2">{node.email || node.contactEmail}</Typography>
                                    </Stack>
                                )}
                                {node.phone && (
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <PhoneIcon fontSize="small" color="action" />
                                        <Typography variant="body2">{node.phone}</Typography>
                                    </Stack>
                                )}
                                {node.address && (
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <LocationOnIcon fontSize="small" color="action" />
                                        <Typography variant="body2">{node.address}</Typography>
                                    </Stack>
                                )}
                            </Stack>
                        </Box>
                    )}

                    {tags.length > 0 && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>{isOrg ? 'Focus Areas' : 'Expertise'}</Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {tags.map(tag => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                            </Stack>
                        </Box>
                    )}
                </Stack>
            </Box>

            <Box sx={{ mt: 'auto', p: 3, borderTop: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" fullWidth size="large">{isOrg ? "Request Partnership" : "Connect"}</Button>
                    {node.website && (
                        <IconButton component="a" href={node.website} target="_blank" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                            <LinkIcon />
                        </IconButton>
                    )}
                </Stack>
            </Box>
        </Drawer>
    );
};

export default OrgProfileModal;
