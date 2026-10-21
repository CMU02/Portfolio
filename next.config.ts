import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // *.dev.tsx/ts 라우트(app/dev/editor)는 next dev에서만 존재 -> 프로덕션 빌드에 라우트·편집기 JS 자체가 없음
  pageExtensions:
    process.env.NODE_ENV === "development"
      ? ["dev.tsx", "dev.ts", "tsx", "ts", "jsx", "js"]
      : ["tsx", "ts", "jsx", "js"],
  images: {
    // CloudFront CDN에서 직접 이미지를 서빙하므로 커스텀 로더 사용
    // /_next/image 프록시를 우회하여 다수 이미지 동시 로드 시 400 에러 방지
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // CloudFrontImage 컴포넌트에서 사용하는 quality 값 허용
    qualities: [75, 85],
  },
};

export default nextConfig;
