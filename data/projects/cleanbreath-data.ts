import { ProjectDeepDive } from "./types";

// CleanBreath 딥다이브 상세 데이터
// 각 토픽은 성과 섹션의 소단원을 배경→비교→구현→검증→한계점 구조로 재구성한 것입니다.
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
    { label: "팀 규모", value: "6인", icon: "CheckCircle" },
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
    // 1. 쿼리 최적화 및 인덱스 튜닝
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "query-optimization",
      title: "쿼리 최적화 및 인덱스 튜닝",
      subtitle: "풀 스캔 병목 파악에서 복합 인덱스 재설계까지의 성능 개선 과정",
      background: {
        summary:
          "위도/경도 인덱스 누락으로 풀 스캔이 발생하여 폴리곤 렌더링 시 응답 지연이 발생했습니다.",
        context:
          "지도 위 폴리곤 렌더링 시 특정 구역 조회에서 DB 응답 지연이 크게 튀는 현상을 발견했습니다. 모니터링 로그와 쿼리 실행 계획(EXPLAIN)을 확인한 결과, 위도/경도 조건에 인덱스가 누락되어 MySQL이 테이블 풀 스캔을 수행하고 있었습니다.",
        painPoints: [
          "폴리곤 렌더링용 데이터 조회에서 MySQL 풀 스캔 발생",
          "일반 구역 조회 API 응답 속도 180~185ms로 지연",
          "WHERE 조건이 인덱스를 활용하기 어렵게 작성된 부분 존재",
          "줌/이동에 따라 수백~수천 개 폴리곤을 불러와야 하는 대량 조회 패턴",
        ],
      },
      comparison: {
        summary:
          "위도/경도 복합 인덱스 + FK 인덱스 + 쿼리 리팩터링으로 87% 응답 시간 단축을 달성했습니다.",
        options: [
          {
            name: "단순 인덱스 추가",
            pros: ["구현이 간단함", "기존 쿼리 변경 불필요"],
            cons: [
              "복합 조건(위도+경도) 조회에서 효과 제한적",
              "쿼리 패턴에 따라 인덱스 미사용 가능",
              "아파트/일반 구역 구분 최적화 불가",
            ],
          },
          {
            name: "복합 인덱스 + 쿼리 플랜 기반 재설계",
            pros: [
              "위도/경도 복합 조건에 최적화된 인덱스 활용",
              "EXPLAIN으로 인덱스 사용 여부 검증 가능",
              "아파트/일반 구역별 쿼리 패턴 분리 최적화",
              "FK 인덱스로 JOIN 성능도 개선",
            ],
            cons: ["쿼리 리팩터링 작업 필요", "인덱스 설계에 도메인 이해 필요"],
          },
        ],
        decision:
          "단순히 인덱스를 추가하는 것이 아니라, 쿼리 플랜(EXPLAIN)을 보고 실제로 어떤 부분이 병목인지 확인한 뒤 위도/경도 복합 인덱스와 FK 인덱스를 재설계하는 방향으로 접근했습니다.",
      },
      implementation: {
        summary:
          "EXPLAIN 기반 병목 분석 → 복합 인덱스 설계 → 쿼리 리팩터링 3단계로 진행했습니다.",
        description:
          "금연/흡연 구역 데이터에 대해 위도/경도 복합 인덱스와 외래키(FK) 인덱스를 재설계하고, 쿼리 조건을 인덱스를 잘 탈 수 있도록 정리했습니다. 쿼리 플랜(EXPLAIN)으로 인덱스 사용 여부를 확인하며 문제 구간을 중심으로 쿼리를 리팩터링했습니다.",
        steps: [
          "모니터링 로그에서 응답 지연이 큰 API 엔드포인트 식별",
          "EXPLAIN으로 쿼리 실행 계획 분석 → 풀 스캔 발생 구간 확인",
          "위도/경도 복합 인덱스 + FK 인덱스 설계 및 적용",
          "WHERE 조건을 인덱스 활용에 최적화된 형태로 리팩터링",
          "아파트 단지/일반 구역 구분으로 쿼리 패턴 분리 최적화",
        ],
      },
      verification: {
        summary:
          "일반 구역 조회 180ms → 23ms(87%↓), 아파트 구역 조회 40ms → 8ms(80%↓)를 달성했습니다.",
        description:
          "인덱스 재설계와 쿼리 리팩터링 적용 전후의 API 응답 속도를 비교 측정했습니다.",
        metrics: [
          {
            label: "일반 구역 조회",
            value: "180→23ms",
            description: "87% 응답 시간 단축",
          },
          {
            label: "아파트 구역 조회",
            value: "40→8ms",
            description: "80% 응답 시간 단축",
          },
        ],
        evidence: [
          "EXPLAIN 결과에서 풀 스캔 → 인덱스 스캔으로 전환 확인",
          "적용 전후 동일 조건 반복 측정으로 수치 검증",
        ],
      },
      limitations: {
        summary:
          "현재 MySQL 기반 구조에서 Spatial Index 활용도를 높이거나, 트래픽 증가 시 캐시 레이어 추가를 고려할 수 있습니다.",
        items: [
          {
            limitation:
              "현재 위도/경도 복합 인덱스로 충분한 성능을 확보했지만, 데이터가 전국 규모로 확장될 경우 MySQL Spatial Index(R-Tree)를 본격적으로 활용하거나 PostGIS 같은 공간 DB로 전환이 필요할 수 있습니다.",
            improvement:
              "MySQL의 ST_Contains, ST_Within 등 공간 함수와 Spatial Index를 활용한 범위 쿼리로 전환하거나, 데이터 규모에 따라 PostGIS 또는 Elasticsearch Geo Query로 이관을 검토할 수 있습니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2. 2중 캐싱 기반 데이터 효율화
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "caching-strategy",
      title: "2중 캐싱 기반 데이터 효율화",
      subtitle:
        "IndexedDB + TanStack Query 조합으로 API 호출 95% 절감을 달성한 캐싱 전략",
      background: {
        summary:
          "금연/흡연 구역 데이터는 정적에 가까운데, 매 방문마다 전체 데이터를 API로 요청하고 있었습니다.",
        context:
          "금연/흡연 구역 데이터는 자주 바뀌지 않는 정적에 가까운 데이터입니다. 그런데 사용자가 지도를 열 때마다 전체 구역 데이터를 서버에서 불러오고 있어, 반복 방문 시 불필요한 API 호출이 발생하고 있었습니다.",
        painPoints: [
          "매 방문마다 동일한 구역 데이터를 서버에서 전체 조회",
          "정적 데이터임에도 캐싱 전략 부재로 불필요한 네트워크 요청",
          "데이터 변경 시 캐시 무효화 기준이 없어 정합성 문제 가능",
          "모바일 환경에서 반복 API 호출로 인한 데이터 사용량 증가",
        ],
      },
      comparison: {
        summary:
          "IndexedDB(30일) + TanStack Query(1시간) 2중 캐싱 + 버전 기반 무효화를 선택했습니다.",
        options: [
          {
            name: "서버 사이드 캐싱 (Redis 등)",
            pros: ["서버 부하 감소", "캐시 무효화 제어가 용이"],
            cons: [
              "클라이언트 네트워크 요청은 여전히 발생",
              "Redis 인프라 추가 비용",
              "개인 프로젝트 규모에서 과도한 인프라",
            ],
          },
          {
            name: "클라이언트 2중 캐싱 (IndexedDB + TanStack Query)",
            pros: [
              "재방문 시 네트워크 요청 없이 즉시 렌더링",
              "IndexedDB 30일 보존으로 장기 캐싱",
              "TanStack Query staleTime 1시간으로 세션 내 중복 요청 제거",
              "버전 기반 캐시 무효화로 데이터 정합성 유지",
              "추가 서버 인프라 불필요",
            ],
            cons: [
              "클라이언트 캐시 관리 로직 복잡도 증가",
              "브라우저 저장소 용량 제한 존재",
              "캐시 무효화 타이밍에 따라 일시적 데이터 불일치 가능",
            ],
          },
        ],
        decision:
          "도메인 특성(정적 데이터)을 활용하여 IndexedDB(30일 보존)와 TanStack Query(staleTime 1시간)를 조합한 2중 캐싱 구조를 설계했습니다. 월말 배치 스케줄러로 변경분만 차분 업데이트하고, 버전 정보 기준으로 캐시를 무효화합니다.",
      },
      implementation: {
        summary:
          "IndexedDB 장기 캐싱 + TanStack Query 세션 캐싱 + 버전 기반 무효화 3계층 구조를 설계했습니다.",
        description:
          "클라이언트 측 IndexedDB에 구역 데이터를 30일간 보존하여 재방문 시 네트워크 요청 없이 지도를 렌더링합니다. TanStack Query의 staleTime 1시간 설정으로 같은 세션 내 반복 조회를 제거합니다. 월말 배치 스케줄러로 서버 측 변경분만 차분 업데이트하고, 버전 정보를 기준으로 캐시를 무효화합니다.",
        architecture: `graph TD
  A["사용자 지도 접근"] --> B{"IndexedDB\n캐시 존재?"}
  B -->|"Yes + 버전 일치"| C["IndexedDB에서\n즉시 로드"]
  B -->|"No / 버전 불일치"| D["서버 API 호출"]
  D --> E["TanStack Query\n캐시 저장"]
  E --> F["IndexedDB\n30일 보존 저장"]
  C --> G["지도 폴리곤\n렌더링"]
  F --> G
  H["월말 배치\n스케줄러"] --> I["변경분\n차분 업데이트"]
  I --> J["버전 정보\n갱신"]`,
        architectureType: "mermaid",
        steps: [
          "IndexedDB에 구역 데이터 + 버전 정보를 30일간 보존",
          "TanStack Query staleTime 1시간으로 세션 내 중복 API 호출 제거",
          "사용자 접근 시 IndexedDB 캐시 확인 → 버전 일치하면 즉시 로드",
          "버전 불일치 시에만 서버 API 호출 → 양쪽 캐시 갱신",
          "월말 배치 스케줄러로 서버 측 변경분만 차분 업데이트 + 버전 갱신",
        ],
      },
      verification: {
        summary:
          "반복 방문 시 API 호출량 95% 절감, 데이터 최신성도 버전 기반으로 유지했습니다.",
        description:
          "캐싱 전략 적용 전후의 API 호출 횟수와 데이터 정합성을 비교 검증했습니다.",
        metrics: [
          {
            label: "API 호출 절감",
            value: "95%",
            description: "반복 방문 시 네트워크 요청 거의 제거",
          },
          {
            label: "IndexedDB 보존 기간",
            value: "30일",
            description: "장기 캐싱으로 재방문 즉시 로드",
          },
          {
            label: "TanStack Query staleTime",
            value: "1시간",
            description: "세션 내 중복 요청 제거",
          },
        ],
        evidence: [
          "캐싱 적용 후 반복 방문 시 네트워크 탭에서 API 호출 미발생 확인",
          "월말 배치 후 버전 변경 시 캐시 무효화 → 최신 데이터 반영 확인",
          "IndexedDB 30일 만료 후 자동 재요청 정상 동작 확인",
        ],
      },
      limitations: {
        summary:
          "캐시 무효화 타이밍에 따른 일시적 데이터 불일치와 브라우저 저장소 용량 제한이 존재합니다.",
        items: [
          {
            limitation:
              "월말 배치 기반 캐시 무효화이므로, 긴급한 구역 변경(예: 금연구역 신규 지정)이 발생하면 최대 한 달간 구 데이터가 표시될 수 있습니다.",
            improvement:
              "긴급 변경 시 서버에서 버전을 즉시 올리는 수동 트리거를 추가하거나, 클라이언트에서 주기적으로(예: 하루 1회) 버전 체크 API를 호출하는 경량 폴링을 도입할 수 있습니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. UI 리뉴얼 및 렌더링 성능 최적화
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "ui-performance",
      title: "UI 리뉴얼 및 렌더링 성능 최적화",
      subtitle:
        "Zustand + React Compiler 도입으로 Lighthouse 74→91점을 달성한 최적화 과정",
      background: {
        summary:
          "프론트엔드 유지보수 중 불필요한 리렌더링과 Lighthouse 74점의 낮은 성능 점수를 발견했습니다.",
        context:
          "프론트엔드 유지보수를 위해 UI 구조를 리뉴얼하는 과정에서, 상태 관리 비효율과 불필요한 리렌더링이 성능 저하의 주요 원인임을 파악했습니다. Lighthouse 성능 점수가 74점으로 초기 로딩 속도와 사용자 경험에 개선이 필요했습니다.",
        painPoints: [
          "Lighthouse 성능 점수 74점으로 초기 로딩 속도 부족",
          "상태 관리 비효율로 불필요한 리렌더링 빈번 발생",
          "지도 컴포넌트와 UI 컴포넌트 간 상태 의존성 복잡",
          "유지보수 시 코드 구조 파악이 어려운 상태",
        ],
      },
      comparison: {
        summary:
          "Zustand로 상태 관리를 효율화하고, React Compiler로 자동 메모이제이션을 적용했습니다.",
        options: [
          {
            name: "수동 메모이제이션 (React.memo, useMemo, useCallback)",
            pros: ["세밀한 최적화 제어 가능", "추가 라이브러리 불필요"],
            cons: [
              "메모이제이션 누락 시 성능 저하",
              "코드 복잡도 증가",
              "유지보수 시 의존성 배열 관리 부담",
            ],
          },
          {
            name: "Zustand + React Compiler",
            pros: [
              "Zustand: 필요한 상태만 구독하여 불필요한 리렌더링 제거",
              "React Compiler: 자동 메모이제이션으로 수동 관리 부담 제거",
              "코드 간결성 유지",
              "유지보수 용이",
            ],
            cons: [
              "React Compiler는 아직 실험적 기능",
              "Zustand 학습 비용 (미미한 수준)",
            ],
          },
        ],
        decision:
          "Zustand를 활용한 효율적인 상태 관리와 React Compiler 도입을 통해 불필요한 리렌더링을 최소화하는 방향을 선택했습니다. 수동 메모이제이션 대비 코드 간결성과 유지보수성이 우수합니다.",
      },
      implementation: {
        summary:
          "Zustand 상태 분리 + React Compiler 자동 메모이제이션 + UI 구조 리뉴얼을 진행했습니다.",
        description:
          "프론트엔드 UI 구조를 리뉴얼하면서 Zustand를 활용한 효율적인 상태 관리와 React Compiler 도입을 통해 불필요한 리렌더링을 최소화했습니다.",
        steps: [
          "기존 상태 관리 구조 분석 → 불필요한 리렌더링 발생 지점 식별",
          "Zustand로 지도 상태, UI 상태, 필터 상태를 분리하여 필요한 컴포넌트만 구독",
          "React Compiler 도입으로 자동 메모이제이션 적용",
          "UI 컴포넌트 구조 리뉴얼 → 모바일 반응형 개선",
          "Lighthouse 성능 측정으로 최적화 효과 검증",
        ],
      },
      verification: {
        summary:
          "Lighthouse 성능 점수 74→91점(+17점), 불필요한 리렌더링 최소화를 달성했습니다.",
        description:
          "UI 리뉴얼과 상태 관리 최적화 적용 전후의 Lighthouse 성능 점수와 렌더링 횟수를 비교 측정했습니다.",
        metrics: [
          {
            label: "Lighthouse 성능",
            value: "74→91점",
            description: "+17점 개선",
          },
        ],
        evidence: [
          "React DevTools Profiler로 리렌더링 횟수 감소 확인",
          "Lighthouse 성능 점수 74 → 91점 개선 확인",
          "모바일 환경에서 초기 로딩 속도 체감 개선",
        ],
      },
      limitations: {
        summary:
          "React Compiler의 실험적 특성과 EC2 t3.micro 24/7 운영 비용 최적화가 과제로 남아있습니다.",
        items: [
          {
            limitation:
              "React Compiler는 아직 실험적 기능으로, 향후 API 변경이나 호환성 이슈가 발생할 수 있습니다. 또한 현재 백엔드는 EC2 t4g.micro 24/7 운영 구조로 인스턴스 + VPC 비용이 지속 발생합니다.",
            improvement:
              "React Compiler의 안정 버전 출시를 추적하며 마이그레이션 준비를 하고, 인프라 측면에서는 지도 조회 API 일부를 캐시 서버/서버리스로 이관하는 하이브리드 구조나 예약 인스턴스/세이빙 플랜을 검토할 수 있습니다.",
          },
        ],
      },
    },
  ],
};
