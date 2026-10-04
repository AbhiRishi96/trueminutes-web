import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-28 text-center">
      <p className="font-mono text-[12px] text-dim">404</p>
      <h1 className="mt-3 text-[1.75rem] font-semibold tracking-[var(--tracking-display)] text-white">
        Page not found
      </h1>
      <p className="mt-3 text-[14px] text-muted">
        That URL isn’t on this site. Head home or grab the Mac download.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-[14px]">
        <Link href="/" className="text-white no-underline hover:text-signal-soft">
          Home
        </Link>
        <Link href="/download" className="text-muted no-underline hover:text-white">
          Download
        </Link>
        <Link href="/privacy" className="text-muted no-underline hover:text-white">
          Privacy
        </Link>
      </div>
    </div>
  );
}
