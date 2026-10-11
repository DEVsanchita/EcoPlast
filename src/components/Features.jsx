import React from "react";
import { FEATURES } from "../data/content";

export default function Features() {
  return (
    <section id="features" className="py-28 border-t border-emerald-900/20 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 flex flex-col items-center">
        <div className="text-center max-w-3xl flex flex-col items-center mb-16 space-y-3">
          <span className="text-emerald-400 uppercase tracking-[4px] text-xs font-bold">FEATURES</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Why Choose EcoPlast?</h2>
          <p className="text-emerald-100/60 text-sm sm:text-base max-w-xl leading-relaxed">
            Everything you need to identify, recycle, and reduce plastic waste using Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {FEATURES.map((item) => (
            <div
              key={item.title}
              className="bg-slate-900/40 border border-emerald-900/30 rounded-2xl p-6 flex flex-col items-center text-center hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl min-h-[290px]"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl mb-5">
                <item.icon />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-emerald-100/60 text-xs sm:text-sm leading-relaxed max-w-[220px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
