import React, { useState, useEffect } from "react";
import ButtonTemplate from "../components/ButtonTemplate";
import Slate from "../components/Slate";
import CursorFollower from "../components/CursorFollower";
import Background from "../assets/bg.jpg";
import Featured from "../components/Featured";
import ScrollText from "../components/ScrollText";
import Opportunities from "../components/Opportunities";
import ScrollAnimation from "../components/ScrollAnimation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Landing() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchIcon, setSearchIcon] = useState("/src/assets/searchWhite.svg");
  const [userIcon, setUserIcon] = useState("/src/assets/userWhite.svg");
  const [userImage, setUserImage] = useState(null);

  const handleSelection = (type) => {
    if (type === "client") navigate("/login?type=client");
    else if (type === "freelancer") navigate("/login?type=freelancer");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .post(
          "/api/auth/verify-token",
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userImage");
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userImage");
          setIsLoggedIn(false);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) setUserImage(localStorage.getItem("userImage"));
  }, [isLoggedIn]);

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col font-labil">
      <CursorFollower />
      <img
        src={Background}
        alt="Background"
        className="absolute inset-0 w-full h-auto object-cover z-0"
      />
      <div className="fixed top-8 left-12 z-20">
        <img
          src="/src/assets/logoWhite.svg"
          alt="Logo"
          className="w-12 h-auto"
        />
      </div>
      <div className="flex items-center justify-end gap-0 z-20 fixed top-8 right-8">
        <div
          className="relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 hover:bg-[#A594FD] mr-4"
          onMouseEnter={() => setSearchIcon("/src/assets/searchBlack.svg")}
          onMouseLeave={() => setSearchIcon("/src/assets/searchWhite.svg")}
          onClick={() => navigate("/search")}
        >
          <img
            src={searchIcon}
            alt="Search"
            className="w-8 h-8 transition-colors duration-300"
          />
        </div>
        {isLoggedIn ? (
          <div
            className="relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-700 hover:bg-[#A594FD] ml-4 overflow-hidden"
            onMouseEnter={() =>
              setUserIcon(userImage || "/src/assets/userBlack.svg")
            }
            onMouseLeave={() =>
              setUserIcon(userImage || "/src/assets/userWhite.svg")
            }
          >
            <img
              src={userImage || userIcon}
              alt="User"
              className={`w-${userImage ? 12 : 8} h-${
                userImage ? 12 : 8
              } rounded-full object-cover`}
            />
          </div>
        ) : (
          <div className="flex items-center justify-end gap-4">
            <ButtonTemplate text="User" onClick={() => handleSelection("freelancer")} />
            <ButtonTemplate text="Client" onClick={() => handleSelection("client")} />
          </div>
        )}
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