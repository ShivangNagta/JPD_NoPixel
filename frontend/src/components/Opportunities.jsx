import React, { useState } from 'react';

export default function Opportunities() {
  const colors = ["#F87171", "#FCD34D", "#34D399", "#60A5FA"];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen text-white px-4 py-16 cursor-default">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <p className="text-lg mb-4 flex items-center justify-center gap-2">
          <span className="text-purple-400">✨</span>
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent text-xl">
            Opportunity is Yours!
          </span>
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          We Give Experiences.
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-zinc-900/50 rounded-3xl p-8 backdrop-blur">
          <div className="relative h-48 mt-8">
            <div className="flex items-center justify-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-20 rounded-full overflow-hidden transition-all duration-300 group"
                    style={{
                      boxShadow: `0 0 0 4px ${colors[i - 1]}`,
                    }}
                  >
                    <img
                      src={`/profiles/pf${i}.jpg`}
                      alt={`Team member ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full group-hover:shadow-lg transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Grow together.</h2>
          <p className="text-zinc-400">
            Create, craft and share stories together with real-time collaboration
          </p>
        </div>

        <div className="bg-zinc-900/50 rounded-3xl p-8 backdrop-blur cursor-default">
          <div className="h-48 mb-8 flex items-center justify-center">
            <h3 className="text-3xl font-bold relative group">
              This year has been{" "}
              <span
                className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                massive
                <div
                  className={`absolute overflow-hidden rounded-xl left-1/2 transform -translate-x-1/2 -translate-y-[120%] w-48 h-27 transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <video
                    src="/thumbsup.mp4"
                    className="w-full h-full object-cover rounded-xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                  ></video>
                </div>
              </span>{" "}
              for us!
            </h3>
          </div>
          <h2 className="text-2xl font-bold mb-4">Show your Skills.</h2>
          <p className="text-zinc-400">Know your reach and how clients see you.</p>
        </div>

        <div className="bg-zinc-900/50 rounded-3xl p-8 backdrop-blur">
          <div className="h-48 mb-8">
            <div className="flex h-20 gap-2">
              {["👍", "🚀", "🔥", "⚡"].map((emoji) => (
                <div
                  key={emoji}
                  className="bg-zinc-700 w-20 h-20 rounded-full hover:bg-zinc-600 cursor-pointer flex items-center justify-center text-2xl"
                >
                  <span className="transition-transform duration-300 hover:scale-150">
                    {emoji}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Express yourself.</h2>
          <p className="text-zinc-400">
            Show your passion and tell your story to the world.
          </p>
        </div>
      </div>
    </div>
  );
}