export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-20 ${className}`}>
      <div className="mx-auto mb-12 max-w-2xl text-center">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-violet-soft">{eyebrow}</p>
        )}
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
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
    <div className="mx-auto max-w-3xl px-5 pb-8 pt-16 text-center sm:pt-20">
      {eyebrow && (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-violet-soft">{eyebrow}</p>
      )}
      <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
      {description && <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
