import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* 1. The Background Image */}
      <Image
        src="/hbg.png" 
        alt="Premium Background"
        fill
        priority
        className="object-cover"
      />

      {/* 2. Backdrop Blur Overlay (Isi height ka div) */}
      {/* Humne bg-black/20 dala hai taake blur thoda deep aur premium lage */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/5 z-1" />

      {/* 3. Optional: Gradient for extra depth (Optional) */}

      {/* 4. Hero Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white uppercase italic drop-shadow-2xl">
          Hero <span className="text-cyan-400">Section</span>
        </h1>
        <p className="mt-4 text-gray-200 max-w-xl mx-auto text-lg font-medium">
          Experience the future of digital luxury with a sleek, responsive interface.
        </p>
        
        <button className="mt-8 px-8 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-300">
          Explore More
        </button>
      </div>
    </section>
  );
};

export default Hero;