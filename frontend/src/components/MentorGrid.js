// MentorGrid.js
import React, { useState } from 'react';
import NavBar from '../components/Navbar';
import MentorCard from '../components/MentorCard';
import Popup from '../components/Popup'; // Import the Popup component

const MentorGrid = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleConnectClick = () => {
    setPopupVisible(true); // Show the popup when the button is clicked
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto py-8 mt-16">
        <h2 className="text-2xl font-bold text-center mb-6">Top Mentors</h2>
        <div className="flex flex-wrap -mx-4">
          {mentors.map((mentor, index) => (
            <MentorCard key={index} mentor={mentor} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors duration-300"
            onClick={handleConnectClick}
          >
            Mentor Connect
          </button>
        </div>
      </div>

      {popupVisible && <Popup onClose={() => setPopupVisible(false)} />}
    </div>
  );
};

export default MentorGrid;
