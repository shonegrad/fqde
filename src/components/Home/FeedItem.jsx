import React from 'react';
import { Calendar, FileText, Bell, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FeedItem = ({ item }) => {
    const { events, resources, savedResources, toggleSaveResource } = useApp();

    let content;
    let icon;
    let action;

    if (item.type === 'announcement') {
        icon = <Bell className="text-blue-600" size={20} />;
        content = (
            <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.date} • {item.author}</p>
            </div>
        );
    } else if (item.type === 'resource') {
        const resource = resources.find(r => r.id === item.resourceId);
        if (!resource) return null;

        const isSaved = savedResources.includes(resource.id);

        icon = <FileText className="text-green-600" size={20} />;
        content = (
            <div className="flex-1">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.date} • Resource: {resource.title}</p>
                <div className="mt-2 flex gap-2">
                    <span className="badge">{resource.type}</span>
                    <span className="badge">{resource.access}</span>
                </div>
            </div>
        );
        action = (
            <button
                onClick={() => toggleSaveResource(resource.id)}
                className={`p-2 rounded-full hover:bg-gray-100 ${isSaved ? 'text-blue-600' : 'text-gray-400'}`}
            >
                <Bookmark fill={isSaved ? "currentColor" : "none"} size={20} />
            </button>
        )
    } else if (item.type === 'event') {
        const event = events.find(e => e.id === item.eventId);
        if (!event) return null;

        icon = <Calendar className="text-orange-600" size={20} />;
        content = (
            <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.date} • {event.dateRange}</p>
                <p className="text-sm mt-1">{event.title}</p>
            </div>
        );
    }

    return (
        <div className="card mb-4 flex gap-4 items-start p-4 hover:shadow-md transition-shadow">
            <div className="mt-1 p-2 bg-gray-50 rounded-lg">
                {icon}
            </div>
            <div className="flex-1">
                {content}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
};

export default FeedItem;
