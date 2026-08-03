import type { NextConfig } from "next";
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://localhost:4000; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
const config: NextConfig = {
  output: "standalone",
  transpilePackages: [
    "@overengineered/ui",
    "@overengineered/content",
    "@overengineered/contracts",
    "@overengineered/build-metadata",
    "@overengineered/analytics",
    "@overengineered/one-line-copy",
  ],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};
export default config;
