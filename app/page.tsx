"use client";

import { Card, Button } from "./components/ui";

export default function Home() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full blur-3xl"
             style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(0,255,171,.25), rgba(14,165,233,.20) 60%, transparent 70%)" }} />
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-[0_0_80px_rgba(16,185,129,0.15)]">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">Real Estate AI, but pretty.</h1>
          <p className="text-neutral-300">
            Chat with listings, schedule tours, and get instant answers. Dark mode. Neon edges. No cringe.
          </p>
          <div className="mt-5 flex gap-3">
            <Button onClick={() => location.assign("/sms-optin")}>Get SMS updates</Button>
            <a className="btn" href="/demo">Try the demo</a>
          </div>
        </Card>

        <Card>
          <h3 className="mb-2 text-lg font-semibold">What you get</h3>
          <ul className="list-disc space-y-2 pl-5 text-neutral-300">
            <li>Instant AI answers about any property</li>
            <li>Tour reminders via SMS (opt-in, compliant)</li>
            <li>Smart follow-ups, no spam</li>
          </ul>
        </Card>
      </section>
    </>
  );
}
