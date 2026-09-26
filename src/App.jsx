import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PlasticCalculator from "./components/PlasticCalculator";
import BioplasticExperiments from "./components/BioplasticExperiments";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import RecyclingCenters from "./components/RecyclingCenters";

export default function App() {
  return (
    <div className="bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 min-h-screen text-slate-100 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />     
      <BioplasticExperiments />
      <section id="calculator" className="py-28 border-t border-emerald-900/20 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 flex flex-col items-center">
          <div className="text-center max-w-3xl flex flex-col items-center mb-16 space-y-3">
            <span className="text-emerald-400 uppercase tracking-[4px] text-xs font-bold">CALCULATOR</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Plastic Calculator</h2>
            <p className="text-emerald-100/60 text-sm sm:text-base max-w-xl">
              Add each plastic item you use, how often per week, and its average weight — see your projected
              monthly and yearly footprint update instantly. Tap the wand icon on a row to have AI identify its
              plastic type and suggest natural alternatives.
            </p>
          </div>
          <PlasticCalculator />
        </div>
      </section>
      <RecyclingCenters />
      <Features />
      <HowItWorks />
      <Footer />

      <ChatBot />
    </div>
  );
}
