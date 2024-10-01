import React from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Documents Needed</h2>
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
    </div>
  );
};

export default Query;
