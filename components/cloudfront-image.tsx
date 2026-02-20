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
}

// Server Component — URL 생성이 단순 문자열 조합이므로 클라이언트 fetch 불필요
export function CloudFrontImage({
  s3Key,
  alt,
  width = 1200,
  height = 800,
  className,
  priority = false,
  fill = false,
  sizes,
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
        unoptimized
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={cn("w-full h-auto", className)}
      priority={priority}
      unoptimized
    />
  );
}
