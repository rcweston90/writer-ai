import { Persona } from "../types";
import { hemingway } from "./hemingway";

export const personas: Record<string, Persona> = {
  hemingway,
};

export const personaList: Persona[] = Object.values(personas);

export { hemingway };
