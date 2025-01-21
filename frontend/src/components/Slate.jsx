import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Hero from './Hero';

gsap.registerPlugin(ScrollTrigger);

function Slate() {
  const slateRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to(slateRef.current, {
        rotateX: -180,
        translateZ: -400,
        transformOrigin: 'center top',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: slateRef.current,
          start: '-12% top',
          end: '600% top',
          scrub: true,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <div
      style={{ perspective: '1000px' }}
      className="w-full flex justify-center z-10 cursor-default"
    >
      <div
        ref={slateRef}
        className="h-[80vh] w-3/4 mt-[10vh] flex items-center justify-center bg-black rounded-xl border-2 border-[#353535] text-[#F1F1EF] text-9xl font-bold transform-style-preserve-3d overflow-hidden"
      >
        <Hero/>
      </div>
    </div>
  );
}

export default Slate;