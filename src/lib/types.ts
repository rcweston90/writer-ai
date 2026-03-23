export interface Persona {
  id: string;
  name: string;
  years: string;
  description: string;
  avatar: string; // emoji for now
  color: string; // tailwind color class
}

export interface CritiqueSection {
  title: string;
  content: string;
}

export interface CritiqueResult {
  persona: Persona;
  overallImpression: string;
  whatWorked: string[];
  whatConfused: string[];
  suggestions: string[];
  closingRemark: string;
}
