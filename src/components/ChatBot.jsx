import React, { useRef, useState, useEffect } from "react";
import {
  FaCommentDots, FaTimes, FaPaperPlane, FaCamera, FaUser, FaSeedling, FaTrash,
} from "react-icons/fa";
import { formatTime } from "../utils/constants";
import { callGemini, fileToBase64 } from "../utils/gemini";
import { QUICK_PROMPTS } from "../data/content";

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
        />
      ))}
    </span>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "greeting",
      role: "bot",
      ts: Date.now(),
      text:
        "Hi! I'm your EcoPlast assistant. Ask me about plastics and recycling, or tap the camera icon to snap a photo of a plastic item — I'll tell you what type it is and suggest natural alternatives.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const [cameraError, setCameraError] = useState("");
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
    if (open) setUnread(0);
  }, [open]);


  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending, open]);

  const addMessage = (role, text, imageDataUrl) => {
    setMessages((prev) => [...prev, { id: `${Date.now()}-${Math.random()}`, role, text, imageDataUrl, ts: Date.now() }]);
    if (role === "bot" && !openRef.current) setUnread((u) => u + 1);
  };

  const sendText = async (overrideText) => {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed || sending) return;
    setInput("");
    addMessage("user", trimmed);

    setSending(true);
    try {
      const prompt = `You are the EcoPlast assistant, a friendly, concise expert on plastics, recycling, and eco-friendly alternatives. Answer in plain text (no markdown), under 100 words, unless the user explicitly asks for more detail.\n\nUser: ${trimmed}`;
      const reply = await callGemini({ parts: [{ text: prompt }] });
      addMessage("bot", reply);
    } catch (err) {
      addMessage("bot", `Sorry, I couldn't get a response (${err.message}).`);
    } finally {
      setSending(false);
    }
  };

  const handleImageSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      setCameraError("");
      if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
      if (file.size > 8 * 1024 * 1024) throw new Error("Please choose an image smaller than 8 MB.");
      const { base64, dataUrl } = await fileToBase64(file);
      addMessage("user", "Sent a photo for identification", dataUrl);
      setSending(true);
      const prompt = `Look at this photo of a plastic item. Identify:
1) The likely plastic type / resin identification code (e.g. PET, HDPE, PVC, LDPE, PP, PS, or Other) and what it's commonly called.
2) Whether it's commonly recyclable.
3) Three practical natural or eco-friendly alternatives to this item.
Respond in plain text, no markdown, using this structure:
Plastic type: ...
Recyclable: ...
Alternatives: ...`;
      const reply = await callGemini({
        parts: [{ text: prompt }, { inline_data: { mime_type: file.type || "image/jpeg", data: base64 } }],
      });
      addMessage("bot", reply);
    } catch (err) {
      addMessage("bot", `Sorry, I couldn't analyze that photo (${err.message}).`);
    } finally {
      setSending(false);
    }
  };

  const clearChat = () => setMessages([{ id: "greeting", role: "bot", ts: Date.now(), text: "Chat cleared. Ask me about plastics, recycling, or upload a plastic photo for identification." }]);
  const showQuickPrompts = messages.length === 1 && !sending;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[60]">
        {!open && <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping [animation-duration:2.5s]" />}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat assistant" : "Open chat assistant"}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-white shadow-2xl shadow-emerald-900/50 flex items-center justify-center text-xl hover:scale-105 active:scale-95 transition-transform duration-200"
        >
          {open ? <FaTimes /> : <FaCommentDots />}
        </button>
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-slate-950 shadow-lg">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </div>

      <div
        className={`fixed bottom-24 right-6 z-[60] w-[92vw] max-w-sm h-[70vh] max-h-[560px] origin-bottom-right rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden border border-emerald-900/50 bg-slate-950/95 backdrop-blur-lg transition-all duration-300 ease-out ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3 pointer-events-none"
        }`}
      >
        <div className="relative px-5 py-4 border-b border-emerald-900/40 bg-gradient-to-r from-emerald-900/70 via-emerald-950/80 to-slate-950/80 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="relative flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/50">
                <FaSeedling className="text-sm" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight tracking-tight">EcoPlast Assistant</p>
                <p className="text-emerald-300/60 text-[10px] leading-tight font-medium">
                  {sending ? "Typing…" : "Online · here to help"}
                </p>
              </div>
            </div>
            <button onClick={clearChat} aria-label="Clear chat" className="p-2 rounded-lg text-emerald-100/50 hover:text-emerald-300 hover:bg-white/5" title="Clear chat"><FaTrash className="text-xs" /></button>

          </div>
        </div>



        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-3.5">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "bot" && (
                <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-[10px] mb-3.5">
                  <FaSeedling />
                </div>
              )}
              <div className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} max-w-[80%]`}>
                <div
                  className={`rounded-xl px-3.5 py-2.5 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-br-md"
                      : "bg-slate-900/80 border border-emerald-900/30 text-slate-200 rounded-bl-md"
                  }`}
                >
                  {m.imageDataUrl && (
                    <img src={m.imageDataUrl} alt="Uploaded plastic item" className="rounded-lg mb-2 max-h-40 w-full object-cover border border-white/10" />
                  )}
                  {m.text}
                </div>
                <span className="text-emerald-100/25 text-[9px] mt-1 px-1">{formatTime(m.ts)}</span>
              </div>
              {m.role === "user" && (
                <div className="shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-emerald-900/40 flex items-center justify-center text-emerald-300 text-[10px] mb-3.5">
                  <FaUser />
                </div>
              )}
            </div>
          ))}

          {cameraError && <p className="text-red-300 text-[11px] bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{cameraError}</p>}

          {showQuickPrompts && (
            <div className="flex flex-wrap gap-2 pl-8 pr-2 pt-1">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendText(q)}
                  className="text-[11px] px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50 active:scale-95 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {sending && (
            <div className="flex items-end gap-2 justify-start">
              <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-[10px]">
                <FaSeedling />
              </div>
              <div className="bg-slate-900/80 border border-emerald-900/30 rounded-2xl rounded-bl-md px-4 py-3 flex items-center">
                <TypingDots />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-emerald-900/40 bg-slate-900/50">
          <div className="flex items-center gap-1.5 bg-slate-950/70 border border-emerald-900/40 rounded-full pl-1.5 pr-1.5 py-1.5 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500/50 transition-colors">
            <input ref={fileInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageSelected} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              aria-label="Take or upload a photo of a plastic item"
              title="Take or upload a photo"
              className="shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-300 flex items-center justify-center hover:bg-emerald-500/20 active:scale-95 transition-all"
            >
              <FaCamera className="text-xs" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendText(); }}
              placeholder="Ask about a plastic or recycling…"
              className="flex-1 min-w-0 bg-transparent px-1 py-1 text-slate-100 text-xs sm:text-sm placeholder:text-emerald-100/30 focus:outline-none"
            />
            <button
              onClick={() => sendText()}
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-white flex items-center justify-center disabled:opacity-30 disabled:grayscale hover:opacity-90 active:scale-95 transition-all"
            >
              <FaPaperPlane className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
