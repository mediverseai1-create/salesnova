import { Logo } from "@/components/Logo";
import SignOut from "@/components/SignOut";
import { AppNav } from "@/components/AppNav";
import { supabaseServer } from "@/lib/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let org = "Workspace";
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { data } = await supabaseServer().from("organizations").select("name").limit(1).single();
    if (data?.name) org = data.name;
  }
  return (
    <div className="min-h-screen md:flex bg-[#fdfdfc]">
      <aside className="md:w-[230px] md:min-h-screen md:sticky md:top-0 md:h-screen border-b md:border-b-0 md:border-r border-slate-100 bg-white p-5 flex flex-col">
        <Link href="/" className="mb-6"><Logo /></Link>
        <div className="text-[11px] tracking-widest text-slate-400 uppercase mb-3 truncate">{org}</div>
        <AppNav />
        <div className="mt-auto pt-6"><SignOut /></div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
