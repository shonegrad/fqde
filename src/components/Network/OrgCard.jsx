import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Box
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const OrgCard = ({ org, onClick }) => {
    return (
        <Card
            variant="outlined"
            onClick={() => onClick(org)}
            sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: 2,
                    transform: 'translateY(-2px)'
                }
            }}
        >
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    {org.logo ? (
                        <Box
                            component="img"
                            src={org.logo}
                            alt={org.name}
                            sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover' }}
                        />
                    ) : (
                        <BusinessIcon sx={{ fontSize: 32, color: 'text.secondary', opacity: 0.7 }} />
                    )}
                    <Chip label={org.type} size="small" variant="outlined" />
                </Stack>

                <Typography variant="h6" component="h3" sx={{ fontFamily: 'serif', fontWeight: 600, mb: 0.5, lineHeight: 1.2 }}>
                    {org.name}
                </Typography>

                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 2, color: 'text.secondary' }}>
                    <LocationOnIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">
                        {org.region}
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                    {org.tags.map(tag => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{ height: 24, fontSize: '0.75rem', bgcolor: 'action.hover' }}
                        />
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default OrgCard;
