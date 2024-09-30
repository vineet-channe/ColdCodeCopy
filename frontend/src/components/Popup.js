import React, { useState } from 'react';
import Select from 'react-select';

const Popup = ({ onClose }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({
    communication: [],
    languages: [],
    career: [],
    academic: [],
  });
  const [loading, setLoading] = useState(false);
  const [mentorDetails, setMentorDetails] = useState(null); // State to store mentor details
  const [error, setError] = useState("");

  const communicationOptions = [
    { value: 'Video Call', label: 'Video Call' },
    { value: 'Text Messages', label: 'Text Messages' },
    { value: 'Email', label: 'Email' },
    { value: 'Phone Calls', label: 'Phone Calls' },
  ];

  const languageOptions = [
    { value: 'Marathi', label: 'Marathi' },
    { value: 'English', label: 'English' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Gujarati', label: 'Gujarati' },
  ];

  const careerOptions = [
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Scientist', label: 'Scientist' },
    { value: 'Lawyer', label: 'Lawyer' },
    { value: 'Businessperson', label: 'Businessperson' },
    { value: 'Social Worker', label: 'Social Worker' },
    { value: 'Artist', label: 'Artist' },
  ];

  const academicOptions = [
    { value: 'Math', label: 'Math' },
    { value: 'Science', label: 'Science' },
    { value: 'English', label: 'English' },
    { value: 'Social Studies', label: 'Social Studies' },
    { value: 'Computers', label: 'Computers' },
    { value: 'Business Studies', label: 'Business Studies' },
  ];

  const handleAnswerChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setAnswers(prev => ({ ...prev, [name]: selectedValues }));
  };

  const handleNextQuestion = () => {
    setQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    setQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/mentor/submit", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          communication_preferences: answers.communication,
          languages: answers.languages,
          career: answers.career,
          academic: answers.academic,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch mentor details");
      }

      const data = await response.json();
      setMentorDetails(data); // Set the mentor details received from the backend
      onClose(); // Close the popup after submitting
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const questions = [
    {
      label: "Select preferred communication methods:",
      name: "communication",
      options: communicationOptions,
      multiple: true,
    },
    {
      label: "Select preferred languages:",
      name: "languages",
      options: languageOptions,
      multiple: true,
    },
    {
      label: "Select your career aspirations:",
      name: "career",
      options: careerOptions,
      multiple: true,
    },
    {
      label: "Select your academic interests:",
      name: "academic",
      options: academicOptions,
      multiple: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">{questions[questionIndex].label}</h3>
        <Select
          isMulti={questions[questionIndex].multiple}
          options={questions[questionIndex].options}
          onChange={(selected) => handleAnswerChange(questions[questionIndex].name, selected)}
        />
        <div className="mt-6 flex justify-between">
          {questionIndex > 0 && (
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handlePrevQuestion}>
              Previous
            </button>
          )}
          {questionIndex < questions.length - 1 ? (
            <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleNextQuestion}>
              Next
            </button>
          ) : (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>

        {/* Display error message if any */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Display mentor details if available */}
        {mentorDetails && (
          <div className="mt-6">
            <h3 className="text-lg font-bold">Mentor Details:</h3>
            <p><strong>Name:</strong> {mentorDetails.name}</p>
            <p><strong>Background Industry:</strong> {mentorDetails.background_industry}</p>
            <p><strong>Skills/Expertise:</strong> {mentorDetails.skills_expertise}</p>
            <p><strong>Availability:</strong> {mentorDetails.availability}</p>
            <p><strong>Languages:</strong> {mentorDetails.languages.join(', ')}</p>
            <p><strong>Communication Preferences:</strong> {mentorDetails.communication_preferences.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
