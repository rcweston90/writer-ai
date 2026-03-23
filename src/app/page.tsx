"use client";

import { useState, useCallback, useEffect } from "react";
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
  const [EditorComponent, setEditorComponent] = useState<React.ComponentType<{
    onTextChange: (text: string, html: string) => void;
  }> | null>(null);

  useEffect(() => {
    import("@/components/Editor").then((mod) => {
      setEditorComponent(() => mod.Editor);
    });
  }, []);

  const handleTextChange = useCallback((text: string, _html: string) => {
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
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Main editor area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header
          style={{
            borderBottom: "1px solid #e7e5e4",
            backgroundColor: "#fff",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1c1917", margin: 0 }}>
              Writer
            </h1>
            <p style={{ fontSize: "0.75rem", color: "#a8a29e", margin: 0 }}>
              Write freely. Get critiqued by the greats.
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              fontSize: "0.875rem",
              color: "#78716c",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            {sidebarOpen ? "Hide critique" : "Show critique"}
          </button>
        </header>
        <div style={{ flex: 1, overflow: "hidden" }}>
          {EditorComponent ? (
            <EditorComponent onTextChange={handleTextChange} />
          ) : (
            <div style={{ padding: "2rem", color: "#a8a29e" }}>Loading editor...</div>
          )}
        </div>
      </div>

      {/* Critique sidebar */}
      {sidebarOpen && (
        <aside
          style={{
            width: "384px",
            borderLeft: "1px solid #e7e5e4",
            backgroundColor: "#fafaf9",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "16px", borderBottom: "1px solid #e7e5e4" }}>
            <PersonaPicker
              selected={selectedPersona}
              onSelect={(p: Persona) => setSelectedPersona(p.id)}
            />
            <button
              onClick={handleRequestCritique}
              disabled={loading || !plainText.trim()}
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "none",
                cursor: loading || !plainText.trim() ? "not-allowed" : "pointer",
                marginTop: "16px",
                backgroundColor: loading || !plainText.trim() ? "#e7e5e4" : "#1c1917",
                color: loading || !plainText.trim() ? "#a8a29e" : "#fff",
              }}
            >
              {loading ? "Critiquing..." : "Request Critique"}
            </button>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: "16px" }}>
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
