import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
    return (
        <div className="card hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="badge mb-2">{event.type}</span>
                    <h3 className="font-heading font-bold text-xl">{event.title}</h3>
                </div>
                <div className="text-right">
                    <span className="block font-bold text-accent">{event.dateRange}</span>
                </div>
            </div>

            <p className="text-gray-600 mb-6">{event.description}</p>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center text-gray-500 text-sm gap-1">
                    <MapPin size={16} />
                    {event.location}
                </div>

                <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
                    View Details <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};
export default EventCard;
