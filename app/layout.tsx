import "./../globals.css";

export const metadata = { title: "Real Estate AI", description: "Real Estate AI" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-400/30">
              <span className="absolute inset-0 rounded-xl bg-emerald-400/25 blur" />
              <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2L3 7l9 5l9-5l-9-5Zm0 7L3 14l9 5l9-5l-9-5Z"/></svg>
            </span>
            <span className="font-semibold">Real Estate AI</span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-neutral-300">
            <a href="/" className="hover:text-emerald-300">Home</a>
            <a href="/sms-optin" className="hover:text-emerald-300">SMS Opt-in</a>
            <a href="/privacy" className="hover:text-emerald-300">Privacy</a>
          </nav>
        </div>
      </header>
      <main className="relative mx-auto max-w-6xl px-4 py-10">{children}</main>
      <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-400">© {new Date().getFullYear()} Real Estate AI</footer>
    </body></html>
  );
}
