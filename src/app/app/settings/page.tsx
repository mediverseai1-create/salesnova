"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser, hasSupabase } from "@/lib/supabase";

const PLANS = [
  { key: "free", name: "Free", price: 0, credits: 200, link: "" },
  { key: "pro", name: "Professional", price: 47, credits: 4000, link: process.env.NEXT_PUBLIC_PAYMENT_LINK_PRO || "" },
  { key: "business", name: "Business", price: 97, credits: 11000, link: process.env.NEXT_PUBLIC_PAYMENT_LINK_BUSINESS || "" },
];
const RHYTHMS = ["Daily", "Weekly", "Biweekly", "Monthly", "Quarterly", "Biannual", "Annual"];

export default function Settings() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState<any>(null);
  const [orgName, setOrgName] = useState("");
  const [rhythm, setRhythm] = useState("Weekly");
  const [usage, setUsage] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!hasSupabase) return;
    const sb = supabaseBrowser();
    sb.auth.getUser().then(({ data }) => { setEmail(data.user?.email ?? ""); setFullName(data.user?.user_metadata?.full_name ?? ""); });
    sb.from("organizations").select("*").limit(1).single().then(({ data }) => { if (data) { setOrg(data); setOrgName(data.name); setRhythm(data.rhythm || "Weekly"); } });
    sb.from("records").select("id, kind, created_at").order("created_at", { ascending: false }).limit(10).then(({ data }) => setUsage(data ?? []));
  }, []);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 3000); };
  const plan = PLANS.find((p) => p.key === (org?.plan || "free")) || PLANS[0];
  const credits = org?.credits ?? plan.credits;
  const pct = Math.max(0, Math.min(100, ((plan.credits - credits) / plan.credits) * 100));

  async function saveProfile() {
    const { error } = await supabaseBrowser().auth.updateUser({ data: { full_name: fullName } });
    flash(error ? error.message : "Profile saved");
  }
  async function saveOrg() {
    if (!org) return;
    const { error } = await supabaseBrowser().from("organizations").update({ name: orgName, rhythm }).eq("id", org.id);
    flash(error ? error.message : "Organization saved");
  }

  return (
    <div className="max-w-5xl space-y-6">
      <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
      {msg && <p className="text-sm font-semibold text-brand">{msg}</p>}

      <section className="card !rounded-3xl !p-8">
        <h2 className="text-xl font-semibold">Your profile</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div><label className="text-sm font-semibold">Full name</label><input value={fullName} onChange={(e) => setFullName(e.target.value)} className="input mt-2 !rounded-2xl !py-3.5" /></div>
          <div><label className="text-sm font-semibold">Email</label><input value={email} readOnly className="input mt-2 !rounded-2xl !py-3.5 bg-slate-50" /></div>
        </div>
        <button onClick={saveProfile} className="btn btn-primary mt-5">Save profile</button>
      </section>

      <section className="card !rounded-3xl !p-8">
        <h2 className="text-xl font-semibold">Organization</h2>
        <p className="mt-1 text-sm text-slate-600">Reporting rhythm applies to future analysis runs.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div><label className="text-sm font-semibold">Organization name</label><input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="input mt-2 !rounded-2xl !py-3.5" /></div>
          <div><label className="text-sm font-semibold">Reporting rhythm</label>
            <select value={rhythm} onChange={(e) => setRhythm(e.target.value)} className="input mt-2 !rounded-2xl !py-3.5">{RHYTHMS.map((r) => <option key={r}>{r}</option>)}</select></div>
        </div>
        <button onClick={saveOrg} className="btn btn-primary mt-5">Save organization</button>
      </section>

      <section className="card !rounded-3xl !p-8">
        <h2 className="text-xl font-semibold">Plan &amp; billing</h2>
        <p className="mt-1 text-sm text-slate-600">Current plan: <b>{plan.name} — ${plan.price}/month</b> — every plan gets the full platform; credits are the only difference. Upgrading opens payment in a new tab; your plan updates once payment is confirmed.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => {
            const current = p.key === plan.key;
            return (
              <div key={p.key} className={`rounded-3xl border p-6 ${current ? "border-[#9cc8ff] shadow-[0_10px_40px_-12px_rgba(11,102,224,.35)]" : "border-slate-200"}`}>
                {current && <span className="rounded-full bg-[#e3f0ff] px-3 py-1 text-[11px] font-mono tracking-widest text-brand">CURRENT PLAN</span>}
                <h3 className="mt-3 text-xl font-bold">{p.name}</h3>
                <p className="mt-3 text-3xl font-bold">${p.price}<span className="text-sm font-normal text-slate-400">/month</span></p>
                <p className="mt-2 text-sm text-slate-600">{p.credits.toLocaleString()} credits / month</p>
                {!current && p.link && <a href={p.link} target="_blank" rel="noreferrer" className={`btn mt-4 w-full ${p.key === "pro" ? "btn-primary" : "btn-ghost !bg-slate-100"}`}>Upgrade to {p.name}</a>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="card !rounded-3xl !p-8">
        <h2 className="text-xl font-semibold">Usage</h2>
        <p className="mt-1 text-sm text-slate-600">{credits} / {plan.credits} credits remaining{org?.reset_at ? ` · resets ${org.reset_at}` : ""}</p>
        <div className="mt-4 h-2.5 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-brand" style={{ width: `${pct}%` }} /></div>
        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 p-6">
          {usage.length === 0 ? <p className="text-center text-sm text-slate-600 py-6">No credit usage yet.</p> : (
            <ul className="divide-y text-sm">{usage.map((u) => <li key={u.id} className="flex justify-between py-2"><span className="capitalize">{u.kind}</span><span className="text-slate-500">5 credits · {new Date(u.created_at).toLocaleDateString()}</span></li>)}</ul>
          )}
        </div>
      </section>
    </div>
  );
}
