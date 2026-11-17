"use client";
import { useEffect, useState } from "react";

type Rec = { id: string; title: string; output: { text: string }; created_at: string };

export function Module({ kind, title, blurb, placeholder, allowFile }: { kind: string; title: string; blurb: string; placeholder: string; allowFile?: boolean }) {
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [hist, setHist] = useState<Rec[]>([]);
  const [credits, setCredits] = useState<number | null>(null);

  async function load() {
    const r = await fetch(`/api/records?kind=${kind}`).then((x) => x.json()).catch(() => null);
    if (r) { setHist(r.records); setCredits(r.credits); }
  }
  useEffect(() => { load(); }, [kind]);

  async function run() {
    setBusy(true); setErr(""); setOut("");
    const r = await fetch(`/api/ai/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ input }) });
    const d = await r.json();
    setBusy(false);
    if (!r.ok) return setErr(d.error || "Something went wrong");
    setOut(d.output); load();
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4">
        <div><h1 className="text-3xl font-bold tracking-tight">{title}</h1><p className="mt-1 text-slate-600">{blurb}</p></div>
        {credits !== null && <span className="rounded-full bg-white border px-3 py-1 text-sm whitespace-nowrap">{credits} credits</span>}
      </div>
      <div className="card mt-6 space-y-3">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={8} placeholder={placeholder} className="input font-mono text-sm" />
        <div className="flex items-center gap-3">
          <button onClick={run} disabled={busy || !input.trim()} className="btn btn-primary disabled:opacity-50">{busy ? "Analysing…" : "Run"}</button>
          {allowFile && (
            <label className="btn btn-ghost cursor-pointer">Upload file
              <input type="file" accept=".csv,.txt,.md,.json,.vtt,.srt" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setInput(await f.text()); }} />
            </label>
          )}
          <span className="text-xs text-slate-500">Uses 5 credits</span>
        </div>
        {err && <p className="text-sm text-red-600">{err}</p>}
      </div>
      {out && <div className="card mt-6 whitespace-pre-wrap leading-relaxed">{out}</div>}
      {hist.length > 0 && (
        <div className="mt-10"><div className="eyebrow mb-3">Saved runs</div>
          <div className="space-y-3">{hist.map((h) => (
            <details key={h.id} className="card !py-3"><summary className="cursor-pointer font-medium">{h.title || "Untitled"} <span className="text-xs text-slate-400">· {new Date(h.created_at).toLocaleString()}</span></summary>
              <div className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{h.output?.text}</div></details>
          ))}</div></div>
      )}
    </div>
  );
}
