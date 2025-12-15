import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import FeedItem from '../components/Home/FeedItem';
import QuickActions from '../components/Home/QuickActions';
import { Building2, MapPin } from 'lucide-react';

const Home = () => {
    const { currentUser, feed, events, resources } = useApp();
    const [filter, setFilter] = useState('all');

    // Filter feed items
    const filteredFeed = feed.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    });

    // Get user's institution
    // In a real app we'd look this up properly
    const userOrg = { name: "Riverdale Leadership Institute", region: "Northeast", role: "Member" };

    return (
        <div className="container">
            <div className="mb-8">
                <h1 className="text-3xl font-heading mb-2">Welcome back, {currentUser.name.split(' ')[0]}</h1>
                <p className="text-gray-500">Here's what's happening in your network today.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed Column */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Feed Filters */}
                    <div className="flex border-b border-gray-200">
                        {['all', 'announcement', 'event', 'resource'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 capitalize font-medium ${filter === f ? 'text-accent border-b-2 border-accent' : 'text-gray-500'}`}
                            >
                                {f === 'all' ? 'Your Feed' : f + 's'}
                            </button>
                        ))}
                    </div>

                    {/* Feed Items */}
                    <div className="space-y-4">
                        {filteredFeed.map(item => (
                            <FeedItem key={item.id} item={item} />
                        ))}
                        {filteredFeed.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No updates found.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <QuickActions />

                    {/* My Institution Card */}
                    <div className="card bg-slate-50 border-slate-200">
                        <div className="flex items-center gap-2 mb-3 text-slate-700">
                            <Building2 size={20} />
                            <h3 className="font-heading font-bold font-lg">My Institution</h3>
                        </div>
                        <h4 className="font-bold text-lg mb-1">{userOrg.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                            <MapPin size={14} /> {userOrg.region}
                        </div>
                        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Status</span>
                            <span className="badge bg-green-100 text-green-700">Active Member</span>
                        </div>
                        <button className="btn btn-sm btn-secondary w-full mt-4">View Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
