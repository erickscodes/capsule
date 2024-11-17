import { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during builds
  },
  // Other config options here
};

export default nextConfig;
