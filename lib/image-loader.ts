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
  // CloudFront에서 직접 서빙하므로 최적화 파라미터 없이 원본 URL 반환
  // width를 사용하지 않지만 Next.js loader 인터페이스 충족을 위해 파라미터로 받음
  const params = new URLSearchParams();
  params.set("width", String(width));
  if (quality) params.set("quality", String(quality));
  // CloudFront는 쿼리 파라미터를 무시하고 원본 이미지를 서빙
  return `${src}?${params.toString()}`;
}
