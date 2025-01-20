import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CursorFollower = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    gsap.set(cursor, { x: -100, y: -100 });

    const updatePosition = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power1.out",
      });
    };

    window.addEventListener("mousemove", updatePosition);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed z-[9999] w-5 h-5 bg-red-600 rounded-full pointer-events-none"
      style={{
        left: 0,
        top: 0,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CursorFollower;