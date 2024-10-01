import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('react tutorials');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchInitiated, setSearchInitiated] = useState(false);
  const navigate = useNavigate();
  const videoSectionRef = useRef(null); 

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

        if (searchInitiated) {
          scrollToVideos();
        }
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

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
    setSearchInitiated(true); 
    fetchVideos(searchQuery);
  };

  const scrollToVideos = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Navbar />

      <div className="mt-12 bg-gray-300 p-4">

      <div className="mb-8 mt-10">
          <h2 className="text-2xl font-bold mb-4">Popular Education Topics</h2>
          <div className="flex space-x-4 overflow-x-auto bg-gray-300 p-4 rounded-lg">
            {[
              { topic: 'Math', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
              { topic: 'Science', img: 'https://plus.unsplash.com/premium_photo-1661432575489-b0400f4fea58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D' },
              { topic: 'History', img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
              { topic: 'Programming', img: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
              { topic: 'Languages', img: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
              { topic: 'Art', img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
              { topic: 'Music', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
            ].map(({ topic, img }, i) => (
              <div
                key={i}
                className="min-w-[150px] bg-white shadow-md rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleSearch(topic)}
              >
                <img
                  src={img}
                  alt={topic}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">{topic}</h3>
              </div>
            ))}
          </div>
        </div>


        <div className="mb-8 ">
          <h2 className="text-2xl font-bold mb-4">Classes</h2>
          <div className="flex space-x-4 overflow-x-auto bg-gray-300 p-4 rounded-lg">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="min-w-[150px] bg-white shadow-md rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleSearch(`Class ${i + 1}`)}
              >
                <img
                 src={`https://via.placeholder.com/150?text=Class+${i + 1}`}
                  alt={`Class ${i + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">Class {i + 1}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Fields of Study</h2>
          <div className="flex space-x-4 overflow-x-auto bg-gray-300 p-4 rounded-lg">
            {[
              { field: 'Engineering', img: 'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              { field: 'Medicine', img: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVkaWNhbHxlbnwwfHwwfHx8MA%3D%3D' },
              { field: 'Business', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
              { field: 'Law', img: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGF3fGVufDB8fDB8fHww' },
              { field: 'Design', img: 'https://images.unsplash.com/photo-1493932484895-752d1471eab5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
              { field: 'Economics', img: 'https://media.istockphoto.com/id/1323554443/photo/man-leans-ladder-against-tall-stack-of-coins-topped-with-interest-rate-symbol.webp?a=1&b=1&s=612x612&w=0&k=20&c=nj6LSWWgWLQdkqjmeYtyl6oopnEeDAwlGS9voQqgczc=' },
              { field: 'Education', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400&h=250' },
            ].map(({ field, img }, i) => (
              <div
                key={i}
                className="min-w-[150px] bg-white shadow-md rounded-lg p-4 text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleSearch(field)}
              >
                <img
                  src={img}
                  alt={field}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">{field}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='mt-24 flex justify-center'>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }} className="flex-grow max-w-xl mx-4">
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

      <div ref={videoSectionRef} className="container mx-auto py-12 flex flex-col items-center">
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
              onClick={() => navigate(`/video/${video.id.videoId}`)}
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
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
