import React, { useState } from 'react';
import { useApp } from '../context/AppContext'; // Need to export ORGANIZATIONS from seed through context?
// Ah, AppContext doesn't export organizations directly? Let's check AppContext.
import { ORGANIZATIONS } from '../data/seed'; // Importing directly since it's static for now
import NetworkMap from '../components/Network/NetworkMap';
import OrgCard from '../components/Network/OrgCard';
import OrgProfileModal from '../components/Network/OrgProfileModal';
import { Map, List } from 'lucide-react';

const Network = () => {
    const [view, setView] = useState('map'); // 'map' or 'list'
    const [selectedNode, setSelectedNode] = useState(null);

    // Also need to get organizations from context if I want it to be cleaner, 
    // but direct import is fine for this prototype as they are not editable.

    return (
        <div className="container h-[calc(100vh-80px)] flex flex-col">
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <div>
                    <h1 className="text-3xl font-heading mb-2">Network Directory</h1>
                    <p className="text-gray-500">Explore connections between {ORGANIZATIONS.length} institutions.</p>
                </div>

                <div className="bg-gray-100 p-1 rounded-lg flex">
                    <button
                        onClick={() => setView('map')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${view === 'map' ? 'bg-white shadow text-accent' : 'text-gray-500'}`}
                    >
                        <Map size={18} /> Map
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${view === 'list' ? 'bg-white shadow text-accent' : 'text-gray-500'}`}
                    >
                        <List size={18} /> List
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-0 relative">
                {view === 'map' ? (
                    <div className="h-full">
                        <NetworkMap onNodeClick={setSelectedNode} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-full pb-8">
                        {ORGANIZATIONS.map(org => (
                            <OrgCard key={org.id} org={org} onClick={setSelectedNode} />
                        ))}
                    </div>
                )}
            </div>

            {selectedNode && (
                <OrgProfileModal node={selectedNode} onClose={() => setSelectedNode(null)} />
            )}
        </div>
    );
};
export default Network;
