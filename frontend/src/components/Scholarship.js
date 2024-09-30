import React, { useState, useEffect } from "react";
import scholarshipsData from "./scholarships.json";

const Scholarship = () => {
  // State for filters
  const [filters, setFilters] = useState({
    state: "",
    class: "",
    caste: "",
    gender: "",
    eligibility: "",
    stipendRange: [0, 50000]
  });
  const [filteredResults, setFilteredResults] = useState(scholarshipsData);

  // Function to handle changes in filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Function to filter results
  useEffect(() => {
    const filtered = scholarshipsData.filter((scholarship) => {
      return (
        (filters.state ? scholarship.state === filters.state : true) &&
        (filters.class ? scholarship.class === filters.class : true) &&
        (filters.caste ? scholarship.caste === filters.caste : true) &&
        (filters.gender ? scholarship.gender === filters.gender : true) &&
        (filters.eligibility ? scholarship.eligibility === filters.eligibility : true) &&
        scholarship.stipend >= filters.stipendRange[0] &&
        scholarship.stipend <= filters.stipendRange[1]
      );
    });
    setFilteredResults(filtered);
  }, [filters]);

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* State Filter */}
        <div className="mb-4">
          <label className="block mb-2">State</label>
          <select
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            {/* Add more states as needed */}
          </select>
        </div>

        {/* Class Filter */}
        <div className="mb-4">
          <label className="block mb-2">Class</label>
          <select
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="12th">12th</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
            {/* Add more classes */}
          </select>
        </div>

        {/* Caste Filter */}
        <div className="mb-4">
          <label className="block mb-2">Caste</label>
          <select
            name="caste"
            value={filters.caste}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="General">General</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
            {/* Add more caste categories */}
          </select>
        </div>

        {/* Gender Filter */}
        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Eligibility Filter */}
        <div className="mb-4">
          <label className="block mb-2">Eligibility</label>
          <select
            name="eligibility"
            value={filters.eligibility}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="Merit-based">Merit-based</option>
            <option value="Need-based">Need-based</option>
            <option value="Sports quota">Sports quota</option>
            <option value="Minority">Minority</option>
            {/* Add more eligibility types */}
          </select>
        </div>
      </div>

      {/* Scholarship Results */}
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Scholarship Results</h2>

        <div className="grid grid-cols-1 gap-4">
          {filteredResults.map((scholarship) => (
            <div key={scholarship.id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-bold">{scholarship.name}</h3>
              <p>State: {scholarship.state}</p>
              <p>Class: {scholarship.class}</p>
              <p>Caste: {scholarship.caste}</p>
              <p>Gender: {scholarship.gender}</p>
              <p>Stipend: ₹{scholarship.stipend}</p>
              <p>Eligibility: {scholarship.eligibility}</p>
              <p>Available from {scholarship.startDate} to {scholarship.endDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
