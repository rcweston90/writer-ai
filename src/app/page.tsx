"use client";

import { useState, useCallback } from "react";
import { Editor } from "@/components/Editor";
import { PersonaPicker } from "@/components/PersonaPicker";
import { CritiquePanel } from "@/components/CritiquePanel";
import { Persona, CritiqueResult } from "@/lib/types";

export default function Home() {
  const [plainText, setPlainText] = useState("");
  const [selectedPersona, setSelectedPersona] = useState<string | null>(
    "hemingway"
  );
  const [critique, setCritique] = useState<CritiqueResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTextChange = useCallback((text: string) => {
    setPlainText(text);
  }, []);

  const handleRequestCritique = async () => {
    if (!plainText.trim()) {
      setError("Write something first.");
      return;
    }
    if (!selectedPersona) {
      setError("Pick a critic first.");
      return;
    }

    setLoading(true);
    setError(null);
    setCritique(null);

    try {
      const res = await fetch("/api/critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: plainText, personaId: selectedPersona }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data: CritiqueResult = await res.json();
      setCritique(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main editor area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="border-b border-stone-200 bg-white px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-stone-900">Writer</h1>
            <p className="text-xs text-stone-400">
              Write freely. Get critiqued by the greats.
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sm text-stone-500 hover:text-stone-800 px-3 py-1.5 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {sidebarOpen ? "Hide critique" : "Show critique"}
          </button>
        </header>
        <div className="flex-1 overflow-hidden">
          <Editor onTextChange={handleTextChange} />
        </div>
      </div>

      {/* Critique sidebar */}
      {sidebarOpen && (
        <aside className="w-96 border-l border-stone-200 bg-stone-50 flex flex-col shrink-0">
          <div className="p-4 border-b border-stone-200 space-y-4">
            <PersonaPicker
              selected={selectedPersona}
              onSelect={(p: Persona) => setSelectedPersona(p.id)}
            />
            <button
              onClick={handleRequestCritique}
              disabled={loading || !plainText.trim()}
              className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                loading || !plainText.trim()
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.98]"
              }`}
            >
              {loading ? "Critiquing..." : "Request Critique"}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <CritiquePanel
              critique={critique}
              loading={loading}
              error={error}
            />
          </div>
        </aside>
      )}
    </div>
  );
}
