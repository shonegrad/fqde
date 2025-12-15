import React from 'react';
import { Card, CardContent, Typography, Stack, Avatar, Box, Chip } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const OrganizationCard = ({ org, onClick }) => {
    const logoPath = org.logoPath ? `/fqde${org.logoPath}` : org.logo;

    return (
        <Card onClick={() => onClick({ ...org, group: 'org' })} sx={{ height: '100%', cursor: 'pointer' }}>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    {logoPath ? (
                        <Avatar src={logoPath} alt={org.name} sx={{ width: 56, height: 56 }} variant="rounded" />
                    ) : (
                        <Avatar sx={{ width: 56, height: 56 }} variant="rounded">
                            <BusinessIcon />
                        </Avatar>
                    )}
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600} noWrap>{org.name}</Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>{org.type}</Typography>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1.5 }}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                        {org.city}{org.region ? `, ${org.region}` : ''}
                    </Typography>
                </Stack>

                {org.tags?.length > 0 && (
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {org.tags.slice(0, 3).map(tag => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" />
                        ))}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

export default OrganizationCard;
