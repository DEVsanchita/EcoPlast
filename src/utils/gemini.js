import { DEFAULT_GEMINI_MODEL } from "./constants";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

export async function callGemini({ parts }) {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env file and restart the Vite server.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    DEFAULT_GEMINI_MODEL
  )}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts }] }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const errJson = await response.json();
      detail = errJson?.error?.message || "";
    } catch {
      detail = await response.text().catch(() => "");
    }
    throw new Error(
      `Gemini API error (${response.status})${detail ? `: ${detail.slice(0, 180)}` : ""}`
    );
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text || "")
      .join("")
      .trim() || "";

  if (!text) {
    const blockReason = data?.promptFeedback?.blockReason;
    throw new Error(
      blockReason ? `Gemini blocked the request (${blockReason}).` : "Gemini returned an empty response."
    );
  }
  return text;
}

export function parseJsonFromModel(text) {
  const cleaned = String(text || "").replace(/```json/gi, "").replace(/```/g, "").trim();
  try { return JSON.parse(cleaned); } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new Error("AI returned an invalid JSON response.");
  }
}


export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.split(",")[1] || "";
      resolve({ base64, dataUrl: result });
    };
    reader.onerror = () => reject(new Error("Could not read that image file."));
    reader.readAsDataURL(file);
  });
}
