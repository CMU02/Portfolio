import type { Metadata } from "next";
import { projectsData, type Project } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";

// 프로젝트별 메타데이터 생성 유틸리티
export function generateProjectMetadata(projectId: string): Metadata {
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return {
      title: "프로젝트를 찾을 수 없습니다 | CMU02 Portfolio",
      description: "요청하신 프로젝트를 찾을 수 없습니다.",
    };
  }

  const title = `${project.title} | CMU02 Portfolio`;
  const description = `${project.subtitle} - ${project.description}`;
  const url = `${SITE_CONFIG.url}/projects/${project.id}`;

  // 기술 스택을 키워드에 추가
  const techKeywords = project.techStack.map((tech) => `${tech} 프로젝트`);
  const keywords = [
    project.title,
    project.subtitle,
    ...project.techStack,
    ...techKeywords,
    `${project.role} 프로젝트`,
    project.type === "personal" ? "개인 프로젝트" : "팀 프로젝트",
    "포트폴리오",
    "개발 프로젝트",
    "CMU02",
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: "2024-12-01", // 프로젝트 생성일
      modifiedTime: new Date().toISOString(),
      authors: ["CMU02"],
      tags: project.techStack,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

// 프로젝트별 구조화된 데이터 생성
export function generateProjectStructuredData(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web Browser",
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.githubUrl,
    },
    programmingLanguage: project.techStack,
    dateCreated: "2024-12-01",
    dateModified: new Date().toISOString().split("T")[0],
    url: `${SITE_CONFIG.url}/projects/${project.id}`,
    ...(project.githubUrl && {
      codeRepository: project.githubUrl,
    }),
    ...(project.demoUrl && {
      downloadUrl: project.demoUrl,
    }),
    keywords: project.techStack.join(", "),
    inLanguage: "ko-KR",
  };
}
