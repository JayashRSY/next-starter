import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-domain.com'], // Add domains for image optimization
  },
  // Add other necessary configurations
};

export default nextConfig;
