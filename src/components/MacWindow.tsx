export function MacWindow({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_40px_-12px_rgba(124,92,252,0.2)] ${className}`}
    >
      <div className="flex h-10 items-center border-b border-border bg-surface-2 px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex-1 text-center text-xs font-medium text-dim">{title}</div>
        <div className="w-10" />
      </div>
      <div className="bg-canvas">{children}</div>
    </div>
  );
}
