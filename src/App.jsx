import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Network from './pages/Network';
import EventDetail from './pages/EventDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:eventId" element={<EventDetail />} />
        <Route path="resources" element={<Resources />} />
        <Route path="network" element={<Network />} />
      </Route>
    </Routes>
  );
};

export default App;
