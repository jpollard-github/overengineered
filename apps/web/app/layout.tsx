import type { Metadata } from "next";
import "@overengineered/design-tokens/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build the Smallest Honest Thing",
  description:
    "A practical doctrine for software that solves the problem without founding a new civilization around it.",
  openGraph: {
    title: "Build the Smallest Honest Thing",
    description: "Eleven principles for useful, least-harmful software.",
    type: "website",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
