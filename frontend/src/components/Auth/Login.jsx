import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const userType = new URLSearchParams(search).get("type");

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userType }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("authToken", JSON.stringify(true));
        navigate(userType === "client" ? "/client/dashboard" : "/freelancer/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-md">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a
            href={`/signup?type=${userType}`}
            className="text-blue-500 underline"
          >
            No account? Sign up here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
