import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Footer from "./Footer";

const RollingText = ({ text }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const width = marquee.scrollWidth;
    marquee.innerHTML += marquee.innerHTML;

    gsap.to(marquee, {
      x: `-${width / 2}`,
      duration: 60,
      ease: 'linear',
      repeat: -1,
    });
  }, []);

  return (
    <div className="overflow-hidden w-full text-white">
      <div
        ref={marqueeRef}
        className="inline-block text-[30vh] font-bold whitespace-nowrap absolute bottom-0 hover:text-purple-400 transition-colors duration-300"
      >
        <span className="px-4">{text}</span>
      </div>
    </div>
  );
};

const ScrollAnimation = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;

    gsap.to(box, {
      scrollTrigger: {
        trigger: box,
        start: "top top",
        end: "top -100%",
        scrub: true,
      },
      width: "90%",
      y: -100,
    });
  }, []);

  return (
    <div className="w-full h-full relative bg-[#EBEBEB]">
      <div className="h-[100vh] w-full flex items-center justify-center z-10 relative">
        <div
          ref={boxRef}
          className="bg-black w-full h-full rounded-b-3xl overflow-hidden relative z-20 cursor-default"
        >
          <RollingText text={"• Workify • Workify • Workify • Workify • Workify • Workify "} />
        </div>
      </div>
      <div className='w-full bg-[#EBEBEB] pt-16 pb-64 relative z-0'>
        <Footer />
      </div>
    </div>
  );
};

export default ScrollAnimation;