import Link from "next/link";
import { Logo } from "./Logo";

export function Nav() {
  const l = [["What it finds", "/signals"], ["How it works", "/how"], ["Deliverables", "/deliverables"], ["Pricing", "/pricing"]];
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-3">
      <nav className="flex items-center gap-4 sm:gap-7 rounded-full bg-white/90 backdrop-blur border border-slate-100 shadow-[0_8px_30px_-10px_rgba(15,27,45,.2)] pl-6 pr-3 py-3">
        <Link href="/"><Logo /></Link>
        <div className="hidden md:flex gap-6 text-[15px] text-slate-600">
          {l.map(([t, h]) => <Link key={h} href={h} className="hover:text-ink">{t}</Link>)}
        </div>
        <Link href="/signup" className="btn btn-primary !py-2.5">Get started</Link>
      </nav>
    </header>
  );
}

export function Footer() {
  const cols: Record<string, string[][]> = {
    Product: [["What it finds", "/signals"], ["How it works", "/how"], ["Deliverables", "/deliverables"], ["Pricing", "/pricing"]],
    Company: [["About", "/about"], ["Contact", "/contact"], ["Careers", "/careers"]],
    Legal: [["Privacy", "/privacy"], ["Terms", "/terms"], ["Security", "/security"]],
  };
  return (
    <footer className="border-t border-slate-100 mt-24 py-14">
      <div className="mx-auto max-w-6xl px-6 grid gap-10 md:grid-cols-4">
        <div><Logo /><p className="text-sm text-slate-500 mt-3 max-w-xs">The AI sales team for teams with more pipeline than time.</p></div>
        {Object.entries(cols).map(([h, ls]) => (
          <div key={h}>
            <div className="eyebrow mb-3">{h}</div>
            <ul className="space-y-2 text-sm text-slate-600">
              {ls.map(([t, u]) => <li key={u}><Link href={u} className="hover:text-ink">{t}</Link></li>)}
            </ul>
          </div>
        ))}
        <p className="md:col-span-4 text-xs text-slate-400">© {new Date().getFullYear()} SalesNova. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function Page({ children }: { children: React.ReactNode }) {
  return <><Nav /><main className="hero-bg min-h-screen pt-36">{children}</main><Footer /></>;
}

export function Title({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center px-6">
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]">{title}</h1>
      {sub && <p className="mt-6 text-lg text-slate-600">{sub}</p>}
    </div>
  );
}
