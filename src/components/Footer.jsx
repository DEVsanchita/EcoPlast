import React from "react";
import { FaLeaf, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-950/80 border-t border-emerald-900/40 pt-16 pb-8 text-sm text-emerald-100/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 text-base">
              <FaLeaf />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">EcoPlast</span>
          </div>
          <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-emerald-100/50">
            Building a cleaner future through AI-powered plastic waste management and sustainable recycling
            solutions.
          </p>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h4 className="font-bold text-white text-emerald-400">Quick Links</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Home</a></li>
            <li><a href="#calculator" className="hover:text-emerald-400 transition-colors">Calculator</a></li>
            <li><a href="#experiments" className="hover:text-emerald-400 transition-colors">Lab Notes</a></li>
            <li><a href="#recycling-centers" className="hover:text-emerald-400 transition-colors">Recycling Finder</a></li>
            <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-white text-emerald-400">Services</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Plastic Detection</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Eco Alternatives</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Recycling Centers</li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-4">
          <h4 className="font-bold text-white text-emerald-400">Follow Us</h4>
          <div className="flex gap-4 text-lg text-emerald-100/60">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-emerald-400 transition-colors"><FaFacebook /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-emerald-400 transition-colors"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/sanchita-majumdar-276b94243/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-emerald-400 transition-colors"><FaLinkedin /></a>
            <a href="https://github.com/DEVsanchita" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-emerald-400 transition-colors"><FaGithub /></a>
          </div>
          <div className="text-xs space-y-1 text-emerald-100/50">
            <p>support@ecoplast.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 pt-6 border-t border-emerald-900/20 text-center text-xs text-emerald-100/40">
        © 2026 EcoPlast. All Rights Reserved.
      </div>
    </footer>
  );
}
