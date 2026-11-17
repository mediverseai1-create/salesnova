import Link from "next/link";
import { Page, Title } from "@/components/Site";

const plans = [
  { name: "Free", price: "$0", blurb: "Enough to see SalesNova work on your own data before you pay anything.", cta: "Start free", href: "/signup", feats: ["200 credits every month", "Every module included", "Unlimited history and team members", "No feature locked behind a higher plan"] },
  { name: "Professional", price: "$47", popular: true, blurb: "For teams running SalesNova as part of the week.", cta: "Choose Professional", href: process.env.NEXT_PUBLIC_PAYMENT_LINK_PRO || "/signup?plan=pro", feats: ["4,000 credits every month", "Everything in Free, with room to run it daily", "Follow-up campaigns across your pipeline", "Priority support"] },
  { name: "Business", price: "$97", blurb: "For teams running SalesNova across every rep, deal and call.", cta: "Choose Business", href: process.env.NEXT_PUBLIC_PAYMENT_LINK_BUSINESS || "/signup?plan=business", feats: ["11,000 credits every month", "Everything in Professional, at team scale", "Daily briefings plus regular call analysis", "Priority support"] },
];
const faqs = [
  ["What's a credit?", "One credit is a unit of AI work. A briefing, a call analysis or a follow-up draft each use a small number of credits."],
  ["Do credits roll over?", "Credits refresh every billing cycle and don't roll over."],
  ["What happens when I run out?", "AI actions pause until your next cycle or until you upgrade. Your data stays available."],
  ["Do I need my data in a particular format?", "No. Upload a CSV or spreadsheet and SalesNova maps the columns."],
  ["Can I change plans later?", "Yes, upgrade or downgrade any time."],
  ["Is my sales data used to train anything?", "No. Your data runs your workspace and nothing else."],
];

export default function Pricing() {
  return (
    <Page>
      <Title eyebrow="Pricing" title="One product. Credits for how much you use it." sub="Every plan gets the full platform. The only difference is your monthly credit allowance." />
      <div className="mx-auto mt-14 max-w-6xl px-6 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`card flex flex-col ${p.popular ? "ring-2 ring-brand" : ""}`}>
            {p.popular && <div className="eyebrow text-brand mb-2">Most chosen</div>}
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <div className="mt-2"><span className="text-5xl font-bold">{p.price}</span><span className="text-slate-500"> /month</span></div>
            <p className="mt-3 text-slate-600">{p.blurb}</p>
            <ul className="mt-5 space-y-2 text-sm flex-1">{p.feats.map((f) => <li key={f}>✓ {f}</li>)}</ul>
            <Link href={p.href} className={`btn mt-6 ${p.popular ? "btn-primary" : "btn-ghost"}`}>{p.cta}</Link>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-16 max-w-3xl px-6 space-y-3">
        {faqs.map(([q, a]) => (
          <details key={q} className="card !py-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 text-slate-600">{a}</p></details>
        ))}
      </div>
    </Page>
  );
}
