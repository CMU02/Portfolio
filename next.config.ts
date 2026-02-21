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
    // 이미지 품질 설정 (75, 85 지원)
    qualities: [75, 85],
  },
};

export default nextConfig;
