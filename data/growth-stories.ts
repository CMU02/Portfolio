// 성장 스토리 데이터
export interface GrowthStory {
  id: string;
  title: string;
  project: string;
  challenge: string;
  approach: string[];
  learned: string;
  metrics?: string; // 정량적 성과
}

export const growthStoriesData: GrowthStory[] = [
  {
    id: "serverless-architecture",
    title: "서버리스 아키텍처 설계",
    project: "Phantom File 프로젝트",
    challenge:
      "보안 파일 공유 서비스를 비용 효율적이면서도 확장 가능하게 구축해야 했습니다. 파일 삭제 실패 시에도 데이터 유실 없이 재처리할 수 있는 안정적인 시스템이 필요했습니다.",
    approach: [
      "AWS Lambda, DynamoDB, S3로 서버리스 아키텍처 구성",
      "DynamoDB TTL → Streams → EventBridge Pipes → SQS 이벤트 기반 파일 삭제 파이프라인 구현",
      "Main SQS Redrive Policy + DLQ로 실패 메시지 격리 및 재처리 흐름 설계",
      "Terraform으로 전체 인프라 코드화 및 버전 관리",
    ],
    learned:
      "이벤트 기반 아키텍처의 강력함을 체감했습니다. 크론 없이도 정확한 시점에 작업을 수행하고, DLQ를 통해 실패를 안전하게 처리하는 방법을 배웠습니다. IaC로 인프라를 관리하면 재현 가능하고 일관된 배포가 가능하다는 것을 깨달았습니다.",
    metrics: "API 호출 50% 감소, 비용 효율적인 사용량 기반 과금 달성",
  },
  {
    id: "production-app-deployment",
    title: "프로덕션 앱 배포 경험",
    project: "SubHub 프로젝트",
    challenge:
      "개발 환경에서 잘 동작하던 앱을 실제 사용자가 사용할 수 있도록 Google Play Store에 배포해야 했습니다. 개인정보 보호와 오프라인 우선 설계를 구현하면서도 사용자 경험을 해치지 않아야 했습니다.",
    approach: [
      "AsyncStorage 기반 오프라인 우선 아키텍처 구현",
      "Google Play Store 배포 가이드라인 준수 (개인정보 정책, 스크린샷, 앱 설명)",
      "크로스 플랫폼 테스트 (iOS/Android) 및 디바이스별 UI 최적화",
      "앱 아이콘, 로고, 브랜드 컬러 디자인 및 적용",
    ],
    learned:
      "실제 프로덕션 환경에 앱을 배포하는 전체 과정을 경험했습니다. 스토어 심사 기준, 개인정보 정책 작성, 스크린샷 최적화 등 개발 외적인 부분도 중요하다는 것을 배웠습니다. 오프라인 우선 설계로 네트워크 없이도 앱이 동작하게 만드는 것이 사용자 경험에 큰 영향을 준다는 것을 깨달았습니다.",
  },
  {
    id: "seo-optimization",
    title: "SEO 최적화와 검색 노출",
    project: "CleanBreath 프로젝트",
    challenge:
      "안양시 금연구역이라는 니치한 주제로 검색 엔진에서 상위 노출되어 실제 사용자에게 도달해야 했습니다. 초기에는 브랜드명으로만 검색되었고, 관련 키워드로는 노출되지 않았습니다.",
    approach: [
      "Google Search Console 연동 및 키워드 분석",
      "메타 태그, 구조화된 데이터(JSON-LD) 최적화",
      "콘텐츠 키워드 전략 수립 ('안양시 흡연구역', '금연구역 찾기' 등)",
      "검색 순위 추적 및 지속적인 콘텐츠 개선",
    ],
    learned:
      "SEO는 단순히 메타 태그를 추가하는 것이 아니라, 사용자가 실제로 검색하는 키워드를 분석하고 콘텐츠를 최적화하는 전략적 과정이라는 것을 배웠습니다. 검색 노출이 늘어나면서 실제 사용자 유입이 증가하는 것을 보며 SEO의 중요성을 체감했습니다.",
    metrics: "클릭 수 +42.4%, 노출 수 +125.2%, 주요 키워드 1페이지 노출 달성",
  },
];
