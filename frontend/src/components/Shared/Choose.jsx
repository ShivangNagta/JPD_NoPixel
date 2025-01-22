import React from "react";
import { useNavigate } from "react-router-dom";

const Choose = () => {
  const navigate = useNavigate();

  const handleSelection = (type) => {
    if (type === "client") navigate("/login?type=client");
    else if (type === "freelancer") navigate("/login?type=freelancer");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white-100">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
        Welcome to Freelancing Website
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        Are you a Client or a Freelancer?
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => handleSelection("client")}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Client
        </button>
        <button
          onClick={() => handleSelection("freelancer")}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Freelancer
        </button>
      </div>
    </div>
  );
};

export default Choose;
