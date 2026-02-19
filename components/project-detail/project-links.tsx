"use client";

import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Store } from "lucide-react";

interface ProjectLinksProps {
  githubUrl?: string;
  demoUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
}

// 재사용 가능한 프로젝트 링크 버튼 컴포넌트
export function ProjectLinks({
  githubUrl,
  demoUrl,
  playStoreUrl,
  appStoreUrl,
}: ProjectLinksProps) {
  return (
    <>
      {githubUrl && (
        <Button size="sm" variant="outline" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </a>
        </Button>
      )}
      {demoUrl && (
        <Button size="sm" variant="outline" asChild>
          <a href={demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-1" />
            서비스 바로가기
          </a>
        </Button>
      )}
      {playStoreUrl && (
        <Button size="sm" variant="outline" asChild>
          <a href={playStoreUrl} target="_blank" rel="noopener noreferrer">
            <Store className="w-4 h-4 mr-1" />
            Play Store에서 보기
          </a>
        </Button>
      )}
      {appStoreUrl && (
        <Button size="sm" variant="outline" asChild>
          <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">
            <Store className="w-4 h-4 mr-1" />
            App Store에서 보기
          </a>
        </Button>
      )}
    </>
  );
}
