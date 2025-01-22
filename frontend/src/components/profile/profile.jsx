import React, { useState, useEffect } from "react";

const Profile = ({ initialName, initialEmail }) => {
  const [profile, setProfile] = useState({
    name: initialName || "",
    email: initialEmail || "",
    phone: "",
    address: "",
    bio: "",
    skills: [],
  });

  const [editingField, setEditingField] = useState(null); // Tracks the field being edited
  const [skillInput, setSkillInput] = useState("");

  // Fetch additional data from a simulated database
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/profile"); // Replace with actual endpoint
      const data = await response.json();
      setProfile((prev) => ({ ...prev, ...data }));
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save changes to the database
  const saveChanges = async (field) => {
    try {
      const response = await fetch(`/api/profile/${field}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: profile[field] }),
      });

      if (response.ok) {
        alert(`${field} updated successfully!`);
      } else {
        alert("Failed to update.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while saving.");
    } finally {
      setEditingField(null); // Exit edit mode
    }
  };

  // Handle skills
  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput)) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          My Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Fields */}
          {Object.entries(profile).map(([key, value]) =>
            key !== "skills" ? (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {key}
                </label>
                {editingField === key ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="flex-1 p-3 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => saveChanges(key)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-gray-800">{value || "Not provided"}</p>
                    <button
                      onClick={() => setEditingField(key)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-md"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ) : null
          )}
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills
          </label>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-md"
              placeholder="Add a skill"
            />
            <button
              onClick={addSkill}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
