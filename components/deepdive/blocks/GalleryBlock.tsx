"use client";

// 갤러리 블록: 대표 7장 썸네일 그리드 + Radix Dialog 라이트박스
import { useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { CloudFrontImage } from "@/components/cloudfront-image";
import type { GalleryAttrs } from "@/data/projects/types";

const PREVIEW_COUNT = 7;
// shortcut: CloudFront가 width 쿼리를 무시해 어차피 원본을 받으므로 unoptimized로 썸네일·라이트박스가 같은 URL(캐시)을 쓰게 한다,
// S3에 썸네일/중간 크기 변형을 올리면 그 키로 바꾸고 sizes를 되살릴 것
const focusRing =
  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
const navButton = `absolute top-1/2 -translate-y-1/2 size-11 flex items-center justify-center rounded-full bg-background/70 text-foreground hover:bg-background transition-colors ${focusRing}`;

export function GalleryBlock({ items }: GalleryAttrs) {
  const [current, setCurrent] = useState<number | null>(null);
  if (items.length === 0) return null;

  const prev = () =>
    setCurrent((c) => ((c ?? 0) - 1 + items.length) % items.length);
  const next = () => setCurrent((c) => ((c ?? 0) + 1) % items.length);
  const item = current === null ? null : items[current];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.slice(0, PREVIEW_COUNT).map((it, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${it.caption} 크게 보기`}
            onClick={() => setCurrent(i)}
            className={`rounded-lg border border-border overflow-hidden bg-muted/30 group text-left ${focusRing}`}
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <CloudFrontImage
                s3Key={it.s3Key}
                alt=""
                fill
                unoptimized
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-2 space-y-1">
              {it.category && (
                <span className="text-xs font-medium text-primary-text bg-primary/10 px-1.5 py-0.5 rounded">
                  {it.category}
                </span>
              )}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {it.caption}
              </p>
            </div>
          </button>
        ))}
        {items.length > PREVIEW_COUNT && (
          <button
            type="button"
            onClick={() => setCurrent(PREVIEW_COUNT)}
            className={`min-h-11 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground ${focusRing}`}
          >
            <Images className="size-6" aria-hidden />
            <span className="text-xs font-medium">전체 보기</span>
            <span className="text-xs">
              +{items.length - PREVIEW_COUNT}장 더
            </span>
          </button>
        )}
      </div>

      <Dialog
        open={item !== null}
        onOpenChange={(open) => !open && setCurrent(null)}
      >
        {item && (
          <DialogContent
            showCloseButton={false}
            className="max-w-[calc(100%-2rem)] sm:max-w-3xl p-0 gap-0 overflow-hidden"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              else if (e.key === "ArrowRight") next();
            }}
          >
            {/* 짧은 화면(가로 모드)에서도 닫기 버튼이 화면 안에 남도록 높이 제한 */}
            <div className="relative w-full aspect-4/3 max-h-[70dvh] bg-muted">
              <CloudFrontImage
                s3Key={item.s3Key}
                alt={item.caption}
                fill
                unoptimized
                className="object-contain"
              />
              <button
                type="button"
                aria-label="이전 이미지"
                onClick={prev}
                className={`${navButton} left-3`}
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="다음 이미지"
                onClick={next}
                className={`${navButton} right-3`}
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
              <DialogClose
                aria-label="닫기"
                className={`absolute top-3 right-3 size-11 flex items-center justify-center rounded-full bg-background/70 text-foreground hover:bg-background transition-colors ${focusRing}`}
              >
                <X className="size-5" aria-hidden />
              </DialogClose>
            </div>
            <div className="p-4 space-y-1">
              <div className="flex items-center justify-between">
                {item.category && (
                  <span className="text-xs font-medium text-primary-text bg-primary/10 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                )}
                <DialogDescription className="text-xs ml-auto">
                  {current! + 1} / {items.length}
                </DialogDescription>
              </div>
              <DialogTitle className="text-sm font-normal text-foreground/80 leading-relaxed">
                {item.caption}
              </DialogTitle>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
