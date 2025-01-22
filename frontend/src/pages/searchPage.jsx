import React, { useState, useMemo, useEffect } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/button";
import { Badge } from "../components/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { Card, CardContent } from "../components/card";
import { Search, SlidersHorizontal, Moon, Sun, X } from "lucide-react";
import { useDarkMode } from "../components/DarkModeContext";
import { Link, useNavigate } from "react-router-dom";
import userWhite from "../assets/userWhite.svg";
import userBlack from "../assets/userBlack.svg";
import logoWhite from "../assets/logoWhite.svg";
import logoBlack from "../assets/logoBlack.svg";
import axios from "axios";

const SkillsFilter = ({
  allSkills,
  selectedSkills,
  setSelectedSkills,
  isVisible,
}) => (
  <div className={`mb-6 ${isVisible ? "" : "hidden"}`}>
    <h2 className="text-lg font-semibold mb-2">Filter by Skills:</h2>
    <div className="flex flex-wrap gap-2">
      {allSkills.map((skill) => (
        <Badge
          key={skill}
          variant={selectedSkills.includes(skill) ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => {
            setSelectedSkills((prev) =>
              prev.includes(skill)
                ? prev.filter((s) => s !== skill)
                : [...prev, skill]
            );
          }}
        >
          {skill}
        </Badge>
      ))}
    </div>
  </div>
);

const SelectedSkills = ({ selectedSkills, setSelectedSkills }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {selectedSkills.map((skill) => (
      <Badge
        key={skill}
        variant="outline"
        className="cursor-pointer flex items-center"
        onClick={() =>
          setSelectedSkills((prev) => prev.filter((s) => s !== skill))
        }
      >
        {skill}
        <X className="ml-1 h-3 w-3" />
      </Badge>
    ))}
  </div>
);

export default function SearchPage() {
  const [candidates, setCandidates] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();
  const [isSkillFilterVisible, setIsSkillFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get(`http://localhost:3000/api/freelancers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCandidates(response.data);

        const skills = Array.from(
          new Set(response.data.flatMap((candidate) => candidate.skills))
        );
        setAllSkills(skills);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    }

    fetchCandidates();
  }, []);

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedSkills.length === 0 ||
            selectedSkills.every((skill) => candidate.skills.includes(skill)))
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        } else {
          return b.experience - a.experience;
        }
      });
  }, [searchTerm, selectedSkills, sortBy, candidates]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
      } transition-colors duration-200 font-labil`}
    >
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <img
            src={darkMode ? logoWhite : logoBlack}
            alt="Logo"
            className="w-12 h-12"
            onClick={() => navigate("/")}>
          </img>
          <div className="flex justify-center gap-4 items-center">
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
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/profile")}
              aria-label="Profile Icon"
            >
              <img
                src={darkMode ? userWhite : userBlack}
                alt="Profile Icon"
                className="w-6 h-6"
              />
            </Button>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Candidate Search</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              style={{
                outline: "none",
                boxShadow: "none",
              }}
            />
          </div>
          <Select onValueChange={(value) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="experience">Sort by Experience</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setIsSkillFilterVisible(!isSkillFilterVisible)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {isSkillFilterVisible ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <SelectedSkills
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
        />
        <SkillsFilter
          allSkills={allSkills}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          isVisible={isSkillFilterVisible}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCandidates.map((candidate) => (
            <Link
              to={`/profile/${candidate._id}`}
              key={candidate._id}
              className="no-underline"
            >
              <Card
                className={`hover:shadow-lg transition-shadow duration-200 ${
                  darkMode
                    ? "bg-dark text-dark-foreground shadow-lg hover:shadow-gray-700"
                    : "bg-white shadow-md hover:shadow-lg"
                }`}
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {candidate.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-dark-muted" : "text-gray-600"
                    }`}
                  >
                    {candidate.education}
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-dark-muted" : "text-gray-600"
                    }`}
                  >
                    {candidate.location}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Experience:</strong> {candidate.experience} years
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {candidate.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        classname={`text-xs ${
                          darkMode ? "bg-dark" : "bg-gray-200"
                        }`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}