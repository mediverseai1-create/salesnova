import Link from "next/link";
import { Page, Title } from "@/components/Site";

const cols = [
  ["The report", "A plain-English read of the period.", ["How products, customers, regions and reps performed", "What went up, what went down, and by how much", "Anything unusual worth a second look"]],
  ["The strategy", "Built from your own wins, not generic advice.", ["Where to do more of what already works", "Which customers and products to push", "The revenue reason behind each suggestion"]],
  ["Next best actions", "Not advice. A queue you can clear.", ["Named accounts and priorities", "The reason behind every recommendation", "One click to mark it done"]],
];

export default function Deliverables() {
  return (
    <Page>
      <Title eyebrow="What you get back" title="Not a dashboard to figure out. A plan you can act on." sub="Every briefing gives you the same three things, as often as you choose." />
      <div className="mx-auto mt-14 max-w-6xl px-6 grid gap-6 md:grid-cols-3">
        {cols.map(([t, s, l]) => (
          <div key={t as string} className="card"><h3 className="text-xl font-semibold">{t}</h3><p className="mt-1 text-slate-600">{s}</p>
            <ul className="mt-4 space-y-2 text-sm">{(l as string[]).map((x) => <li key={x}>✓ {x}</li>)}</ul></div>
        ))}
      </div>
      <div className="mx-auto mt-16 max-w-3xl px-6 text-center"><div className="eyebrow">Ask in plain language</div>
        <p className="mt-3 text-lg text-slate-600">Ask a question the way you&apos;d say it out loud. The answer comes back with the numbers it came from.</p>
        <Link href="/signup" className="btn btn-primary mt-6">Start free</Link></div>
    </Page>
  );
}
