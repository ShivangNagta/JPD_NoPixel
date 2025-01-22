import React, { useEffect , useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/button";
import { Badge } from "../components/badge";
import { Card, CardContent } from "../components/card";
import { useDarkMode } from "../components/DarkModeContext";
import { Moon, Sun, Edit, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios"

// Mock authentication (in a real app, this would be handled by a proper auth system)
const userType = localStorage.getItem("userType");


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
  {
    id: "2023csb1153@iitrpr.ac.in",
    name: "Bob Smith",
    skills: ["Python", "Django", "PostgreSQL"],
    experience: 3,
    education: "MS Information Systems",
    location: "San Francisco, CA",
    avatar: "/avatars/bob.jpg",
    description:
      "Backend developer specializing in Python and Django applications. Passionate about building robust and scalable server-side solutions.",
    jobHistory: [
      {
        title: "Backend Developer",
        company: "Data Systems Co.",
        period: "2019 - Present",
      },
      {
        title: "Junior Python Developer",
        company: "Tech Startups Inc.",
        period: "2017 - 2019",
      },
    ],
  },
];

const CandidateProfile = () => {

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    console.log('User signed out');
  };

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
        setLoading(false); 
      } catch (err) {
        console.error("Error fetching candidate:", err);
        setError("Failed to fetch candidate data.");
        setLoading(false); 
      }
    };

    fetchCandidate();
  }, []);



  if (loading) {
    return (
        <div
        className={`min-h-screen flex flex-col items-center justify-center text-4xl ${
          darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
        }`}
      >
        <div>Loading candidate data...</div>

      </div>
    );
  }

  if (!candidate) {
    return (
        <div
        className={`min-h-screen flex flex-col items-center justify-center text-4xl ${
          darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
        }`}
      >
        <div>Candidate not found</div>
        <Button onClick={() => window.history.back()} className="mt-4">
          Go back
        </Button>
      </div>
    );
  }

  const canEdit = userType === "freelancer";

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
      } transition-colors duration-200`}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Candidate Profile</h1>
          <div className="flex gap-2">
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
            {canEdit && (
              <Link to={`/profile/${candidate.id}/edit`}>
                <Button variant="outline" size="icon">
                  <Edit className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </Link>
            )}
            {canEdit && (
              <Link to={`/`}>
                <Button variant="outline" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </Link>
            )}
          </div>
        </div>
        <Card
          className={`hover:shadow-lg transition-shadow duration-200 ${
            darkMode ? "bg-dark-card text-dark-foreground" : "bg-white"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <img
                src={candidate.avatar || "/placeholder.svg"}
                alt={candidate.name}
                className="w-24 h-24 rounded-full mr-6"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{candidate.name}</h1>
                <p
                  className={`text-xl ${
                    darkMode ? "text-dark-foreground" : "text-gray-600"
                  }`}
                >
                  {candidate.education}
                </p>
                <p
                  className={`text-lg ${
                    darkMode ? "text-dark-foreground" : "text-gray-600"
                  }`}
                >
                  {candidate.location}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">About</h2>
              <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
                {candidate.description}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className={`text-xs ${
                      darkMode ? "bg-dark" : "bg-gray-200"
                    }`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Experience</h2>
              <p className="text-lg mb-4">
                <strong>{candidate.experience} years</strong> of total
                experience
              </p>
              <div className="space-y-4">
                {candidate.jobHistory.map((job, index) => (
                  <div
                    key={index}
                    className={`border-l-2 ${
                      darkMode ? "border-gray-600" : "border-gray-300"
                    } pl-4 pb-4`}
                  >
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      {job.company}
                    </p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {job.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {userType === "client" && (
              <Button className="w-full">Send Hire Request</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    
  );
};

export default CandidateProfile;
