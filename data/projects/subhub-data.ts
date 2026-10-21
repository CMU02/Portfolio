import { ProjectDeepDive } from "./types";

// SubHub 딥다이브 상세 데이터
// 토픽 메타데이터만 둔다. 본문은 content/deepdive/<projectId>/<topicId>.json (Tiptap JSON)
export const subhubDeepDive: ProjectDeepDive = {
  projectId: "subhub",
  title: "SubHub",
  description:
    "오프라인 우선 설계 + OCR 자동 입력 기반 구독 관리 앱 (Google Play 출시)",
  period: "2025.09.30 ~ 2026.01.18",
  highlights: [
    { label: "토큰 절감률", value: "97%", icon: "Zap" },
    { label: "입력 필드 축소", value: "9→4개", icon: "CheckCircle" },
    { label: "인식 정확도", value: "90%+", icon: "ShieldCheck" },
    { label: "오프라인 동작", value: "100%", icon: "CheckCircle" },
  ],
  sideInfo: [
    {
      title: "스토어",
      items: [
        {
          label: "Google Play Store",
          url: "https://play.google.com/store/apps/details?id=com.hyeonjun1968.SubHub",
        },
      ],
    },
    {
      title: "기술 스택",
      items: [
        { label: "React Native + Expo" },
        { label: "OpenAI GPT-4o Vision" },
        { label: "AsyncStorage" },
        { label: "TypeScript" },
      ],
    },
    {
      title: "AI 도구 활용",
      items: [
        {
          label:
            "Kiro IDE Specs — OCR 파이프라인·초기 UI 구현 초안을 빠르게 개발",
        },
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
          url: "https://github.com/CMU02/SubHub",
        },
      ],
    },
  ],
  topics: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 1. OCR 모델 벤치마킹 — 비교 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "ocr-model-selection",
      title: "OCR 모델 벤치마킹 - 비교 문서",
      subtitle:
        "영수증 자동 입력을 위한 5개 Vision 모델 비교 테스트와 최종 선택 과정",
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2. 프롬프트 최적화 — 과정 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "prompt-engineering",
      title: "프롬프트 최적화 - 과정 문서",
      subtitle:
        "25,861 → 730~850 토큰으로 97% 절감한 4단계 최적화 과정과 정확도 유지 검증",
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. AI 개발 도구 활용 방식 — 워크플로우 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "ai-dev-workflow",
      title: "AI 개발 도구 활용 방식 — 워크플로우 문서",
      subtitle: "Kiro IDE를 활용한 개발 워크플로우와 AI 생성 코드 검증 과정",
    },
  ],
};
