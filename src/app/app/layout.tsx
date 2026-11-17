import Link from "next/link";
import { Logo } from "@/components/Logo";
import SignOut from "@/components/SignOut";

const items = [["Briefing", "/app"], ["Next Best Actions", "/app/actions"], ["Follow-Up AI", "/app/followups"], ["Conversations", "/app/conversations"], ["Lead Finder", "/app/leads"], ["Ask", "/app/ask"], ["Billing", "/app/billing"]];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex bg-[#fafaf9]">
      <aside className="md:w-60 md:min-h-screen border-b md:border-r bg-white p-4 md:p-5 flex md:block gap-4 overflow-x-auto">
        <Link href="/" className="hidden md:block mb-8"><Logo /></Link>
        <nav className="flex md:block gap-1 md:space-y-1 text-sm">
          {items.map(([t, h]) => <Link key={h} href={h} className="block rounded-lg px-3 py-2 whitespace-nowrap hover:bg-slate-100">{t}</Link>)}
        </nav>
        <div className="md:mt-8"><SignOut /></div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
