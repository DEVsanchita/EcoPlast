import React, { useState } from "react";
import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import { NAV_LINKS } from "../data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-emerald-950/80 backdrop-blur-lg border-b border-emerald-800/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 min-h-20 flex items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setOpen(false)}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-500/30"><FaLeaf /></div>
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent whitespace-nowrap">EcoPlast</span>
        </a>

        <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
          {NAV_LINKS.map((link) => <a key={link.href} href={link.href} className="text-emerald-100 hover:text-emerald-400 transition duration-300 font-medium text-sm whitespace-nowrap relative group">{link.label}<span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" /></a>)}
        </div>

        <div className="flex items-center gap-2">
          <a href="#calculator" className="hero-primary-btn hidden sm:inline-flex">Get Started</a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation" className="lg:hidden p-3 rounded-xl text-emerald-200 hover:bg-white/5">{open ? <FaTimes /> : <FaBars />}</button>
        </div>
      </div>

      {open && <div className="lg:hidden border-t border-emerald-900/30 bg-slate-950/95 px-6 py-4 space-y-1">
        {NAV_LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm text-emerald-100/70 hover:text-white hover:bg-emerald-500/10">{link.label}</a>)}
        <a href="#calculator" onClick={() => setOpen(false)} className="sm:hidden block mt-2 text-center hero-primary-btn">Get Started</a>
      </div>}
    </nav>
  );
}
