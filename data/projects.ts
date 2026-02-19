// 프로젝트 데이터
export interface TechReason {
  tech: string;
  reason: string;
  solved: string;
}

// 문제 해결 사례
export interface TroubleShooting {
  title: string;
  problem: string;
  cause: string;
  solution: string;
  result: string;
}

// SEO 성과
export interface SeoResult {
  description: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    change: string;
  }[];
  keywords: {
    before: string[];
    after: string[];
  };
  images: {
    before: string[];
    after: string[];
  };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  type: "team" | "personal";
  techStack: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  playStoreUrl?: string; // Google Play Store URL
  appStoreUrl?: string; // Apple App Store URL
  // 상세 정보
  problem?: string; // 무슨 문제를 해결한 프로젝트인가?
  motivation?: string; // 동기 및 문제정의
  techReasons?: TechReason[]; // 기술 선택 이유
  myContributions?: string[]; // 내가 직접 만든 부분
  images?: {
    erd?: string[]; // ERD 이미지 경로들
    architecture?: string[]; // 아키텍처 다이어그램
    screenshots?: string[]; // 스크린샷
    fieldSurvey?: string; // 현장 조사 이미지
    uiDesign?: {
      before?: string; // 개선 전 UI
      after?: string; // 개선 후 UI
    };
    // 모바일 앱 전용 이미지
    appIcon?: string; // 앱 아이콘
    logo?: string[]; // 로고 이미지들
    storeAssets?: {
      featureGraphic?: string; // 스토어 대표 이미지
      introScreens?: string[]; // 소개 화면들
    };
    mobileScreenshots?: {
      android?: string[]; // Android 스크린샷
      ios?: string[]; // iOS 스크린샷
    };
    // 브랜드 컬러
    brandColors?: {
      primary?: string; // Primary 컬러 (hex)
      secondary?: string; // Secondary 컬러 (hex)
    };
  };
  expectedEffects?: string[]; // 기대 효과
  troubleShooting?: TroubleShooting[]; // 문제 해결 사례
  seoResult?: SeoResult; // SEO 성과
}

export const projectsData: Project[] = [
  {
    id: "phantom-file",
    title: "Phantom File",
    subtitle: "안전하고 빠른 파일 공유 서비스",
    description:
      "Pre-signed URL 기반의 안전한 임시 파일 공유 플랫폼. AWS 서버리스 아키텍처로 구축되어 확장 가능하고 비용 효율적인 파일 공유 경험을 제공합니다.",
    role: "Full Stack Developer",
    type: "personal",
    techStack: [
      "TypeScript",
      "AWS Lambda",
      "DynamoDB",
      "S3",
      "API Gateway",
      "Terraform",
      "React/Next.js",
      "Supabase",
    ],
    features: [
      "Pre-signed URL 기반 보안 파일 공유 시스템",
      "Lambda 함수 기반 자동화된 파일 생명주기 관리",
      "DynamoDB를 활용한 메타데이터 및 접근 로그 관리",
      "EventBridge + CloudWatch를 통한 자동 파일 정리 (3 AM 크론)",
      "Supabase Auth 기반 사용자 인증 및 권한 관리",
      "Terraform IaC로 인프라 코드화 및 버전 관리",
      "React Native/Expo 기반 Android 모바일 앱",
    ],
    githubUrl: "https://github.com/CMU02/phantom-file",
    demoUrl: "https://phantomfile.cmu02-studio.com",
    problem:
      "기존 파일 공유 서비스는 보안이 취약하거나, 파일이 영구적으로 저장되어 개인정보 유출 위험이 있었습니다.",
    motivation:
      "임시 파일 공유가 필요한 상황에서 보안과 편의성을 모두 갖춘 서비스를 만들고 싶었습니다. AWS 서버리스 아키텍처를 활용해 비용 효율적이면서도 확장 가능한 시스템을 구축하고자 했습니다.",
    techReasons: [
      {
        tech: "AWS Lambda",
        reason:
          "서버리스 아키텍처로 운영 비용을 최소화하고 자동 확장을 위해 선택했습니다.",
        solved:
          "파일 업로드/다운로드/삭제 기능을 Lambda 함수로 구현하여 사용량 기반 과금으로 비용을 절감했습니다.",
      },
      {
        tech: "Terraform",
        reason: "AWS 인프라를 코드로 관리하고 버전 관리를 위해 도입했습니다.",
        solved:
          "복잡한 AWS 리소스를 모듈화하여 재사용 가능하고 일관된 인프라 배포가 가능해졌습니다.",
      },
      {
        tech: "DynamoDB",
        reason:
          "파일 메타데이터와 접근 로그를 빠르게 저장하고 조회하기 위해 선택했습니다.",
        solved:
          "서버리스 환경에 최적화된 NoSQL 데이터베이스로 낮은 지연 시간과 자동 확장을 달성했습니다.",
      },
      {
        tech: "Supabase",
        reason: "빠른 사용자 인증 시스템 구축을 위해 도입했습니다.",
        solved:
          "Supabase Auth로 소셜 로그인과 이메일 인증을 쉽게 구현하고 권한 관리를 효율적으로 처리했습니다.",
      },
    ],
    myContributions: [
      "AWS 서버리스 아키텍처 전체 설계 및 구현",
      "Terraform으로 전체 AWS 인프라 코드화",
      "Lambda 함수 기반 파일 업로드/다운로드/삭제 API 개발",
      "EventBridge 크론으로 새벽 3시 자동 파일 정리 구현",
      "Next.js 기반 웹 프론트엔드 개발",
      "React Native/Expo 기반 Android 앱 개발",
      "CloudWatch를 통한 실시간 모니터링 및 로깅 설정",
    ],
    expectedEffects: [
      "보안 강화: Pre-signed URL과 임시 파일로 데이터 유출 위험 최소화",
      "비용 효율성: 서버리스 아키텍처로 사용량 기반 과금",
      "자동화된 운영: EventBridge 크론으로 파일 정리 자동화",
      "확장성: AWS 서버리스로 트래픽 증가에 자동 대응",
    ],
  },
  {
    id: "streamx",
    title: "StreamX",
    subtitle: "당신만의 맞춤 AI 스트리머 플랫폼",
    description:
      "사용자가 원하는 시간과 취향에 맞춰 AI 스트리머와 실시간 소통 및 교감을 나눌 수 있는 혁신적인 플랫폼. Unity 기반 3D 인터랙티브 환경과 Spring Boot 백엔드로 개인화된 스트리밍 경험을 제공합니다.",
    role: "Backend Developer",
    type: "team",
    techStack: [
      "Spring Boot",
      "Unity",
      "AWS",
      "LLM",
      "TTS",
      "Bone-based Rigging",
    ],
    features: [
      "사용자 행동 데이터 분석 기반 맞춤형 AI 스트리머 제공",
      "LLM + TTS 기술을 활용한 실시간 1:1 자연어 소통",
      "Unity6 기반 몰입도 높은 3D 인터랙티브 콘텐츠 구현",
      "안정적인 사용자 데이터 관리 및 트랜잭션 처리",
    ],
    githubUrl: "https://github.com/CMU02/StreamX-BE",
    problem:
      "기존 스트리밍 서비스는 방송 시간이 정해져 있어 원하는 시간에 컨텐츠를 즐기기 어렵고, 유명 스트리머와의 직접 소통이 거의 불가능하여 일방적인 시청만 가능했습니다.",
    motivation:
      "사용자의 다양한 취향과 라이프스타일을 분석하여 최적의 AI 스트리머를 제공하고, 직접 커스터마이징할 수 있는 마켓플레이스를 구축하여 몰입도 높은 경험을 제공하고자 했습니다.",
    techReasons: [
      {
        tech: "Spring Boot",
        reason:
          "안정적이고 효율적인 백엔드 서비스와 트랜잭션 처리를 위해 선택했습니다.",
        solved:
          "사용자 정보 관리, AI 스트리머 데이터 처리, 마켓플레이스 거래 등 핵심 백엔드 서비스를 안정적으로 제공했습니다.",
      },
      {
        tech: "Unity",
        reason:
          "AI 스트리머의 실시간 커스터마이징과 3D 인터랙티브 환경 구현을 위해 도입했습니다.",
        solved:
          "Unity6 엔진으로 몰입도 높은 3D 콘텐츠와 실시간 소통 기능을 구현했습니다.",
      },
      {
        tech: "LLM + TTS",
        reason:
          "자연스러운 실시간 대화와 음성 합성을 위해 대규모 언어 모델과 TTS 기술을 결합했습니다.",
        solved:
          "AI 스트리머가 사용자의 대화 패턴을 분석하고 자연스러운 목소리로 실시간 응답할 수 있게 되었습니다.",
      },
    ],
    myContributions: [
      "Spring Boot 기반 RESTful API 설계 및 구현",
      "사용자 행동 데이터 분석 로직 개발",
      "마켓플레이스 트랜잭션 처리 및 데이터 무결성 관리",
      "AWS 인프라 구축 및 배포 환경 설정",
    ],
  },
  {
    id: "subhub",
    title: "SubHub",
    subtitle: "구독 서비스 통합 관리 앱",
    description:
      "파편화된 구독 서비스를 한 곳에서 관리하고 시각화하는 모바일 애플리케이션. 로컬 저장소를 활용한 오프라인 우선 설계로 빠르고 안전한 데이터 관리를 제공합니다.",
    role: "Full Stack Developer",
    type: "personal",
    techStack: ["React Native", "Expo", "AsyncStorage", "TypeScript"],
    features: [
      "여러 구독 서비스 통합 관리",
      "구독 비용 시각화 대시보드",
      "오프라인 우선 데이터 저장",
      "카메라를 통한 구독 서비스 로고 촬영",
      "구독 갱신일 알림 기능",
    ],
    problem:
      "넷플릭스, 유튜브 프리미엄, 스포티파이 등 여러 구독 서비스를 사용하면서 총 지출 금액과 갱신일을 파악하기 어려웠습니다.",
    motivation:
      "파편화된 구독 정보를 한 곳에서 관리하고, 개인정보 보호를 위해 모든 데이터를 기기 내에서만 저장하는 안전한 앱을 만들고 싶었습니다.",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.hyeonjun1968.SubHub",
    techReasons: [
      {
        tech: "React Native",
        reason:
          "iOS와 Android 모두 지원하는 크로스 플랫폼 앱을 빠르게 개발하기 위해 선택했습니다.",
        solved:
          "하나의 코드베이스로 두 플랫폼에서 동작하는 앱을 효율적으로 개발했습니다.",
      },
      {
        tech: "AsyncStorage",
        reason:
          "개인정보 보호와 오프라인 우선 설계를 위해 로컬 저장소를 선택했습니다.",
        solved:
          "사용자 데이터가 외부 서버로 전송되지 않아 개인정보를 안전하게 보호하고, 네트워크 없이도 앱을 사용할 수 있게 되었습니다.",
      },
      {
        tech: "Expo",
        reason: "카메라 기능과 빠른 개발 환경 설정을 위해 Expo를 활용했습니다.",
        solved:
          "카메라를 통한 구독 서비스 로고 촬영 기능을 쉽게 구현하고, 빠른 프로토타이핑이 가능했습니다.",
      },
    ],
    myContributions: [
      "전체 앱 아키텍처 설계 및 구현",
      "구독 비용 시각화 대시보드 UI/UX 설계",
      "AsyncStorage 기반 로컬 데이터 관리 시스템 구현",
      "카메라 기능을 활용한 구독 서비스 등록 기능 개발",
      "Google Play Store 배포",
    ],
    expectedEffects: [
      "구독 지출 파악: 흩어진 구독 서비스를 한눈에 확인하여 월별 총 지출 금액을 쉽게 파악",
      "갱신일 관리: 구독 갱신일 알림으로 불필요한 자동 결제 방지",
      "개인정보 보호: 모든 데이터가 기기 내에서만 저장되어 외부 유출 위험 없음",
      "오프라인 사용: 네트워크 연결 없이도 언제든지 구독 정보 확인 가능",
    ],
    images: {
      appIcon: "subhub/app_icon.png",
      logo: ["subhub/logo_name.png", "subhub/logo_name_dark.png"],
      storeAssets: {
        featureGraphic: "subhub/graph_image.png",
        introScreens: [
          "subhub/intro_service_1.png",
          "subhub/intro_service_2.png",
          "subhub/intro_service_3.png",
          "subhub/intro_service_4.png",
          "subhub/intro_service_5.png",
          "subhub/intro_service_6.png",
        ],
      },
      mobileScreenshots: {
        android: ["subhub/ss-android-1.jpg", "subhub/ss-android-2.jpg"],
        ios: [
          "subhub/ss-iphone16-pro-1.png",
          "subhub/ss-iphone16-pro-2.png",
          "subhub/ss-iphone16-pro-3.png",
          "subhub/ss-iphone16-pro-4.png",
          "subhub/ss-iphone16-pro-5.png",
        ],
      },
      brandColors: {
        primary: "#1FD1A7",
        secondary: "#19376D",
      },
    },
  },
  {
    id: "cleanbreath",
    title: "CleanBreath",
    subtitle: "안양시 금연·흡연구역 시각화 서비스",
    description:
      "안양시 내의 명확하게 구분되어 있지 않은 금연구역 및 흡연구역을 시각화하여, 흡연자와 비흡연자 간의 갈등을 해결하는 웹 애플리케이션입니다. 복잡한 법령과 조례를 직관적인 지도 기반 UI로 제공합니다.",
    role: "Full Stack Developer",
    type: "team",
    techStack: [
      "TypeScript",
      "React",
      "Java",
      "Spring Boot",
      "MySQL",
      "Kakao Map API",
    ],
    features: [
      "Kakao Map API 기반 금연·흡연구역 실시간 시각화",
      "사용자 위치 기반 반경 200m 이내 구역 정보 제공",
      "관리자 페이지를 통한 구역 데이터 실시간 업데이트",
      "모바일 친화적 반응형 웹 디자인",
      "공간 인덱스를 활용한 효율적인 위치 기반 검색",
      "금연구역 검증 및 피드백 시스템",
    ],
    githubUrl: "https://github.com/CMU02/cleanbreath-frontend",
    demoUrl: "https://cleanbreath.cmu02-studio.com",
    problem:
      "안양시의 금연구역과 흡연구역이 명확하게 구분되어 있지 않아 흡연자와 비흡연자 간의 갈등이 발생하고 있습니다. 국민건강증진법과 안양시 조례는 복잡하고 이해하기 어려운 형태로 정의되어 있으며, 지자체의 홍보에도 불구하고 시민들에게 제대로 전달되지 않고 있습니다.",
    motivation:
      "법령과 조례는 시민들이 이해하기 어렵지만, 이를 직관적인 시각화로 쉽게 전달하는 서비스를 제공하고자 했습니다. 특히 안양시에 한정된 금연·흡연구역 정보를 지속적으로 업데이트하며, 시민들이 이해하기 쉽게 정보를 제공하는 것이 핵심입니다.",
    techReasons: [
      {
        tech: "React",
        reason:
          "Kakao Map API와의 원활한 연동과 실시간 인터랙티브 UI 구현을 위해 선택했습니다.",
        solved:
          "컴포넌트 기반 아키텍처로 지도 UI, 검색 기능, 필터링 등을 모듈화하여 유지보수성을 높였습니다.",
      },
      {
        tech: "Kakao Map API",
        reason:
          "한국 지역에 최적화된 지도 서비스와 정확한 위치 정보를 제공하기 위해 선택했습니다.",
        solved:
          "안양시 금연·흡연구역을 폴리곤과 마커로 시각화하여 사용자가 직관적으로 이해할 수 있게 했습니다.",
      },
      {
        tech: "Spring Boot",
        reason:
          "안정적인 REST API 서버와 관리자 기능, 데이터 관리 시스템 구현을 위해 도입했습니다.",
        solved:
          "금연·흡연구역 CRUD API, 관리자 인증 시스템, 실시간 데이터 업데이트 기능을 안정적으로 구축했습니다.",
      },
      {
        tech: "MySQL",
        reason:
          "위치 기반 데이터 저장과 공간 인덱스를 활용한 효율적인 검색을 위해 선택했습니다.",
        solved:
          "Spatial Index를 활용하여 사용자 위치 기반 반경 200m 이내 금연·흡연구역 검색을 빠르게 처리했습니다.",
      },
      {
        tech: "TypeScript",
        reason:
          "타입 안정성을 확보하고 대규모 프로젝트의 유지보수성을 높이기 위해 도입했습니다.",
        solved:
          "컴파일 타임에 타입 오류를 잡아내어 런타임 에러를 줄이고, 코드 품질을 향상시켰습니다.",
      },
    ],
    myContributions: [
      "React + TypeScript 기반 프론트엔드 전체 아키텍처 설계 및 구현",
      "Kakao Map API 연동 및 금연·흡연구역 폴리곤 시각화 구현",
      "사용자 위치 기반 반경 200m 검색 기능 개발",
      "Spring Boot REST API 설계 및 구현",
      "MySQL Spatial Index를 활용한 위치 기반 쿼리 최적화",
      "관리자 페이지 개발 및 JWT 기반 인증 시스템 구축",
      "모바일 반응형 UI/UX 설계 및 구현",
    ],
    expectedEffects: [
      "흡연자 편의 제공: 복잡한 법령 및 조례에 의한 혼란을 줄이고, 명확한 정보를 기반으로 행동할 수 있도록 지원",
      "간접흡연 피해 감소: 흡연구역 정보를 명확하게 제공하여 지정된 구역에서만 흡연하도록 유도",
      "공공장소 갈등 해소: 흡연자와 비흡연자 간의 갈등을 줄이고 쾌적한 환경 조성",
      "실시간 정보 제공: 지자체의 조례 변경 사항을 신속하게 반영하여 최신 정보 제공",
      "서울 서초구 사례 참고: QR 안내판 사업에서 금연구역 내 흡연이 약 25% 감소한 성과를 목표로 함",
    ],
    images: {
      erd: ["clean-breath/erd_latest.png"],
      screenshots: [
        "clean-breath/clean_breath_01.png",
        "clean-breath/clean_breath_02.png",
        "clean-breath/clean_breath_03.png",
      ],
      fieldSurvey: "clean-breath/field_survey_area.png",
      uiDesign: {
        before: "clean-breath/cleanbreath_before.png",
        after: "clean-breath/cleanbreath_after.png",
      },
    },
    troubleShooting: [
      {
        title: "SSL 인증서 만료로 인한 서버 장애",
        problem:
          "10월 30일 강의 중 서버 장애가 발생하여 프론트엔드에서 API를 제대로 가져오지 못하는 상황이 발생했습니다.",
        cause: "서버의 SSL 인증서가 만료되어 HTTPS 연결이 실패하고 있었습니다.",
        solution:
          "즉시 수동으로 SSL 인증서를 갱신하여 문제를 해결했습니다. 이후 매번 수동 갱신의 번거로움을 해결하기 위해 자동 갱신 스크립트를 작성하고, 크론탭에 매월 1일 새벽 3시에 자동 실행되도록 설정했습니다.",
        result:
          "테스트 결과 스크립트가 성공적으로 실행되는 것을 확인했으며, 이후 SSL 인증서 만료로 인한 장애가 재발하지 않았습니다.",
      },
    ],
    seoResult: {
      description:
        "구글 검색에서 랜딩 페이지와 메인 페이지가 대부분 상위권에 노출되어 1페이지에 위치하게 되었습니다.",
      metrics: [
        {
          label: "총 클릭 수",
          before: "59",
          after: "84",
          change: "+42.4%",
        },
        {
          label: "총 노출 수",
          before: "111",
          after: "250",
          change: "+125.2%",
        },
        {
          label: "평균 CTR",
          before: "53.2%",
          after: "33.6%",
          change: "-19.6%p (새 키워드 추가로 인한 자연스러운 하락)",
        },
        {
          label: "평균 게재 순위",
          before: "1.0",
          after: "2.8",
          change: "다양한 키워드 노출로 인한 변동",
        },
      ],
      keywords: {
        before: ["cleanbreath"],
        after: [
          "안양시 흡연구역",
          "안양시 금연구역",
          "흡연구역 찾기",
          "금연 팁",
          "cleanbreath",
        ],
      },
      images: {
        before: [
          "clean-breath/google_search_console_before.webp",
          "clean-breath/google_search_console_keyword_before.webp",
        ],
        after: [
          "clean-breath/google_search_console_after.webp",
          "clean-breath/google_search_console_keyword_after.webp",
        ],
      },
    },
  },
];
