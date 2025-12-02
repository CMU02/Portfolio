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
  };
  expectedEffects?: string[]; // 기대 효과
  troubleShooting?: TroubleShooting[]; // 문제 해결 사례
  seoResult?: SeoResult; // SEO 성과
}

export const projectsData: Project[] = [
  {
    id: "study-swipe",
    title: "Study Swipe",
    subtitle: "AI 기반 스터디 매칭 플랫폼",
    description:
      "NestJS 기반 백엔드 API. AI 설문조사와 가중치 점수 시스템으로 최적의 스터디 파트너를 매칭해주는 서비스입니다.",
    role: "Backend Developer",
    type: "team",
    techStack: ["NestJS", "TypeScript", "PostgreSQL", "OpenAI API", "Docker"],
    features: [
      "AI 기반 맞춤형 설문 생성 시스템",
      "태그 중복 검출 및 정규화 로직",
      "가중치 기반 점수 산출 알고리즘 (기초/경험/응용)",
      "GitHub Actions CI/CD 파이프라인 구축",
    ],
    githubUrl: "https://github.com/CMU02/Study-Swipe-BE",
    problem:
      "기존 스터디 매칭 서비스는 단순 키워드 기반으로 매칭하여 실제 학습 스타일이나 목표가 맞지 않는 파트너와 연결되는 문제가 있었습니다.",
    motivation:
      "스터디 그룹을 찾을 때 단순히 '같은 주제'가 아닌, 학습 방식, 목표 수준, 가용 시간 등 다양한 요소를 고려한 정밀한 매칭이 필요하다고 느꼈습니다.",
    techReasons: [
      {
        tech: "NestJS",
        reason:
          "모듈 기반 아키텍처로 확장성 있는 백엔드 구조를 설계하기 위해 선택했습니다.",
        solved:
          "설문, 매칭, 사용자 관리 등 도메인별 모듈 분리로 유지보수성을 높였습니다.",
      },
      {
        tech: "OpenAI API",
        reason:
          "사용자 응답을 분석하여 맞춤형 설문을 동적으로 생성하기 위해 도입했습니다.",
        solved:
          "AI가 사용자의 학습 목표와 스타일을 파악하여 더 정확한 매칭 데이터를 수집할 수 있게 되었습니다.",
      },
      {
        tech: "PostgreSQL",
        reason:
          "복잡한 매칭 쿼리와 가중치 계산을 위한 관계형 데이터베이스가 필요했습니다.",
        solved:
          "다중 조건 기반 점수 산출 쿼리를 효율적으로 처리할 수 있었습니다.",
      },
    ],
    myContributions: [
      "AI 설문 생성 시스템 전체 설계 및 구현",
      "가중치 기반 매칭 알고리즘 개발 (기초 30%, 경험 40%, 응용 30%)",
      "태그 정규화 로직 구현으로 중복 태그 문제 해결",
      "GitHub Actions CI/CD 파이프라인 구축",
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
      {
        tech: "Remix",
        reason:
          "SSR을 활용한 빠른 로딩 속도와 사용자 친화적인 웹 마켓플레이스 구축을 위해 선택했습니다.",
        solved:
          "캐릭터 구매 및 판매가 가능한 웹 기반 마켓플레이스를 빠르고 효율적으로 구축했습니다.",
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
      "파편화된 구독 서비스를 한 곳에서 관리하고 시각화하는 모바일 애플리케이션. 구독 알림 기능을 제공합니다.",
    role: "Full Stack Developer",
    type: "personal",
    techStack: ["React Native", "Expo", "Supabase", "TypeScript"],
    features: [
      "여러 구독 서비스 통합 관리",
      "구독 비용 시각화 대시보드",
      "갱신일 알림 푸시 기능",
      "Supabase 실시간 데이터 동기화",
    ],
    problem:
      "넷플릭스, 유튜브 프리미엄, 스포티파이 등 여러 구독 서비스를 사용하면서 총 지출 금액과 갱신일을 파악하기 어려웠습니다.",
    motivation:
      "파편화된 구독 정보를 한 곳에서 관리하고, 갱신일 전에 알림을 받아 불필요한 지출을 줄이고 싶었습니다.",
    techReasons: [
      {
        tech: "React Native",
        reason:
          "iOS와 Android 모두 지원하는 크로스 플랫폼 앱을 빠르게 개발하기 위해 선택했습니다.",
        solved:
          "하나의 코드베이스로 두 플랫폼에서 동작하는 앱을 효율적으로 개발했습니다.",
      },
      {
        tech: "Supabase",
        reason:
          "실시간 데이터 동기화와 인증 기능을 빠르게 구현하기 위해 BaaS를 도입했습니다.",
        solved:
          "복잡한 백엔드 구축 없이 실시간 구독 데이터 동기화와 사용자 인증을 구현했습니다.",
      },
      {
        tech: "Expo",
        reason: "푸시 알림과 빠른 개발 환경 설정을 위해 Expo를 활용했습니다.",
        solved:
          "갱신일 알림 푸시 기능을 쉽게 구현하고, 빠른 프로토타이핑이 가능했습니다.",
      },
    ],
    myContributions: [
      "전체 앱 아키텍처 설계 및 구현",
      "구독 비용 시각화 대시보드 UI/UX 설계",
      "Supabase 연동 및 실시간 데이터 동기화 구현",
      "Expo 푸시 알림 시스템 구축",
    ],
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
      erd: ["clean-breath/erd_legacy.png", "clean-breath/erd_latest.png"],
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
