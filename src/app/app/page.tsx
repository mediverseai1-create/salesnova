"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [rec, setRec] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch("/api/records?kind=briefing").then((r) => r.json()).then((d) => { setRec(d.records?.[0] ?? null); setLoaded(true); }).catch(() => setLoaded(true));
  }, []);
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      {loaded && !rec && (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-200 py-16 text-center">
          <p className="font-semibold">No data available yet.</p>
          <p className="mt-2 text-slate-600">Upload your sales file to get your first report, strategy and action plan.</p>
          <Link href="/app/upload" className="btn btn-primary mt-6">Upload your first export</Link>
        </div>
      )}
      {rec && (
        <div className="card mt-8">
          <div className="eyebrow mb-3">Latest briefing · {new Date(rec.created_at).toLocaleDateString()}</div>
          <div className="whitespace-pre-wrap leading-relaxed">{rec.output?.text}</div>
          <Link href="/app/upload" className="btn btn-ghost mt-6">Upload new data</Link>
        </div>
      )}
    </div>
  );
}
