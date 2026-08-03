import { getBuildMetadata } from "@overengineered/build-metadata";
import { ONE_LINE_COPY } from "@overengineered/one-line-copy";
import {
  BuildFactsGrid,
  ImplementationDetails,
  PrincipleCard,
  SectionHeading,
  StatusBadge,
} from "@overengineered/ui";
import { getDoctrine } from "./doctrine-adapter";
import { BrowserTelemetry } from "./telemetry";

export const dynamic = "force-dynamic";
export default async function Home() {
  const { doctrine, source } = await getDoctrine();
  const build = getBuildMetadata();
  return (
    <>
      <BrowserTelemetry source={source} />
      <header className="site-header">
        <a href="#main" className="wordmark" aria-label="Smallest Honest Thing home">
          S/H
        </a>
        <div className="header-actions">
          <nav aria-label="On this page">
            <a href="#principles">Principles</a>
            <a href="#operating-test">Operating test</a>
          </nav>
          <a
            className="github-link"
            href="https://github.com/jpollard-github/overengineered"
            aria-label="View Overengineered on GitHub"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.29-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.98 10.98 0 0 1 5.75 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
            </svg>
          </a>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <StatusBadge>{doctrine.status}</StatusBadge>
          <p className="kicker">A doctrine for useful software</p>
          <h1 id="hero-title">{doctrine.title}</h1>
          <p className="subtitle">{doctrine.subtitle}</p>
          <p className="introduction">{doctrine.introduction}</p>
          <a className="text-link" href="#principles">
            Read the eleven principles <span aria-hidden="true">↓</span>
          </a>
        </section>
        <section className="principles-section" id="principles" aria-labelledby="principles-title">
          <SectionHeading
            eyebrow="01 / Principles"
            title="Restraint is a technical skill."
            description="Eleven practical checks for keeping software aligned with the problem it is meant to solve."
          />
          <div className="principle-grid">
            {doctrine.principles.map((principle) => (
              <PrincipleCard key={principle.id} principle={principle} />
            ))}
          </div>
        </section>
        <section
          className="operating-section"
          id="operating-test"
          aria-labelledby="operating-title"
        >
          <SectionHeading eyebrow="02 / Operating test" title="Before the next layer, ask." />
          <ol>
            {doctrine.operatingQuestions.map((question, index) => (
              <li key={question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {question}
              </li>
            ))}
          </ol>
        </section>
        <section className="facts-section" aria-labelledby="facts-title">
          <SectionHeading
            eyebrow="03 / Delivery posture"
            title="The implementation remains calm."
            description="The surrounding system has taken a more expansive view."
          />
          <BuildFactsGrid facts={doctrine.buildFacts} />
          <ImplementationDetails
            source={source}
            metadata={{
              "Git SHA": build.gitSha,
              "Build time": build.buildTime,
              Runtime: build.runtimeEnvironment,
              "Dirty working tree": build.dirty,
            }}
          />
        </section>
      </main>
      <footer>
        <div>
          <p className="footer-line">{ONE_LINE_COPY}</p>
          <p>
            Delivered through an architecture designed for several orders of magnitude more
            uncertainty.
          </p>
        </div>
        <p className="footer-mark">
          One page.
          <br />
          Governed accordingly.
        </p>
      </footer>
    </>
  );
}
