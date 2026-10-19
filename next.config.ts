import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/studio", destination: "/", permanent: false }];
  },
};

export default nextConfig;
