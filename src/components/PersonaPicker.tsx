"use client";

import { Persona } from "@/lib/types";
import { personaList } from "@/lib/personas";

interface PersonaPickerProps {
  selected: string | null;
  onSelect: (persona: Persona) => void;
}

const colorMap: Record<string, string> = {
  amber: "border-amber-400 bg-amber-50 ring-amber-400",
};

const colorMapIdle: Record<string, string> = {
  amber: "border-stone-200 hover:border-amber-300 hover:bg-amber-50/50",
};

export function PersonaPicker({ selected, onSelect }: PersonaPickerProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
        Choose your critic
      </h3>
      <div className="grid gap-2">
        {personaList.map((persona) => {
          const isSelected = selected === persona.id;
          return (
            <button
              key={persona.id}
              onClick={() => onSelect(persona)}
              className={`text-left p-3 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected
                  ? `${colorMap[persona.color] ?? "border-stone-400 bg-stone-50 ring-stone-400"} ring-1`
                  : `${colorMapIdle[persona.color] ?? "border-stone-200 hover:border-stone-300"}`
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{persona.avatar}</span>
                <div>
                  <div className="font-semibold text-stone-900 text-sm">
                    {persona.name}
                  </div>
                  <div className="text-xs text-stone-500">{persona.years}</div>
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-1.5">
                {persona.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
