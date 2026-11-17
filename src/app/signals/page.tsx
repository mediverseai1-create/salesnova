import Link from "next/link";
import { Page, Title } from "@/components/Site";

const items = [
  ["Trends and patterns", "Revenue movement over time, separating real shifts from noise."],
  ["High-value opportunities", "Accounts, products and segments with the most room left."],
  ["Underperformance", "Products, customers, regions and reps falling behind the rest."],
  ["Declining customers", "Accounts buying less, or less often, before they say anything."],
  ["Revenue at risk", "Exposure hiding behind a healthy-looking total."],
  ["Room to grow", "What already works, and where to do more of it."],
];

export default function Signals() {
  return (
    <Page>
      <Title eyebrow="What SalesNova looks for" title="Your pipeline is already talking." sub="SalesNova reads your sales data, every call and your whole pipeline, then turns it into one briefing." />
      <div className="mx-auto mt-14 max-w-5xl px-6 grid gap-5 sm:grid-cols-2">
        {items.map(([t, d], i) => <div key={t} className="card"><div className="eyebrow text-brand">Signal {i + 1}</div><h3 className="mt-2 text-xl font-semibold">{t}</h3><p className="mt-2 text-slate-600">{d}</p></div>)}
      </div>
      <div className="text-center mt-10"><Link href="/signup" className="btn btn-primary">Start free</Link></div>
    </Page>
  );
}
