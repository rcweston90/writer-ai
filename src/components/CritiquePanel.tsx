"use client";

import { CritiqueResult } from "@/lib/types";
import { CSSProperties } from "react";

interface CritiquePanelProps {
  critique: CritiqueResult | null;
  loading: boolean;
  error: string | null;
}

const sectionTitle: CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#a8a29e",
  marginBottom: "6px",
};

const itemText: CSSProperties = {
  fontSize: "0.875rem",
  color: "#44403c",
  lineHeight: 1.5,
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h4 style={sectionTitle}>{title}</h4>
      {children}
    </div>
  );
}

export function CritiquePanel({ critique, loading, error }: CritiquePanelProps) {
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 0",
          color: "#a8a29e",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "2px solid #d6d3d1",
            borderTopColor: "#57534e",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "12px",
          }}
        />
        <p style={{ fontSize: "0.875rem" }}>Reading your work...</p>
        <p style={{ fontSize: "0.75rem", marginTop: "4px" }}>
          This may take a moment
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          borderRadius: "8px",
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          padding: "16px",
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "#991b1b" }}>{error}</p>
      </div>
    );
  }

  if (!critique) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0", color: "#a8a29e" }}>
        <p style={{ fontSize: "0.875rem" }}>
          Write something, pick a critic, and request a critique.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingBottom: "12px",
          borderBottom: "1px solid #e7e5e4",
          marginBottom: "20px",
        }}
      >
        <span style={{ fontSize: "1.5rem" }}>{critique.persona.avatar}</span>
        <div>
          <div style={{ fontWeight: 600, color: "#1c1917", fontSize: "0.875rem" }}>
            {critique.persona.name}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#78716c" }}>Critique</div>
        </div>
      </div>

      <Section title="Overall Impression">
        <p style={{ ...itemText, fontStyle: "italic" }}>
          &ldquo;{critique.overallImpression}&rdquo;
        </p>
      </Section>

      <Section title="What Worked">
        {critique.whatWorked.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
            <span style={{ color: "#16a34a", flexShrink: 0 }}>+</span>
            <span style={itemText}>{item}</span>
          </div>
        ))}
      </Section>

      <Section title="What Confused or Bothered">
        {critique.whatConfused.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
            <span style={{ color: "#d97706", flexShrink: 0 }}>?</span>
            <span style={itemText}>{item}</span>
          </div>
        ))}
      </Section>

      <Section title="Suggestions">
        {critique.suggestions.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
            <span style={{ color: "#2563eb", flexShrink: 0 }}>&rarr;</span>
            <span style={itemText}>{item}</span>
          </div>
        ))}
      </Section>

      <div
        style={{
          paddingTop: "12px",
          borderTop: "1px solid #e7e5e4",
        }}
      >
        <p style={{ fontSize: "0.875rem", color: "#57534e", fontStyle: "italic" }}>
          &ldquo;{critique.closingRemark}&rdquo;
        </p>
        <p style={{ fontSize: "0.75rem", color: "#a8a29e", marginTop: "4px" }}>
          — {critique.persona.name}
        </p>
      </div>
    </div>
  );
}
