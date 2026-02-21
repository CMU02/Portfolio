// CloudFront를 통한 이미지 URL 생성
const CLOUDFRONT_URL =
  process.env.NEXT_PUBLIC_CLOUD_FRONT_URL || process.env.CLOUD_FRONT_URL!;

// CloudFront에서 이미지 URL 생성
export function getCloudFrontImageUrl(key: string): string {
  return `https://${CLOUDFRONT_URL}/${key}`;
}

// 여러 이미지 URL 한번에 가져오기
export function getCloudFrontImageUrls(keys: string[]): string[] {
  return keys.map((key) => getCloudFrontImageUrl(key));
}
