// 이미지 변형 키 규칙: dir/name.ext -> dir/name.w{width}.webp (원본은 유지)
export const IMAGE_WIDTHS = [640, 1280, 1920] as const;
export type ImageWidth = (typeof IMAGE_WIDTHS)[number];

/** 요청 너비 이상인 가장 작은 변형, 없으면 가장 큰 변형 */
export function pickWidth(requested: number): ImageWidth {
  return IMAGE_WIDTHS.find((w) => w >= requested) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
}

/** 마지막 확장자만 .w{width}.webp로 교체 */
export function variantKey(key: string, width: ImageWidth): string {
  return key.replace(/\.[^./]+$/, `.w${width}.webp`);
}

/** 원격 래스터 원본 URL만 변형 URL로 바꾸고, 나머지는 그대로 반환 */
export function variantUrl(src: string, requested: number): string {
  if (!/^https:\/\/.+\.(png|jpe?g|webp)$/i.test(src) || /\.w\d+\.webp$/i.test(src)) return src;
  return variantKey(src, pickWidth(requested));
}
