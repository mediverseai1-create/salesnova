"use client";
import { useEffect, useState } from "react";
import { supabaseBrowser, hasSupabase } from "@/lib/supabase";

const MAX = 15 * 1024 * 1024;

function toBase64(f: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1]);
    r.onerror = rej;
    r.readAsDataURL(f);
  });
}

export default function Conversations() {
  const [tab, setTab] = useState<"paste" | "audio">("paste");
  const [accounts, setAccounts] = useState<{ id: string; name: string }[]>([]);
  const [account, setAccount] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [out, setOut] = useState("");

  useEffect(() => {
    if (!hasSupabase) return;
    supabaseBrowser().from("accounts").select("id, name").order("name").then(({ data }) => setAccounts(data ?? []));
  }, []);

  async function onAccount(v: string) {
    if (v !== "__new") return setAccount(v);
    const name = prompt("Account name");
    if (!name?.trim() || !hasSupabase) return;
    const sb = supabaseBrowser();
    const { data: m } = await sb.from("members").select("org_id").limit(1).single();
    const { data } = await sb.from("accounts").insert({ org_id: m?.org_id, name: name.trim() }).select("id, name").single();
    if (data) { setAccounts((a) => [...a, data]); setAccount(data.name); }
  }

  async function run() {
    setErr(""); setOut("");
    if (tab === "audio" && file && file.size > MAX) return setErr("Recording must be under 15MB.");
    setBusy(true);
    const prefix = account ? `Account: ${account}\n` : "";
    const body: any = { input: prefix + (tab === "paste" ? text : "") };
    if (tab === "audio" && file) body.audio = { mime: file.type || "audio/mpeg", data: await toBase64(file) };
    const r = await fetch("/api/ai/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({ error: "Upload failed" }));
    setBusy(false);
    if (!r.ok) return setErr(d.error || "Something went wrong");
    setOut(d.output);
  }

  const ready = tab === "paste" ? text.trim().length > 3 : !!file;

  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl font-bold tracking-tight">Conversations</h1>
      <div className="card !rounded-3xl !p-8 mt-8">
        <h2 className="text-xl font-semibold">Upload a call</h2>
        <p className="mt-1 text-sm text-slate-600">Paste a transcript, or upload a recording (under 15MB) — SalesNova extracts the rest.</p>
        <div className="mt-5 inline-flex rounded-full bg-slate-100 p-1.5">
          {([["paste", "Paste transcript"], ["audio", "Upload recording"]] as const).map(([k, t]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2.5 text-sm font-semibold ${tab === k ? "bg-white shadow" : "text-slate-600"}`}>{t}</button>
          ))}
        </div>
        <label className="mt-6 block text-sm font-semibold">Link to account (optional)</label>
        <select value={account} onChange={(e) => onAccount(e.target.value)} className="input mt-2 !rounded-2xl !py-3.5">
          <option value="">No account</option>
          {accounts.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
          <option value="__new">+ Add new account…</option>
        </select>
        {tab === "paste" ? (
          <>
            <label className="mt-6 block text-sm font-semibold">Transcript</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={9} placeholder="Paste the call transcript here..." className="input mt-2 !rounded-2xl" />
          </>
        ) : (
          <>
            <label className="mt-6 block text-sm font-semibold">Recording</label>
            <input type="file" accept="audio/*,video/mp4" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="input mt-2 !rounded-2xl" />
          </>
        )}
        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
        <button onClick={run} disabled={busy || !ready} className="btn btn-primary mt-6 disabled:opacity-50">{busy ? "Analysing…" : "Upload and analyze"}</button>
      </div>
      {out && <div className="card mt-6 whitespace-pre-wrap leading-relaxed">{out}</div>}
    </div>
  );
}
