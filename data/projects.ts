// 프로젝트 데이터
export interface TechReason {
  tech: string;
  reason: string;
  solved: string;
}

// 해결한 문제 섹션 (구조화된 형태)
export interface ProblemSection {
  title: string;
  description: string;
  image?: string; // 단일 이미지 (하위 호환성)
  images?: string[]; // 여러 이미지 배열
}

// 주요 기능 섹션 (구조화된 형태)
export interface FeatureSection {
  text: string;
  images?: string[]; // 기능 설명 이미지
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
  searchRankings?: {
    date: string;
    image: string;
  }[];
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
  features: string[] | FeatureSection[];
  githubUrl?: string;
  demoUrl?: string;
  playStoreUrl?: string; // Google Play Store URL
  appStoreUrl?: string; // Apple App Store URL
  // 상세 정보
  problem?: string | ProblemSection[]; // 무슨 문제를 해결한 프로젝트인가?
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
    subtitle: "한 번 열리면 사라지는, 첩보 영화급 휘발성 보안 파일 공유 서비스",
    description:
      "계약서, 신분증, 임시 비밀번호처럼 메신저·메일로 남기기 찝찝한 민감 파일을, 일정 시간·조건 이후 자동 소멸되는 링크로 공유하는 보안 파일 공유 플랫폼. AWS 서버리스 아키텍처 기반으로 파일이 열람된 이후 흔적을 최소화합니다.",
    role: "Full Stack Developer",
    type: "personal",
    techStack: [
      "TypeScript",
      "AWS Lambda",
      "DynamoDB",
      "DynamoDB Streams",
      "EventBridge Pipes",
      "SQS",
      "S3",
      "API Gateway",
      "Terraform",
      "React/Next.js",
      "Supabase",
    ],
    features: [
      "Pre-signed URL 기반 보안 파일 공유 — 직접 파일을 노출하지 않고 임시 URL로만 접근 허용",
      "열람 횟수·시간 조건 충족 시 파일 자동 소멸 (생명주기 관리)",
      "DynamoDB TTL 만료 → Streams → EventBridge Pipes → SQS 파이프라인으로 이벤트 기반 자동 파일 정리",
      "Main SQS Redrive Policy + DLQ로 실패 메시지 격리 및 관리자 수동 재처리 지원",
      "Supabase Auth 기반 사용자 인증 및 권한 관리",
      "Terraform IaC로 전체 AWS 인프라 코드화 및 버전 관리",
    ],
    githubUrl: "https://github.com/CMU02/phantom-file",
    demoUrl: "https://phantomfile.cmu02-studio.com",
    problem:
      "카카오톡, 이메일, 슬랙 등으로 보낸 민감 파일은 영구히 기록으로 남습니다. 계약서나 신분증 사본을 공유한 뒤 '나중에 유출되면 어쩌지'라는 불안감, 잘못된 채팅방에 올렸을 때 상대 서버·백업·스크린샷은 통제 불가능한 상황이 반복됩니다. 일반 클라우드 드라이브는 만료 설정이 번거롭고, 접근 권한 제어가 복잡하며, '보안 특화' 관점의 신뢰감을 주지 못합니다.",
    motivation:
      "필요한 순간에만 잠깐 열렸다가 끝나면 증거를 최소화하고 싶다는 니즈에서 출발했습니다. 파일 자체는 남기지 않되, 상대가 열람한 사실은 기록으로 남기는 구조를 설계하고 싶었습니다. AWS 서버리스 아키텍처를 활용해 비용 효율적이면서도 확장 가능한 시스템으로 구현했습니다.",
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
        tech: "DynamoDB + DynamoDB Streams",
        reason:
          "파일 메타데이터(링크, 만료 시각, 상태 등)를 저장하고, TTL 만료 삭제 이벤트를 스트림으로 흘려보내기 위해 선택했습니다.",
        solved:
          "TTL이 만료되면 DynamoDB가 백그라운드에서 항목을 자동 삭제하고, 해당 REMOVE 이벤트가 Streams에 기록되어 별도 크론 없이 이벤트 기반 파일 정리 파이프라인의 시작점이 됩니다.",
      },
      {
        tech: "EventBridge Pipes",
        reason:
          "DynamoDB Streams를 소스로 폴링하면서 TTL 만료 삭제 이벤트만 선별적으로 SQS로 전달하기 위해 도입했습니다.",
        solved:
          "eventName == REMOVE 조건 필터를 적용해 TTL 만료 삭제 이벤트만 통과시키고, 불필요한 Lambda 호출 없이 Main SQS로 라우팅합니다.",
      },
      {
        tech: "SQS (Main + DLQ)",
        reason:
          "파일 삭제 작업을 비동기 대기열로 관리하고, 처리 실패 시 재시도 및 격리를 위해 도입했습니다.",
        solved:
          "Main SQS가 삭제 작업 대기열 역할을 하고, Redrive Policy로 반복 실패 메시지를 DLQ로 격리합니다. DLQ에는 Replay Lambda가 연결되어 관리자가 재처리 여부를 결정할 수 있습니다.",
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
      "Lambda 함수 기반 파일 업로드/다운로드 API 개발",
      "DynamoDB TTL → Streams → EventBridge Pipes → Main SQS → Cleanup Lambda 이벤트 기반 파일 삭제 파이프라인 구현",
      "Main SQS Redrive Policy 및 DLQ + Replay Lambda로 실패 메시지 재처리 흐름 설계",
      "Next.js 기반 웹 프론트엔드 개발",
      "CloudWatch를 통한 실시간 모니터링 및 로깅 설정",
    ],
    expectedEffects: [
      "심리적 불안 해소: 파일이 자동 소멸되어 '나중에 유출되면 어쩌지'라는 걱정을 구조적으로 제거",
      "이벤트 기반 자동화: TTL 만료 → Streams → EventBridge Pipes → SQS → Lambda 파이프라인으로 크론 없이 정확한 시점에 파일 정리",
      "안정적인 삭제 보장: SQS 재시도 + DLQ + Replay Lambda로 삭제 실패 시에도 메시지를 잃지 않고 재처리 가능",
      "비용 효율성: 서버리스 아키텍처로 사용량 기반 과금, 유휴 비용 최소화",
    ],
    images: {
      architecture: ["phantom-file/phantomfile-serverless-architecture.jpg"],
    },
  },
  {
    id: "streamx",
    title: "StreamX",
    subtitle: "당신만의 맞춤 AI 스트리머 플랫폼",
    description:
      "사용자가 원하는 시간과 취향에 맞춰 AI 스트리머와 실시간 소통 및 교감을 나눌 수 있는 혁신적인 플랫폼. Unity 기반 3D 인터랙티브 환경과 Spring Boot 백엔드, RAG 기반 개인화 시스템으로 맞춤형 스트리밍 경험을 제공합니다.",
    role: "Backend Developer",
    type: "team",
    techStack: [
      "Spring Boot",
      "Unity",
      "AWS RDS (MySQL)",
      "LLM",
      "TTS",
      "RAG",
      "Pinecone",
      "Redis",
      "Bone-based Rigging",
    ],
    features: [
      {
        text: "RAG 기반 사용자 행동 및 대화 분석을 통한 맞춤형 AI 스트리머 제공",
        images: ["streamx/my_streamer_1.png"],
      },
      {
        text: "LLM + TTS 기술을 활용한 실시간 1:1 자연어 소통",
        images: ["streamx/chating_1.png", "streamx/chating_2.png"],
      },
      { text: "Pinecone vector store를 활용한 사용자 행동 패턴 분석" },
      { text: "Redis 기반 대화 컨텍스트 관리 및 세션 유지" },
      { text: "Unity6 기반 몰입도 높은 3D 인터랙티브 콘텐츠 구현" },
      { text: "AWS RDS for MySQL을 통한 안정적인 데이터 관리" },
    ],
    githubUrl: "https://github.com/CMU02/StreamX-BE",
    problem: [
      {
        title: "기존 스트리밍 서비스의 한계",
        description:
          "기존 스트리밍 서비스는 방송 시간이 정해져 있어 원하는 시간에 컨텐츠를 즐기기 어렵고, 유명 스트리머와의 직접 소통이 거의 불가능하여 일방적인 시청만 가능했습니다.",
      },
    ],
    motivation:
      "사용자의 다양한 취향과 라이프스타일을 분석하여 최적의 AI 스트리머를 제공하고, RAG 기술을 활용해 사용자의 행동 패턴과 대화 내용을 학습하여 더욱 개인화된 경험을 제공하고자 했습니다.",
    techReasons: [
      {
        tech: "Spring Boot",
        reason:
          "안정적이고 효율적인 백엔드 서비스와 트랜잭션 처리를 위해 선택했습니다.",
        solved:
          "사용자 정보 관리, AI 스트리머 데이터 처리 등 핵심 백엔드 서비스를 안정적으로 제공했습니다.",
      },
      {
        tech: "RAG + Pinecone",
        reason:
          "사용자의 행동 패턴과 대화 내용을 벡터화하여 저장하고, 유사도 검색을 통해 개인화된 응답을 생성하기 위해 도입했습니다.",
        solved:
          "사용자의 과거 대화와 행동 데이터를 기반으로 AI 스트리머가 맥락에 맞는 개인화된 응답을 제공할 수 있게 되었습니다.",
      },
      {
        tech: "Redis",
        reason:
          "실시간 대화 세션 관리와 빠른 컨텍스트 조회를 위해 인메모리 데이터베이스를 선택했습니다.",
        solved:
          "사용자의 대화 내용을 실시간으로 캐싱하여 AI 스트리머가 이전 대화를 기억하고 자연스러운 대화 흐름을 유지할 수 있게 되었습니다.",
      },
      {
        tech: "AWS RDS for MySQL",
        reason:
          "사용자 정보, AI 스트리머 데이터 등 구조화된 데이터를 안정적으로 관리하기 위해 선택했습니다.",
        solved:
          "관계형 데이터베이스를 통해 데이터 무결성을 보장하고, AWS의 자동 백업 및 복구 기능으로 안정성을 확보했습니다.",
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
      "RAG 파이프라인 구축 및 Pinecone vector store 연동",
      "Redis를 활용한 대화 컨텍스트 관리 시스템 개발",
      "사용자 행동 데이터 분석 로직 개발",
      "AWS RDS for MySQL 데이터베이스 설계 및 최적화",
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
      "모바일 친화적 반응형 웹 디자인",
      "금연구역 검증 및 피드백 시스템",
    ],
    githubUrl: "https://github.com/CMU02/cleanbreath-frontend",
    demoUrl: "https://cleanbreath.cmu02-studio.com",
    problem: [
      {
        title: "흡연구역 인식 부족",
        description:
          "많은 사람들이 흡연구역과 금연구역 경계에 대해 혼동이 오고 있습니다.",
      },
      {
        title: "공공장소의 갈등",
        description:
          "이러한 문제들로 인해 공공장소에서 비흡연자와 흡연자 간의 갈등이 발생하고 있습니다.",
      },
      {
        title: "문제점의 사례",
        description:
          "법령과 조례는 금연구역을 복잡하고 이해하기 어려운 형태로 정의가 되어있습니다. 이러한 규정은 자주 변경될 뿐만 아니라, 지자체마다 조례를 통해 세부 사항을 다르게 조정할 수 있어 지역별로 혼란이 발생하기도 합니다. 지자체가 변경된 사항을 지속적으로 홍보하려 하지만, 시민들에게 제대로 전달되지 않는 것이 현실입니다.",
        images: [
          "clean-breath/problem_1.jpg",
          "clean-breath/problem_2.jpg",
          "clean-breath/problem_3.jpg",
          "clean-breath/problem_4.png",
        ],
      },
    ],
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
          "Spatial Index를 활용하여 금연·흡연구역 검색을 빠르게 처리했습니다.",
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
      "Spring Boot REST API 설계 및 구현",
      "모바일 반응형 UI/UX 설계 및 구현",
    ],
    expectedEffects: [
      "흡연자 편의 제공: 복잡한 법령 및 조례에 의한 혼란을 줄이고, 명확한 정보를 기반으로 행동할 수 있도록 지원",
      "간접흡연 피해 감소: 흡연구역 정보를 명확하게 제공하여 지정된 구역에서만 흡연하도록 유도",
      "공공장소 갈등 해소: 흡연자와 비흡연자 간의 갈등을 줄이고 쾌적한 환경 조성",
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
      searchRankings: [
        {
          date: "2024-10-31",
          image: "clean-breath/2024_10_31_seo.png",
        },
        {
          date: "2024-11-11",
          image: "clean-breath/2024_11_11_seo_01.png",
        },
        {
          date: "2024-11-11",
          image: "clean-breath/2024_11_11_seo_02.png",
        },
        {
          date: "2024-11-18",
          image: "clean-breath/2024_11_18_seo.png",
        },
      ],
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
