export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  align = "center",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "left" ? "mx-0 max-w-2xl text-left" : "mx-auto max-w-2xl text-center";

  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-24 sm:py-28 ${className}`}>
      <div className={`mb-14 ${alignCls}`}>
        {eyebrow && (
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-violet-soft">
            {eyebrow}
          </p>
        )}
        <h2 className="text-balance text-[1.85rem] font-semibold tracking-[var(--tracking-display)] text-white sm:text-4xl sm:leading-[1.15]">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-10 pt-20 text-center sm:pt-24">
      {eyebrow && (
        <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-violet-soft">
          {eyebrow}
        </p>
      )}
      <h1 className="text-balance text-4xl font-semibold tracking-[var(--tracking-display)] text-white sm:text-5xl">
        {title}
      </h1>
      {description && <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
