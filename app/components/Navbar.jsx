import React, { useState } from "react";
import {
  Menu,
  Heart,
  ShoppingBag,
  ChevronDown,
  UserCircle2,
  X,
} from "lucide-react";
import { Inter, Urbanist } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });
const urban = Urbanist({ subsets: ["latin"], weight: ["400", "600"] });

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 ${urban.className} text-white`}
    >
      {/* Main Container */}
      <div className="max-w-450 mx-auto flex items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        {/* LEFT SECTION: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4 lg:gap-8">
          <button
            className="lg:hidden hover:opacity-70 transition-opacity"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>

          <Image
            src="/logo.png"
            alt="Brand Logo"
            width={110}
            height={30}
            className="object-contain w-25 md:w-32.5"
          />

          {/* Desktop Menu Icon (Optional extra) */}
          <button className="hidden lg:block hover:opacity-70 transition-opacity">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* CENTER SECTION: Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-semibold tracking-[0.20em] uppercase text-[#93aaba]">
          <a
            href="#"
            className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
            Watches
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
            Warranty & Service
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
          >
            Stores
          </a>
        </div>

        {/* RIGHT SECTION: Selectors & Icons */}
        <div className={`flex items-center gap-3 md:gap-6 ${inter.className}`}>
          {/* Currency/Lang Selectors - Hidden on small mobile */}
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            <button className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 px-2 md:px-3 py-1.5 rounded-full transition-colors">
              EUR <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 px-2 md:px-3 py-1.5 rounded-full transition-colors">
              ENG <ChevronDown size={12} />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-5">
            <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
              <Heart size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-2 text-[8px] bg-white text-black rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                0
              </span>
            </div>
            <UserCircle2
              size={20}
              strokeWidth={1.5}
              className="hidden xs:block cursor-pointer hover:opacity-70 transition-opacity"
            />
            <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-2 text-[8px] bg-white text-black rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black/95 backdrop-blur-md ${isOpen ? "max-h-screen border-b border-white/10" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-6 px-8 py-10 uppercase tracking-widest text-sm font-medium">
          <a href="#" className="hover:text-gray-400">
            Watches
          </a>
          <a href="#" className="hover:text-gray-400">
            Warranty & Service
          </a>
          <a href="#" className="hover:text-gray-400">
            Stores
          </a>
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button className="text-[10px] font-bold">EUR</button>
            <button className="text-[10px] font-bold">ENG</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
