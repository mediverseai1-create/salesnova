"use client";
import { hasSupabase, supabaseBrowser } from "@/lib/supabase";

export default function SignOut() {
  return (
    <button className="text-sm text-slate-500 px-3 py-2 hover:text-ink whitespace-nowrap" onClick={async () => { if (hasSupabase) await supabaseBrowser().auth.signOut(); location.href = "/"; }}>
      Sign out
    </button>
  );
}
