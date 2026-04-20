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
    { label: "팀 규모", value: "6인", icon: "Users" },
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
      title: "AI 도구 활용",
      items: [
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
    // 1. 현장 답사 및 데이터 수집 툴 개발
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "field-survey-data-collection",
      title: "현장 답사 및 데이터 수집 툴 개발",
      subtitle:
        "공공 데이터 한계를 극복하기 위한 직접 현장 답사와 수집 툴 설계",
      background: {
        summary:
          "공공 데이터만으로는 안양시 전체를 커버하기 부족하여, 팀원들이 직접 현장을 돌며 데이터를 수집하는 전략을 선택했습니다.",
        context:
          "공공데이터포털에서 제공하는 금연·흡연 구역 데이터는 안양시 전체를 커버하기에 부족했고, 실제 현장 상황을 제대로 반영하지 못하고 있었습니다. '건물 단위' 정보는 있지만 어디까지가 금연/흡연 구역인지 경계가 시각적으로 보이지 않는 문제가 있었습니다.",
        painPoints: [
          "공공 데이터가 적고 실제 현장과 불일치하는 구간이 다수 존재",
          "좌표·경계 정보가 부정확하여 폴리곤 시각화에 바로 활용 불가",
          "팀원들이 현장에서 수집한 데이터를 체계적으로 입력할 도구가 없음",
          "현장 답사 데이터를 서비스 DB에 적재하는 파이프라인 부재",
        ],
      },
      comparison: {
        summary:
          "공공 데이터 단독 사용 대신 현장 답사 + 자체 수집 툴 전략을 선택하여 실제 현장 데이터를 확보했습니다.",
        options: [
          {
            name: "공공 데이터만 활용",
            pros: ["추가 개발 불필요", "데이터 수집 비용 없음"],
            cons: [
              "안양시 전체 커버리지 부족",
              "실제 현장과 불일치하는 데이터 다수",
              "경계 정보 부정확으로 폴리곤 시각화 품질 저하",
            ],
          },
          {
            name: "현장 답사 + 자체 수집 툴 개발",
            pros: [
              "실제 현장 기반의 정확한 데이터 확보",
              "흡연 부스 위치, 금연 표지판, 실제 사용 장소까지 수집 가능",
              "팀원들이 쉽게 데이터를 입력할 수 있는 전용 툴 제공",
              "수집 데이터가 서비스 DB에 직접 적재되는 파이프라인 구축",
            ],
            cons: [
              "수집 웹사이트 + 백엔드 API 추가 개발 필요",
              "팀원들의 현장 답사 시간 투자 필요",
            ],
          },
        ],
        decision:
          "공공 데이터만으로는 부족하다고 판단하여, 팀원들과 함께 직접 현장 답사 + 자체 데이터 수집 툴 전략을 선택했습니다. 안양시 동안구 내 3개 구역으로 나누어 팀원들이 직접 현장을 돌며 데이터를 수집했습니다.",
        tradeOff:
          "수집 툴 개발에 추가 공수가 들었지만, 실제 현장 데이터를 확보함으로써 서비스의 핵심 가치인 '정확한 시각화'를 실현할 수 있었습니다.",
      },
      implementation: {
        summary:
          "좌표·메타데이터 입력용 수집 웹사이트와 CleanBreath DB 적재 API를 구현하여 팀원들의 현장 데이터를 손실 없이 수집했습니다.",
        description:
          "팀원들이 현장 답사로 모은 데이터를 잃지 않도록, 좌표/메타데이터 입력용 수집 웹사이트와 해당 데이터를 CleanBreath 서비스 DB에 적재하는 백엔드 API를 구현했습니다. 안양시 동안구 내 3개 구역(2곳, 2곳, 1곳)으로 나누어 팀원들이 직접 현장을 돌며 실제 흡연 부스 위치, 금연 표지판 위치, 시민들이 실제로 사용하는 흡연 장소를 조사했습니다.",
        architecture: `graph TD
  A["팀원 현장 답사"] --> B["수집용 웹사이트"]
  B --> C["좌표 + 메타데이터 입력"]
  C --> D["백엔드 수집 API"]
  D --> E["CleanBreath DB 적재"]
  E --> F["폴리곤 시각화"]`,
        architectureType: "mermaid",
        steps: [
          "안양시 동안구를 3개 구역으로 분할하여 팀원 배정",
          "현장에서 실제 흡연 부스 위치, 금연 표지판, 시민 사용 장소 조사",
          "좌표·메타데이터를 쉽게 입력할 수 있는 수집용 웹사이트 개발",
          "수집 데이터를 CleanBreath 서비스 DB에 적재하는 백엔드 API 구현",
          "수집된 좌표 데이터를 기반으로 폴리곤 경계 생성 및 시각화",
        ],
      },
      verification: {
        summary:
          "공공 데이터와 1주일 현장 수집을 병합하여 흡연구역 12개·금연구역 226개의 데이터 기반을 마련했습니다.",
        description:
          "2024년 7월 10일부터 17일까지 약 1주일간, 팀원 5명이 안양시 동안구를 3개 구역으로 나눠 직접 현장을 돌며 데이터를 수집했습니다. 수집 툴을 통해 입력된 좌표·메타데이터가 CleanBreath 서비스 DB에 정상 적재되고, 지도 위 폴리곤으로 시각화되는 전체 파이프라인을 검증했습니다.",
        metrics: [
          {
            label: "흡연구역",
            value: "12개",
            description: "공공 데이터 + 현장 수집 합산",
          },
          {
            label: "금연구역",
            value: "226개",
            description: "공공 데이터 + 현장 수집 합산",
          },
          {
            label: "현장 답사 기간",
            value: "약 1주일",
            description: "2024.07.10 ~ 07.17, 팀원 5명 참여",
          },
        ],
        evidence: [
          "안양시 동안구 3개 구역 현장 답사 완료 — 팀원 5명이 구역 분담하여 흡연 부스·금연 표지판·실사용 장소 조사",
          "수집 웹사이트를 통한 좌표 입력 → DB 적재 → 폴리곤 렌더링 파이프라인 정상 동작 확인",
          "공공 데이터 단독 대비 현장 실측 데이터 병합으로 폴리곤 커버리지 및 경계 정확도 향상",
        ],
      },
      limitations: {
        summary:
          "현재 안양시 특정 구역에 집중된 데이터 커버리지를 크라우드소싱 모델로 확장할 수 있습니다.",
        items: [
          {
            limitation:
              "현재 CleanBreath는 안양시 특정 구역에 집중된 데이터를 다루고 있어, 전국/광역 서비스로 보기엔 데이터 커버리지가 부족합니다. 팀원들의 현장 답사에 의존하는 구조라 지속적인 데이터 갱신에 한계가 있습니다.",
            improvement:
              "수집 툴을 일반 사용자/지자체도 쉽게 사용할 수 있는 형태로 확장하여 크라우드소싱 기반 데이터 수집 모델을 도입하거나, 지자체·보건소와 협업하여 공식 데이터와 현장 데이터를 병합하는 전략을 고려할 수 있습니다.",
          },
        ],
      },
      gallery: [
        // ── 대표 7장 (그리드에 표시) ──
        {
          s3Key: "clean-breath/visit/map-1.png",
          caption:
            "빨간색으로 표시한 구역이 답사 완료 구역. 동안구를 3개 구역으로 나눠 팀원 5명이 분담했습니다.",
          category: "답사 지도",
        },
        {
          s3Key: "clean-breath/visit/area-features-1.png",
          caption:
            "학운공원 — 금연공원으로 지정되어 금연구역 표시가 많지만, 버스기사님들이 버스정류장 앞에서 흡연하는 실태를 현장에서 확인했습니다.",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-features-6.png",
          caption:
            "한가람한양 아파트 — 금연아파트로 지정되어 곳곳에 금연구역 표시가 있습니다.",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/tool-2.png",
          caption:
            "직접 개발한 수집 툴로 현장 데이터를 입력하는 모습. 금연지정 아파트에서는 흡연구역이 없어 대부분 경비실 앞이나 금연구역에서 흡연하는 패턴을 발견했습니다.",
          category: "수집 툴",
        },
        {
          s3Key: "clean-breath/visit/smok-1-1.png",
          caption:
            "샛별한양 아파트 — 공식 흡연구역이 아닌 암묵적 흡연 장소 2곳을 현장에서 발견. 공공 데이터에는 없는 정보입니다.",
          category: "암묵적 흡연구역",
        },
        {
          s3Key: "clean-breath/visit/smok-3-1.png",
          caption: "동안구청 앞 흡연구역 — 공공기관 앞 실제 흡연 실태.",
          category: "흡연구역",
        },
        {
          s3Key: "clean-breath/visit/smok-4-1.png",
          caption:
            "범계역 신한은행 앞 — 정확한 주소 특정이 어려운 케이스로, 공공 데이터만으로는 파악 불가능한 흡연 장소입니다.",
          category: "흡연구역",
        },
        // ── 나머지 27장 (전체 보기 모달에서만 표시) ──
        {
          s3Key: "clean-breath/visit/area-features-2.png",
          caption: "학운공원 주변 현장",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-features-3.png",
          caption: "중앙에 금연구역 표시 확인",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-features-4.png",
          caption: "현장 답사 구역 상세",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-features-5.png",
          caption: "현장 답사 구역 상세",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/map-2.png",
          caption: "흡연구역 없는 구역 지도",
          category: "답사 지도",
        },
        {
          s3Key: "clean-breath/visit/area-1.png",
          caption: "한가람한양 아파트 주변",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-2.png",
          caption: "한가람한양 아파트 주변",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-features-7.png",
          caption: "한가람 어린이 공원 — 금연구역으로 지정",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-features-8.png",
          caption:
            "한가람 삼성 아파트 — 금연구역 지정 아파트로 보임. 돌아다니면서 흡연구역이 아예 없었습니다.",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/map-3.png",
          caption: "3구역 답사 지도",
          category: "답사 지도",
        },
        {
          s3Key: "clean-breath/visit/map-4.png",
          caption: "4구역 답사 지도",
          category: "답사 지도",
        },
        {
          s3Key: "clean-breath/visit/area-3.png",
          caption: "한가람두산 아파트",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-4.png",
          caption: "한가람두산 아파트 주변",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-5.png",
          caption:
            "한가람두산 아파트 — 경비아저씨와 얘기해본 결과 금연 지정 아파트는 아니지만 금연구역으로 표시된 구역이 많음. 흡연구역 1개 있음.",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/area-5.png",
          caption: "한가람두산 아파트 상세",
          category: "현장",
        },
        {
          s3Key: "clean-breath/visit/tool-1.png",
          caption: "수집 툴 화면 1",
          category: "수집 툴",
        },
        {
          s3Key: "clean-breath/visit/tool-3-smok-1.png",
          caption: "샛별한양 아파트 — 암묵적 흡연장소 2개 수집 툴 입력 화면",
          category: "수집 툴",
        },
        {
          s3Key: "clean-breath/visit/smok-1-2.png",
          caption: "샛별한양 아파트 — 암묵적 흡연구역 2번째",
          category: "암묵적 흡연구역",
        },
        {
          s3Key: "clean-breath/visit/smok-1-3.png",
          caption: "샛별한양 아파트 — 바로 앞에 의자가 있는 암묵적 흡연 장소",
          category: "암묵적 흡연구역",
        },
        {
          s3Key: "clean-breath/visit/smok-1-4.png",
          caption: "샛별한양 아파트 — 의자 앞 암묵적 흡연 장소 추가 확인",
          category: "암묵적 흡연구역",
        },
        {
          s3Key: "clean-breath/visit/tool-4-smok-1.png",
          caption: "샛별한양 아파트 흡연구역 수집 툴 입력",
          category: "수집 툴",
        },
        {
          s3Key: "clean-breath/visit/tool-5-smok-2.png",
          caption: "KT 지사 흡연구역 수집 툴 입력",
          category: "수집 툴",
        },
        {
          s3Key: "clean-breath/visit/smok-2-1.png",
          caption: "KT 지사 앞 흡연구역",
          category: "흡연구역",
        },
        {
          s3Key: "clean-breath/visit/smok-2-2.png",
          caption: "KT 지사 앞 흡연구역 상세",
          category: "흡연구역",
        },
        {
          s3Key: "clean-breath/visit/tool-6-smok-3.png",
          caption: "동안구청 흡연구역 수집 툴 입력",
          category: "수집 툴",
        },
        {
          s3Key: "clean-breath/visit/smok-3-2.png",
          caption: "동안구청 앞 흡연구역 2",
          category: "흡연구역",
        },
        {
          s3Key: "clean-breath/visit/smok-3-3.png",
          caption: "동안구청 앞 흡연구역 3",
          category: "흡연구역",
        },
        {
          s3Key: "clean-breath/visit/tool-7-smok-4.png",
          caption: "범계역 신한은행 앞 흡연구역 수집 툴 입력",
          category: "수집 툴",
        },
      ],
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 쿼리 최적화 — 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "query-optimization",
      title: "쿼리 최적화 - 문서",
      subtitle:
        "서비스 출시 후 발견한 풀 스캔 병목의 원인 분석과 복합 인덱스 재설계 과정",
      background: {
        summary:
          "서비스 출시 후 특정 지역 조회에서 응답 지연을 감지했고, 원인은 인덱스 누락으로 인한 풀 스캔이었습니다.",
        context:
          "서비스 출시 후 안양시 외곽 지역에서 금연/흡연 구역을 조회할 때 응답이 눈에 띄게 느려지는 현상을 감지했습니다. 데이터 건수가 수백 건 이상인 구역에서 특히 지연이 심했습니다. 처음에 인덱스를 걸지 않은 이유는 솔직하게 말하면, 로컬 개발 환경의 데이터가 적어서(수십 건) 느림을 체감하지 못했고, JPA 엔티티 설계 시 위도/경도 컬럼에 인덱스를 고려하지 않았기 때문입니다. 이 경험에서 배포 전 실제 규모의 데이터로 테스트해야 한다는 것을 배웠습니다.",
        painPoints: [
          "로컬 개발 환경(수십 건)에서는 느림을 체감하지 못했으나, 프로덕션(수백 건)에서 응답 지연 발생",
          "JPA 엔티티 설계 시 위도/경도 컬럼에 인덱스를 고려하지 않음",
          "EXPLAIN 결과 type: ALL(풀 스캔) — 위도/경도 범위 조건에 인덱스 미사용",
          "일반 구역 조회 API 응답 속도 180~185ms로 사용자 체감 지연",
        ],
      },
      comparison: {
        summary:
          "EXPLAIN 분석으로 풀 스캔 원인을 파악하고, 위도/경도 복합 인덱스 + FK 인덱스로 해결했습니다.",
        options: [
          {
            name: "단일 컬럼 인덱스 (위도 또는 경도 각각)",
            pros: ["구현이 간단함", "기존 쿼리 변경 불필요"],
            cons: [
              "위도/경도 동시 범위 조건에서 하나의 인덱스만 사용 — 나머지는 풀 스캔",
              "복합 조건 최적화 불가",
              "EXPLAIN에서 여전히 rows 수가 높게 나옴",
            ],
          },
          {
            name: "복합 인덱스 (위도 + 경도) + FK 인덱스",
            pros: [
              "위도/경도 동시 범위 조건에 최적화 — 두 컬럼 모두 인덱스 활용",
              "EXPLAIN에서 type: ALL → ref/range로 전환 확인 가능",
              "FK 인덱스로 JOIN 성능도 함께 개선",
              "컬럼 순서(위도 먼저)를 쿼리 패턴에 맞게 설계",
            ],
            cons: [
              "인덱스 설계 시 컬럼 순서 결정에 도메인 이해 필요",
              "INSERT/UPDATE 시 인덱스 유지 비용 소폭 증가",
            ],
          },
        ],
        decision:
          "위도/경도 조건이 범위 조회(BETWEEN)이기 때문에 복합 인덱스의 컬럼 순서가 중요합니다. 위도를 첫 번째 컬럼으로 설정한 이유는, 위도 범위가 경도 범위보다 좁아 첫 번째 컬럼에서 더 많은 행을 필터링할 수 있기 때문입니다. FK 인덱스도 함께 추가하여 구역 타입별 JOIN 성능을 개선했습니다.",
        tradeOff:
          "복합 인덱스 추가로 INSERT/UPDATE 시 인덱스 유지 비용이 소폭 증가하지만, 금연/흡연 구역 데이터는 변경 빈도가 매우 낮아(월 1회 미만) 조회 성능 개선 효과가 압도적으로 큽니다.",
      },
      implementation: {
        summary:
          "EXPLAIN 기반 병목 분석 → 복합 인덱스 설계(위도 우선) → FK 인덱스 추가 → 쿼리 리팩터링 순서로 진행했습니다.",
        description:
          "EXPLAIN 결과에서 type: ALL, rows: 전체 행 수를 확인하여 풀 스캔이 발생하는 원인을 파악했습니다. 위도/경도 범위 조건에 복합 인덱스를 설계하고, 구역 타입 FK에도 인덱스를 추가했습니다. WHERE 조건을 인덱스를 잘 탈 수 있도록 리팩터링하고, 아파트/일반 구역 구분으로 쿼리 패턴을 분리 최적화했습니다.",
        steps: [
          "EXPLAIN 실행: type: ALL, rows: 전체 행 수 확인 → 풀 스캔 발생 원인 파악",
          "복합 인덱스 설계: (latitude, longitude) 순서 — 위도 범위가 좁아 첫 번째 컬럼에서 필터링 효과 극대화",
          "FK 인덱스 추가: 구역 타입(zone_type_id) 외래키에 인덱스 추가 → JOIN 성능 개선",
          "쿼리 리팩터링: WHERE 조건을 인덱스 활용에 최적화된 형태로 정리",
          "아파트/일반 구역 구분으로 쿼리 패턴 분리 → 각각에 최적화된 실행 계획 유도",
          "인덱스 적용 후 EXPLAIN 재실행: type: ALL → ref/range 전환 확인",
        ],
      },
      verification: {
        summary:
          "일반 구역 조회 180ms → 23ms(87%↓), 아파트 구역 조회 40ms → 8ms(80%↓)를 달성했습니다.",
        description:
          "인덱스 추가 전후 EXPLAIN 결과를 비교하여 풀 스캔이 인덱스 스캔으로 전환된 것을 확인하고, 동일 조건으로 응답 시간을 반복 측정했습니다. 금연구역 226건 + 흡연구역 12건 기준, 안양시 동안구 전체 범위 조회 조건으로 측정했습니다.",
        metrics: [
          {
            label: "일반 구역 조회",
            value: "180ms → 23ms",
            description: "87% 응답 시간 단축 (226건 기준)",
          },
          {
            label: "아파트 구역 조회",
            value: "40ms → 8ms",
            description: "80% 응답 시간 단축",
          },
          {
            label: "EXPLAIN type 변화",
            value: "ALL → ref/range",
            description: "풀 스캔 → 인덱스 스캔으로 전환 확인",
          },
        ],
        evidence: [
          "EXPLAIN 적용 전: type: ALL, rows: 전체 행 수 — 풀 스캔 발생",
          "EXPLAIN 적용 후: type: ref/range, key: idx_lat_lng — 복합 인덱스 사용 확인",
          "동일 조건(안양시 동안구 전체 범위) 반복 측정으로 수치 검증",
          "팀 체크리스트 수립: 조회 조건 컬럼 인덱스 검토를 설계 단계에서 수행하도록 프로세스화",
        ],
      },
      limitations: {
        summary:
          "현재 위도/경도 범위 조건으로 처리 중이며, 서비스 확장 시 공간 인덱스 도입을 검토합니다.",
        items: [
          {
            limitation:
              "현재 LIKE 검색이나 공간 인덱스(ST_Contains)를 쓰지 않고 위도/경도 범위 조건(BETWEEN)으로 처리 중입니다. 안양시 규모에서는 충분하지만, 전국 규모로 확장되면 데이터 건수 증가에 따라 범위 조건만으로는 성능 한계에 부딪힐 수 있습니다.",
            improvement:
              "서비스가 전국 규모로 확장될 경우 MySQL의 SPATIAL INDEX(R-Tree 기반)를 도입하여 ST_Contains, ST_Within 등 공간 함수 기반 쿼리로 전환하거나, PostGIS 같은 공간 DB로 이관을 검토합니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. 2중 캐싱 기반 데이터 효율화
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
          "구역 데이터는 Key-Value 형태로 저장하기 적합한 정적 데이터입니다. Key-Value 저장소로 Redis를 검토했지만, 학생 신분으로 Redis 인프라를 지속 운영하기 어려웠습니다. 브라우저에 내장된 Key-Value 데이터베이스인 IndexedDB가 추가 인프라 없이 동일한 역할을 할 수 있다고 판단하여 선택했습니다. IndexedDB(30일 보존)와 TanStack Query(staleTime 1시간)를 조합한 2중 캐싱 구조로, 월말 배치 스케줄러로 변경분만 차분 업데이트하고 버전 정보 기준으로 캐시를 무효화합니다.",
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
  ],
};
