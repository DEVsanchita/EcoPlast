import React, { useState } from "react";
import { FaMapMarkerAlt, FaLocationArrow, FaRecycle, FaSearch, FaExternalLinkAlt } from "react-icons/fa";

const COMMON_CENTERS = [
  { name: "Google Maps — Recycling Centers", description: "Find nearby recycling facilities, scrap dealers, and collection points.", query: "recycling center near me" },
  { name: "Google Maps — Plastic Recycling", description: "Search specifically for plastic recycling and waste collection locations.", query: "plastic recycling center near me" },
  { name: "OpenStreetMap — Recycling", description: "Explore community-mapped recycling and waste facilities around your location.", query: "recycling" },
];

function mapsUrl(query, coords) {
  if (coords) return `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${coords.lat},${coords.lng},13z`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function RecyclingCenters() {
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("recycling center near me");

  const useLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Location is not supported by this browser. You can still search manually.");
      return;
    }
    setStatus("Requesting your location…");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        setLocation(coords);
        setStatus("Location found. Open a search below to see nearby results.");
      },
      () => setStatus("Location permission was denied. You can use the map search without sharing your location."),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  return (
    <section id="recycling-centers" className="py-28 border-t border-emerald-900/20 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 xl:px-16 flex flex-col items-center">
        <div className="text-center max-w-3xl flex flex-col items-center mb-14 space-y-3">
          <span className="text-emerald-400 uppercase tracking-[4px] text-xs font-bold">RECYCLING FINDER</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Find a Recycling Center</h2>
          <p className="text-emerald-100/60 text-sm sm:text-base max-w-xl leading-relaxed">
            Use your location to open a live map search for nearby recycling facilities. EcoPlast never stores your location.
          </p>
        </div>

        <div className="w-full max-w-5xl bg-slate-900/40 border border-emerald-900/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400/60 text-sm" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") window.open(mapsUrl(query, location), "_blank", "noopener,noreferrer"); }}
                placeholder="e.g. plastic recycling center"
                className="w-full bg-slate-950/60 border border-emerald-900/40 rounded-lg pl-9 pr-3 py-3 text-slate-100 text-sm placeholder:text-emerald-100/30 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button onClick={useLocation} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-emerald-500/40 text-emerald-300 font-semibold text-sm hover:bg-emerald-500/10 transition-colors">
              <FaLocationArrow /> Use my location
            </button>
            <a href={mapsUrl(query, location)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold text-sm shadow-lg shadow-emerald-900/30 hover:scale-[1.02] active:scale-95 transition-all">
              <FaMapMarkerAlt /> Open map
            </a>
          </div>

          {status && <p className="mt-3 text-xs text-emerald-200/60">{status}</p>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
            {COMMON_CENTERS.map((center) => (
              <a key={center.name} href={mapsUrl(center.query, location)} target="_blank" rel="noreferrer" className="group rounded-xl border border-emerald-900/30 bg-slate-950/40 p-5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400"><FaRecycle /></span>
                  <FaExternalLinkAlt className="text-emerald-100/20 group-hover:text-emerald-300 text-xs" />
                </div>
                <h3 className="text-white text-sm font-bold mb-1">{center.name}</h3>
                <p className="text-emerald-100/50 text-xs leading-relaxed">{center.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
