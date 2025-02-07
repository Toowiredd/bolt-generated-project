import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VAL_TOWN_API_KEY = process.env.VITE_VAL_TOWN_API_KEY;

export function MediaDashboard() {
  const [media, setMedia] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get('https://api.val.town/v1/run/@toowired.getMedia', {
        headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` }
      });
      setMedia(response.data);
    } catch (err) {
      setError('Failed to fetch media');
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('https://api.val.town/v1/run/@toowired.uploadMedia', formData, {
        headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      fetchMedia();
      setUploadProgress(0);
    } catch (err) {
      setError('Upload failed');
      setUploadProgress(0);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Media Dashboard</h1>
      <input type="file" onChange={handleUpload} className="mb-4" />
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" className="w-full mb-4" />}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-3 gap-4">
        {media.map((item) => (
          <div key={item.id} className="border p-2">
            <img src={item.url} alt={item.name} className="w-full h-32 object-cover mb-2" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
</boltArtifact>

Now, let's update our App component to include the new MediaDashboard:

<boltArtifact id="update-app" title="Update App Component">
<boltAction type="file" filePath="src/App.tsx">
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { About } from './components/About';
import { Contact } from './components/Contact';
import { getCurrentUser, UserProfile as UserProfileType } from './services/authService';

function App() {
  const [user, setUser] = useState<UserProfileType | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    checkUser();
  }, []);

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
            user ? <UserProfile username={user.displayName} /> : <Auth onAuthStateChange={setUser} />
          } />
          <Route path="/dashboard" element={
            user ? <AiMarketingDashboard user={user} /> : <Auth onAuthStateChange={setUser} />
          } />
          <Route path="/media" element={
            user ? <MediaDashboard /> : <Auth onAuthStateChange={setUser} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
