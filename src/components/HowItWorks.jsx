import React from "react";
import { STEPS } from "../data/content";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 border-t border-emerald-900/20 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 flex flex-col items-center">
        <div className="text-center max-w-3xl flex flex-col items-center mb-20 space-y-3">
          <span className="text-emerald-400 uppercase tracking-[4px] text-xs font-bold">HOW IT WORKS</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Four Simple Steps</h2>
          <p className="text-emerald-100/60 text-sm sm:text-base max-w-xl leading-relaxed">
            Using EcoPlast is quick, simple, and helps you make better environmental decisions in just a few
            clicks.
          </p>
        </div>

        <div className="relative w-full">
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-800/10 via-emerald-700/40 to-emerald-800/10 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-slate-900/40 border border-emerald-900/30 rounded-2xl p-6 pt-10 flex flex-col items-center text-center hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl min-h-[300px] relative"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 border border-emerald-400 text-slate-950 font-black text-xs tracking-wider shadow-md">
                  STEP {step.number}
                </div>

                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-2xl mb-4">
                  <step.icon />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-emerald-100/60 text-xs sm:text-sm leading-relaxed max-w-[225px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
