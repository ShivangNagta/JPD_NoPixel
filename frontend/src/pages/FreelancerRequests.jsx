import React, { useEffect, useState } from "react";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import { useDarkMode } from "../components/DarkModeContext";
import axios from "axios";

const FreelancerRequests = () => {
    const [hiringRequests, setHiringRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { darkMode } = useDarkMode();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:3000/api/hiring-requests`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setHiringRequests(response.data.requests);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching hiring requests:", err);
                setError("Failed to load hiring requests.");
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const handleAccept = async (requestId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3000/api/hiring-requests/${requestId}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setHiringRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            );
            alert("Request accepted successfully.");
        } catch (error) {
            console.error("Error accepting request:", error);
            alert("Failed to accept the request. Please try again.");
        }
    };

    const handleReject = async (requestId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3000/api/hiring-requests/${requestId}/decline`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setHiringRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== requestId)
            );
            alert("Request declined successfully.");
        } catch (error) {
            console.error("Error declining request:", error);
            alert("Failed to decline the request. Please try again.");
        }
    };

    if (loading) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
                    }`}
            >
                <p>Loading hiring requests...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
                    }`}
            >
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen ${darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
                } transition-colors duration-200`}
        >
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Hiring Requests</h1>
                {hiringRequests.length === 0 ? (
                    <p>No hiring requests found.</p>
                ) : (
                    hiringRequests.map((request) => (
                        <Card
                            key={request._id}
                            className={`mb-4 hover:shadow-lg transition-shadow duration-200 ${darkMode ? "bg-dark-card text-dark-foreground" : "bg-white"
                                }`}
                        >
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold">Request from Client ID: {request.clientId}</h2>
                                <p className="mt-2 text-gray-700">{request.message}</p>
                                <div className="flex justify-end gap-4 mt-4">
                                    <Button
                                        variant="success"
                                        onClick={() => handleAccept(request._id)}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleReject(request._id)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default FreelancerRequests;
