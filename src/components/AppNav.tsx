"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [["Dashboard", "/app"], ["Upload data", "/app/upload"], ["Follow-Up AI", "/app/followups"], ["Conversations", "/app/conversations"], ["Lead Finder AI", "/app/leads"], ["History", "/app/history"], ["Ask SalesNova", "/app/ask"], ["Settings", "/app/settings"]];

export function AppNav() {
  const p = usePathname();
  return (
    <nav className="flex md:flex-col gap-1 overflow-x-auto text-[15px]">
      {items.map(([t, h]) => (
        <Link key={h} href={h} className={`rounded-xl px-3 py-2.5 whitespace-nowrap ${p === h ? "bg-[#e3f0ff] text-[#0a4aa8] font-semibold" : "text-slate-700 hover:bg-slate-100"}`}>{t}</Link>
      ))}
    </nav>
  );
}
