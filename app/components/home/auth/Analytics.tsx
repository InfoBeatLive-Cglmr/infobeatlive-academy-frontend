//Next.js and typescript
"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const GA_MEASUREMENT_ID ="G-F1D82KF4XD";

export const pageview = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      pageview(pathname);
    }
  }, [pathname]);

  return null;
}
