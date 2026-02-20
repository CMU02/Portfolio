import { CloudFrontImage } from "@/components/cloudfront-image";

interface ImageGridProps {
  images: string[];
  altPrefix: string;
  columns?: 2 | 3;
  priority?: boolean;
}

// 재사용 가능한 이미지 그리드 컴포넌트
export function ImageGrid({
  images,
  altPrefix,
  columns = 3,
  priority = false,
}: ImageGridProps) {
  const gridCols = columns === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {images.map((imageKey, index) => (
        <div
          key={index}
          className="relative rounded-lg overflow-hidden border border-border bg-muted/30"
        >
          <CloudFrontImage
            s3Key={imageKey}
            alt={`${altPrefix} ${index + 1}`}
            priority={priority && index === 0}
          />
        </div>
      ))}
    </div>
  );
}
