import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Stack,
    Avatar,
    Box
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

const MemberCard = ({ member, onClick }) => {
    return (
        <Card
            variant="outlined"
            onClick={() => onClick(member)}
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
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar
                        src={member.avatar}
                        alt={member.name}
                        sx={{ width: 56, height: 56, bgcolor: 'secondary.main' }}
                    >
                        {member.name.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                            {member.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {member.role}
                        </Typography>
                    </Box>
                </Stack>

                {member.bio && (
                    <Typography variant="body2" color="text.secondary" sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 2
                    }}>
                        {member.bio}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default MemberCard;
