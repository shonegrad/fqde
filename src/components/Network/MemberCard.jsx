import React from 'react';
import { Card, CardContent, Typography, Stack, Avatar, Box, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MemberCard = ({ member, onClick }) => {
    const displayName = member.displayName || member.name || `${member.firstName || ''} ${member.lastName || ''}`.trim();
    const role = member.title || member.role || '';
    const avatarPath = member.avatarPath ? `/fqde${member.avatarPath}` : member.avatar;
    const initials = member.firstName && member.lastName
        ? `${member.firstName.charAt(0)}${member.lastName.charAt(0)}`
        : displayName?.charAt(0) || '?';

    return (
        <Card onClick={() => onClick(member)} sx={{ height: '100%', cursor: 'pointer', borderRadius: 1 }}>
            <CardContent>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar src={avatarPath} alt={displayName} sx={{ width: 56, height: 56 }}>{initials}</Avatar>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600} noWrap>{displayName}</Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>{role}</Typography>
                    </Box>
                </Stack>

                {member.city && (
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                            {member.city}{member.region ? `, ${member.region}` : ''}
                        </Typography>
                    </Stack>
                )}

                {member.tags?.length > 0 && (
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                        {member.tags.slice(0, 2).map(tag => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" />
                        ))}
                        {member.tags.length > 2 && <Chip label={`+${member.tags.length - 2}`} size="small" variant="outlined" />}
                    </Stack>
                )}
            </CardContent>
        </Card>
    );
};

export default MemberCard;
