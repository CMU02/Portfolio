// 딥다이브 상세 페이지 공통 타입 정의
// 각 프로젝트의 소단원(topic)은 배경→비교→구현→검증→한계점 5단계 구조를 따릅니다.

// ── 배경 섹션 ──
export interface BackgroundSection {
  summary?: string; // 결론 한 줄 요약 (섹션 헤더 바로 아래 표시)
  context: string; // 서비스 특성/맥락 설명
  painPoints: string[]; // 페인 포인트 목록
}

// ── 비교 섹션 ──
export interface ComparisonOption {
  name: string;
  pros: string[];
  cons: string[];
}

export interface ComparisonSection {
  summary?: string; // 결론 한 줄 요약
  options: ComparisonOption[];
  decision: string; // 최종 선택 및 논리적 근거
  tradeOff?: string; // 감수한 트레이드오프
}

// ── 구현 섹션 ──
export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
}

export interface ImplementationSection {
  summary?: string; // 결론 한 줄 요약
  description: string; // 구현 설명
  architecture?: string; // Mermaid 차트 코드 또는 이미지 S3 키
  architectureType?: "mermaid" | "image"; // 구조도 타입
  steps?: string[]; // 구현 단계
  codeSnippets?: CodeSnippet[];
}

// ── 검증 섹션 ──
export interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

export interface VerificationSection {
  summary?: string; // 결론 한 줄 요약
  description: string; // 검증 설명
  metrics?: MetricItem[]; // 수치 데이터
  evidence?: string[]; // 근거/증거
}

// ── 한계점 보완방향 섹션 ──
export interface LimitationItem {
  limitation: string; // 현재 한계점
  improvement: string; // 보완 방향
}

export interface LimitationsSection {
  summary?: string; // 결론 한 줄 요약
  items: LimitationItem[];
}

// ── 토픽 (소단원) ──
export interface DeepDiveTopic {
  id: string; // URL slug (라우팅에 사용)
  title: string; // 토픽 제목
  subtitle: string; // 토픽 부제목
  background: BackgroundSection;
  comparison: ComparisonSection;
  implementation: ImplementationSection;
  verification: VerificationSection;
  limitations: LimitationsSection;
}

// ── 핵심 지표 (상단 하이라이트 카드) ──
export interface HighlightItem {
  label: string;
  value: string;
  icon?: string; // lucide 아이콘 이름
}

// ── 우측 서브 정보 ──
export interface SideInfoLink {
  label: string;
  url?: string; // 외부 링크 (없으면 텍스트만 표시)
}

export interface SideInfoSection {
  title: string;
  items: SideInfoLink[];
}

// ── 섹션 키 → 표시 이름 매핑 ──
export const SECTION_LABELS = {
  background: "Problem",
  comparison: "Trade-off",
  implementation: "Architecture",
  verification: "Verification",
  limitations: "Retrospective",
} as const;

export type SectionKey = keyof typeof SECTION_LABELS;

// ── 프로젝트 딥다이브 데이터 ──
export interface ProjectDeepDive {
  projectId: string; // 기존 Project.id와 매핑
  title: string;
  description: string;
  period: string; // 프로젝트 기간
  highlights: HighlightItem[]; // 상단 핵심 지표
  sideInfo: SideInfoSection[]; // 우측 서브 정보
  topics: DeepDiveTopic[];
}
