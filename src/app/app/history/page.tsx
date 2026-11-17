"use client";
import { useEffect, useState } from "react";

const labels: Record<string, string> = { briefing: "Briefing", actions: "Next best actions", followups: "Follow-up", conversations: "Conversation", leads: "Lead finder", ask: "Question" };

export default function History() {
  const [recs, setRecs] = useState<any[]>([]);
  useEffect(() => { fetch("/api/records").then((r) => r.json()).then((d) => setRecs(d.records ?? [])).catch(() => {}); }, []);
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">History</h1>
      {recs.length === 0 && <p className="mt-6 text-slate-600">Nothing here yet. Your briefings, follow-ups and call analyses will be saved here.</p>}
      <div className="mt-6 space-y-3">
        {recs.map((r) => (
          <details key={r.id} className="card !py-3">
            <summary className="cursor-pointer font-medium"><span className="eyebrow mr-2">{labels[r.kind] ?? r.kind}</span>{r.title} <span className="text-xs text-slate-400">· {new Date(r.created_at).toLocaleString()}</span></summary>
            <div className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{r.output?.text}</div>
          </details>
        ))}
      </div>
    </div>
  );
}
