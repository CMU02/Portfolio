// 기술 스택 데이터 - Bento Grid용
export interface TechItem {
  name: string;
  icon: string;
  tooltip?: string;
}

export interface TechCategory {
  id: string;
  color: string;
  items: TechItem[];
}

export const techStackData: Record<string, TechCategory> = {
  frontend: {
    id: "frontend",
    color: "tech-cyan",
    items: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  backend: {
    id: "backend",
    color: "tech-purple",
    items: [
      { name: "NestJS", icon: "nestjs", tooltip: "도메인 설계, 트랜잭션 관리" },
      { name: "Node.js", icon: "nodejs" },
      {
        name: "Spring Boot",
        icon: "spring",
        tooltip: "Java 기반 엔터프라이즈",
      },
      { name: "Python", icon: "python", tooltip: "FastAPI, RAG 구조 설계" },
    ],
  },
  database: {
    id: "database",
    color: "tech-green",
    items: [
      {
        name: "PostgreSQL",
        icon: "postgresql",
        tooltip: "pgvector 기반 RAG 구축 경험",
      },
      {
        name: "Redis",
        icon: "redis",
        tooltip: "조회 성능 80% 개선 / 실시간 채팅 구현",
      },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  devops: {
    id: "devops",
    color: "tech-yellow",
    items: [
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "aws", tooltip: "EC2 + Docker 기반 프로덕션 배포" },
      { name: "GitHub Actions", icon: "github" },
    ],
  },
};

// Hero 섹션 키워드 롤링용
export const techKeywords = [
  "Next.js",
  "NestJS",
  "Spring Boot",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Docker",
  "TypeScript",
];
