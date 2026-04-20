"use client";

import { useEffect } from "react";

export function WebVitals() {
  useEffect(() => {
    const reportWebVitals = async (metric: any) => {
      if (typeof window !== "undefined" && "gtag" in window) {
        const gtag = (window as any).gtag;
        gtag("event", metric.name, {
          value: metric.value,
          label: metric.id,
        });
      }
    };

    import("web-vitals").then(({ onCLS, onINP, onLCP, onFCP, onTTFB }) => {
      onCLS(reportWebVitals);
      onINP(reportWebVitals);
      onLCP(reportWebVitals);
      onFCP(reportWebVitals);
      onTTFB(reportWebVitals);
    });
  }, []);

  return null;
}
