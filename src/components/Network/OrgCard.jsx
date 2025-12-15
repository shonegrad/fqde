import React from 'react';
import { Card, CardContent, Typography, Chip, Stack, Box, Avatar } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const OrgCard = ({ org, onClick }) => {
    const logoPath = org.logoPath ? `/fqde${org.logoPath}` : org.logo;
    const location = org.city ? `${org.city}, ${org.region || ''}` : org.region || '';
    const tags = org.tags || [];

    return (
        <Card variant="outlined" onClick={() => onClick(org)} sx={{ height: '100%', cursor: 'pointer', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-2px)' } }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    {logoPath ? (
                        <Avatar src={logoPath} alt={org.name} variant="rounded" sx={{ width: 48, height: 48 }} />
                    ) : (
                        <Avatar variant="rounded" sx={{ width: 48, height: 48, bgcolor: 'action.selected' }}>
                            <BusinessIcon />
                        </Avatar>
                    )}
                    <Chip label={org.type || 'Organization'} size="small" variant="outlined" />
                </Stack>

                <Typography variant="h6" sx={{ mb: 0.5, lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {org.name}
                </Typography>

                {location && (
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 2 }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">{location}</Typography>
                    </Stack>
                )}

                {tags.length > 0 && (
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {tags.slice(0, 3).map(tag => <Chip key={tag} label={tag} size="small" />)}
                        {tags.length > 3 && <Chip label={`+${tags.length - 3}`} size="small" />}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

export default OrgCard;
