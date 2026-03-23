import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { hemingwaySystemPrompt } from "@/lib/personas/hemingway";
import { CritiqueResult } from "@/lib/types";
import { personas } from "@/lib/personas";

const systemPrompts: Record<string, string> = {
  hemingway: hemingwaySystemPrompt,
};

export async function POST(req: NextRequest) {
  const { text, personaId } = await req.json();

  if (!text || !text.trim()) {
    return NextResponse.json(
      { error: "No text provided" },
      { status: 400 }
    );
  }

  const persona = personas[personaId];
  if (!persona) {
    return NextResponse.json(
      { error: "Unknown persona" },
      { status: 400 }
    );
  }

  const systemPrompt = systemPrompts[personaId];
  if (!systemPrompt) {
    return NextResponse.json(
      { error: "Persona not configured" },
      { status: 400 }
    );
  }

  const client = new Anthropic();

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2048,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Please critique the following writing:\n\n---\n\n${text}\n\n---`,
      },
    ],
  });

  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  let parsed;
  try {
    parsed = JSON.parse(responseText);
  } catch {
    return NextResponse.json(
      { error: "Failed to parse critique response" },
      { status: 500 }
    );
  }

  const result: CritiqueResult = {
    persona,
    overallImpression: parsed.overallImpression,
    whatWorked: parsed.whatWorked,
    whatConfused: parsed.whatConfused,
    suggestions: parsed.suggestions,
    closingRemark: parsed.closingRemark,
  };

  return NextResponse.json(result);
}
