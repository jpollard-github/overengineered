export type AnalyticsEvent = {
  name: "doctrine_page_loaded" | "principle_expanded" | "build_details_revealed";
  properties?: Record<string, string | number | boolean>;
};
export interface Analytics {
  record(event: AnalyticsEvent): void | Promise<void>;
}
export class NoopAnalytics implements Analytics {
  record(event: AnalyticsEvent) {
    void event; /* Privacy-preserving by default. */
  }
}
