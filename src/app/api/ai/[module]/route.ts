import { NextResponse } from "next/server";
import { gemini, supabaseServer } from "@/lib/server";

const PROMPTS: Record<string, (i: string) => string> = {
  briefing: (i) => `You are SalesNova, an AI sales analyst. From the sales data below write a plain-English sales briefing with these markdown sections: ## The report (what went up/down, unusual items), ## The strategy (what to do more of, who to push), ## Revenue at risk, ## Next best actions (numbered, each with a reason). Use only figures present in the data.\n\nDATA:\n${i}`,
  actions: (i) => `You are SalesNova. Turn this pipeline context into a prioritised queue of 5-8 next best actions. For each: **account**, action, and the reason. Markdown numbered list.\n\n${i}`,
  followups: (i) => `You are SalesNova Follow-Up AI. For the contacts/context below decide who needs a follow-up, why, when, and write a short personalised message for each. Markdown.\n\n${i}`,
  conversations: (i) => `You are SalesNova Conversation Intelligence. Analyse this call transcript. Output markdown sections: Summary, Buyer intent, Sentiment, Objections, Commitments, Competitors mentioned, Decision criteria, Recommended next action.\n\nTRANSCRIPT:\n${i}`,
  leads: (i) => `You are SalesNova Lead Finder. Given this ideal customer description or customer list, produce an ideal customer profile and then score each candidate lead below it from 0-100 with one-line reasoning. Markdown.\n\n${i}`,
  icp: (i) => `You are SalesNova Lead Finder. Build an ideal customer profile from this description. Markdown sections: Who they are (industry, size, geography), Buying triggers, Pain points, Best channels, Disqualifiers, Scoring criteria (weighted, totalling 100).\n\n${i}`,
  ask: (i) => `You are SalesNova. Answer the sales question using the data provided and cite the numbers used.\n\n${i}`,
};

export async function POST(req: Request, { params }: { params: { module: string } }) {
  const make = PROMPTS[params.module];
  if (!make) return NextResponse.json({ error: "Unknown module" }, { status: 404 });
  const { input = "", audio } = await req.json();
  if (!audio && (!input || String(input).trim().length < 3)) return NextResponse.json({ error: "Please provide some input." }, { status: 400 });

  const configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  let orgId: string | null = null;
  const sb = configured ? supabaseServer() : null;

  if (sb) {
    const { data: u } = await sb.auth.getUser();
    if (!u.user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    const { data: m } = await sb.from("members").select("org_id, organizations(credits)").eq("user_id", u.user.id).limit(1).single();
    orgId = m?.org_id ?? null;
    const credits = (m as any)?.organizations?.credits ?? 0;
    if (!orgId || credits < 5) return NextResponse.json({ error: "You're out of credits. Upgrade on the Billing page." }, { status: 402 });
  }

  try {
    const output = await gemini(make(audio ? String(input).slice(0, 2000) + "\n[The call recording is attached as audio. Transcribe and analyse it.]" : String(input).slice(0, 60000)), false, audio);
    if (sb && orgId) {
      await sb.from("records").insert({ org_id: orgId, kind: params.module, title: (String(input).trim().slice(0, 60) || "Call recording"), input: String(input).slice(0, 20000), output: { text: output } });
      const { data: o } = await sb.from("organizations").select("credits").eq("id", orgId).single();
      await sb.from("organizations").update({ credits: Math.max(0, (o?.credits ?? 5) - 5) }).eq("id", orgId);
    }
    return NextResponse.json({ output });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
