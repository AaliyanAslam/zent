import React from 'react';
import { Menu, Heart, User, ShoppingBag, ChevronDown , UserCircle2 } from 'lucide-react';
import { Montserrat, Inter } from 'next/font/google';
import Image from 'next/image';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700', '900'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

const Navbar = () => {
  return (
    <nav className={`absolute top-0 left-0 w-full z-50 flex items-center justify-between px-35 py-6 text-white ${inter.className}`}>
      
      {/* LEFT SECTION: Logo & Menu */}
      <div className="flex items-center gap-6">
        <Image
        
            src="/logo.png"
            alt="Brand Logo"
            width={130}
            height={40}
            className="object-contain"
        />
        <button className="hover:opacity-70 transition-opacity">
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* CENTER SECTION: Nav Links */}
      <div className="hidden lg:flex items-center gap-10 text-[11px] font-semibold tracking-[0.20em] uppercase text-[#93aaba]">
        <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">Watches</a>
        <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">Warranty & Service</a>
        <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">Stores</a>
      </div>

      {/* RIGHT SECTION: Selectors & Icons */}
      <div className={`flex items-center gap-6 ${inter.className}`}>
        {/* Selectors */}
        <div className="hidden md:flex items-center gap-4">
          <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-full ">
            EUR <ChevronDown size={12} />
          </button>
          <button className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1.5 rounded-full ">
            ENG <ChevronDown size={12} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
            <Heart size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 text-[8px] bg-white/20 rounded-full w-4 h-4 flex items-center justify-center border border-white/30">0</span>
          </div>
          <UserCircle2 size={20} strokeWidth={1.5} className="cursor-pointer hover:opacity-70 transition-opacity" />
          <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 text-[8px] bg-white/20 rounded-full w-4 h-4 flex items-center justify-center border border-white/30 font-bold">3</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;