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
  const alignCls =
    align === "left"
      ? "mx-0 max-w-xl text-left"
      : "mx-auto max-w-xl text-center";

  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-5 py-16 sm:py-24 ${className}`}
    >
      <div className={`mb-8 sm:mb-10 ${alignCls}`}>
        {eyebrow && (
          <p className="mb-3 text-[12px] font-medium tracking-[0.06em] text-violet-200 uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-balance text-[1.75rem] leading-[1.15] font-semibold tracking-[var(--tracking-display)] text-white sm:text-[2.6rem] sm:leading-[1.15]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
            {description}
          </p>
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
    <div className="relative mx-auto max-w-2xl overflow-hidden px-5 pb-10 pt-16 text-center sm:pt-24">
      <div className="page-hero-glow" aria-hidden />
      {eyebrow && (
        <p className="relative mb-3 text-[12px] font-medium tracking-[0.06em] text-dim uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="relative text-balance text-[2.4rem] leading-[1.12] font-semibold tracking-[var(--tracking-display)] text-white sm:text-[3rem] sm:leading-[1.1]">
        {title}
      </h1>
      {description && (
        <p className="relative mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
