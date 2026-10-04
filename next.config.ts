import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, { dev }) {
    // Next 15's vendored webpack can crash while revalidating filesystem snapshots.
    // Use the supported in-memory cache for these small, self-contained static builds.
    // https://github.com/webpack/webpack/issues/21636
    if (!dev) config.cache = { type: "memory" };
    return config;
  },
  // Static export for Cloudflare Workers Static Assets (₹0 Workers Free).
  output: "export",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,
};

export default nextConfig;
