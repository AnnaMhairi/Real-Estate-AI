// app/sms-optin/page.tsx
"use client";

import { useState } from "react";

const BRAND = "Real Estate AI"; 
const KEYWORD_NUMBER = "+1 (747) 330-0445"; 
const HELP_URL = "https://yourdomain.com/help"; 
const MSG_FREQ = "4 msgs/month"; 

export default function SmsOptInPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/optin", { method: "POST", body: form });
    if (res.ok) setOk(true);
    else {
      let msg = "Something went wrong";
      try { msg = (await res.json()).error ?? msg; } catch {}
      setErr(msg);
    }
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      {/* neon gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full blur-3xl"
             style={{ background:
              "radial-gradient(60% 60% at 50% 50%, rgba(0,255,171,.25), rgba(14,165,233,.20) 60%, rgba(0,0,0,0) 70%)" }} />
        <div className="absolute bottom-[-8rem] left-[-8rem] h-96 w-96 rounded-full blur-3xl"
             style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(139,92,246,.25), rgba(0,0,0,0) 70%)" }} />
        <div className="absolute bottom-[-6rem] right-[-6rem] h-72 w-72 rounded-full blur-3xl"
             style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(34,197,94,.25), rgba(0,0,0,0) 70%)" }} />
      </div>

      <main className="relative mx-auto grid min-h-screen max-w-3xl place-items-center px-4 py-16">
        <section
          className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_80px_rgba(16,185,129,0.15)] backdrop-blur-xl md:p-10"
          aria-labelledby="heading"
        >
          {/* header */}
          <div className="mb-6 flex items-center gap-3">
            {/* lil logo pulse */}
            <div className="relative h-9 w-9">
              <span className="absolute inset-0 rounded-xl bg-emerald-400/25 blur-sm" />
              <span className="relative grid h-full w-full place-items-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/30">
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                  <path fill="currentColor"
                        d="M12 2L3 7l9 5l9-5l-9-5Zm0 7L3 14l9 5l9-5l-9-5Z" />
                </svg>
              </span>
            </div>
            <h1 id="heading" className="text-xl font-semibold tracking-tight md:text-2xl">
              Sign up for text alerts from <span className="text-emerald-300">{BRAND}</span>
            </h1>
          </div>

          <p className="text-sm text-neutral-300">
            Get property updates & AI answers (up to <b>{MSG_FREQ}</b>). Reply <b>STOP</b> to cancel, <b>HELP</b> for help.
            Msg &amp; data rates may apply. Consent is not a condition of purchase.
          </p>

          {/* state */}
          {ok ? (
            <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
              <p className="text-sm">
                We just texted you. Reply <b>YES</b> to confirm your subscription.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-400">
                  Mobile number
                </label>
                <input
                  name="phone"
                  required
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  className="w-full rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-3 text-base outline-none ring-emerald-400/0 transition focus:border-emerald-400/50 focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-400">
                  Name (optional)
                </label>
                <input
                  name="name"
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-white/10 bg-neutral-900/60 px-3 py-3 text-base outline-none ring-emerald-400/0 transition focus:border-emerald-400/50 focus:ring-2"
                />
              </div>

              <div className="flex items-start gap-3">
                <input id="agree" name="agree" type="checkbox" required className="mt-1 h-5 w-5 rounded-md border border-white/20 bg-neutral-900 accent-emerald-500" />
                <label htmlFor="agree" className="text-sm text-neutral-200">
                  I agree to receive recurring SMS from <b>{BRAND}</b> to the number provided (up to {MSG_FREQ}). Reply <b>STOP</b> to cancel,
                  <b> HELP</b> for help. Msg &amp; data rates may apply.
                </label>
              </div>

              {err && <p className="text-sm text-red-400">{err}</p>}

              <button
                disabled={loading}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-4 py-3 font-semibold text-emerald-100 transition hover:bg-emerald-500/30 disabled:opacity-60"
              >
                <span className="absolute inset-0 -z-10 translate-y-8 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                {loading ? "Submitting…" : "Agree & Sign Up"}
              </button>
            </form>
          )}

          {/* footer / keyword CTA */}
          <div className="mt-7 border-t border-white/10 pt-4 text-sm text-neutral-300">
            Prefer keyword? Text <code className="rounded-md border border-white/20 bg-neutral-900/60 px-1">JOIN</code> to{" "}
            <code className="rounded-md border border-white/20 bg-neutral-900/60 px-1">{KEYWORD_NUMBER}</code>.{" "}
            See our{" "}
            <a className="underline decoration-emerald-400/60 underline-offset-4 hover:text-emerald-300" href="/terms" target="_blank" rel="noreferrer">
              Terms
            </a>{" "}
            &{" "}
            <a className="underline decoration-emerald-400/60 underline-offset-4 hover:text-emerald-300" href="/privacy" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>.
          </div>
        </section>

        {/* tiny help link */}
        <p className="mt-4 text-xs text-neutral-400">
          Need help? <a className="underline decoration-neutral-500 hover:text-neutral-200" href={HELP_URL}>Visit help center</a>
        </p>
      </main>
    </div>
  );
}
