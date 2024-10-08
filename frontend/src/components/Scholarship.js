import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import scholarshipsData from "./scholarships.json";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Navbar from "./Navbar";

const Scholarship = () => {
  const navigate = useNavigate(); 
  const [filters, setFilters] = useState({
    state: "",
    class: "",
    caste: "",
    stipendRange: [500, 50000],
    gender: "",
    eligibility: [],
    courseType: "",
    institutionType: [],
    scholarshipType: [],
    ageRange: [16, 35],
    studyAbroad: false,
    applicationFee: false,
    startDate: "",
    endDate: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState(scholarshipsData);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const { value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      eligibility: prevFilters.eligibility.includes(value)
        ? prevFilters.eligibility.filter((v) => v !== value)
        : [...prevFilters.eligibility, value]
    }));
  };

  const handleStipendRangeChange = (value) => {
    setFilters({ ...filters, stipendRange: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filtered = scholarshipsData.filter((scholarship) => {
      const matchesSearch = scholarship.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) || 
        scholarship.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        matchesSearch &&
        (filters.state ? scholarship.state === filters.state : true) &&
        (filters.class ? scholarship.class === filters.class : true) &&
        (filters.caste ? scholarship.caste === filters.caste : true) &&
        scholarship.stipend >= filters.stipendRange[0] &&
        scholarship.stipend <= filters.stipendRange[1] &&
        (filters.gender ? scholarship.gender === filters.gender : true) &&
        (filters.eligibility.length ? filters.eligibility.includes(scholarship.eligibility) : true) &&
        (filters.startDate ? new Date(scholarship.startDate) >= new Date(filters.startDate) : true) &&
        (filters.endDate ? new Date(scholarship.endDate) <= new Date(filters.endDate) : true)
      );
    });
    setFilteredResults(filtered);
  }, [filters, searchTerm]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-1/4 p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6">Filters</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">State</label>
          <select name="state" onChange={handleFilterChange} className="mt-1 block w-full p-2 border rounded-md">
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>

          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Class</label>
          <select name="class" onChange={handleFilterChange} className="mt-1 block w-full p-2 border rounded-md">
            <option value="">Select Class</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Caste</label>
          <select name="caste" onChange={handleFilterChange} className="mt-1 block w-full p-2 border rounded-md">
            <option value="">Select Caste</option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Stipend Range</label>
          <Slider
            range
            min={500}
            max={50000}
            defaultValue={filters.stipendRange}
            value={filters.stipendRange}
            onChange={handleStipendRangeChange}
            className="w-full"
          />
          <p>Selected Range: ₹{filters.stipendRange[0]} - ₹{filters.stipendRange[1]}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleFilterChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleFilterChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Eligibility</label>
          <div>
            <label className="block">
              <input
                type="checkbox"
                value="Merit-based"
                onChange={handleMultiSelectChange}
              />
              Merit-based
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Sports quota"
                onChange={handleMultiSelectChange}
              />
              Sports quota
            </label>
            <label className="block">
              <input
                type="checkbox"
                value="Need-based"
                onChange={handleMultiSelectChange}
              />
              Need-based
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age Range</label>
          <Slider
            range
            min={16}
            max={35}
            value={filters.ageRange}
            onChange={(value) => setFilters({ ...filters, ageRange: value })}
            className="w-full"
          />
          <p>Selected Age Range: {filters.ageRange[0]} - {filters.ageRange[1]} years</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="studyAbroad"
              onChange={(e) => setFilters({ ...filters, studyAbroad: e.target.checked })}
            />
            Study Abroad Opportunities
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              name="applicationFee"
              onChange={(e) => setFilters({ ...filters, applicationFee: e.target.checked })}
            />
            Application Fee Required
          </label>
        </div>

        <button
          onClick={() => setFilters({
            state: "",
            class: "",
            caste: "",
            stipendRange: [500, 50000],
            gender: "",
            eligibility: [],
            courseType: "",
            institutionType: [],
            scholarshipType: [],
            ageRange: [16, 35],
            studyAbroad: false,
            applicationFee: false,
            startDate: "",
            endDate: ""
          })}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Reset Filters
        </button>

        <button
          onClick={() => navigate("/query/")}
          className="w-full bg-green-500 text-white py-2 rounded-md mt-4"
        >
          Document Helper
        </button>
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Scholarships</h2>

        <input
          type="text"
          placeholder="Search Scholarships..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 mb-4 border rounded-md"
        />

        {filteredResults.length > 0 ? (
          <ul>
            {filteredResults.map((scholarship, index) => (
              <li key={index} className="mb-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold">{scholarship.title}</h3>
                <p>{scholarship.description}</p>
                <p>Stipend: ₹{scholarship.stipend}</p>
                <p>Eligibility: {scholarship.eligibility}</p>
                <p>State: {scholarship.state}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No scholarships found.</p>
        )}
      </div>
    </div>
  );
};

export default Scholarship;
