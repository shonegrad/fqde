import React from 'react';
import { Plus, Check, Clock, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const SessionCard = ({ session, eventId, isForYouView }) => {
    const { mySchedule, addToSchedule, removeFromSchedule, events } = useApp();

    const isScheduled = mySchedule.includes(session.id);
    const event = events.find(e => e.id === eventId);

    // Conflict detection (simple version)
    // Check if any other scheduled session in this event overlaps
    const hasConflict = !isScheduled && !isForYouView && mySchedule.some(scheduledId => {
        // Find the scheduled session object
        const scheduledSession = event.sessions.find(s => s.id === scheduledId);
        if (!scheduledSession) return false;

        // Check time overlap
        const sStart = new Date(session.start);
        const sEnd = new Date(session.end);
        const oStart = new Date(scheduledSession.start);
        const oEnd = new Date(scheduledSession.end);

        return (sStart < oEnd && sEnd > oStart);
    });

    const formatTime = (isoString) => {
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`border rounded-lg p-3 mb-3 ${isScheduled ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'} ${hasConflict ? 'border-orange-300 bg-orange-50' : ''}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-bold text-md">{session.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1 gap-2">
                        <span className="flex items-center gap-1"><Clock size={14} /> {formatTime(session.start)} - {formatTime(session.end)}</span>
                        <span className="badge bg-gray-100">{session.track}</span>
                    </div>
                </div>

                <button
                    onClick={() => isScheduled ? removeFromSchedule(session.id) : addToSchedule(session.id)}
                    className={`btn btn-sm ${isScheduled ? 'btn-secondary text-blue-800' : 'btn-secondary'}`}
                >
                    {isScheduled ? <Check size={16} /> : <Plus size={16} />}
                </button>
            </div>

            {hasConflict && (
                <div className="mt-2 text-xs text-orange-700 font-medium flex items-center gap-1">
                    <AlertTriangle size={12} /> Time conflict with another session
                </div>
            )}
        </div>
    );
};

export default SessionCard;
