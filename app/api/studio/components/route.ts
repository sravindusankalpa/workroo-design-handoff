import { NextResponse } from "next/server";
import { getConnection, listComponents } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const [components, connection] = await Promise.all([listComponents(), getConnection()]);
  return NextResponse.json({ ...connection, components });
}
