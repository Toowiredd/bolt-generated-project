import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VAL_TOWN_API_KEY = import.meta.env.VITE_VAL_TOWN_API_KEY;

export function MediaDashboard() {
  const [media, setMedia] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.val.town/v1/run/@toowired.getMedia', {
        headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` }
      });
      setMedia(response.data);
    } catch (err) {
      setError('Failed to fetch media');
    } finally {
      setIsLoading(false);
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
      setSuccessMessage('Media uploaded successfully!');
    } catch (err) {
      setError('Upload failed');
      setUploadProgress(0);
    }
  };

  const handleRetry = () => {
    setError('');
    setUploadProgress(0);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.val.town/v1/run/@toowired.deleteMedia/${id}`, {
        headers: { Authorization: `Bearer ${VAL_TOWN_API_KEY}` }
      });
      fetchMedia();
    } catch (err) {
      setError('Failed to delete media');
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMedia = filteredMedia.sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'date') {
      return new Date(b.uploadedAt) - new Date(a.uploadedAt);
    }
    return 0;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Media Dashboard</h1>
      <input type="file" onChange={handleUpload} className="mb-4" />
      {uploadProgress > 0 && <progress value={uploadProgress} max="100" className="w-full mb-4" />}
      {error && (
        <div className="mb-4">
          <p className="text-red-500">{error}</p>
          <button onClick={handleRetry} className="text-blue-500">Retry</button>
        </div>
      )}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search media..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
        <select value={sortOption} onChange={handleSort} className="ml-2 p-2 border border-gray-300 rounded">
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {sortedMedia.map((item) => (
            <div key={item.id} className="border p-2 relative">
              <img src={item.url} alt={item.name} className="w-full h-32 object-cover mb-2" />
              <p>{item.name}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
