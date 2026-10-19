import { NextResponse } from "next/server";
import { answerQuestion } from "@/lib/store";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json()) as { answer?: string; answeredBy?: string };
  if (!body.answer?.trim()) {
    return NextResponse.json({ error: "answer required" }, { status: 400 });
  }
  const updated = await answerQuestion(id, body.answer.trim(), body.answeredBy || "dev");
  if (!updated) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(updated);
}
