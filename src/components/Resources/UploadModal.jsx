import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Box,
    Typography,
    Stack,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadModal = ({ onClose }) => {
    const { addResource } = useApp();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        access: 'Public', // Public, Network, Institution-Only
        tags: '',
        file: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newResource = {
            id: `r-${Date.now()}`,
            title: formData.title,
            type: formData.file ? formData.file.name.split('.').pop().toUpperCase() : 'DOC',
            access: formData.access,
            owner: 'Me', // Simplified for demo
            tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
            description: formData.description
        };
        addResource(newResource);
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, fontFamily: 'serif', fontWeight: 600 }}>
                Upload Resource
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Stack spacing={3}>
                        <TextField
                            label="Title"
                            fullWidth
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />

                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />

                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                            <TextField
                                select
                                label="Access Level"
                                value={formData.access}
                                onChange={e => setFormData({ ...formData, access: e.target.value })}
                            >
                                <MenuItem value="Public">Public</MenuItem>
                                <MenuItem value="Network">Network</MenuItem>
                                <MenuItem value="Institution-Only">Institution-Only</MenuItem>
                            </TextField>

                            <TextField
                                label="Tags (comma sep)"
                                placeholder="policy, math..."
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </Box>

                        <Box
                            sx={{
                                border: '2px dashed',
                                borderColor: 'divider',
                                borderRadius: 2,
                                p: 4,
                                textAlign: 'center',
                                cursor: 'pointer',
                                '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' }
                            }}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                style={{ display: 'none' }}
                                onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                            />
                            <label htmlFor="file-upload" style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'block' }}>
                                <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {formData.file ? formData.file.name : 'Click to upload file'}
                                </Typography>
                            </label>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Publish Resource</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UploadModal;
