import React, { useState } from 'react';

const Polls = () => {
  const [pollResponses, setPollResponses] = useState({});

  const polls = [
    {
      id: 1,
      question: "What topic would you like to see covered in the next live lecture?",
      options: ["Web Development", "Data Science", "Artificial Intelligence", "Cybersecurity"]
    },
    {
      id: 2,
      question: "Which programming language are you most interested in learning?",
      options: ["JavaScript", "Python", "Java", "C++"]
    },
    {
      id: 3,
      question: "What format do you prefer for online lectures?",
      options: ["Recorded Videos", "Live Sessions", "Interactive Workshops"]
    },
  ];

  const handleVote = (pollId, option) => {
    setPollResponses((prev) => ({
      ...prev,
      [pollId]: option 
    }));
  };

  const handleSubmit = async (pollId) => {
    const selectedOption = pollResponses[pollId];
    if (selectedOption) {
      try {
        await fetch(`http://localhost:5000/api/forum/polls/${pollId}/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ response: selectedOption }),
        });
        alert("Vote submitted successfully!");
      } catch (error) {
        console.error("Error submitting vote:", error);
      }
    } else {
      alert("Please select an option before submitting.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Polls</h2>
      {polls.map((poll) => (
        <div key={poll.id} className="bg-white p-4 mb-4 rounded-lg shadow">
          <h3 className="font-bold">{poll.question}</h3>
          <div className="mt-2">
            {poll.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`poll-${poll.id}-option-${index}`}
                  name={`poll-${poll.id}`}
                  value={option}
                  onChange={() => handleVote(poll.id, option)}
                />
                <label htmlFor={`poll-${poll.id}-option-${index}`} className="ml-2">{option}</label>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSubmit(poll.id)}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Vote
          </button>
        </div>
      ))}
    </div>
  );
};

export default Polls;
