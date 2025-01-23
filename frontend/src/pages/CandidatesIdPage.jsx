import React, { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Badge } from "../components/badge";
import { Card, CardContent } from "../components/card";
import { useDarkMode } from "../components/DarkModeContext";
import { Moon, Sun, Edit, LogOut, IdCard } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";



const CandidateID = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [candidate, setCandidate] = useState(null);
    const [message, setMessage] = useState("");
    const [canEdit, setCanEdit] = useState(false)
    const [userType, setUserType] = useState("")
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [hireStatus, setHireStatus] = useState(null);


    const handleSignOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        console.log('User signed out');
    };

    useEffect(() => {
        const fetchHireStatus = async () => {
            try {
                const clientId = localStorage.getItem("token");
                const response = await axios.get(
                    `https://jpd-nopixel.onrender.com/api/hiring-requests/status/${clientId}/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setHireStatus(response.data.status);
            } catch (error) {
                console.error("Error fetching hire request status:", error);
                setHireStatus("Error fetching status");
            }
        };

        const fetchCandidate = async () => {
            try {

                setUserType(() => localStorage.getItem("userType"))
                console.log
                setCanEdit(() => userType === "freelancer")
                console.log(canEdit)

                const token = localStorage.getItem("token");
                console.log(id)
                const response = await axios.get(`https://jpd-nopixel.onrender.com/api/freelancers/${id}`, {
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
        fetchHireStatus()
    }, [canEdit, userType, id]);


    


    const handleHireRequest = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://jpd-nopixel.onrender.com/api/hiring-requests",
                {
                    clientId: localStorage.getItem("token"), // Assuming client ID is stored locally
                    freelancerId: id,
                    message,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Hiring request sent successfully!");
            setMessage(""); // Clear the message field
        } catch (err) {
            console.error("Error sending hire request:", err);
            alert("Failed to send hire request.");
        }
    };



    if (loading) {
        return (
            <div
                className={`min-h-screen flex flex-col items-center justify-center text-4xl ${darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
                    }`}
            >
                <div>Loading candidate data...</div>

            </div>
        );
    }

    if (!candidate) {
        return (
            <div
                className={`min-h-screen flex flex-col items-center justify-center text-4xl ${darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
                    }`}
            >
                <div>Candidate not found</div>
                <Button onClick={() => window.history.back()} className="mt-4">
                    Go back
                </Button>
            </div>
        );
    }


    return (
        <div
            className={`min-h-screen ${darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
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
                    </div>
                </div>
                <Card
                    className={`hover:shadow-lg transition-shadow duration-200 ${darkMode ? "bg-dark-card text-dark-foreground" : "bg-white"
                        }`}
                >
                    <CardContent className="p-6">
                        <div className="flex items-center mb-6">
                            <img
                                src={candidate.avatar || "/user.png"}
                                alt={candidate.name}
                                className="w-24 h-24 rounded-full mr-6"
                            />
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{candidate.name}</h1>
                                <p
                                    className={`text-xl ${darkMode ? "text-dark-foreground" : "text-gray-600"
                                        }`}
                                >
                                    {candidate.education}
                                </p>
                                <p
                                    className={`text-lg ${darkMode ? "text-dark-foreground" : "text-gray-600"
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
                                        className={`text-xs ${darkMode ? "bg-dark" : "bg-gray-200"
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
                                        className={`border-l-2 ${darkMode ? "border-gray-600" : "border-gray-300"
                                            } pl-4 pb-4`}
                                    >
                                        <h3 className="text-xl font-semibold">{job.title}</h3>
                                        <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                            {job.company}
                                        </p>
                                        <p
                                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        >
                                            {job.period}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
  

                    </CardContent>
                    <CardContent className="p-6">
                      {userType === "client" && (
                            <div className="mt-6">
                                <h2 className="text-2xl font-semibold mb-2">Send a Hire Request</h2>
                                <textarea
                                    className={`w-full p-4 rounded-lg border ${darkMode ? "bg-dark-card text-dark-foreground border-gray-700" : "bg-gray-100 border-gray-300"
                                        }`}
                                    placeholder="Write your message to the freelancer..."
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <Button
                                    className="w-full mt-4"
                                    onClick={handleHireRequest}
                                    disabled={!message.trim()}
                                >
                                    Send Hire Request
                                </Button>
                            </div>
            
                        )}
                        {hireStatus && (
    <div className="mt-4">
        <h2 className="text-xl font-semibold">Hire Request Status</h2>
        <p
            className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
            {hireStatus}
        </p>
    </div>
)}
                    </CardContent>
                </Card>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/`)}
                >
                    Back
                </Button>
            </div>
        </div>

    );
};

export default CandidateID;
