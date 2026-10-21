// 딥다이브 상세 페이지 공통 타입 정의
// 토픽 본문은 content/deepdive/*.json(Tiptap)이고, 여기에는 메타데이터와 블록 attrs 타입만 둔다.

// ── 블록 attrs 데이터 ──
export interface ComparisonOption {
  name: string;
  pros: string[];
  cons: string[];
}

export interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

export interface LimitationItem {
  limitation: string; // 현재 한계점
  improvement: string; // 보완 방향
}

// ── 갤러리 ──
export interface GalleryItem {
  s3Key: string; // S3 이미지 키
  caption: string; // 사진 설명
  category?: string; // 카테고리 레이블 (선택)
}

// ── 토픽 (소단원) ──
export interface DeepDiveTopic {
  id: string; // URL slug (라우팅에 사용)
  title: string; // 토픽 제목
  subtitle: string; // 토픽 부제목
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

// ── 블록 본문(Tiptap) 공유 타입 ──
// 본문은 content/deepdive/<projectId>/<topicId>.json(Tiptap doc JSON)에 있고,
// 아래 타입은 커스텀 블록 노드의 attrs와 렌더러 props를 겸한다.

// 목차 항목: 문서 최상위 h2에서 추출
export interface TocItem {
  id: string; // h2 id (앵커/스크롤 감지용)
  label: string; // h2 텍스트
}

export interface ComparisonAttrs {
  options: ComparisonOption[];
}

export interface ArchitectureImageAttrs {
  s3Key: string;
  alt: string;
  width: number; // 원본 픽셀 크기 (로딩 전 비율 확보용)
  height: number;
}

export interface MermaidAttrs {
  chart: string;
}

export interface MetricGridAttrs {
  items: MetricItem[];
}

export interface LimitationsAttrs {
  items: LimitationItem[];
}

export interface GalleryAttrs {
  items: GalleryItem[];
}

export interface VideoAttrs {
  webmKey: string; // S3 키 (webm, 우선 소스)
  mp4Key: string; // S3 키 (mp4, 폴백 소스)
  posterKey: string; // S3 키 (포스터 이미지)
  caption: string;
}
