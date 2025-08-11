export function Card({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`card p-6 ${className}`} {...props} />;
  }
  export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className="btn" {...props} />;
  }
  export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input className="input" {...props} />;
  }
  export function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-xl font-semibold tracking-tight">{children}</h2>;
  }
  