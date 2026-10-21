// Next.js 커스텀 이미지 로더
// /_next/image 프록시를 우회하고, 요청 너비에 맞는 사전 생성 WebP 변형(S3/CloudFront)을 직접 가리킨다.
import { variantUrl } from "./image-variants";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudFrontLoader({ src, width }: ImageLoaderParams): string {
  return variantUrl(src, width);
}
