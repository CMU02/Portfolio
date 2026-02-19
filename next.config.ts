import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // CloudFront 도메인
      {
        protocol: "https",
        hostname: process.env.CLOUD_FRONT_URL!,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
