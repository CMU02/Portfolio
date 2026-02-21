"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudFrontImage } from "@/components/cloudfront-image";
import { getCloudFrontImageUrl } from "@/lib/cloudfront";

interface ArchitectureImageWithLinkProps {
  s3Key: string;
  alt: string;
  priority?: boolean;
}

// 아키텍처 이미지에 새창에서 보기 버튼을 추가한 컴포넌트
export function ArchitectureImageWithLink({
  s3Key,
  alt,
  priority = false,
}: ArchitectureImageWithLinkProps) {
  const imageUrl = getCloudFrontImageUrl(s3Key);

  return (
    <div className="relative group">
      <div className="relative w-full rounded-lg overflow-hidden border border-border bg-muted/30">
        <CloudFrontImage
          s3Key={s3Key}
          alt={alt}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      <div className="absolute top-3 right-3">
        <Button
          variant="secondary"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          asChild
        >
          <Link href={imageUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-2" />
            새창에서 보기
          </Link>
        </Button>
      </div>
    </div>
  );
}
