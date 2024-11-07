// About.js
import React from 'react';
import Navbar from './Navbar';  // Adjust the import path if necessary

const About = () => {
  const developers = [
    {
      name: 'Vineet Channe',
      role: 'Full Stack Developer',
      bio: 'A versatile full-stack developer skilled in both front-end and back-end technologies, focused on creating dynamic, responsive applications. Excels in translating complex requirements into seamless user experiences and enjoys tackling technical challenges with innovative, efficient solutions.',
    },
    {
      name: 'Lokesh Chaudhari',
      role: 'Full Stack Developer',
      bio: 'An adaptable full-stack developer with a keen eye for detail and a passion for building user-friendly, scalable applications. Experienced in working across the stack to ensure cohesive, efficient designs that prioritize user experience and performance.',
    },
    {
      name: 'Prasad Chopade',
      role: 'Full Stack Developer',
      bio: 'An experienced full-stack developer dedicated to building robust, scalable applications. Skilled in designing end-to-end systems that integrate smoothly across diverse platforms, using both front-end and back-end expertise to deliver efficient, reliable solutions.',
    },
    {
      name: 'Paarth Bahety',
      role: 'Full Stack Developer',
      bio: 'A collaborative full-stack developer who thrives in team environments. With a solid foundation in both front and back-end technologies, adept at bridging the gap between design and functionality, ensuring project success through open communication and shared goals.',
    },
  ];

  return (
    <div>
      <Navbar /> {/* Navbar at the top of the page */}
      <div className="flex flex-col items-center p-8 pt-24 bg-gray-100 min-h-screen">
        {/* Adjusted pt-24 for top padding to clear the Navbar */}
        <h1 className="text-3xl font-semibold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-700 mb-6 text-center max-w-lg">
        We are a team of four developers dedicated to building Sarthi, a mentor matching application designed to make impactful connections. Combining backend systems with sleek frontends, we bring diverse skills together to create a seamless experience that bridges mentors and mentees.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          {developers.map((dev, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold text-blue-500">{dev.name}</h2>
              <h3 className="text-lg text-gray-600 mb-2">{dev.role}</h3>
              <p className="text-gray-700">{dev.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
