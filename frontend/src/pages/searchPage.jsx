import React, { useState, useMemo, useEffect } from "react";
import { Input } from "../components/input";
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

// Dummy data for candidates
const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    skills: ["React", "JavaScript", "Node.js"],
    experience: 5,
    education: "BS Computer Science",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Bob Smith",
    skills: ["Python", "Django", "PostgreSQL"],
    experience: 3,
    education: "MS Information Systems",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    name: "Charlie Brown",
    skills: ["Java", "Spring", "MySQL"],
    experience: 7,
    education: "BS Software Engineering",
    location: "Chicago, IL",
  },
  {
    id: 4,
    name: "Diana Martinez",
    skills: ["React", "Redux", "GraphQL"],
    experience: 4,
    education: "BS Computer Engineering",
    location: "Austin, TX",
  },
  {
    id: 5,
    name: "Ethan Williams",
    skills: ["Vue.js", "Node.js", "MongoDB"],
    experience: 2,
    education: "BS Web Development",
    location: "Seattle, WA",
  },
  {
    id: 6,
    name: "Fiona Davis",
    skills: ["Angular", "TypeScript", "RxJS"],
    experience: 6,
    education: "BS Information Technology",
    location: "Denver, CO",
  },
  {
    id: 7,
    name: "George Harris",
    skills: ["C#", ".NET Core", "Azure"],
    experience: 8,
    education: "MS Computer Science",
    location: "Dallas, TX",
  },
  {
    id: 8,
    name: "Hannah Moore",
    skills: ["Python", "Flask", "Machine Learning"],
    experience: 4,
    education: "BS Data Science",
    location: "Boston, MA",
  },
  {
    id: 9,
    name: "Ian Carter",
    skills: ["JavaScript", "React", "AWS"],
    experience: 5,
    education: "BS Computer Science",
    location: "Portland, OR",
  },
  {
    id: 10,
    name: "Julia Adams",
    skills: ["Ruby", "Rails", "PostgreSQL"],
    experience: 3,
    education: "BS Software Engineering",
    location: "Atlanta, GA",
  },
  {
    id: 11,
    name: "Kevin Thomas",
    skills: ["Go", "Docker", "Kubernetes"],
    experience: 6,
    education: "BS Computer Science",
    location: "San Jose, CA",
  },
  {
    id: 12,
    name: "Laura Evans",
    skills: ["PHP", "Laravel", "MySQL"],
    experience: 4,
    education: "BS Web Development",
    location: "Miami, FL",
  },
  {
    id: 13,
    name: "Michael Scott",
    skills: ["JavaScript", "Vue.js", "GraphQL"],
    experience: 3,
    education: "BS Information Systems",
    location: "Philadelphia, PA",
  },
  {
    id: 14,
    name: "Nina Taylor",
    skills: ["Python", "Pandas", "Data Analysis"],
    experience: 2,
    education: "BS Data Analytics",
    location: "Los Angeles, CA",
  },
  {
    id: 15,
    name: "Oscar Perez",
    skills: ["C++", "OpenGL", "Game Development"],
    experience: 5,
    education: "MS Game Design",
    location: "Las Vegas, NV",
  },
];

// All unique skills from the candidates
const allSkills = Array.from(new Set(candidates.flatMap((c) => c.skills)));

const SkillsFilter = ({
  allSkills,
  selectedSkills,
  setSelectedSkills,
  isVisible,
}) => {
  return (
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
};

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();
  const [isSkillFilterVisible, setIsSkillFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const { darkMode, toggleDarkMode } = useDarkMode();
  // const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
  }, [searchTerm, selectedSkills, sortBy]);

  return (
    <div className={`min-h-screen ${
        darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"} transition-colors duration-200 font-labil`}>
      <div className="fixed top-12 left-12 z-20 cursor-pointer">
        <img
          src={
            !darkMode
              ? "/src/assets/logoBlack.svg"
              : "/src/assets/logoWhite.svg"
          }
          alt="Placeholder"
          className="w-12 h-auto"
          onClick={() => navigate("/")}
        />
      </div>
    {/* <div
      className={`min-h-screen ${
        darkMode ? "bg-dark text-dark-foreground" : "bg-white text-gray-900"
      } transition-colors duration-200`}
    > */}
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Candidate Search</h1>
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
              to={`/profile/${candidate.id}`}
              key={candidate.id}
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
