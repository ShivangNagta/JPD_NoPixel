import React from "react"

export default function Featured() {
    const companies = [
      "TechCrunch",
      "Forbes",
      "BUSINESS INSIDER",
      "On Deck",
      "THE WALL STREET JOURNAL",
      "CNBC"
    ]
  
    return (
    <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-center text-4xl md:text-5xl font-bold mb-8">
        Featured and seen in
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-4">
        {companies.map((company) => (
            <div 
            key={company}
            className="px-6 py-3 rounded-2xl relative group cursor-pointer"
            >
            <div className="absolute inset-0 bg-zinc-900 rounded-2xl transition-opacity duration-500 ease-in-out group-hover:opacity-0"></div>
            <span className="relative text-gray-300 text-sm md:text-base font-medium">
                {company}
            </span>
            </div>
        ))}
        </div>
    </div>
    )
}