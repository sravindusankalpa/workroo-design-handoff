import { NextResponse } from "next/server";
import { addQuestion, listQuestions } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug") || "";
  if (!slug) return NextResponse.json({ questions: [] });
  return NextResponse.json({ questions: await listQuestions(slug) });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { slug?: string; author?: string; question?: string };
  if (!body.slug || !body.question?.trim()) {
    return NextResponse.json({ error: "slug and question required" }, { status: 400 });
  }
  const question = await addQuestion({
    slug: body.slug,
    author: body.author || "dev",
    question: body.question.trim(),
  });
  return NextResponse.json(question);
}
