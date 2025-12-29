"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchCloudFrontImageUrl } from "@/app/actions/cloudfront";
import { cn } from "@/lib/utils";

interface CloudFrontImageProps {
  s3Key: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function CloudFrontImage({
  s3Key,
  alt,
  width = 1200,
  height = 800,
  className,
  priority = false,
}: CloudFrontImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      try {
        setIsLoading(true);
        // CloudFront URL을 Server Action을 통해 가져오기
        const url = await fetchCloudFrontImageUrl(s3Key);
        setImageUrl(url);
      } catch (err) {
        setError("이미지를 불러올 수 없습니다.");
        console.error("CloudFront 이미지 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadImage();
  }, [s3Key]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "animate-pulse bg-muted rounded-lg flex items-center justify-center",
          className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <span className="text-muted-foreground text-sm">로딩 중...</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div
        className={cn(
          "bg-muted/50 rounded-lg flex items-center justify-center border border-border",
          className
        )}
        style={{ aspectRatio: `${width}/${height}` }}
      >
        <span className="text-muted-foreground text-sm">{error}</span>
      </div>
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
