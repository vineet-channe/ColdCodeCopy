import React, { useState } from "react";
import NavBar from "../components/Navbar";
import Popup from "../components/Popup"; // Import the Popup component

const mentors = [
  // Existing mentors data
  {
    name: "Kannav Mahajan",
    position: "AVP of Revenue at Emeritus | Former Management Consultant",
    rating: 5,
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/65226ed89a3fd.webp?d=150x150",
    availability: "Available",
    badgeColor: "bg-orange-100",
    ratingColor: "text-yellow-500"
  },
  {
    name: "Hammad Murtaza",
    position: "Management Consultant @Avalon Consulting",
    rating: 5,
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/661b6fa5bc398.webp?d=150x150",
    availability: "Available",
    badgeColor: "bg-blue-100",
    ratingColor: "text-yellow-500"
  },
  {
    name: "Abhishek Tiwari",
    position: "Management Consulting | IIM Bangalore",
    rating: 5,
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/663ca8a839ae4.webp?d=150x150",
    availability: "Available",
    badgeColor: "bg-blue-100",
    ratingColor: "text-yellow-500"
  },
  {
    name: "Utsa Bhattacharya",
    position: "Infosys Consulting | IMT Ghaziabad",
    rating: 4.7,
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/64f1bce3d243e.webp?d=150x150",
    availability: "Available",
    badgeColor: "bg-blue-100",
    ratingColor: "text-yellow-500"
  },
  {
    name: "Yash Sanghavi",
    position: "McKinsey & Co. | ISB | CFA",
    rating: 4.9,
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/661d6e85436a0.webp?d=150x150",
    availability: "Available",
    badgeColor: "bg-blue-100",
    ratingColor: "text-yellow-500"
  },
  {
    name: "Dibyadyuti Bhattacharya",
    position: "Product Manager at ICICI Bank",
    rating: 4.9,
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/660a857811b6d.webp?d=110x110",
    availability: "Available",
    badgeColor: "bg-green-100",
    ratingColor: "text-yellow-500"
  },
  {
    name: "Vedansh Dubey",
    position: "Senior Executive HRBP",
    rating: 5,
    img: "https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/664cb92287f60.webp?d=150x150",
    availability: "Available",
    badgeColor: "bg-green-100",
    ratingColor: "text-yellow-500"
  },
];

// "Click for more mentors" Card component
const MoreMentorsCard = () => {
  return (
    <div className={`w-full md:w-1/3 lg:w-1/4 p-4`}>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg p-6 min-h-[320px] flex flex-col justify-center items-center transition-transform transform hover:scale-105 hover:shadow-xl">
        <h3 className="mt-4 text-center font-bold text-xl">Explore More Mentors</h3>
        <p className="text-center text-sm mt-2 opacity-90">
          Find more experienced professionals to guide you.
        </p>
        <button className="mt-6 bg-white text-blue-500 font-semibold px-6 py-3 rounded-full transition-colors duration-300 hover:bg-gray-100">
          View More
        </button>
      </div>
    </div>
  );
};

const MentorCard = ({ mentor }) => {
  return (
    <div className={`w-full md:w-1/3 lg:w-1/4 p-4`}>
      <div className="bg-white rounded-lg shadow-md p-6 min-h-[320px] flex flex-col justify-between">
        <div className={`relative ${mentor.badgeColor} rounded-md p-4`}>
          <img
            className="w-16 h-16 rounded-full mx-auto"
            src={mentor.img}
            alt={mentor.name}
          />
          <div className="absolute top-2 right-2">
            <span className="bg-yellow-300 text-xs font-bold py-1 px-2 rounded-lg">
              {mentor.availability}
            </span>
          </div>
        </div>
        <h3 className="mt-4 text-center font-semibold text-lg">{mentor.name}</h3>
        <p className="text-sm text-center text-gray-600 mt-2">{mentor.position}</p>
        <div className={`flex items-center justify-center mt-4 ${mentor.ratingColor}`}>
          <span className="font-bold">{mentor.rating} ⭐</span>
        </div>
      </div>
    </div>
  );
};

// "Mentor Connect" button functionality
const MentorConnectButton = ({ onConnectClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleConnectClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/mentor/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "User wants to connect with a mentor" }), // Customize this data as needed
      });

      const data = await response.json();
      setResponseMessage(data.message || "Request sent successfully");
    } catch (error) {
      setResponseMessage("Error: Could not send request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors duration-300"
        onClick={onConnectClick} // Call the passed function instead
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Mentor Connect"}
      </button>
      {responseMessage && (
        <p className="text-center text-green-600 font-semibold mt-4">
          {responseMessage}
        </p>
      )}
    </div>
  );
};

const MentorGrid = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage Popup visibility

  const handleConnectClick = () => {
    setIsPopupOpen(true); // Open the Popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the Popup
  };

  return (
    <div>
      <NavBar />
      {/* Add margin-top to the container to avoid the navbar overlap */}
      <div className="container mx-auto py-8 mt-16">
        <h2 className="text-2xl font-bold text-center mb-6">Top Mentors</h2>
        <div className="flex flex-wrap -mx-4">
          {mentors.map((mentor, index) => (
            <MentorCard key={index} mentor={mentor} />
          ))}
          {/* Add the "Click for more mentors" card */}
          <MoreMentorsCard />
        </div>
        {/* Add the Mentor Connect button */}
        <MentorConnectButton onConnectClick={handleConnectClick} />
      </div>

      {/* Include the Popup component */}
      {isPopupOpen && <Popup onClose={closePopup} />}
    </div>
  );
};

export default MentorGrid;
