import React from 'react';
import Image from 'next/image';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 md:px-12 py-6">
      <Navbar/>
      </nav>

      <Image
        src="/hbg.png" 
        alt="Premium Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 backdrop-blur-xl bg-black/20 z-1" />

      <div className="relative z-10 text-center px-4">
      
      </div>
    </section>
  );
};

export default Hero;