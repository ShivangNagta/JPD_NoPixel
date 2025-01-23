import React, { useState, useEffect } from "react";

const Hero = () => {
  const containerStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#171717",
    backgroundImage:
      "radial-gradient(rgba(255, 255, 255, 0.171) 2px, transparent 0)",
    backgroundSize: "30px 30px",
    backgroundPosition: "-5px -5px",
  };

  return (
    <div style={containerStyle}>
      <Element />
    </div>
  );
};

function Element() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full">
      <div className="absolute top-[10%] left-[15%] z-10">
  <h1
    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white"
    style={{
      textShadow: "5px 5px 20px rgba(0, 0, 0, 0.8)",
    }}
  >
    Its just the
  </h1>
  <h1
    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-purple-600"
    style={{
      textShadow: "5px 5px 20px rgba(0, 0, 0, 0.8)",
    }}
  >
    Beginning!
  </h1>
</div>
      <div
        className="absolute left-[25%] bottom-[20%] w-[40%] h-[50%] bg-zinc-900/50 border-zinc-800 backdrop-blur-sm rounded-lg overflow-hidden"
        style={{
          transform: `translate(${mousePosition.x * -5}px, ${
            mousePosition.y * -5
          }px)`,
          border: "2px solid #666666",
        }}
      >
        <img
          src="/guitar.jpg"
          alt="Guitar"
          className="h-full w-full object-cover z-0"
        />
        <div className="absolute top-0 w-full h-full p-4 z-10 text-white mx-auto flex flex-col justify-center items-start">
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h2
                className="text-5xl font-bold text-zinc-100"
                style={{ textShadow: "6px 6px 10px rgba(0, 0, 0, 0.9)" }}
              >
                5.24k
              </h2>
              <p
                className="text-base text-zinc-400"
                style={{ textShadow: "6px 6px 10px rgba(0, 0, 0, 0.9)" }}
              >
                MONTHLY ACTIVE
              </p>
            </div>
            <div>
              <h2
                className="text-5xl font-bold text-zinc-100"
                style={{ textShadow: "6px 6px 10px rgba(0, 0, 0, 0.9)" }}
              >
                19.4
              </h2>
              <p
                className="text-base text-zinc-400"
                style={{ textShadow: "6px 6px 10px rgba(0, 0, 0, 0.9)" }}
              >
                DAILY ACTIVE
              </p>
            </div>
            <div>
              <h2
                className="text-5xl font-bold text-emerald-500"
                style={{ textShadow: "6px 6px 10px rgba(0, 0, 0, 0.9)" }}
              >
                +24%
              </h2>
              <p
                className="text-base text-zinc-400"
                style={{ textShadow: "6px 6px 10px rgba(0, 0, 0, 0.9)" }}
              >
                VS LAST MONTH
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute right-[5%] top-[20%] w-[40%] h-[50%] bg-zinc-900 border-zinc-800 rounded-lg shadow-lg"
        style={{
          transform: `translate(${mousePosition.x * 7}px, ${
            mousePosition.y * 7
          }px)`,
          background: "linear-gradient(135deg, #444444, #222222)",
          border: "2px solid #555555",
        }}
      >
        <div className="grid grid-rows-[1fr_2fr_3fr] gap-2 p-2 h-full">
          <div className="flex items-center text-zinc-400 text-sm">
            <svg
              className="w-8 h-8 mr-2 mb-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-medium text-2xl">JANUARY 2023</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-zinc-100">5.24k</h1>
            <p className="text-zinc-400 text-xl">Views on your Profile.</p>
          </div>
          <div className="flex gap-2">
            {[0.6, 0.8, 0.4, 1, 0.5, 0.3, 0.7, 0.4, 0.8].map((height, i) => (
              <div
                key={i}
                className="w-full rounded-sm"
                style={{
                  height: `${height * 100}%`,
                  transition: "height 0.3s ease-in-out",
                  background: "linear-gradient(135deg, #9f66d3, #7c3d8d)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
