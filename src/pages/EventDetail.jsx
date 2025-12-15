import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import TimelineView from '../components/Events/TimelineView';

const EventDetail = () => {
    const { eventId } = useParams();
    const { events, currentUser } = useApp();

    const event = events.find(e => e.id === eventId);

    if (!event) return <div className="container py-8">Event not found</div>;

    return (
        <div className="container">
            <Link to="/events" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent mb-4">
                <ArrowLeft size={16} /> Back to Events
            </Link>

            <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-6 border-b border-gray-100 pb-6">
                    <div>
                        <span className="badge mb-2">{event.type}</span>
                        <h1 className="text-3xl font-heading font-bold mb-2">{event.title}</h1>
                        <p className="text-gray-600 max-w-2xl">{event.description}</p>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px]">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="text-accent" size={20} />
                            <span className="font-medium">{event.dateRange}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="text-accent" size={20} />
                            <span className="font-medium">{event.location}</span>
                        </div>

                        <button className="btn btn-primary w-full mt-2">
                            Register Now
                        </button>
                    </div>
                </div>

                <h2 className="text-xl font-bold font-heading mb-4">Schedule</h2>
                <TimelineView event={event} />
            </div>
        </div>
    );
};
export default EventDetail;
