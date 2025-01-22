import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollText() {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const words = textRef.current.querySelectorAll(".word");

      gsap.set(words, { opacity: 0.1 });

      gsap.to(words, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.02,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 50%",
          end: "top 20%",
          scrub: 1,
        },
      });
    }
  }, []);

  const text = "At Workify, effortlessly showcase your talent with pixel-perfect profiles and interactive portfolios. Choose from our catalogue of skillsets and let your skills shine, connecting you with the right opportunities.";

  return (
    <div id="smooth-content" className="relative w-3/5">
      <div
        ref={textRef}
        className="text-4xl md:text-5xl lg:text-6xl text-white w-full font-bold cursor-default"
      >
        {text.split(" ").map((word, index) => (
          <span key={index} className="word inline-block">
            {word}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}