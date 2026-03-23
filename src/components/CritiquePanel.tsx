"use client";

import { CritiqueResult } from "@/lib/types";

interface CritiquePanelProps {
  critique: CritiqueResult | null;
  loading: boolean;
  error: string | null;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
        {title}
      </h4>
      {children}
    </div>
  );
}

export function CritiquePanel({ critique, loading, error }: CritiquePanelProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-stone-400">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-stone-300 border-t-stone-600 mb-3" />
        <p className="text-sm">Reading your work...</p>
        <p className="text-xs mt-1">This may take a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    );
  }

  if (!critique) {
    return (
      <div className="text-center py-12 text-stone-400">
        <p className="text-sm">
          Write something, pick a critic, and request a critique.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 pb-3 border-b border-stone-200">
        <span className="text-2xl">{critique.persona.avatar}</span>
        <div>
          <div className="font-semibold text-stone-900 text-sm">
            {critique.persona.name}
          </div>
          <div className="text-xs text-stone-500">Critique</div>
        </div>
      </div>

      <Section title="Overall Impression">
        <p className="text-sm text-stone-700 italic leading-relaxed">
          &ldquo;{critique.overallImpression}&rdquo;
        </p>
      </Section>

      <Section title="What Worked">
        <ul className="space-y-1.5">
          {critique.whatWorked.map((item, i) => (
            <li key={i} className="text-sm text-stone-700 flex gap-2">
              <span className="text-green-600 mt-0.5 shrink-0">+</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What Confused or Bothered">
        <ul className="space-y-1.5">
          {critique.whatConfused.map((item, i) => (
            <li key={i} className="text-sm text-stone-700 flex gap-2">
              <span className="text-amber-600 mt-0.5 shrink-0">?</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Suggestions">
        <ul className="space-y-1.5">
          {critique.suggestions.map((item, i) => (
            <li key={i} className="text-sm text-stone-700 flex gap-2">
              <span className="text-blue-600 mt-0.5 shrink-0">&rarr;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="pt-3 border-t border-stone-200">
        <p className="text-sm text-stone-600 italic">
          &ldquo;{critique.closingRemark}&rdquo;
        </p>
        <p className="text-xs text-stone-400 mt-1">
          — {critique.persona.name}
        </p>
      </div>
    </div>
  );
}
