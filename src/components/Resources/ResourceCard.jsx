import React from 'react';
import { FileText, Lock, Globe, Users, Bookmark, File } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ResourceCard = ({ resource }) => {
    const { savedResources, toggleSaveResource } = useApp();
    const isSaved = savedResources.includes(resource.id);

    const getIcon = (type) => {
        // Simple icon mapping
        return <FileText size={24} className="text-gray-500" />;
    };

    const getAccessIcon = (access) => {
        if (access === 'Public') return <Globe size={14} />;
        if (access === 'Network') return <Users size={14} />;
        return <Lock size={14} />;
    };

    const getAccessColor = (access) => {
        if (access === 'Public') return 'bg-green-100 text-green-700';
        if (access === 'Network') return 'bg-blue-100 text-blue-700';
        return 'bg-gray-100 text-gray-700';
    }

    return (
        <div className="card hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
                {getIcon(resource.type)}
                <div className="text-center text-xs font-bold mt-1 text-gray-500">{resource.type}</div>
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-heading font-bold text-lg">{resource.title}</h3>
                    <button
                        onClick={() => toggleSaveResource(resource.id)}
                        className={`text-gray-400 hover:text-accent ${isSaved ? 'text-blue-600' : ''}`}
                    >
                        <Bookmark fill={isSaved ? "currentColor" : "none"} size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2 mt-2 mb-3">
                    <span className={`badge flex items-center gap-1 ${getAccessColor(resource.access)}`}>
                        {getAccessIcon(resource.access)} {resource.access}
                    </span>
                    <span className="text-sm text-gray-500">by {resource.owner}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                    {resource.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;
