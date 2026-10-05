import { SITE } from "@/lib/site";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}

/** Renders release notes already sanitized into plain bullet lines by the sync script. */
export function Changelog({ className = "" }: { className?: string }) {
  const history = SITE.release.history ?? [];
  const latestNotes = SITE.release.changelog ?? [];

  if (!history.length && !latestNotes.length) {
    return (
      <p className={`text-sm text-muted ${className}`}>
        Release notes are available on{" "}
        <a
          href={`${SITE.releasesRepo}/releases`}
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Releases
        </a>
        .
      </p>
    );
  }

  const entries =
    history.length > 0
      ? history
      : [
          {
            version: SITE.version,
            tag: SITE.release.tag,
            publishedAt: SITE.release.publishedAt,
            releaseUrl: SITE.release.releaseUrl,
            changelog: latestNotes,
          },
        ];

  return (
    <div className={`changelog ${className}`}>
      {entries.map((entry, index) => (
        <article
          key={entry.tag}
          className={`changelog-entry ${index === 0 ? "is-latest" : ""}`}
        >
          <header>
            <h3>
              v{entry.version}
              {index === 0 && <span>Latest</span>}
            </h3>
            <p>
              {formatDate(entry.publishedAt)}{" "}
              <a
                href={entry.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </p>
          </header>
          {entry.changelog?.length ? (
            <ul>
              {entry.changelog.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="changelog-empty">
              See the full notes on{" "}
              <a
                href={entry.releaseUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                this release
              </a>
              .
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
