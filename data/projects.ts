// 프로젝트 데이터
export interface Project {
  id: string;
  title: string;
  description: string;
  techHighlights: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  architectureImage?: string;
  erdImage?: string;
}

export const projectsData: Project[] = [
  {
    id: "rag-chat",
    title: "RAG 기반 대화 시스템",
    description:
      "Pinecone + pgvector를 활용한 검색 증강 생성(RAG) 기반 AI 대화 시스템",
    techHighlights: [
      "pgvector로 검색 정확도 개선 (Embedding 기반)",
      "Redis Pub/Sub WebSocket 실시간 채팅",
      "트랜잭션 격리 수준 조절",
    ],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Pinecone"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "realtime-platform",
    title: "실시간 협업 플랫폼",
    description: "Redis Pub/Sub 기반 실시간 동기화 및 협업 기능 구현",
    techHighlights: [
      "Redis Pub/Sub WebSocket 채팅",
      "인덱스 설계 및 Join 최적화",
      "Docker 기반 배포 자동화",
    ],
    techStack: ["React", "Spring Boot", "PostgreSQL", "Redis", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "serverless-form",
    title: "Server Actions 기반 폼 시스템",
    description:
      "Next.js Server Actions를 활용한 무상태 API 구조의 폼 처리 시스템",
    techHighlights: [
      "RSC + Server Actions 기반 무상태 API",
      "Edge-friendly 아키텍처",
      "실시간 유효성 검증",
    ],
    techStack: ["Next.js", "Supabase", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
  },
];
