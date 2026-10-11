// Multipliers derived from a real 365.25-day year, based on a 7-day week
export const WEEKS_PER_MONTH = 4.345;
export const WEEKS_PER_YEAR = 52.18;

export const PLASTIC_COLORS = [
  "#34d399",
  "#22c55e",
  "#10b981",
  "#4ade80",
  "#059669",
  "#86efac",
  "#fbbf24",
  "#f472b6",
  "#60a5fa",
  "#c084fc",
];

export const DEFAULT_GEMINI_MODEL = "gemini-2.5-flash";

export function formatWeight(grams) {
  if (grams >= 1000) return `${(grams / 1000).toFixed(2)} kg`;
  return `${grams.toFixed(0)} g`;
}

export function formatTime(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export function formatDate(ts) {
  try {
    return new Date(ts).toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}
