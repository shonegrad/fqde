import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const UploadModal = ({ onClose }) => {
    const { addResource, currentUser } = useApp();
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
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative animate-fade-in">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={20} />
                </button>

                <h2 className="text-xl font-heading font-bold mb-4">Upload Resource</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            className="w-full border p-2 rounded"
                            rows="3"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Access Level</label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.access}
                                onChange={e => setFormData({ ...formData, access: e.target.value })}
                            >
                                <option>Public</option>
                                <option>Network</option>
                                <option>Institution-Only</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags (comma sep)</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder="policy, math..."
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                            type="file"
                            className="hidden"
                            id="file-upload"
                            onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-accent">
                            <Upload size={24} />
                            <span className="text-sm">{formData.file ? formData.file.name : 'Click to upload file'}</span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-full">Publish Resource</button>
                </form>
            </div>
        </div>
    );
};

export default UploadModal;
