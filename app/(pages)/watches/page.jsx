"use client";
import React, { useLayoutEffect, useRef , useState } from "react";
import Image from "next/image";
import { Search, ChevronDown } from "lucide-react";
import Navbar from "@/app/components/Navbar";
import gsap from "gsap";
import { Urbanist } from "next/font/google";
const urban = Urbanist({ subsets: ["latin"], weight: ["400", "600"] });


const watchData = [
  {
    id: 1,
    code: "CH-9345M.2-GRBK",
    name: "SPACE TIMER BLACK HOLE",
    img: "/watch-images/watch1.png",
    limit: 50,
  },
  {
    id: 2,
    code: "CH-9341.2-CUBK",
    name: "SPACE TIMER JUPITER GOLD",
    img: "/watch-images/watch2.png",
    limit: 50,
  },
  {
    id: 3,
    code: "CH-9343.2-CUBK",
    name: "SPACE TIMER JUPITER",
    img: "/watch-images/watch3.png",
    limit: 50,
  },
];

const WatchCollection = () => {
  const componentRef = useRef(null);
  const contentRef = useRef(null);
  const [showInput, setShowInput] = useState(false);
  
  const handleSarchClick = () => {
    setShowInput(!showInput);
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Initial Content Entrance (Top to Down)
      tl.fromTo(
        contentRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, ease: "power4.out", delay: 0.3 },
      );

      // 2. Staggered Entrance for Cards
      tl.from(
        ".watch-card",
        {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
        },
        "-=0.8",
      );

      // 3. Subtle background zoom/fade-in
      gsap.fromTo(
        ".bg-image",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 0.95, duration: 2.5, ease: "power2.out" },
      );
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={componentRef}
      className={`relative min-h-screen w-full overflow-x-hidden bg-black text-white  selection:bg-orange-200 selection:text-black ${urban.className}`}
    >
      {/* ── Fixed Global Background ── */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/hbg3.png"
          alt="Atmospheric Background"
          fill
          priority
          className="bg-image object-cover"
        />
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
      </div>

      {/* ── Content Layer ── */}
      <div ref={contentRef} className="relative z-10 opacity-0">
        <Navbar />

        <div className="px-6 md:px-16 lg:px-24 py-12">
          {/* ── Premium Filter Bar ── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 border-b border-white/10 pb-12 mt-12 mx-auto max-w-350">
            <div className="flex flex-wrap items-start gap-12">
              {/* Functions */}
              <div className="space-y-4">
                <h4 className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-semibold">
                  Functions{" "}
                  <span className="text-orange-200/50 ml-2">Regulator</span>
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-orange-200/30 flex items-center justify-center bg-orange-200/10">
                    <div className="w-4 h-4 rounded-full border border-orange-200/60 bg-orange-200/30" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all cursor-pointer" />
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all cursor-pointer" />
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors pl-4 group">
                    Special Features{" "}
                    <ChevronDown
                      size={12}
                      className="group-hover:translate-y-0.5 transition-transform"
                    />
                  </button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <h4 className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-semibold">
                  Sizes
                </h4>
                <div className="flex gap-2">
                  {["34", "37", "40", "41", "42", "43", "44+", "45"].map(
                    (s) => (
                      <div
                        key={s}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] border transition-all cursor-pointer
                      ${s === "34" ? "border-orange-200/50 bg-orange-200/20 text-orange-200 shadow-[0_0_15px_rgba(254,215,170,0.1)]" : "border-white/10 text-gray-500 hover:border-white/40 hover:text-white"}`}
                      >
                        {s}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Materials */}
              <div className="space-y-4">
                <h4 className="text-[10px] tracking-[0.25em] text-gray-400 uppercase font-semibold">
                  Materials{" "}
                  <span className="text-orange-200/50 ml-2">Red Gold</span>
                </h4>
                <div className="flex gap-3 items-center">
                  {["#c28e7a", "#9da1a4", "#5d8cb1", "#1c1c1c", "#000000"].map(
                    (color, idx) => (
                      <div
                        key={idx}
                        className="w-7 h-7 rounded-full border border-white/20 shadow-xl cursor-pointer hover:scale-125 transition-transform duration-300"
                        style={{ backgroundColor: color }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>

          <div className="flex items-center gap-8">
            <div className={`flex items-center gap-2  transition-all duration-300 ${showInput ? "w-48 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
                <input className="py-1.5 px-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-200" type="text" placeholder="Search..." />
            </div>
             <div>
                 <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all shadow-lg group">
              <Search
                size={20}
                className="cursor-pointer text-gray-400 group-hover:text-white transition-colors"
                onClick={handleSarchClick}
              />
            </button>
             </div>
             
          </div>
            
          </div>

          {/* ── Section Header ── */}
          <div className="flex items-center justify-between mb-16">
            <h1 className="text-5xl md:text-8xl font-light tracking-[0.15em] uppercase leading-none">
              Space Timer
            </h1>
            <div className="flex items-center gap-3 opacity-40">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-0.75 rounded-full ${i === 0 ? "bg-white" : "bg-white/20"}`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium">01</span>
              <div className="w-20 lg:w-32 h-px bg-white/20" />
              <span className="text-xs font-medium">04</span>
            </div>
          </div>

          {/* ── Watch Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {watchData.map((item) => (
              <div
                key={item.id}
                className="watch-card relative group rounded-[50px] overflow-hidden bg-linear-to-br from-white/10 via-transparent to-black/30 p-12 border border-white/10 hover:border-white/25 transition-all duration-700 backdrop-blur-xl"
              >
                {/* Limited Label */}
                <div className="absolute top-10 left-12 z-20">
                  <span className="text-[9px] font-bold tracking-[0.3em] text-orange-200/90 uppercase border border-orange-200/30 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                    Limited to {item.limit} pieces
                  </span>
                </div>

                {/* Ambient Radial Glow */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none">
                  <div className="w-72 h-72 bg-orange-400/20 rounded-full blur-[100px]" />
                </div>

                {/* Image Container with Floating Shadow */}
                <div className="relative z-10 aspect-square flex items-center justify-center mb-12 transform transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-3">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={450}
                    height={450}
                    className="object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.9)]"
                  />
                </div>

                {/* Typography */}
                <div className="relative z-10 text-center lg:text-left">
                  <p className="text-[11px] text-gray-500 tracking-[0.35em] mb-3 uppercase font-bold">
                    {item.code}
                  </p>
                  <h3 className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-white leading-tight group-hover:text-orange-50 transition-colors">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* ── Secondary Section Preview ── */}
          <div className="mt-40 border-t border-white/5 pt-16 opacity-30 hover:opacity-100 transition-all duration-700 cursor-pointer group">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl md:text-7xl font-light tracking-[0.2em] uppercase group-hover:translate-x-4 transition-transform">
                Tourbillon
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-xs">01</span>
                <div className="w-24 h-px bg-white/20" />
                <span className="text-xs">03</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WatchCollection;
