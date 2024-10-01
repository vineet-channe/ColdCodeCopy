import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pragya from "./Pragya";
import axios from "axios";
import Navbar from './Navbar';

const documents = [
  {
    title: "Income Certificate",
    description: "Required for various government schemes and subsidies.",
    path: "/query/incomecertificate",
  },
  {
    title: "Caste Certificate",
    description: "Necessary for students belonging to reserved categories.",
    path: "/query/castecertificate",
  },
  {
    title: "Domicile Certificate",
    description: "Required to prove the residence status of an individual.",
    path: "/query/domicilecertificate",
  },
  {
    title: "Bonafide Certificate",
    description: "To be issued by the educational institution.",
    path: "/query/bonafidecertificate",
  },
];

const Query = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState(''); // State to hold the URL

  const handleSubmit = async () => {
    if (!url) {
      alert('Please enter a URL'); // Basic validation
      return;
    }
    
    try {
      // Assuming your backend API endpoint is '/api/support'
      const response = await axios.post('/api/support', { url });
      console.log('Response from backend:', response.data);
      alert('Support request sent successfully!');
    } catch (error) {
      console.error('Error sending support request:', error);
      alert('Failed to send support request.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Navbar/>
      <h2 className="text-2xl font-bold mb-6 mt-14">Documents Needed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((document, index) => (
          <div
            key={index}
            className="bg-white border rounded-md shadow-md p-4 cursor-pointer"
            onClick={() => navigate(document.path)}
          >
            <h3 className="text-xl font-semibold mb-2">{document.title}</h3>
            <p className="text-gray-600">{document.description}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md mt-6">
          <input
            type="text"
            placeholder="Enter URL of the application form"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border rounded-md p-2 w-full"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            Get Support
          </button>
        </div>
    </div>
  );
};

export default Query;
