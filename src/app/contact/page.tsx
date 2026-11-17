"use client";
import { useState } from "react";
import { Page, Title } from "@/components/Site";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Page>
      <Title eyebrow="Contact" title="Talk to the SalesNova team." />
      <form
        className="card mx-auto mt-10 max-w-lg space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = Object.fromEntries(new FormData(e.currentTarget));
          await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
          setSent(true);
        }}
      >
        {sent ? <p className="font-semibold">Thanks, we&apos;ll be in touch.</p> : (<>
          <input name="name" required placeholder="Name" className="input" />
          <input name="email" type="email" required placeholder="Email" className="input" />
          <textarea name="message" required placeholder="How can we help?" rows={5} className="input" />
          <button className="btn btn-primary w-full">Send message</button>
        </>)}
      </form>
    </Page>
  );
}
