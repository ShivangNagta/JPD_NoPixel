import React from "react";

export default function Featured() {
    const companies = [
        { name: "TechCrunch", image: "/companies/tc.png" },
        { name: "Forbes", image: "/companies/forbes.png" },
        { name: "BUSINESS INSIDER", image: "/companies/bi.png" },
        { name: "On Deck", image: "/companies/ondeck.png" },
        { name: "THE WALL STREET JOURNAL", image: "/companies/wsj.png" },
        { name: "CNBC", image: "/companies/cnbc.png" }
    ];
  
    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-white text-center text-4xl md:text-5xl font-bold mb-8 cursor-default">
                Featured and seen in
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {companies.map((company) => (
                    <div 
                        key={company.name}
                        className="px-6 py-3 rounded-2xl relative group cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-zinc-900 rounded-2xl transition-opacity duration-500 ease-in-out group-hover:opacity-0"></div>
                        <img 
                            src={company.image} 
                            alt={company.name} 
                            className="relative h-6 object-contain" 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}