import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Next.js 16+ uses turbopack as a top-level key or specific property
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
