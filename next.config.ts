import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN", 
  },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self';", 
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", 
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;


