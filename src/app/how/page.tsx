import Link from "next/link";
import { Page, Title } from "@/components/Site";

const steps = [
  ["01 · FIND", "Lead Finder AI learns who you should be talking to", "SalesNova studies who already buys from you and builds an ideal customer profile. Describe your ICP in plain language, then score new candidates against it."],
  ["02 · PREPARE", "Before every call, a brief, not a blank page", "Company, contact, history, open opportunity, past objections and a suggested opening, ready before you dial."],
  ["03 · CONVERSE", "Upload the call, get the intelligence", "Drop in a recording transcript and get summary, intent, sentiment, objections, commitments, competitors and a next action."],
  ["04 · UNDERSTAND", "The Sales Briefing ties it together", "What changed, what's working, what's declining and revenue at risk, in plain English with the figures behind it."],
  ["05 · FOLLOW UP", "Nothing slips through", "Decide who needs a follow-up, why, when and what to say, then write it grounded in each contact's own history."],
  ["06 · CLOSE", "Next Best Actions become a queue you can clear", "Every recommendation carries its reason and a button to act."],
  ["07 · RETAIN & GROW", "The loop keeps running after the deal closes", "Watch existing customers for declining engagement and surface expansion in every briefing."],
];

export default function How() {
  return (
    <Page>
      <Title eyebrow="How it works" title="One loop. Five modules. One memory." sub="SalesNova does the reading, the remembering and the writing. You make the decisions." />
      <div className="mx-auto mt-14 max-w-3xl px-6 space-y-5">
        {steps.map(([e, t, d]) => (
          <div key={e} className="card"><div className="eyebrow text-brand">{e}</div><h3 className="mt-2 text-xl font-semibold">{t}</h3><p className="mt-2 text-slate-600">{d}</p></div>
        ))}
        <div className="card"><h3 className="text-xl font-semibold">Choose how often the briefing runs</h3>
          <div className="mt-3 flex flex-wrap gap-2">{["Daily", "Weekly", "Biweekly", "Monthly", "Quarterly", "Biannual", "Annual"].map((x) => <span key={x} className={`rounded-full border px-4 py-1.5 text-sm ${x === "Weekly" ? "bg-brand text-white border-brand" : "bg-white"}`}>{x}</span>)}</div>
          <p className="mt-3 text-slate-600">One report every week: analysis on Monday, a plan for the five days ahead.</p></div>
        <div className="flex gap-3 justify-center pt-4"><Link href="/signup" className="btn btn-primary">Get started</Link><Link href="/deliverables" className="btn btn-ghost">See what you get</Link></div>
      </div>
    </Page>
  );
}
