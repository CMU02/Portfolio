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
  // 컬럼 수에 따라 적절한 sizes 계산
  const sizes =
    columns === 2
      ? "(max-width: 768px) 50vw, 40vw"
      : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px";

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
            sizes={sizes}
          />
        </div>
      ))}
    </div>
  );
}
