import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import { Urbanist } from "next/font/google";
const urban = Urbanist({ subsets: ["latin"], weight: ["400", "600"] });

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 md:px-12 py-6">
        <Navbar />
      </nav>

      <Image
        src="/hbg.png"
        alt="Premium Background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 backdrop-blur-xl bg-black/20 z-1" />

      <div className="relative z-10 text-center  h-180 px-35 w-full">
        <div className={`flex justify-between items-center ${urban.className}`}>
          <div className="">
              <div className="flex justify-start mb-6">
            <p className="text-gray-400 text-[0.7rem]">
              CH-3123-PABL
            </p>
           </div>
           <div className="text-[3rem] tracking-wide leading-13 text-start text-white uppercase">
             <h1>Open Gear</h1> <h1>Flying</h1> <h1>Tourbillon</h1>
            <h1>paraiba</h1>
           </div>
           <div className="flex justify-start mt-10">
            <button className="text-white uppercase text-[0.7rem] tracking-wide cursor-pointer bg-[#0074AE] px-3 py-1 rounded-full ">
              Find out more
            </button>
           </div>
          </div>
     <div className="">
  {/* The Image Component */}
  <Image 
    src="/watch-images/blue_watch1.png" 
    alt="Tourbillon Detail" 
    width={500} 
    height={400} 
    className="rounded-lg object-cover"
  />


</div>
          <div className="mt-60">


              <Image 
    src="/watch-images/video_img.png" 
    alt="Tourbillon Detail" 
    width={200} 
    height={400} 
    className="rounded-lg object-cover"
  />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
