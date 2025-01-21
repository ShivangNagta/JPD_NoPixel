import React, { useState, useMemo, useEffect } from "react"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { Badge } from "../components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { Card, CardContent } from "../components/card"
import { Search, SlidersHorizontal, Moon, Sun } from "lucide-react"

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
]

// All unique skills from the candidates
const allSkills = Array.from(new Set(candidates.flatMap((c) => c.skills)))

const SkillsFilter = ({ allSkills, selectedSkills, setSelectedSkills }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Filter by Skills:</h2>
      <div className="flex flex-wrap gap-2">
        {allSkills.map((skill) => (
          <Badge
            key={skill}
            variant={selectedSkills.includes(skill) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => {
              setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
            }}
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState([])
  const [sortBy, setSortBy] = useState("name")
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedSkills.length === 0 || selectedSkills.every((skill) => candidate.skills.includes(skill))),
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return a.name.localeCompare(b.name)
        } else {
          return b.experience - a.experience
        }
      })
  }, [searchTerm, selectedSkills, sortBy])

  return (
    <div className="min-h-screen bg-white dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Candidate Search</h1>
          <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
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
          <Button variant="outline">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        <SkillsFilter allSkills={allSkills} selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCandidates.map((candidate) => (
            <Card key={candidate.id} className="bg-white dark:bg-dark-card">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{candidate.name}</h3>
                <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">{candidate.education}</p>
                <p className="text-sm text-gray-600 dark:text-dark-muted mb-2">{candidate.location}</p>
                <p className="text-sm mb-2">
                  <strong>Experience:</strong> {candidate.experience} years
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

