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
        <nav aria-label="On this page">
          <a href="#principles">Principles</a>
          <a href="#operating-test">Operating test</a>
        </nav>
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
