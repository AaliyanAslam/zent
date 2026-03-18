"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import { Urbanist } from "next/font/google";
import gsap from "gsap";

const urban = Urbanist({ subsets: ["latin"], weight: ["400", "600"] });

const slides = [
  {
    id: 1,
    bg: "/hbg.png",
    watch: "/watch-images/blue_watch1.png",
    code: "CH-3123-PABL",
    label: "BLUE TOURBILLON",
    collection: "OPEN GEAR",
  },
  {
    id: 2,
    bg: "/hbg.png",
    watch: "/watch-images/blue_watch2.png",
    code: "CH-8821-XT",
    label: "FLYING EDITION",
    collection: "OPEN GEAR",
  },
  {
    id: 3,
    bg: "/hbg.png",
    watch: "/watch-images/blue_watch3.png",
    code: "CH-5542-SEA",
    label: "SEA DEPTH",
    collection: "OPEN GEAR",
  },
  {
    id: 4,
    bg: "/hbg2.png",
    watch: "/watch-images/gold_watch1.png",
    code: "CH-1109-MID",
    label: "GOLD MIDNIGHT",
    collection: "MIDSIZE",
  },
  {
    id: 5,
    bg: "/hbg3.png",
    watch: "/watch-images/brown_watch1.png",
    code: "CH-9900-GLD",
    label: "COGNAC HERITAGE",
    collection: "HERITAGE",
  },
];

const INTERVAL_MS = 4800;

const Hero = () => {
  // ── Watch layers (role-swap per transition — zero flash) ──────────────────
  const [layerASrc, setLayerASrc] = useState(slides[0].watch);
  const [layerBSrc, setLayerBSrc] = useState(slides[0].watch);

  // ── Background layers (role-swap — zero flash) ────────────────────────────
  const [bgASrc, setBgASrc] = useState(slides[0].bg);
  const [bgBSrc, setBgBSrc] = useState(slides[0].bg);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [currentCode, setCurrentCode] = useState(slides[0].code);
  const [dotIndex, setDotIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0); // 0-100

  // ── Refs ──────────────────────────────────────────────────────────────────
  const layerARef = useRef(null);
  const layerBRef = useRef(null);
  const bgARef = useRef(null);
  const bgBRef = useRef(null);
  const codeRef = useRef(null);
  const intervalRef = useRef(null);
  const progressRef = useRef(null); // gsap tween for the progress bar
  const isAnimatingRef = useRef(false);
  const indexRef = useRef(0);
  const activeLayerRef = useRef("A"); // which watch layer is visible
  const activeBgRef = useRef("A"); // which bg layer is visible

  // ── Progress bar animation ────────────────────────────────────────────────
  const startProgress = useCallback(() => {
    if (progressRef.current) progressRef.current.kill();
    setProgressWidth(0);
    progressRef.current = gsap.fromTo(
      {},
      { val: 0 },
      {
        val: 100,
        duration: INTERVAL_MS / 1000,
        ease: "none",
        onUpdate() {
          setProgressWidth(this.targets()[0].val);
        },
      },
    );
  }, []);

  // ── Core animation ────────────────────────────────────────────────────────
  const animateToSlide = useCallback(
    (next) => {
      if (isAnimatingRef.current || next === indexRef.current) return;
      isAnimatingRef.current = true;

      const slide = slides[next];
      const bgChange = slide.bg !== slides[indexRef.current].bg;
      const isA = activeLayerRef.current === "A";

      const exitRef = isA ? layerARef : layerBRef;
      const enterRef = isA ? layerBRef : layerARef;

      // ── 1. Load next watch src into the HIDDEN layer (safe — opacity:0) ───
      if (isA) setLayerBSrc(slide.watch);
      else setLayerASrc(slide.watch);

      // ── 2. Snap entering layer off-screen right ───────────────────────────
      gsap.set(enterRef.current, { x: 260, opacity: 0, scale: 0.93 });

      // ── 3. Code text exits up ─────────────────────────────────────────────
      gsap.to(codeRef.current, {
        opacity: 0,
        y: -7,
        duration: 0.22,
        ease: "power2.in",
      });

      // ── 4. Background crossfade ───────────────────────────────────────────
      //   FIX: after the incoming bg reaches opacity:1, we only hide the OLD
      //   layer — we NEVER touch the new active layer, so it stays visible
      //   across all future transitions.
      if (bgChange) {
        const isBgA = activeBgRef.current === "A";
        // The layer that will FADE IN
        const bgInRef = isBgA ? bgBRef : bgARef;
        // The layer currently visible that will FADE OUT after crossfade
        const bgOutRef = isBgA ? bgARef : bgBRef;

        // Load new bg into the incoming layer
        if (isBgA) setBgBSrc(slide.bg);
        else setBgASrc(slide.bg);

        // Ensure incoming starts invisible
        gsap.set(bgInRef.current, { opacity: 0 });

        gsap.to(bgInRef.current, {
          opacity: 1,
          duration: 0.9,
          ease: "power1.inOut",
          delay: 0.05,
          onComplete: () => {
            // Hide the OLD layer — bgInRef stays at opacity:1, becomes the new base
            gsap.set(bgOutRef.current, { opacity: 0 });
            activeBgRef.current = isBgA ? "B" : "A";
          },
        });
      }

      // ── 5. Current watch exits left + fades ───────────────────────────────
      gsap.to(exitRef.current, {
        x: -230,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "power2.inOut",
      });

      // ── 6. New watch enters from right ────────────────────────────────────
      gsap.to(enterRef.current, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.85,
        ease: "power2.out",
        delay: 0.1,
        onComplete: () => {
          // Commit
          indexRef.current = next;
          activeLayerRef.current = isA ? "B" : "A";
          setDotIndex(next);
          setCurrentCode(slide.code);

          // Reset exited layer: position only, keep opacity:0
          gsap.set(exitRef.current, { x: 0, scale: 1 }); // opacity stays 0

          isAnimatingRef.current = false;
          startProgress(); // restart progress bar for new slide
        },
      });

      // ── 7. Code text enters ───────────────────────────────────────────────
      gsap.fromTo(
        codeRef.current,
        { opacity: 0, y: 7 },
        { opacity: 1, y: 0, duration: 0.42, ease: "power2.out", delay: 0.68 },
      );
    },
    [startProgress],
  );

  const goToNext = useCallback(() => {
    animateToSlide((indexRef.current + 1) % slides.length);
  }, [animateToSlide]);

  // ── Auto-advance ──────────────────────────────────────────────────────────
  useEffect(() => {
    intervalRef.current = setInterval(goToNext, INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, [goToNext]);

  // ── Mount ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    // Layer B (watch) starts hidden
    gsap.set(layerBRef.current, { opacity: 0, x: 0, scale: 1 });
    // Bg B starts hidden
    gsap.set(bgBRef.current, { opacity: 0 });

    // Entrance animation
    gsap.fromTo(
      layerARef.current,
      { x: 70, opacity: 0, scale: 0.96 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.35,
      },
    );

    startProgress();
  }, [startProgress]);

  // ── Dot / timeline click ──────────────────────────────────────────────────
  const handleDotClick = (i) => {
    if (isAnimatingRef.current || i === indexRef.current) return;
    clearInterval(intervalRef.current);
    if (progressRef.current) progressRef.current.kill();
    animateToSlide(i);
    intervalRef.current = setInterval(goToNext, INTERVAL_MS);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <nav className="absolute top-0 left-0 w-full z-30 px-6 md:px-12 py-6">
        <Navbar />
      </nav>

      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div ref={bgARef} className="absolute inset-0 w-full h-full">
          <Image
            src={bgASrc}
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div
          ref={bgBRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0 }}
        >
          <Image
            src={bgBSrc}
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 backdrop-blur-xl bg-black/40" />
      </div>

      {/* ── Main layout ── */}
      <div
        className={`relative z-10 flex items-center justify-between h-full px-6 md:px-20 xl:px-35 w-full ${urban.className}`}
      >
        {/* Left */}
        <div className="w-1/3 flex-shrink-0">
          <div className="mb-6">
            <p
              ref={codeRef}
              className="text-gray-400 text-[0.7rem] tracking-[0.2em] uppercase"
            >
              {currentCode}
            </p>
          </div>
          <div className="text-[3rem] tracking-wide leading-[1.2] text-start text-white uppercase">
            <h1>Open Gear</h1>
            <h1>Flying</h1>
            <h1>Tourbillon</h1>
            <h1 className="text-[#0074AE]">Paraiba</h1>
          </div>
          <div className="mt-10">
            <button className="text-white uppercase text-[0.7rem] tracking-widest cursor-pointer bg-[#0074AE] px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-blue-900/20">
              Find out more
            </button>
          </div>
        </div>

        {/* Center: watch carousel */}
        <div
          className="flex-shrink-0 w-[620px] h-[620px] flex justify-center items-center relative"
          style={{ overflow: "hidden" }}
        >
          <div
            ref={layerARef}
            className="absolute inset-0 flex justify-center items-center"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={layerASrc}
              alt="Luxury Watch"
              width={920}
              height={920}
              priority
              className="object-contain w-full h-full "
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div
            ref={layerBRef}
            className="absolute inset-0 flex justify-center items-center"
            style={{ willChange: "transform, opacity" }}
          >
            <Image
              src={layerBSrc}
              alt="Luxury Watch"
              width={920}
              height={920}
              priority
              className="object-contain w-full h-full "
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:flex w-1/4 justify-end items-end pb-24">
          <div className="relative group">
            <Image
              src="/watch-images/video_img.png"
              alt="Video Preview"
              width={220}
              height={320}
              className="relative rounded-lg object-cover border border-white/10 opacity-70 hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* ── Timeline bar ── */}
      <div
        className={`absolute bottom-6 left-0 w-full z-20 ${urban.className}`}
     
      >
        <div className="flex items-center justify-between px-8 md:px-14 h-[64px]">
          {/* Left — collection icon + name */}
          <div className="flex items-center gap-3 w-1/4">
            {/* Minimal watch icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="opacity-60"
            >
              <circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.2" />
              <circle cx="9" cy="9" r="1.2" fill="white" />
              <line
                x1="9"
                y1="4"
                x2="9"
                y2="9"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <line
                x1="9"
                y1="9"
                x2="12"
                y2="9"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <rect
                x="6.5"
                y="0.5"
                width="5"
                height="2"
                rx="0.8"
                stroke="white"
                strokeWidth="0.8"
              />
              <rect
                x="6.5"
                y="15.5"
                width="5"
                height="2"
                rx="0.8"
                stroke="white"
                strokeWidth="0.8"
              />
            </svg>
            <span className="text-white/50 text-[0.6rem] tracking-[0.25em] uppercase font-light">
              {slides[dotIndex].collection}
            </span>
          </div>

          {/* Center — tick timeline */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative flex items-center gap-0 w-full max-w-[520px]">
              {/* Progress line track */}
              <div
                className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />

              {slides.map((slide, i) => {
                const isActive = i === dotIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => handleDotClick(i)}
                    className="relative flex flex-col items-center group"
                    style={{ flex: 1 }}
                  >
                    {/* Slide number label */}
                    <span
                      className="mb-1.5 transition-all duration-500 leading-none"
                      style={{
                        fontSize: isActive ? "0.72rem" : "0.58rem",
                        fontWeight: isActive ? 600 : 400,
                        letterSpacing: "0.15em",
                        color: isActive
                          ? "rgba(255,255,255,1)"
                          : "rgba(255,255,255,0.28)",
                        transform: isActive ? "translateY(-1px)" : "none",
                      }}
                    >
                      {String(slide.id).padStart(2, "0")}
                    </span>

                    {/* Tick mark */}
                    <div
                      className="relative transition-all duration-500"
                      style={{
                        width: isActive ? "2px" : "1px",
                        height: isActive ? "14px" : "8px",
                        background: isActive
                          ? "rgba(255,255,255,1)"
                          : "rgba(255,255,255,0.3)",
                        borderRadius: "1px",
                      }}
                    >
                      {/* Active tick progress fill */}
                      {isActive && (
                        <div
                          className="absolute top-0 left-0 w-full"
                          style={{
                            height: `${progressWidth}%`,
                            background: "#0074AE",
                            borderRadius: "1px",
                            transition: "height 0.05s linear",
                          }}
                        />
                      )}
                    </div>

                    {/* Mini dots between ticks */}
                    {i < slides.length - 1 && (
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex gap-[3px] items-center"
                        style={{ pointerEvents: "none" }}
                      >
                        {[...Array(3)].map((_, d) => (
                          <div
                            key={d}
                            style={{
                              width: "2px",
                              height: "2px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.18)",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right — watch label + icon */}
          <div className="flex items-center justify-end gap-3 w-1/4">
            <span className="text-white/50 text-[0.6rem] tracking-[0.25em] uppercase font-light text-right">
              {slides[dotIndex].label}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="opacity-60 flex-shrink-0"
            >
              <rect
                x="2"
                y="5"
                width="14"
                height="8"
                rx="1.5"
                stroke="white"
                strokeWidth="1.2"
              />
              <line
                x1="5.5"
                y1="5"
                x2="5.5"
                y2="3"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <line
                x1="12.5"
                y1="5"
                x2="12.5"
                y2="3"
                stroke="white"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <circle cx="9" cy="9" r="1.5" fill="white" fillOpacity="0.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
