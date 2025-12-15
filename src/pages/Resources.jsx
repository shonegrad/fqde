import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ResourceCard from '../components/Resources/ResourceCard';
import UploadModal from '../components/Resources/UploadModal';
import { Search, Upload, Filter } from 'lucide-react';
import { ROLES } from '../data/seed';

const Resources = () => {
    const { resources, currentUser } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All'); // All, Public, Network, Institution-Only

    // Filter logic
    const filteredResources = resources.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

        if (activeFilter !== 'All' && r.access !== activeFilter) return false;

        return matchesSearch;
    });

    const canUpload = [ROLES.ADMIN, ROLES.DIRECTOR].includes(currentUser.role);

    return (
        <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-heading mb-2">Resource Library</h1>
                    <p className="text-gray-500">Shared knowledge and tools across the network.</p>
                </div>

                {canUpload ? (
                    <button onClick={() => setShowUpload(true)} className="btn btn-primary">
                        <Upload size={18} /> Upload Resource
                    </button>
                ) : (
                    <div className="text-sm text-gray-400 italic">
                        Switch to Admin/Director to upload
                    </div>
                )}
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by title or tag..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-accent"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <Filter size={20} className="text-gray-400" />

                    {['All', 'Public', 'Network', 'Institution-Only'].map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === f ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
                {filteredResources.length === 0 && (
                    <div className="col-span-2 text-center py-12 text-gray-400">
                        No resources found matching your criteria.
                    </div>
                )}
            </div>

            {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
        </div>
    );
};

export default Resources;
