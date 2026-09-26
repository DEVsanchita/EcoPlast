import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaTrash, FaCalendarWeek, FaMagic, FaSpinner, FaDownload, FaUndo } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { WEEKS_PER_MONTH, WEEKS_PER_YEAR, PLASTIC_COLORS, formatWeight } from "../utils/constants";
import { callGemini, parseJsonFromModel } from "../utils/gemini";

const STORAGE_KEY = "ecoplast_calculator_v1";
let nextId = 1;

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    const items = parsed.map((item) => ({
      id: item.id || nextId++,
      name: String(item.name || ""),
      countPerWeek: Number(item.countPerWeek) || 0,
      weightG: Number(item.weightG) || 0,
    }));
    nextId = Math.max(nextId, ...items.map((i) => Number(i.id) + 1).filter(Number.isFinite));
    return items;
  } catch { return []; }
}

export default function PlasticCalculator() {
  const [items, setItems] = useState(loadItems);
  const [aiInfo, setAiInfo] = useState({});

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* keep session state */ }
  }, [items]);

  const updateItem = (id, field, value) => {
    setItems((prev) => prev.map((item) => item.id === id ? {
      ...item,
      [field]: field === "name" ? value : Math.max(0, Number.parseFloat(value) || 0),
    } : item));
  };

  const addItem = () => setItems((prev) => [...prev, { id: nextId++, name: "", countPerWeek: 1, weightG: 10 }]);

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setAiInfo((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };

  const identifyItem = async (item) => {
    if (!item.name.trim()) {
      setAiInfo((prev) => ({ ...prev, [item.id]: { error: "Give this item a name first." } }));
      return;
    }
    setAiInfo((prev) => ({ ...prev, [item.id]: { loading: true } }));
    try {
      const prompt = `You are an expert in plastics and recycling. For the everyday item named "${item.name.trim()}", return ONLY JSON in this exact shape: {"type":"PET (Polyethylene Terephthalate)","recyclable":true,"recycling":"Short practical guidance","alternatives":["alternative 1","alternative 2","alternative 3"]}. If uncertain, say so in the type/recycling fields. Keep alternatives under 6 words each.`;
      const text = await callGemini({ parts: [{ text: prompt }] });
      const parsed = parseJsonFromModel(text);
      setAiInfo((prev) => ({ ...prev, [item.id]: {
        type: parsed.type || "Unknown",
        recyclable: parsed.recyclable,
        recycling: parsed.recycling || "Check local recycling rules.",
        alternatives: Array.isArray(parsed.alternatives) ? parsed.alternatives.slice(0, 3) : [],
      } }));
    } catch (err) {
      setAiInfo((prev) => ({ ...prev, [item.id]: { error: err.message || "Something went wrong." } }));
    }
  };

  const identifyAll = async () => {
    for (const item of items) if (item.name.trim()) await identifyItem(item);
  };

  const reset = () => {
    setItems([]);
    setAiInfo({});
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const rows = useMemo(() => items.map((item) => {
    const weeklyG = item.countPerWeek * item.weightG;
    return { ...item, weeklyG, monthlyG: weeklyG * WEEKS_PER_MONTH, yearlyG: weeklyG * WEEKS_PER_YEAR };
  }), [items]);

  const totals = useMemo(() => rows.reduce((acc, row) => ({
    weeklyG: acc.weeklyG + row.weeklyG, monthlyG: acc.monthlyG + row.monthlyG, yearlyG: acc.yearlyG + row.yearlyG,
  }), { weeklyG: 0, monthlyG: 0, yearlyG: 0 }), [rows]);

  const chartData = useMemo(() => rows.filter((r) => r.monthlyG > 0).map((r) => ({
    name: r.name.trim() || "Unnamed item", value: Number(r.monthlyG.toFixed(1)),
  })), [rows]);

  const exportCsv = () => {
    const header = ["Plastic item", "Count/week", "Average weight (g)", "Weekly total (g)", "Monthly total (g)", "Yearly total (g)", "Plastic type", "Recyclable", "Alternatives"];
    const body = rows.map((r) => { const info = aiInfo[r.id] || {}; return [r.name, r.countPerWeek, r.weightG, r.weeklyG.toFixed(1), r.monthlyG.toFixed(1), r.yearlyG.toFixed(1), info.type || "", info.recyclable == null ? "" : info.recyclable ? "Yes" : "No", (info.alternatives || []).join("; ")]; });
    const csv = [header, ...body].map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "ecoplast-plastic-usage.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="bg-slate-900/40 border border-emerald-900/30 rounded-2xl p-6 sm:p-8 shadow-xl mb-10">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex items-center gap-2"><FaCalendarWeek className="text-emerald-400" /><h3 className="text-white font-bold text-lg">Your weekly plastic usage</h3></div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={identifyAll} disabled={!items.length} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/20 disabled:opacity-40"><FaMagic /> Identify all</button>
            <button onClick={addItem} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-semibold"><FaPlus /> Add item</button>
          </div>
        </div>


        {rows.length === 0 ? (
          <div className="border border-dashed border-emerald-900/40 rounded-xl py-12 text-center"><p className="text-emerald-100/50 text-sm mb-4">No plastic items yet.</p><button onClick={addItem} className="hero-primary-btn"><FaPlus /> Add your first item</button></div>
        ) : (
          <div className="overflow-x-auto -mx-2 px-2"><div className="min-w-[880px]">
            <div className="hidden sm:grid grid-cols-[1fr_100px_110px_100px_180px_230px_36px] gap-4 px-1 pb-2 text-emerald-400 uppercase text-xs tracking-wider font-bold border-b border-emerald-900/40"><span>Plastic name</span><span>Count/week</span><span>Weight (g)</span><span className="text-right">Weekly</span><span>Plastic type</span><span>Alternative</span><span /></div>
            <div className="divide-y divide-emerald-900/20">{rows.map((row) => { const info = aiInfo[row.id]; return (
              <div key={row.id} className="grid grid-cols-1 sm:grid-cols-[1fr_100px_110px_100px_180px_230px_36px] gap-3 sm:gap-4 items-center py-4">
                <input value={row.name} onChange={(e) => updateItem(row.id, "name", e.target.value)} placeholder="e.g. Milk pouch" className="w-full bg-slate-950/60 border border-emerald-900/40 rounded-lg px-3 py-2 text-slate-100 placeholder:text-emerald-100/30 focus:outline-none focus:border-emerald-500" />
                <input type="number" min="0" step="0.1" value={row.countPerWeek} onChange={(e) => updateItem(row.id, "countPerWeek", e.target.value)} className="w-full bg-slate-950/60 border border-emerald-900/40 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500" />
                <input type="number" min="0" step="1" value={row.weightG} onChange={(e) => updateItem(row.id, "weightG", e.target.value)} className="w-full bg-slate-950/60 border border-emerald-900/40 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500" />
                <span className="text-emerald-300 font-semibold sm:text-right">{formatWeight(row.weeklyG)}</span>
                <div className="text-xs sm:text-sm min-w-0">{info?.loading ? <span className="inline-flex items-center gap-1 text-emerald-300/70"><FaSpinner className="animate-spin" /> Checking…</span> : info?.error ? <button onClick={() => identifyItem(row)} className="text-red-400 hover:text-red-300 text-left">{info.error}</button> : info?.type ? <div><div className="text-slate-200">{info.type}</div><button onClick={() => identifyItem(row)} className="text-emerald-400/70 text-[11px] hover:text-emerald-300">Re-check</button></div> : <button onClick={() => identifyItem(row)} className="inline-flex items-center gap-1.5 text-emerald-400/70 hover:text-emerald-300 text-xs"><FaMagic /> Identify</button>}</div>
                <div className="text-xs sm:text-sm text-slate-300 min-w-0">{info?.alternatives?.length ? info.alternatives.join(", ") : info?.type ? <span className="text-emerald-100/40">{info.recycling || "Check local rules."}</span> : <span className="text-emerald-100/25">—</span>}</div>
                <button onClick={() => removeItem(row.id)} aria-label="Remove item" className="justify-self-end text-emerald-100/40 hover:text-red-400 p-2"><FaTrash /></button>
              </div>
            ); })}</div>
          </div></div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
          {[['Weekly', totals.weeklyG], ['Monthly', totals.monthlyG], ['Yearly', totals.yearlyG]].map(([label, value]) => <div key={label} className="rounded-xl bg-emerald-500/5 border border-emerald-900/30 p-4"><p className="text-emerald-100/45 text-xs uppercase tracking-wider">{label}</p><p className="text-white text-xl font-extrabold mt-1">{formatWeight(value)}</p></div>)}
        </div>

        <div className="flex gap-2 flex-wrap mt-5">
          <button onClick={exportCsv} disabled={!rows.length} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-900/40 text-emerald-200/70 text-xs hover:text-emerald-300 disabled:opacity-40"><FaDownload /> Export CSV</button>
          <button onClick={reset} disabled={!rows.length} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-red-900/30 text-red-300/70 text-xs hover:text-red-300 disabled:opacity-40"><FaUndo /> Reset calculator</button>
        </div>
      </div>

      {chartData.length > 0 && <div className="bg-slate-900/40 border border-emerald-900/30 rounded-2xl p-6 sm:p-8 shadow-xl"><div className="mb-3"><h3 className="text-white font-bold text-lg">Monthly footprint by item</h3><p className="text-emerald-100/45 text-xs">Estimated from your weekly usage.</p></div><div className="h-[340px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="70%" label>{chartData.map((entry, index) => <Cell key={entry.name} fill={PLASTIC_COLORS[index % PLASTIC_COLORS.length]} />)}</Pie><Tooltip formatter={(value) => `${value} g`} /><Legend /></PieChart></ResponsiveContainer></div></div>}
    </div>
  );
}
