import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
