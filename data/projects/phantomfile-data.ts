import { ProjectDeepDive } from "./types";

// PhantomFile 딥다이브 상세 데이터
// 토픽 메타데이터만 둔다. 본문은 content/deepdive/<projectId>/<topicId>.json (Tiptap JSON)
export const phantomFileDeepDive: ProjectDeepDive = {
  projectId: "phantom-file",
  title: "Phantom File",
  description:
    "SNS 파일 공유 시 서버 영구 기록 및 만료 누락 문제를 해결하는 휘발성 보안 파일 공유 서비스",
  period: "2026.01.31 ~ 2026.02.17",
  highlights: [
    { label: "월 운영비", value: "$5 미만", icon: "DollarSign" },
    { label: "P99 응답 속도", value: "671ms", icon: "Zap" },
    { label: "장애 재처리 성공률", value: "100%", icon: "ShieldCheck" },
    { label: "요청 유실", value: "0건", icon: "CheckCircle" },
  ],
  sideInfo: [
    {
      title: "인증 / 자격",
      items: [
        {
          label: "AWS Solutions Architect Associate",
          url: "/certifications",
        },
      ],
    },
    {
      title: "AI 도구 활용",
      items: [
        { label: "Kiro IDE — 초기 구현 속도 향상" },
        { label: "AWS Terraform MCP — 인프라 보안 재점검" },
      ],
    },
    {
      title: "추가 자료",
      items: [
        {
          label: "GitHub Repository",
          url: "https://github.com/CMU02/phantom-file-web",
        },
        {
          label: "서비스 바로가기",
          url: "https://phantomfile.cmu02-studio.com",
        },
      ],
    },
  ],
  topics: [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 1. DynamoDB 선택 — 설계 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "dynamodb-selection",
      title: "DynamoDB 선택 - 설계 문서",
      subtitle:
        "1회성 파일 공유 서비스의 데이터 접근 패턴 분석과 DB 의사결정 과정",
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2. 이벤트 기반 후처리 파이프라인 — 설계 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "event-pipeline",
      title: "이벤트 기반 후처리 파이프라인 - 설계 문서",
      subtitle:
        "파일 만료 후 S3 삭제까지의 안정적인 비동기 파이프라인 설계 과정",
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. K6 부하 테스트 — 결과 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "performance-optimization",
      title: "K6 부하 테스트 - 결과 문서",
      subtitle: "Lambda 설정별 응답 분포 관찰과 서버리스 환경의 실측 성능 분석",
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 4. Terraform IaC 및 보안 강화 — 구성 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "terraform-iac",
      title: "Terraform IaC 및 보안 강화 - 구성 문서",
      subtitle: "인프라 코드화와 AI 생성 코드의 보안 검증 과정",
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 5. 인증 트러블슈팅 — 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "auth-troubleshooting",
      title: "인증 트러블슈팅 - 문서",
      subtitle:
        "Supabase JWT와 API Gateway 서명 알고리즘 불일치 원인 추적 및 해결 과정",
    },
  ],
};
