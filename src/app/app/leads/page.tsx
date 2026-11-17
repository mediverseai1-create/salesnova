"use client";
import { useState } from "react";

async function call(kind: string, input: string) {
  const r = await fetch(`/api/ai/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ input }) });
  const d = await r.json().catch(() => ({ error: "Request failed" }));
  if (!r.ok) throw new Error(d.error || "Something went wrong");
  return d.output as string;
}

export default function Leads() {
  const [name, setName] = useState("");
  const [sell, setSell] = useState("");
  const [icp, setIcp] = useState("");
  const [cands, setCands] = useState("");
  const [scores, setScores] = useState("");
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");

  async function buildIcp() {
    setErr(""); setBusy("icp");
    try { setIcp(await call("icp", `Profile name: ${name}\nWho we sell to: ${sell}`)); } catch (e: any) { setErr(e.message); }
    setBusy("");
  }
  async function score() {
    setErr(""); setBusy("score");
    try { setScores(await call("leads", `IDEAL CUSTOMER PROFILE:\n${icp}\n\nCANDIDATES:\n${cands}`)); } catch (e: any) { setErr(e.message); }
    setBusy("");
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl font-bold tracking-tight">Lead Finder AI</h1>
      <div className="card !rounded-3xl !p-8 mt-8">
        <h2 className="text-xl font-semibold">Ideal customer profile</h2>
        <p className="mt-1 text-sm text-slate-600">Tell SalesNova who you sell to — it learns from your best real accounts, not a generic template.</p>
        <label className="mt-6 block text-sm font-semibold">Profile name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enterprise SaaS buyers" className="input mt-2 !rounded-2xl !py-3.5" />
        <label className="mt-6 block text-sm font-semibold">Who do you sell to?</label>
        <textarea value={sell} onChange={(e) => setSell(e.target.value)} rows={4} placeholder="We sell accounting software to small healthcare businesses in the US." className="input mt-2 !rounded-2xl" />
        <button onClick={buildIcp} disabled={busy === "icp" || sell.trim().length < 3} className="btn btn-primary mt-5 disabled:opacity-50">{busy === "icp" ? "Building…" : "Build ideal customer profile"}</button>
        {icp && <div className="mt-6 whitespace-pre-wrap leading-relaxed border-t pt-5">{icp}</div>}
      </div>

      <div className="card !rounded-3xl !p-8 mt-6">
        <h2 className="text-xl font-semibold">Score new leads</h2>
        <p className="mt-1 text-sm text-slate-600">Paste candidate companies or contacts, one per line, to score them against your profile.</p>
        <textarea value={cands} onChange={(e) => setCands(e.target.value)} rows={6} placeholder="Company A, 50 staff, clinic, Texas&#10;Company B, ..." className="input mt-4 !rounded-2xl" />
        <button onClick={score} disabled={busy === "score" || !icp || cands.trim().length < 3} className="btn btn-primary mt-5 disabled:opacity-50">{busy === "score" ? "Scoring…" : "Score leads"}</button>
        {!icp && <p className="mt-2 text-xs text-slate-500">Build your ideal customer profile first.</p>}
        {scores && <div className="mt-6 whitespace-pre-wrap leading-relaxed border-t pt-5">{scores}</div>}
      </div>
      {err && <p className="mt-4 text-sm text-red-600">{err}</p>}
    </div>
  );
}
