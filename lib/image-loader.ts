// Next.js 커스텀 이미지 로더
// CloudFront CDN에서 직접 이미지를 서빙하므로 /_next/image 프록시를 우회합니다.
// 이를 통해 다수의 이미지 동시 로드 시 발생하는 400 에러를 방지합니다.

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudFrontLoader({
  src,
  width,
  quality,
}: ImageLoaderParams): string {
  // src가 이미 완전한 URL인 경우 그대로 반환
  // Next.js Image 컴포넌트가 width/quality를 쿼리 파라미터로 붙이지 않도록 원본 URL 사용
  return src;
}
