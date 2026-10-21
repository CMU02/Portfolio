// 딥다이브 아이콘 맵: 데이터의 이름/id/제목 → lucide 아이콘, 없는 키는 아이콘 없이 글자만
import {
  Award,
  Briefcase,
  CircleAlert,
  CircleCheck,
  CodeXml,
  DollarSign,
  FlaskConical,
  Images,
  Layers,
  Link,
  RotateCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

// HighlightItem.icon (data/projects/*-data.ts)
export const highlightIcons: Record<string, LucideIcon> = {
  DollarSign,
  Zap,
  ShieldCheck,
  CheckCircle: CircleCheck,
  Users,
};

// 본문 최상위 h2 id (편집기 표준 섹션)
export const sectionIcons: Record<string, LucideIcon> = {
  "section-background": CircleAlert,
  "section-comparison": Scale,
  "section-implementation": Layers,
  "section-verification": FlaskConical,
  "section-limitations": RotateCcw,
  "section-gallery": Images,
};

// SideInfoSection.title
export const infoIcons: Record<string, LucideIcon> = {
  역할: Briefcase,
  "기술 스택": CodeXml,
  "AI 도구 활용": Sparkles,
  "인증 / 자격": Award,
  "추가 자료": Link,
  스토어: Store,
};
