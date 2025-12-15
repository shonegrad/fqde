import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Typography, Stack, Container } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import OrganizationCard from './OrganizationCard';
import MemberCard from './MemberCard';

const DirectoryView = ({ organizations, users, onNodeClick }) => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab icon={<BusinessIcon fontSize="small" />} iconPosition="start" label={`Organizations (${organizations.length})`} />
                    <Tab icon={<PeopleIcon fontSize="small" />} iconPosition="start" label={`Members (${users.length})`} />
                </Tabs>
            </Box>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
                {tabValue === 0 && (
                    <Grid container spacing={3}>
                        {organizations.length > 0 ? (
                            organizations.map(org => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={org.id}>
                                    <OrganizationCard org={org} onClick={onNodeClick} />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
                                    No organizations found matching your criteria.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                )}

                {tabValue === 1 && (
                    <Grid container spacing={3}>
                        {users.length > 0 ? (
                            users.map(user => (
                                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={user.id}>
                                    <MemberCard member={user} onClick={onNodeClick} />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography color="text.secondary" align="center" sx={{ py: 8 }}>
                                    No members found matching your criteria.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default DirectoryView;
