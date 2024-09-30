import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Popup = ({ onClose, onMentorSelect }) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mentors'); // Adjust the URL according to your backend
        setMentors(response.data);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Error fetching mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const handleMentorSelect = (mentor) => {
    onMentorSelect(mentor);
    onClose(); // Close the popup after selecting a mentor
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Look Up Mentor</h2>
        {loading ? (
          <p>Loading mentors...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="mb-4">Here are some suggestions for mentors:</p>
            <ul className="mb-4">
              {mentors.map((mentor) => (
                <li
                  key={mentor._id}
                  className="cursor-pointer hover:bg-gray-100 p-2"
                  onClick={() => handleMentorSelect(mentor)}
                >
                  {mentor.name} - {mentor.field} {/* Adjust based on your mentor object structure */}
                </li>
              ))}
            </ul>
          </>
        )}
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
