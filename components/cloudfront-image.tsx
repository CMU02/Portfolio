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
