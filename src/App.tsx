import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { ArtworkDetail } from './components/ArtworkDetail';
import { VideoDetail } from './components/VideoDetail';
import { Commission } from './components/Commission';
import { Auth } from './components/Auth';
import { UserProfile } from './components/UserProfile';
import { AiMarketingDashboard } from './components/AiMarketingDashboard';
import { MediaDashboard } from './components/MediaDashboard';
import { SocialMediaDashboard } from './components/SocialMediaDashboard';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { getCurrentUser, User } from './services/authService';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) => {
    if (!user) {
      return <Navigate to="/auth" replace />;
    }
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="min-h-screen bg-midnight-blue text-gray-100">
        <Header user={user} onSignOut={() => setUser(null)} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/commission" element={<Commission />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth onAuthStateChange={setUser} />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="admin">
              <AiMarketingDashboard />
            </ProtectedRoute>
          } />
          <Route path="/media" element={
            <ProtectedRoute requiredRole="admin">
              <MediaDashboard />
            </ProtectedRoute>
          } />
          <Route path="/social-media" element={
            <ProtectedRoute requiredRole="admin">
              <SocialMediaDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
