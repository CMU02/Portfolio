// CloudFront를 통한 이미지 URL 생성
// NEXT_PUBLIC_ 접두사 변수만 사용 — 클라이언트 번들에서도 안전하게 접근 가능
// CLOUD_FRONT_URL은 서버 전용이므로 클라이언트 컴포넌트에서 undefined가 됨
export function getCloudFrontImageUrl(key: string): string {
  const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL;
  return `https://${cloudfrontUrl}/${key}`;
}

// 여러 이미지 URL 한번에 가져오기
export function getCloudFrontImageUrls(keys: string[]): string[] {
  return keys.map((key) => getCloudFrontImageUrl(key));
}
