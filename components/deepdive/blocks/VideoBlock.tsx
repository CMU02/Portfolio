"use client";

// 비디오 블록(HyperFrames 결과물): 화면에 보일 때만 자동 재생, 모션 축소 설정이면 포스터 + 수동 재생
import { useEffect, useRef } from "react";
import { getCloudFrontImageUrl } from "@/lib/cloudfront";
import type { VideoAttrs } from "@/data/projects/types";

export function VideoBlock({ webmKey, mp4Key, posterKey, caption }: VideoAttrs) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 브라우저 자동재생 정책으로 거부될 수 있으니 실패는 무시
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="space-y-2">
      {/* 반복 재생 영상은 정지 수단이 필요하므로(WCAG 2.2.2) controls는 항상 노출 */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        poster={getCloudFrontImageUrl(posterKey)}
        aria-label={caption}
        className="w-full aspect-video bg-muted"
      >
        <source src={getCloudFrontImageUrl(webmKey)} type="video/webm" />
        <source src={getCloudFrontImageUrl(mp4Key)} type="video/mp4" />
      </video>
      {caption && (
        <figcaption className="text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
