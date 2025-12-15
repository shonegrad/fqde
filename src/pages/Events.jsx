import React from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/Events/EventCard';

const Events = () => {
    const { events } = useApp();

    return (
        <div className="container">
            <div className="mb-8">
                <h1 className="text-3xl font-heading mb-2">Upcoming Events</h1>
                <p className="text-gray-500">Connect, learn, and lead with peers across the network.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};
export default Events;
