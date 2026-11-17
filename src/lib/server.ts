import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export function supabaseServer() {
  const store = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch {} },
    },
  });
}
export async function gemini(prompt: string, json = false, inline?: { mime: string; data: string }): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not set");
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${key}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [...(inline ? [{ inlineData: { mimeType: inline.mime, data: inline.data } }] : []), { text: prompt }] }], generationConfig: json ? { responseMimeType: "application/json" } : {} }),
  });
  if (!r.ok) throw new Error("Gemini error: " + (await r.text()));
  const d = await r.json();
  return d.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}
