import type { BuildFact, Principle } from "@overengineered/contracts";

export function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <p className="status-badge">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-heading">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <span>{description}</span> : null}
    </header>
  );
}
export function PrincipleCard({ principle }: { principle: Principle }) {
  return (
    <article className="principle-card">
      <p className="principle-number">{String(principle.order).padStart(2, "0")}</p>
      <div>
        <h3>{principle.title}</h3>
        <p>{principle.body}</p>
      </div>
    </article>
  );
}
export function BuildFactsGrid({ facts }: { facts: BuildFact[] }) {
  return (
    <dl className="build-facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
export function ImplementationDetails({
  source,
  metadata,
}: {
  source: "gateway" | "local-continuity";
  metadata: Record<string, string | boolean>;
}) {
  return (
    <details className="implementation-details">
      <summary>
        Build information <span>for future incident commanders</span>
      </summary>
      <div>
        <p>
          <strong>Content route</strong>
          <br />
          {source === "gateway"
            ? "GraphQL → REST → domain → packages"
            : "Controlled doctrinal continuity mechanism"}
        </p>
        {Object.entries(metadata).map(([key, value]) => (
          <p key={key}>
            <strong>{key}</strong>
            <br />
            {String(value)}
          </p>
        ))}
      </div>
    </details>
  );
}
