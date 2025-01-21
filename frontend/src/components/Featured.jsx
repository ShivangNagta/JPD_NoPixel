import React from "react";

export default function Featured() {
    const companies = [
        { name: "TechCrunch", image: "/src/assets/companies/tc.png" },
        { name: "Forbes", image: "/src/assets/companies/forbes.png" },
        { name: "BUSINESS INSIDER", image: "/src/assets/companies/bi.png" },
        { name: "On Deck", image: "/src/assets/companies/ondeck.png" },
        { name: "THE WALL STREET JOURNAL", image: "/src/assets/companies/wsj.png" },
        { name: "CNBC", image: "/src/assets/companies/cnbc.png" }
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