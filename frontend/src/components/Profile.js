import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import Navbar from './Navbar';
import Popup from './Popup'; 

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

const expectedHoursOptions = [
  { value: '1 to 2 hours', label: '1 to 2 hours' },
  { value: '3 to 5 hours', label: '3 to 5 hours' },
  { value: '5+ hours', label: '5+ hours' },
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

const userInfo = JSON.parse(localStorage.getItem('user-info'));
const profileImage = userInfo?.image || '';
const profileName = userInfo?.name || '';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
  
    name: '',
    age: '',
    academic_interests: [],
    career_aspirations: [],
    expected_hours: '',
    preferred_languages: [],
    preferred_communication: [],
    phoneNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    if (userInfo && userInfo.email) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(`https://coldcodecopy.onrender.com/api/user/get/${userInfo.email}`);
          setUserProfile(response.data[0]);
          console.log(response.data)
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError('Error fetching profile data');
        }
      };
      fetchUserProfile();
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleCommunicationChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      preferred_communication: selectedValues,
    }));
  };

  const handleLanguageChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      preferred_languages: selectedValues,
    }));
  };

  const handleExpectedHoursChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : '';
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      expected_hours: selectedValue,
    }));
  };

  const handleCareerChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      career_aspirations: selectedValues,
    }));
  };

  const handleAcademicChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      academic_interests: selectedValues,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.put(`https://coldcodecopy.onrender.com/api/user/update/${userInfo.email}`, userProfile);
      if (response.data.success) {
        setSuccessMessage('Profile updated successfully!');
      } else {
        setError(response.data.message || 'Profile update failed.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLookUpMentor = () => {
    setPopupVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Navbar />
  
      <div className="flex-grow flex items-center justify-center py-12">
        <div className="flex w-4/5 max-w-6xl bg-white shadow-md rounded-lg">
   
          <div className="w-1/4 p-6 flex flex-col items-center justify-center border-r-2 bg-white">
            <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-lg font-semibold">{profileName}</h3>
          </div>
  
          <div className="w-3/4 p-6 max-h-screen">
            
            <form onSubmit={handleSubmit} className="h-full flex flex-wrap gap-4">
        
              <div className="w-full flex items-center">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userProfile.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={userProfile.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>
  
              <div className="w-full flex items-center">
                <div className="w-full
                 pr-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={userProfile.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="w-full">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expected_hours">
                  Expected Study Hours *
                </label>
                <Select
                  id="expected_hours"
                  name="expected_hours"
                  options={expectedHoursOptions}
                  value={expectedHoursOptions.find(option => option.value === userProfile.expected_hours)}
                  onChange={handleExpectedHoursChange}
                  placeholder="Select expected hours"
                  className="border rounded-lg w-full"
                  required
                />
              </div>
              </div>
  
              <div className="w-full flex">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="academic_interests">
                    Academic Interests *
                  </label>
                  <Select
                    id="academic_interests"
                    name="academic_interests"
                    isMulti
                    options={academicOptions}
                    value={academicOptions.filter(option => userProfile.academic_interests.includes(option.value))}
                    onChange={handleAcademicChange}
                    placeholder="Select academic interests"
                    className="border rounded-lg w-full"
                    required
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="career_aspirations">
                    Career Aspirations
                  </label>
                  <Select
                    id="career_aspirations"
                    name="career_aspirations"
                    isMulti
                    options={careerOptions}
                    value={careerOptions.filter(option => userProfile.career_aspirations.includes(option.value))}
                    onChange={handleCareerChange}
                    placeholder="Select career aspirations"
                    className="border rounded-lg w-full"
                  />
                </div>
              </div>
  
              <div className="w-full flex">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferred_communication">
                    Preferred Communication *
                  </label>
                  <Select
                    id="preferred_communication"
                    name="preferred_communication"
                    isMulti
                    options={communicationOptions}
                    value={communicationOptions.filter(option => userProfile.preferred_communication.includes(option.value))}
                    onChange={handleCommunicationChange}
                    placeholder="Select communication methods"
                    className="border rounded-lg w-full"
                    required
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preferred_languages">
                    Preferred Languages
                  </label>
                  <Select
                    id="preferred_languages"
                    name="preferred_languages"
                    isMulti
                    options={languageOptions}
                    value={languageOptions.filter(option => userProfile.preferred_languages.includes(option.value))}
                    onChange={handleLanguageChange}
                    placeholder="Select preferred languages"
                    className="border rounded-lg w-full"
                  />
                </div>
              </div>
  
              <div className="flex justify-end mt-4 w-full">
                <button
                  type="submit"
                  className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-600"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
            
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
  
            {popupVisible && <Popup onClose={() => setPopupVisible(false)} />} 
          </div>
        </div>
      </div>
    </div>
  );
  };

export default UserProfile;
