import Link from "next/link";
import { Nav, Footer } from "@/components/Site";

const stages = ["Find", "Prepare", "Converse", "Understand", "Follow Up", "Close", "Retain", "Grow"];
const finds = [
  ["Trends and patterns", "How revenue moves over time, and which shifts are real."],
  ["High-value opportunities", "Accounts, products and segments with the most headroom."],
  ["Underperformance", "Products, customers, regions and reps falling behind."],
  ["Declining customers", "Accounts buying less, before they say a word."],
  ["Revenue at risk", "The exposure behind a total that still looks healthy."],
  ["Room to grow", "What already works, and where to do more of it."],
];
const modules = [
  ["01 · UNDERSTAND", "Sales Briefing", "What changed, what's working, what's at risk, written for you."],
  ["02 · CLOSE", "Next Best Actions", "Every insight becomes a concrete action with the reason attached."],
  ["03 · FOLLOW UP", "Follow-Up AI", "Who to chase, why, when and what to say."],
  ["04 · CONVERSE", "Conversations", "Upload a call and get objections, intent and next steps."],
  ["05 · FIND", "Lead Finder AI", "Learns your ideal customer and scores new candidates."],
];

export default function Home() {
  return (
    <>
      <Nav />
      <section className="hero-bg pt-40 pb-24 text-center px-6">
        <Link href="/how" className="inline-flex items-center gap-3 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm shadow-sm">
          <b>Platform</b><span className="text-slate-600">One system of record for revenue, not six disconnected tools</span>
        </Link>
        <h1 className="mx-auto mt-10 max-w-4xl text-5xl sm:text-7xl font-bold tracking-tight leading-[1.02]">
          <span className="text-mute">The </span>AI revenue platform <span className="text-mute">built for teams that can&apos;t afford to </span>lose a deal to disorganization
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-600">
          SalesNova brings your pipeline, every call and every follow-up into one governed system of record, showing what&apos;s working, what&apos;s at risk and what your team should do next.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <Link href="/signup" className="btn btn-primary">Start free</Link>
          <Link href="/how" className="btn btn-ghost">See how it works</Link>
        </div>
        <p className="mt-6 text-sm text-slate-500">Structured pipeline data · call intelligence · workspace-level security</p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <div className="eyebrow">The SalesNova operating model</div>
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
          {stages.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              <span className="rounded-full bg-white border border-slate-200 px-4 py-2 font-semibold">{s}</span>
              {i < 7 && <span className="text-slate-400">→</span>}
            </span>
          ))}
        </div>
        <p className="mt-8 text-slate-600 max-w-2xl mx-auto">
          Each stage feeds the next. A prospect who says &ldquo;call me in September&rdquo; is remembered, followed up on schedule and briefed back to your team when it matters.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <div className="eyebrow">What SalesNova looks for</div>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">Your pipeline is already talking. Most teams only hear the total.</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {finds.map(([t, d]) => <div key={t} className="card"><h3 className="font-semibold text-lg">{t}</h3><p className="mt-2 text-slate-600">{d}</p></div>)}
        </div>
        <Link href="/signals" className="btn btn-ghost mt-8">See everything it finds</Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="eyebrow">Five modules, one memory</div>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight">One system built to run your revenue motion.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(([e, t, d]) => (
            <div key={t} className="card"><div className="eyebrow text-brand">{e}</div><h3 className="mt-2 text-xl font-semibold">{t}</h3><p className="mt-2 text-slate-600">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-5 md:grid-cols-3">
        {[["Workspace isolation in the database", "Row-level security scopes every query to your organization."], ["Role-based access", "Owners, admins and members get the right level of control."], ["Your data stays yours", "Never used to train shared models."]].map(([t, d]) => (
          <div key={t} className="card"><h3 className="font-semibold">{t}</h3><p className="mt-2 text-slate-600">{d}</p></div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="eyebrow">Get started</div>
        <h2 className="mt-3 text-4xl font-bold tracking-tight">Minimum input. Maximum action.</h2>
        <p className="mt-4 text-slate-600">Upload your sales data and get your first briefing and next best actions back.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/signup" className="btn btn-primary">Start free</Link>
          <Link href="/pricing" className="btn btn-ghost">See pricing</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
