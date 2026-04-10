// CloudFront를 통한 이미지 URL 생성
// 함수 내부에서 환경변수를 읽어 클라이언트 네비게이션 시 undefined 방지
export function getCloudFrontImageUrl(key: string): string {
  const cloudfrontUrl =
    process.env.NEXT_PUBLIC_CLOUD_FRONT_URL || process.env.CLOUD_FRONT_URL;
  return `https://${cloudfrontUrl}/${key}`;
}

// 여러 이미지 URL 한번에 가져오기
export function getCloudFrontImageUrls(keys: string[]): string[] {
  return keys.map((key) => getCloudFrontImageUrl(key));
}
