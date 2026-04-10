"use client";

import Image from "next/image";
import { getCloudFrontImageUrl } from "@/lib/cloudfront";
import { cn } from "@/lib/utils";

interface CloudFrontImageProps {
  s3Key: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

// Client Component — Client Component 내부에서 사용되므로 명시적으로 선언하여
// 뒤로가기(client-side navigation) 시에도 이미지가 정상 렌더링되도록 보장
export function CloudFrontImage({
  s3Key,
  alt,
  width = 1200,
  height = 800,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
}: CloudFrontImageProps) {
  const imageUrl = getCloudFrontImageUrl(s3Key);

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={cn("object-cover", className)}
        priority={priority}
        quality={quality}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      sizes={
        sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      }
      className={cn("w-full h-auto", className)}
      priority={priority}
      quality={quality}
    />
  );
}
