import React, { useState } from "react";
import ButtonTemplate from "../components/ButtonTemplate";
import Slate from "../components/Slate";
import CursorFollower from "../components/CursorFollower";
import Background from "../assets/bg.jpg";
import Featured from "../components/Featured";
import ScrollText from "../components/ScrollText";
import Opportunities from "../components/Opportunities";
import ScrollAnimation from "../components/ScrollAnimation";

function Landing() {
  const [searchIcon, setSearchIcon] = useState("/src/assets/searchWhite.svg");
  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col">
      <CursorFollower />
      <img
        src={Background}
        alt="Background"
        className="absolute inset-0 w-full h-auto object-cover z-0"
      />
      <div className="fixed top-12 left-12 z-20">
        <img
          src="/src/assets/logoWhite.svg"
          alt="Placeholder"
          className="w-12 h-auto"
        />
      </div>
      <div className="flex items-center justify-end gap-0 z-20 fixed top-2 right-16">
        <div
          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 hover:bg-[#A594FD]"
          onMouseEnter={() => setSearchIcon("/src/assets/searchBlack.svg")}
          onMouseLeave={() => setSearchIcon("/src/assets/searchWhite.svg")}
        >
          <img
            src={searchIcon}
            alt="Search"
            className="w-8 h-8 transition-colors duration-300"
          />
        </div>
        <ButtonTemplate text="Login" onClick={() => {}} />
        <ButtonTemplate text="Sign Up" onClick={() => {}} />
      </div>
      <div className="flex-grow relative flex flex-col items-center justify-start w-full h-full z-10">
        <Slate />
        <div className="w-full h-[20vh]" />
        <Featured />
        <div className="w-full h-[20vh]" />
        <hr className="w-3/5 h-[1px] bg-[#EBEBEB] opacity-50" />
        <div className="w-full h-[20vh]" />
        <ScrollText />
        <div className="w-full h-[20vh]" />
        <hr className="w-3/5 h-[1px] bg-[#EBEBEB] opacity-50" />
        <div className="w-full h-[20vh]" />
        <Opportunities />
        <ScrollAnimation />
      </div>
    </div>
  );
}

export default Landing;