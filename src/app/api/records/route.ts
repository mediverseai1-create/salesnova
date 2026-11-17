export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server";

export async function GET(req: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return NextResponse.json({ records: [], credits: null });
  const kind = new URL(req.url).searchParams.get("kind");
  const sb = supabaseServer();
  let q = sb.from("records").select("id, kind, title, output, created_at").order("created_at", { ascending: false }).limit(20);
  if (kind) q = q.eq("kind", kind);
  const { data } = await q;
  const { data: org } = await sb.from("organizations").select("credits, plan").limit(1).single();
  return NextResponse.json({ records: data ?? [], credits: org?.credits ?? null, plan: org?.plan ?? null });
}
