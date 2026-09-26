import React from "react";

const IMPACT_STATS = [
  { value: "12+", label: "Plastic types recognized" },
  { value: "AI", label: "Powered identification" },
  { value: "24/7", label: "Assistant on hand" },
];

export default function Hero() {
  return (
    <header
      id="hero"
      className="relative pt-20 pb-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
    >
      <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left lg:pl-[60px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          🌱 AI-Powered Sustainability
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
          Smart Plastic <br />
          <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            Waste Management
          </span>
        </h1>
        <p className="text-emerald-100/70 text-base sm:text-lg max-w-xl leading-relaxed">
          Detect plastic using AI, discover eco-friendly alternatives, locate nearby recycling centers, and
          monitor your plastic usage — all from one intelligent platform.
        </p>

        <div className="hero-buttons">
          <a href="#calculator" className="hero-primary-btn">
            Get Started
          </a>
          <a href="#features" className="hero-secondary-btn">
            Learn More
          </a>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-emerald-900/30 w-full">
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-emerald-400 font-extrabold text-xl leading-tight">{stat.value}</span>
              <span className="text-emerald-100/50 text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 flex justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="relative group overflow-hidden rounded-3xl border border-emerald-800/40 shadow-2xl p-2 bg-slate-900/60 backdrop-blur-sm">
          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
            alt="Recycling Bins"
            className="rounded-2xl object-cover w-full h-[320px] sm:h-[380px] group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </header>
  );
}
