// CloudFront를 통한 이미지 URL 생성
const CLOUDFRONT_URL = process.env.CLOUD_FRONT_URL!;

// CloudFront에서 이미지 URL 생성 (더 이상 presigned URL 불필요)
export function getCloudFrontImageUrl(key: string): string {
  // CloudFront URL에 https 프로토콜 추가 및 키 조합
  return `https://${CLOUDFRONT_URL}/${key}`;
}

// 여러 이미지 URL 한번에 가져오기
export function getCloudFrontImageUrls(keys: string[]): string[] {
  return keys.map((key) => getCloudFrontImageUrl(key));
}

// SubHub 프로젝트 이미지 키 목록
export const subHubImages = {
  appIcon: "subhub/app_icon.png",
  logo: ["subhub/logo_name.png", "subhub/logo_name_dark.png"],
  storeAssets: {
    featureGraphic: "subhub/graph_image.png",
    introScreens: [
      "subhub/intro_service_1.png",
      "subhub/intro_service_2.png",
      "subhub/intro_service_3.png",
      "subhub/intro_service_4.png",
      "subhub/intro_service_5.png",
      "subhub/intro_service_6.png",
    ],
  },
  mobileScreenshots: {
    android: ["subhub/ss-android-1.jpg", "subhub/ss-android-2.jpg"],
    ios: [
      "subhub/ss-iphone16-pro-1.png",
      "subhub/ss-iphone16-pro-2.png",
      "subhub/ss-iphone16-pro-3.png",
      "subhub/ss-iphone16-pro-4.png",
      "subhub/ss-iphone16-pro-5.png",
    ],
  },
};

// PhantomFile 프로젝트 이미지 키 목록
export const phantomFileImages = {
  architecture: ["phantom-file/phantomfile-serverless-architecture.jpg"],
};

// CleanBreath 프로젝트 이미지 키 목록
export const cleanBreathImages = {
  erd: {
    legacy: "clean-breath/erd_legacy.png",
    latest: "clean-breath/erd_latest.png",
  },
  screenshots: [
    "clean-breath/clean_breath_01.png",
    "clean-breath/clean_breath_02.png",
    "clean-breath/clean_breath_03.png",
  ],
  seo: {
    before: [
      "clean-breath/google_search_console_before.webp",
      "clean-breath/google_search_console_keyword_before.webp",
      "cleanbreath_before.png",
    ],
    after: [
      "clean-breath/google_search_console_after.webp",
      "clean-breath/google_search_console_keyword_after.webp",
      "cleanbreath_after.png",
    ],
    timeline: [
      "clean-breath/2024_10_31_seo.png",
      "clean-breath/2024_11_11_seo_01.png",
      "clean-breath/2024_11_11_seo_02.png",
      "clean-breath/2024_11_18_seo.png",
    ],
  },
  fieldSurvey: "clean-breath/field_survey_area.png",
};
