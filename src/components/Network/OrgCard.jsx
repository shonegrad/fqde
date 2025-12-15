import React from 'react';
import { Building2, MapPin } from 'lucide-react';

const OrgCard = ({ org, onClick }) => {
    return (
        <div
            onClick={() => onClick(org)}
            className="card hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex justify-between items-start mb-2">
                <Building2 className="text-gray-400 group-hover:text-accent transition-colors" size={32} />
                <span className="badge">{org.type}</span>
            </div>

            <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-accent">{org.name}</h3>

            <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <MapPin size={14} /> {org.region}
            </div>

            <div className="flex flex-wrap gap-1">
                {org.tags.map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default OrgCard;
