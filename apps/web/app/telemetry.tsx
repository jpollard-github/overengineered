"use client";
import { useEffect } from "react";
import { NoopAnalytics } from "@overengineered/analytics";
export function BrowserTelemetry({ source }: { source: string }) {
  useEffect(() => {
    performance.mark("doctrine-page-loaded");
    void new NoopAnalytics().record({ name: "doctrine_page_loaded", properties: { source } });
  }, [source]);
  return null;
}
