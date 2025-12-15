import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SessionCard from './SessionCard';
import { Layers, User } from 'lucide-react';

const TimelineView = ({ event }) => {
    const { mySchedule } = useApp();
    const [viewMode, setViewMode] = useState('master'); // 'master' or 'personal'

    // Filter sessions
    const sessions = viewMode === 'personal'
        ? event.sessions.filter(s => mySchedule.includes(s.id))
        : event.sessions;

    return (
        <div className="mt-8">
            {/* View Toggle */}
            <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-lg flex">
                    <button
                        onClick={() => setViewMode('personal')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'personal' ? 'bg-white shadow text-accent' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <User size={16} /> For You
                    </button>
                    <button
                        onClick={() => setViewMode('master')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'master' ? 'bg-white shadow text-accent' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Layers size={16} /> Master Schedule
                    </button>
                </div>
            </div>

            {/* Timeline Content */}
            <div className="space-y-4">
                {sessions.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <h4 className="text-lg font-medium text-gray-400">
                            {viewMode === 'personal' ? 'Your schedule is empty.' : 'No sessions found.'}
                        </h4>
                        {viewMode === 'personal' && (
                            <p className="text-gray-400 text-sm mt-1">Switch to Master Schedule to add sessions.</p>
                        )}
                    </div>
                ) : (
                    // Group by Day (Simulated by just list for now as most are single day in seed)
                    <div className="grid gap-4">
                        {sessions
                            .sort((a, b) => new Date(a.start) - new Date(b.start))
                            .map(session => (
                                <SessionCard
                                    key={session.id}
                                    session={session}
                                    eventId={event.id}
                                    isForYouView={viewMode === 'personal'}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimelineView;
