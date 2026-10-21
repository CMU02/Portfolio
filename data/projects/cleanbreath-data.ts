import { ProjectDeepDive } from "./types";

// CleanBreath 딥다이브 상세 데이터
// 토픽 메타데이터만 둔다. 본문은 content/deepdive/<projectId>/<topicId>.json (Tiptap JSON)
export const cleanbreathDeepDive: ProjectDeepDive = {
  projectId: "cleanbreath",
  title: "CleanBreath",
  description:
    "안양시 금연·흡연구역을 지도 폴리곤으로 시각화하는 웹 서비스 (6인 팀 프로젝트, PL/백엔드 담당)",
  period: "2024.07.26 ~ 현재 유지보수",
  highlights: [
    { label: "쿼리 응답 개선", value: "87%↓", icon: "Zap" },
    { label: "API 호출 절감", value: "95%↓", icon: "ShieldCheck" },
    { label: "Lighthouse 성능", value: "74→91", icon: "CheckCircle" },
    { label: "팀 규모", value: "6인", icon: "Users" },
  ],
  sideInfo: [
    {
      title: "역할",
      items: [
        { label: "PL / 백엔드 개발" },
        { label: "프론트엔드 유지보수 병행" },
      ],
    },
    {
      title: "기술 스택",
      items: [
        { label: "Spring Boot + JPA" },
        { label: "MySQL (복합 인덱스)" },
        { label: "Next.js + TypeScript" },
        { label: "Kakao Map SDK" },
        { label: "TanStack Query + IndexedDB" },
      ],
    },
    {
      title: "AI 도구 활용",
      items: [
        {
          label:
            "Kiro IDE — 유지보수 시 오류 재현 → 원인 분석 → 수정 → 검증 에이전틱 워크플로우로 문제 해결",
        },
      ],
    },
    {
      title: "추가 자료",
      items: [
        {
          label: "GitHub Repository",
          url: "https://github.com/CMU02/cleanbreath-frontend",
        },
        {
          label: "서비스 바로가기",
          url: "https://cleanbreath.cmu02-studio.com",
        },
      ],
    },
  ],
  topics: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 1. 현장 답사 및 데이터 수집 툴 개발
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "field-survey-data-collection",
      title: "현장 답사 및 데이터 수집 툴 개발",
      subtitle:
        "공공 데이터 한계를 극복하기 위한 직접 현장 답사와 수집 툴 설계",
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 쿼리 최적화 — 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "query-optimization",
      title: "쿼리 최적화 - 문서",
      subtitle:
        "서비스 출시 후 발견한 풀 스캔 병목의 원인 분석과 복합 인덱스 재설계 과정",
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. 2중 캐싱 기반 데이터 효율화
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "caching-strategy",
      title: "2중 캐싱 기반 데이터 효율화",
      subtitle:
        "IndexedDB + TanStack Query 조합으로 API 호출 95% 절감을 달성한 캐싱 전략",
    },
  ],
};
