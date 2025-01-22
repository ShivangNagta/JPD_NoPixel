import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/Input";
import { Textarea } from "../components/textarea";
import { Card, CardContent } from "../components/card";
import { useDarkMode } from "../components/DarkModeContext";
import { Moon, Sun, Plus, Minus } from "lucide-react";
import axios from "axios";

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    skills: ["React", "JavaScript", "Node.js"],
    experience: 5,
    education: "BS Computer Science",
    location: "New York, NY",
    avatar: "/avatars/alice.jpg",
    description:
      "Passionate full-stack developer with a focus on React and Node.js. I love building scalable web applications and solving complex problems.",
    jobHistory: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Corp",
        period: "2020 - Present",
      },
      {
        title: "Frontend Developer",
        company: "Web Solutions Inc.",
        period: "2018 - 2020",
      },
      {
        title: "Junior Developer",
        company: "Startup XYZ",
        period: "2016 - 2018",
      },
    ],
  },
];

const CandidateEditPage = () => {
  const [candidate, setCandidate] = useState(null);
  const [formData, setFormData] = useState(null); // Initialize as null
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/freelancer`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const candidate = response.data;

        setCandidate(candidate);
        setFormData({
          name: candidate.name,
          education: candidate.education,
          location: candidate.location,
          experience: candidate.experience,
          skills: candidate.skills.join(", "),
          description: candidate.description,
          jobHistory: candidate.jobHistory.map((job) => ({
            ...job,
            fromDate: job.period.split(" - ")[0],
            toDate:
              job.period.split(" - ")[1] === "Present"
                ? ""
                : job.period.split(" - ")[1],
          })),
          profileImage: null,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching candidate:", err);
        setError("Failed to fetch candidate data.");
        setLoading(false);
      }
    };

    fetchCandidate();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="text-center mt-8">Loading candidate data...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  if (!formData) {
    return <div className="text-center mt-8">Candidate data not available</div>;
  }


  const handleJobHistoryChange = (index, field, value) => {
    const updatedJobHistory = [...formData.jobHistory];
    updatedJobHistory[index] = { ...updatedJobHistory[index], [field]: value };
    setFormData((prevState) => ({
      ...prevState,
      jobHistory: updatedJobHistory,
    }));
  };

  const addJobHistory = () => {
    setFormData((prevState) => ({
      ...prevState,
      jobHistory: [
        ...prevState.jobHistory,
        { title: "", company: "", fromDate: "", toDate: "" },
      ],
    }));
  };

  const removeJobHistory = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      jobHistory: prevState.jobHistory.filter((_, i) => i !== index),
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png']; // Allowed MIME types

      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        setFormData((prevState) => ({
          ...prevState,
          errorMessage: 'Only JPEG and PNG files are allowed.',
        }));
        e.target.value = ''; // Reset file input
      } else {
        setFormData((prevState) => ({
          ...prevState,
          profileImage: file,
          errorMessage: '', // Clear error if valid file
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    const updatedCandidate = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      jobHistory: formData.jobHistory.map((job) => ({
        ...job,
        period: `${job.fromDate} - ${job.toDate || "Present"}`,
      })),
    };
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", updatedCandidate.name);
    formDataToSend.append("education", updatedCandidate.education);
    formDataToSend.append("location", updatedCandidate.location);
    formDataToSend.append("experience", updatedCandidate.experience);
    formDataToSend.append("skills", JSON.stringify(updatedCandidate.skills));
    formDataToSend.append("description", updatedCandidate.description);
    formDataToSend.append("jobHistory", JSON.stringify(updatedCandidate.jobHistory));
    if (updatedCandidate.profileImage) {
      formDataToSend.append("profileImage", updatedCandidate.profileImage);
    }
  
    try {
      const response = await axios.put(
        "http://localhost:3000/api/freelancer",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", response.data);
      navigate("/profile"); 
    } catch (error) {
      console.error("Error updating freelancer details:", error);
    }
  };
  

  if (!candidate) {
    return <div className="text-center mt-8">Candidate not found</div>;
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
        <Card
          className={`hover:shadow-lg transition-shadow duration-200 ${
            darkMode ? "bg-dark-card text-dark-foreground" : "bg-white"
          }`}
        >
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="profileImage">Profile Image</label>
                <Input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                  accept="image/jpeg, image/png"
                />
                {formData.profileImage && (
                  <div>
                    <p>Selected file: {formData.profileImage.name}</p>
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile Preview"
                      className="mt-2 w-32 h-32 object-cover rounded-full"
                    />
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium mb-1"
                >
                  Education
                </label>
                <Input
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-1"
                >
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium mb-1"
                >
                  Years of Experience
                </label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium mb-1"
                >
                  Skills (comma-separated)
                </label>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job History
                </label>
                {formData.jobHistory.map((job, index) => (
                  <div key={index} className="mb-4 p-4 border rounded">
                    <Input
                      placeholder="Job Title"
                      value={job.title}
                      onChange={(e) =>
                        handleJobHistoryChange(index, "title", e.target.value)
                      }
                      className="mb-2"
                      required
                    />
                    <Input
                      placeholder="Company"
                      value={job.company}
                      onChange={(e) =>
                        handleJobHistoryChange(index, "company", e.target.value)
                      }
                      className="mb-2"
                      required
                    />
                    <div className="flex gap-2 mb-2">
                      <Input
                        type="text"
                        placeholder="From (YYYY)"
                        value={job.fromDate}
                        onChange={(e) =>
                          handleJobHistoryChange(
                            index,
                            "fromDate",
                            e.target.value
                          )
                        }
                        required
                        min="1000" // Ensures the number is at least 4 digits long
                        max="9999" // Ensures the number is no more than 4 digits
                        pattern="\d{4}"
                      />
                      <Input
                        type="text"
                        placeholder="To (YYYY or Present)"
                        value={job.toDate}
                        onChange={(e) =>
                          handleJobHistoryChange(
                            index,
                            "toDate",
                            e.target.value
                          )
                        }
                        required
                        pattern="(\d{4}|Present)"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeJobHistory(index)}
                    >
                      <Minus className="mr-2 h-4 w-4" /> Remove Job
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addJobHistory} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" /> Add Job
                </Button>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/profile`)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateEditPage;
