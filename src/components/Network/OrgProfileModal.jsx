import React from 'react';
import { X, Building2, Link as LinkIcon, Users } from 'lucide-react';

const OrgProfileModal = ({ node, onClose }) => {
    // node can be an Org or a Person
    const isOrg = node.group === 'org' || node.type; // Check if it's from graph or list

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full p-6 shadow-xl animate-slide-in-right overflow-y-auto">
                <button onClick={onClose} className="mb-6 text-gray-400 hover:text-black">
                    <X size={24} />
                </button>

                <div className="mb-6">
                    {isOrg ? (
                        <Building2 size={48} className="text-accent mb-4" />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-slate-800 text-white flex items-center justify-center text-xl font-bold mb-4">
                            {node.name ? node.name.charAt(0) : '?'}
                        </div>
                    )}

                    <h2 className="text-2xl font-heading font-bold mb-1">{node.name}</h2>
                    {isOrg && <p className="text-gray-500">{node.type} • {node.region}</p>}
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">About</h3>
                        <p className="text-gray-600">
                            {isOrg
                                ? "Leading institution dedicated to educational excellence and policy reform. Collaborating across the network to drive systemic change."
                                : "Education leader passionate about inclusive learning environments and staff development."}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">Detailed Info</h3>
                        <div className="space-y-2">
                            {node.tags && (
                                <div className="flex flex-wrap gap-2">
                                    {node.tags.map(tag => <span key={tag} className="badge">{tag}</span>)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex gap-3">
                        <button className="btn btn-primary flex-1">
                            {isOrg ? "Request Partnership" : "Connect"}
                        </button>
                        <button className="btn btn-secondary">
                            <LinkIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgProfileModal;
