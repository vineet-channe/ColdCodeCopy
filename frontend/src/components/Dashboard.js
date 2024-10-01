import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';


const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('react tutorials');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();

  }, []);

  const fetchVideos = async (searchQuery = 'react tutorials') => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/youtube/search', {
        params: { q: searchQuery }
      });


      if (response.data && Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        setVideos([]);
        setError('No videos found');
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Error fetching videos');
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchTerm);
  };

  const handleVideoSelect = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div>
      <Navbar />
        </div>
      <div className='mt-24 flex justify-center'>
        <form onSubmit={handleSearch} className="flex-grow max-w-xl mx-4">
          <div className="flex items-center bg-gray-100 rounded-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for videos..."
              className="flex-grow px-4 py-2 border-none rounded-l-full bg-gray-100 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-cyan-300 rounded-r-full hover:bg-gray-400 transition duration-300"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </form>
      </div>

      <div className="flex-grow container mx-auto py-12 flex flex-col items-center">
        {loading && <p className="mt-4 text-gray-600">Loading videos...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {!loading && videos.length === 0 && !error && (
          <p className="mt-4 text-gray-600">No videos found</p>
        )}
      </div>

      <div className="container mx-auto pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleVideoSelect(video.id.videoId)}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex justify-between flex-col">
                <h3 className="text-lg font-bold text-gray-800">{video.snippet.title}</h3>

                <p className="text-gray-700 mt-2">{video.snippet.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-white shadow-md py-4 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">© 2024 Sarthi - Empowering Education for Everyone</p>
          <a href='https://www.linkedin.com/in/lokeshch18/' className='group' ><p className="text-gray-600 text-underline transform transition-transform duration-300 group-hover:scale-105 ">Lokesh Chaudhari</p></a>
        </div>
      </footer>
    </div>);
};

export default Dashboard;
