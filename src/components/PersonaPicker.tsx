"use client";

import { Persona } from "@/lib/types";
import { personaList } from "@/lib/personas";

interface PersonaPickerProps {
  selected: string | null;
  onSelect: (persona: Persona) => void;
}

export function PersonaPicker({ selected, onSelect }: PersonaPickerProps) {
  return (
    <div>
      <h3
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#a8a29e",
          marginBottom: "8px",
        }}
      >
        Choose your critic
      </h3>
      <div style={{ display: "grid", gap: "8px" }}>
        {personaList.map((persona) => {
          const isSelected = selected === persona.id;
          return (
            <button
              key={persona.id}
              onClick={() => onSelect(persona)}
              style={{
                textAlign: "left",
                padding: "12px",
                borderRadius: "8px",
                border: isSelected ? "2px solid #f59e0b" : "2px solid #e7e5e4",
                backgroundColor: isSelected ? "#fffbeb" : "#fff",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "1.5rem" }}>{persona.avatar}</span>
                <div>
                  <div style={{ fontWeight: 600, color: "#1c1917", fontSize: "0.875rem" }}>
                    {persona.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#78716c" }}>
                    {persona.years}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#78716c", marginTop: "6px" }}>
                {persona.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
