"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { hasSupabase, supabaseBrowser } from "@/lib/supabase";
import { Page } from "@/components/Site";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const r = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const up = mode === "signup";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    if (!hasSupabase) { setErr("Supabase keys are not configured yet. Add them to .env.local."); return; }
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")), password = String(f.get("password"));
    setBusy(true);
    const sb = supabaseBrowser();
    const { error } = up
      ? await sb.auth.signUp({ email, password, options: { data: { company: f.get("company") }, emailRedirectTo: `${location.origin}/auth/callback` } })
      : await sb.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setErr(error.message);
    r.push("/app"); r.refresh();
  }

  return (
    <Page>
      <div className="mx-auto max-w-md px-6">
        <h1 className="text-4xl font-bold tracking-tight text-center">{up ? "Create your workspace." : "Welcome back."}</h1>
        <form onSubmit={submit} className="card mt-8 space-y-4">
          {up && <input name="company" required placeholder="Company name" className="input" />}
          <input name="email" type="email" required placeholder="Email" className="input" />
          <input name="password" type="password" required minLength={6} placeholder="Password" className="input" />
          {err && <p className="text-sm text-red-600">{err}</p>}
          <button disabled={busy} className="btn btn-primary w-full">{busy ? "Please wait…" : up ? "Create account" : "Sign in"}</button>
          <p className="text-sm text-slate-600 text-center">
            {up ? <>Already have an account? <Link className="text-brand font-semibold" href="/signin">Sign in</Link></> : <>New here? <Link className="text-brand font-semibold" href="/signup">Create an account</Link></>}
          </p>
        </form>
      </div>
    </Page>
  );
}
