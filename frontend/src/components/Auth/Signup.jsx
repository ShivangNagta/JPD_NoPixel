import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Signup = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const userType = new URLSearchParams(search).get("type");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://jpd-nopixel.onrender.com/auth/signup/${userType}`, {
        
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const text = await response.text();
      let data = {};
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (error) {
          console.log("Failed to parse response as JSON:", error);
        }
      }
  
      if (response.ok) {
        navigate(userType === "client" ? "/login?type=client" : "/login?type=freelancer");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Network or server error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  
  return (
    <div 
    className="min-h-screen flex items-center justify-center bg-dark-100 font-labil" >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Create an Account as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <button type="submit" className="w-full bg-purple-500 text-white py-3 rounded-md">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;