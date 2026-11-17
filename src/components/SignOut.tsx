"use client";
import { hasSupabase, supabaseBrowser } from "@/lib/supabase";

export default function SignOut() {
  return (
    <button className="w-full rounded-full border border-slate-200 bg-white py-2.5 text-sm font-semibold hover:bg-slate-50" onClick={async () => { if (hasSupabase) await supabaseBrowser().auth.signOut(); location.href = "/"; }}>
      Sign out
    </button>
  );
}
