import { ProjectDeepDive } from "./types";

// PhantomFile 딥다이브 상세 데이터
// 각 토픽은 성과 섹션의 소단원을 배경→비교→구현→검증→한계점 구조로 재구성한 것입니다.
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
      background: {
        summary:
          "키-값 단건 조회만 필요한 휘발성 파일 공유 서비스에서 RDS는 오버스펙이었습니다.",
        context:
          "파일을 업로드하면 만료 시간이 지나면 자동 삭제되는 1회성 공유 서비스입니다. 데이터 접근 패턴은 파일 ID로 단건 조회, 상태 갱신(업로드 완료·만료·삭제)이 전부이며, 여러 파일을 조건으로 묶거나 집계하는 쿼리는 없습니다.",
        painPoints: [
          "단순 키-값 조회만 필요한데 RDS의 복잡한 JOIN·집계 기능이 불필요",
          "Lambda 동시 실행 수 × 커넥션 = 풀 초과 — 서버리스 환경에서 RDS 커넥션 풀 고갈 문제 발생",
          "TTL 기반 자동 만료가 핵심인데 RDS는 별도 스케줄러/크론잡이 필요",
          "인스턴스 유지 비용·패치 등 운영 부담이 개인 프로젝트에 과도함",
        ],
      },
      comparison: {
        summary:
          "키-값 접근 패턴, 서버리스 친화성, TTL 네이티브 지원을 근거로 DynamoDB를 선택했습니다.",
        options: [
          {
            name: "RDS (MySQL/PostgreSQL)",
            pros: [
              "복잡한 JOIN 쿼리와 집계 분석에 유리",
              "트랜잭션 처리가 강력함",
              "익숙한 SQL 기반 데이터 모델링",
            ],
            cons: [
              "이 서비스에선 복잡한 쿼리가 필요한 시나리오가 없어 오버스펙",
              "Lambda 동시 실행마다 커넥션을 점유해 풀 고갈 위험 (동시 실행 수 × 커넥션 = 풀 초과)",
              "TTL 만료 처리를 위해 별도 스케줄러/크론잡 구성 필요",
              "인스턴스 고정 비용 발생 및 패치·운영 부담",
            ],
          },
          {
            name: "DynamoDB",
            pros: [
              "파일 ID 기반 키-값 단건 조회에 최적",
              "네이티브 서버리스 연동 — 커넥션 풀 관리 불필요",
              "TTL 네이티브 지원 + Streams 연동으로 만료 파이프라인 자연스럽게 구성",
              "완전 관리형으로 운영 부담 없음",
              "요청량 비례 과금으로 유휴 비용 제로",
            ],
            cons: [
              "복잡한 쿼리 불가능 — 이 서비스에서 필요한 통계가 없으므로 현재는 허용 가능",
              "비용 예측이 어려움 — 개인 서비스 규모에서 실제 측정 필요",
              "향후 관리자 대시보드 등 추가 시 DynamoDB 한계에 부딪힐 수 있음",
            ],
          },
        ],
        decision:
          "이 서비스에서 복잡한 쿼리가 필요한 시나리오가 없고, 서버리스 아키텍처에서 RDS 커넥션 풀 고갈 문제(Lambda 동시 실행 수 × 커넥션 = 풀 초과)가 발생하며, TTL → Streams 연동이 이 서비스의 핵심 파이프라인 시작점이기 때문에 DynamoDB를 선택해야 자연스러운 흐름이 만들어진다고 판단했습니다.",
        tradeOff:
          "복잡한 통계 쿼리가 불가능하지만 현재 필요한 통계가 없으므로 허용 가능합니다. 향후 관리 기능(관리자 대시보드 등) 추가 시 DynamoDB 한계에 부딪힐 수 있으며, 이 시점이 오면 설계를 재검토할 것입니다.",
      },
      implementation: {
        summary:
          "파일 ID 기반 단건 조회 + TTL 자동 만료 + Streams 연동으로 서비스 핵심 파이프라인을 구성했습니다.",
        description:
          "DynamoDB 테이블에 파일 메타데이터(파일 ID, 링크, 만료 시각, 상태)를 저장하고, TTL 속성으로 만료 시각을 설정합니다. TTL 만료 시 Streams에 REMOVE 이벤트가 기록되어 후속 삭제 파이프라인의 시작점이 됩니다. 파일 자체는 S3 Pre-signed URL을 통해 클라이언트가 직접 업로드/다운로드하며, Lambda는 메타데이터 처리와 URL 발급만 담당합니다.",
        architecture: "phantom-file/phantomfile-serverless-architecture.jpg",
        architectureType: "image",
        steps: [
          "DynamoDB 테이블 설계: 파일 ID를 파티션 키로, 만료 시각을 TTL 속성으로 설정",
          "파일 업로드 시 메타데이터(링크, 만료 시각, 상태) 저장 및 TTL 자동 설정",
          "TTL 만료 → DynamoDB Streams REMOVE 이벤트 → 후속 삭제 파이프라인 트리거",
          "S3 Pre-signed URL 발급으로 Lambda 파일 중계 제거 → API Gateway 10MB 제한 회피",
          "Terraform IaC로 DynamoDB 테이블 및 전체 인프라 코드화",
        ],
      },
      verification: {
        summary:
          "월 운영비 $5 이하 달성, 파일 조회 P99 671ms의 안정적인 응답 성능을 확보했습니다.",
        description:
          "DynamoDB 도입으로 RDS 대비 운영 비용과 관리 부담을 대폭 절감하고, 키-값 조회 성능을 검증했습니다.",
        metrics: [
          {
            label: "월 운영비",
            value: "$5 이하",
            description:
              "DynamoDB 요청량 비례 과금 + Lambda 사용량 과금으로 유휴 비용 제로",
          },
          {
            label: "파일 조회 P99 응답 시간",
            value: "671ms",
            description:
              "DynamoDB 단건 조회 기반, K6 부하테스트 10분간 약 9,800건 처리 기준",
          },
          {
            label: "커넥션 풀 관리",
            value: "불필요",
            description:
              "DynamoDB HTTP API 기반으로 Lambda 동시 실행 시에도 커넥션 고갈 없음",
          },
        ],
      },
      limitations: {
        summary:
          "관리자 대시보드 등 복잡한 쿼리가 필요한 시점이 오면 설계를 재검토할 것입니다.",
        items: [
          {
            limitation:
              "DynamoDB는 복잡한 통계 쿼리(다중 조건 필터, 집계, JOIN)를 지원하지 않아, 향후 관리자 대시보드나 분석 기능 추가 시 한계에 부딪힐 수 있습니다.",
            improvement:
              "현재는 필요한 통계가 없으므로 허용 가능하며, 관리 기능이 필요한 시점에 DynamoDB Streams → S3 → Athena 파이프라인으로 분석 레이어를 분리하거나, 해당 기능만 RDS로 이관하는 방식을 검토할 수 있습니다.",
          },
          {
            limitation:
              "요청량 비례 과금 구조로 트래픽이 급증하면 비용 예측이 어렵습니다.",
            improvement:
              "DynamoDB Auto Scaling의 최대 용량 제한 설정과 CloudWatch 비용 알람을 구성하여 예상치 못한 비용 급증을 사전에 감지할 수 있습니다. 현재 개인 서비스 규모에서 실제 월 $5 이하로 운영 중입니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2. 이벤트 기반 후처리 파이프라인 — 설계 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "event-pipeline",
      title: "이벤트 기반 후처리 파이프라인 - 설계 문서",
      subtitle:
        "파일 만료 후 S3 삭제까지의 안정적인 비동기 파이프라인 설계 과정",
      background: {
        summary:
          "만료된 파일이 S3에 잔존하면 스토리지 비용 누수와 서비스 신뢰도 문제가 발생합니다.",
        context:
          "파일 만료 후 S3 객체와 DB 레코드가 남아있으면 두 가지 문제가 생깁니다. 첫째, 삭제되지 않은 S3 객체가 누적되어 스토리지 비용이 지속적으로 누수됩니다. 둘째, 만료된 URL이 여전히 살아있는 것처럼 보여 서비스 신뢰도가 훼손됩니다. 처음에는 Lambda가 만료 시간을 주기적으로 체크해서 직접 삭제하는 크론잡 방식을 고려했습니다.",
        painPoints: [
          "크론잡이 실행 중 실패하면 해당 배치 전체가 유실되어 삭제되지 않은 파일이 잔존",
          "Lambda 타임아웃(최대 15분) 내에 처리해야 하는 건수 한계 — 만료 파일이 많으면 처리 불가",
          "만료 즉시 처리가 아니라 주기적 처리라 삭제까지 지연이 발생",
          "재처리 로직을 직접 구현해야 하며, 실패 건 추적과 복구가 복잡함",
        ],
      },
      comparison: {
        summary:
          "크론잡의 배치 유실·재처리 한계를 해결하기 위해 이벤트 기반 파이프라인을 선택했습니다.",
        options: [
          {
            name: "크론잡 방식 (Lambda 주기적 스캔 + 삭제)",
            pros: ["구현이 단순하고 직관적", "추가 AWS 서비스 불필요"],
            cons: [
              "실행 중 실패 시 해당 배치 전체 유실",
              "Lambda 타임아웃(최대 15분) 내 처리 건수 한계",
              "만료 즉시 처리가 아닌 주기적 처리로 삭제 지연 발생",
              "재처리 로직을 직접 구현해야 하며 실패 건 추적이 복잡",
            ],
          },
          {
            name: "이벤트 기반 파이프라인 (TTL → Streams → Pipes → SQS → Lambda)",
            pros: [
              "TTL 만료 시 자동으로 이벤트 발생 — 크론 스케줄링 불필요",
              "SQS가 메시지를 보존하므로 Lambda 실패 시에도 자동 재시도 보장",
              "최종 실패 메시지는 DLQ로 격리되어 수동 재처리 가능",
              "EventBridge Pipes 필터로 TTL 만료 삭제만 골라내어 불필요한 Lambda 호출 제거",
              "각 단계별 독립적 모니터링 가능",
            ],
            cons: [
              "파이프라인 구성 복잡도 증가 (5개 서비스 연동)",
              "TTL 만료와 Streams 이벤트 발행 사이 최대 수십 분 지연 가능",
              "디버깅 시 여러 서비스 로그를 추적해야 함",
            ],
          },
        ],
        decision:
          "크론잡 방식은 배치 실패 시 전체 유실, 타임아웃 한계, 재처리 구현 부담이 있어 선택하지 않았습니다. 이벤트 기반 파이프라인은 SQS가 메시지를 보존하고 Lambda 실패 시 자동 재시도하며, 최종 실패는 DLQ로 격리하기 때문에 데이터 유실 없이 안정적인 후처리가 보장됩니다.",
        tradeOff:
          "EventBridge에서 Lambda를 바로 트리거하면 재시도 보장이 약합니다. SQS를 중간에 넣은 이유는 메시지 보존과 자동 재시도, DLQ 격리를 통해 Lambda가 오류를 던져도 메시지가 SQS에 남아있어 데이터 유실이 없기 때문입니다.",
      },
      implementation: {
        summary:
          "TTL → Streams → Pipes → SQS → Lambda 5단계 파이프라인으로 크론 없이 만료 즉시 후처리를 수행합니다.",
        description:
          "각 컴포넌트가 명확한 역할을 담당합니다. DynamoDB TTL이 만료 시각에 레코드 삭제 이벤트를 발생시키고, Streams가 이를 캡처합니다. EventBridge Pipes가 TTL 만료로 인한 삭제만 필터링하여(수동 삭제와 구분) SQS로 전달합니다. SQS는 메시지 보존·재시도 관리·DLQ 연결을 담당하며, 이 단계가 있어야 Lambda 실패 시 재처리가 보장됩니다. 최종적으로 Cleanup Lambda가 실제 S3 삭제 및 후처리를 수행합니다.",
        architecture: "phantom-file/phantomfile-event-pipeline.png",
        architectureType: "image",
        steps: [
          "DynamoDB TTL: 만료 시각이 되면 자동으로 레코드 삭제 이벤트 발생",
          "DynamoDB Streams: TTL 삭제 이벤트를 캡처하여 순서대로 기록",
          "EventBridge Pipes: eventName == REMOVE 필터로 TTL 만료 삭제만 골라냄 (수동 삭제와 구분)",
          "SQS Main Queue: 메시지 보존 + 자동 재시도 + DLQ 연결 — Lambda 실패 시에도 이벤트 유실 없음",
          "Cleanup Lambda: S3 DeleteObject 실행으로 실제 파일 삭제 수행",
          "DLQ: 반복 실패 메시지를 격리하여 수동 재처리 가능",
        ],
      },
      verification: {
        summary:
          "Lambda에 의도적 오류를 주입하여 SQS 재시도 → DLQ 격리 → 수동 재처리까지 전 과정을 검증했습니다.",
        description:
          "장애 주입 테스트로 파이프라인의 안정성을 검증했습니다. Lambda에 의도적으로 오류를 발생시킨 후, SQS가 자동 재시도하고 최종 실패 시 DLQ에 격리되는 과정을 단계별로 확인했습니다. DLQ에 격리된 메시지를 수동으로 Main Queue에 재투입하여 최종 성공까지 확인했습니다.",
        metrics: [
          {
            label: "장애 주입 재처리 성공률",
            value: "100%",
            description:
              "Lambda 강제 오류 → SQS 재시도 → DLQ 격리 → 수동 재처리까지 전 과정 성공",
          },
          {
            label: "이벤트 유실",
            value: "0건",
            description:
              "SQS 메시지 보존으로 Lambda 오류 시에도 메시지가 큐에 남아 유실 없음",
          },
        ],
        evidence: [
          "Lambda에 의도적 오류 발생 → SQS 자동 재시도(maxReceiveCount 도달) → DLQ 격리 확인",
          "DLQ에 격리된 메시지를 수동으로 Main Queue에 재투입하여 S3 파일 삭제 최종 성공 확인",
          "파이프라인 각 단계(Streams → Pipes → SQS → Lambda → DLQ)의 이벤트 전달 정상 동작 확인",
        ],
      },
      limitations: {
        summary:
          "TTL-Streams 간 지연과 DLQ 알람 미설정은 향후 개선이 필요한 항목입니다.",
        items: [
          {
            limitation:
              "TTL 만료와 Streams 이벤트 발행 사이에 AWS 공식 문서 기준 최대 수십 분의 지연이 발생할 수 있습니다. 즉시성이 필요한 서비스라면 이 아키텍처는 적합하지 않습니다.",
            improvement:
              "현재 서비스 특성상 수십 분 지연은 허용 가능한 수준이지만, 즉시 삭제가 필요한 경우 Lambda에서 만료 시각을 직접 체크하여 Pre-signed URL 발급을 차단하는 방어 로직을 병행할 수 있습니다.",
          },
          {
            limitation:
              "현재 DLQ에 메시지가 쌓여도 알람이 설정되어 있지 않아, 실제 운영 환경에서는 실패 건을 인지하지 못할 수 있습니다.",
            improvement:
              "CloudWatch 알람으로 DLQ 메시지 수(ApproximateNumberOfMessagesVisible) 증가 시 SNS/Discord 알림을 발송하도록 구성하면 실패 건을 즉시 인지하고 대응할 수 있습니다. 향후 개선 항목으로 기록합니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. K6 부하 테스트 — 결과 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "performance-optimization",
      title: "K6 부하 테스트 - 결과 문서",
      subtitle: "Lambda 설정별 응답 분포 관찰과 서버리스 환경의 실측 성능 분석",
      background: {
        summary:
          "서버리스의 콜드 스타트와 동시성 한계를 사전에 파악하기 위해 부하 테스트를 수행했습니다.",
        context:
          "서버리스는 콜드 스타트와 동시성 한계가 있기 때문에 실제 동시 요청이 몰렸을 때 어떻게 동작하는지 사전에 파악하고 싶었습니다. 테스트 목표는 절대 성능 수치보다 'Lambda 설정(메모리·동시성)을 바꿨을 때 응답 분포가 어떻게 달라지는가'를 관찰하는 것이었습니다.",
        painPoints: [
          "Lambda 콜드 스타트가 실제 사용자 경험에 미치는 영향 미검증",
          "Lambda 메모리 설정(128MB/512MB/1024MB)별 응답 성능 차이 미확인",
          "동시 요청이 몰렸을 때 스로틀링 발생 지점 미파악",
          "비용 대비 최적의 Lambda 메모리 설정값 근거 부재",
        ],
      },
      comparison: {
        summary:
          "실제 사용 흐름을 시나리오로 작성하여 K6로 Lambda 설정별 응답 분포를 비교 관찰했습니다.",
        options: [
          {
            name: "수동 테스트 (Postman 등)",
            pros: ["설정이 간단함", "개별 API 동작 확인에 적합"],
            cons: [
              "동시 요청 시뮬레이션 불가",
              "Lambda 설정별 응답 분포 비교 어려움",
              "반복 실행 자동화 어려움",
            ],
          },
          {
            name: "K6 시나리오 기반 부하테스트",
            pros: [
              "실제 사용 흐름(업로드 URL 요청 → 업로드 완료 → 파일 조회) 시나리오 작성 가능",
              "가상 사용자 수 및 램프업 설정으로 점진적 부하 증가",
              "P50, P95, P99 등 상세 응답 분포 분석",
              "Lambda 메모리 설정별 반복 측정으로 비교 가능",
            ],
            cons: [
              "실제 파일 업로드(멀티파트) 시나리오 구현이 어려워 단순화 필요",
              "테스트 환경과 프로덕션 환경 차이 존재",
            ],
          },
        ],
        decision:
          "파일 업로드 URL 요청 → 업로드 완료 처리 → 파일 조회 흐름을 K6 시나리오로 작성하고, Lambda 메모리 설정을 변경하며 반복 측정하여 응답 분포 변화를 관찰하는 방식을 선택했습니다.",
      },
      implementation: {
        summary:
          "최대 50 VUs, 10분간 약 9,800건 처리. 링크 생성 → 목록 조회 → 단건 조회 → 다운로드 → 삭제 전체 흐름을 시나리오로 구성했습니다.",
        description:
          "K6로 실제 사용 흐름(링크 생성 → 목록 조회 → 단건 조회 → 다운로드 → 삭제)을 시나리오로 작성하고, 최대 50 VUs(가상 사용자)로 10분간 부하를 인가했습니다. 각 API 엔드포인트별 P95 임계치를 설정하고, Lambda 메모리 설정(128MB/512MB/1024MB)을 변경하며 응답 분포 변화를 관찰했습니다.",
        steps: [
          "K6 시나리오 작성: create_link → list_links → get_link → download → delete_link 실제 사용 흐름 구현",
          "임계치 설정: create_link P99 < 3000ms, 나머지 API P95 < 2000ms, 오류율 < 5%",
          "가상 사용자 램프업: 0 → 50 VUs 점진적 증가, 10분간 유지",
          "Lambda 메모리 설정별(128MB/512MB/1024MB) 반복 측정으로 응답 분포 비교",
        ],
      },
      verification: {
        summary:
          "전체 체크 100% 통과, P99 671ms 달성. 512MB → 1024MB 증설 시 비용 대비 개선 폭이 작아 512MB가 최적 설정임을 확인했습니다.",
        description:
          "10분간 약 9,865건의 HTTP 요청을 처리하며 18,832건의 체크를 100% 통과했습니다. 개인 서비스 규모의 동시 사용자 기준으로 측정한 것이며, 대규모 프로덕션(수백~수천 TPS)과 직접 비교할 수 없습니다. 이 테스트에서 얻은 핵심 인사이트는 메모리를 512MB → 1024MB로 올렸을 때 비용 대비 응답 개선 폭이 작아 512MB가 적절한 설정이라는 판단입니다.",
        metrics: [
          {
            label: "총 HTTP 요청 수",
            value: "9,865건",
            description: "10분간 평균 16.4 req/s, 최대 50 VUs",
          },
          {
            label: "체크 통과율",
            value: "100%",
            description: "18,832건 전체 통과 (응답 코드, 응답 본문 검증 포함)",
          },
          {
            label: "create_link P99",
            value: "671ms",
            description:
              "링크 생성 API — 콜드 스타트 영향이 가장 큰 엔드포인트",
          },
          {
            label: "get_link P95",
            value: "28.8ms",
            description: "단건 조회 — DynamoDB 키-값 조회 성능 확인",
          },
          {
            label: "list_links P95",
            value: "665ms",
            description: "목록 조회 — 스캔 기반으로 상대적으로 높은 지연",
          },
          {
            label: "HTTP 오류율",
            value: "17.61%",
            description:
              "Lambda 동시성 제한(계정 할당값 10)으로 인한 스로틀링 — 임계치 5% 초과",
          },
        ],
        evidence: [
          "create_link P95 35ms, delete_link P95 38ms, download P95 36ms — 대부분의 API가 안정적인 응답 분포",
          "list_links P95 665ms — 스캔 기반 조회로 다른 API 대비 높은 지연, 인덱스 최적화 검토 필요",
          "Lambda 메모리 512MB → 1024MB 증설 시 P95 개선 폭 미미 — 비용 대비 512MB가 최적 설정으로 판단",
          "오류율 17.61%는 Lambda 동시성 한도(계정 할당값 10) 기인 — Reserved Concurrency 상향으로 해결 가능",
        ],
      },
      limitations: {
        summary:
          "단순화된 시나리오와 개인 서비스 규모 한계를 인지하고, 실사용자 트래픽 기반 재측정을 계획합니다.",
        items: [
          {
            limitation:
              "실제 파일 업로드(멀티파트) 시나리오를 K6로 구현하기 어려워, Pre-signed URL 발급까지만 테스트하고 실제 S3 업로드는 단순화했습니다. 실제 사용자 경험과 차이가 있을 수 있습니다.",
            improvement:
              "향후 실사용자 트래픽 패턴이 축적되면 해당 데이터를 기반으로 시나리오를 보완하고 재측정할 계획입니다. S3 업로드 지연까지 포함한 E2E 시나리오 구성을 검토합니다.",
          },
          {
            limitation:
              "개인 서비스 규모(최대 50 VUs, 16.4 req/s)에서 측정한 결과이며, 대규모 프로덕션 환경(수백~수천 TPS)과 직접 비교할 수 없습니다.",
            improvement:
              "서비스 규모가 커질 경우 VUs를 단계적으로 늘려 스로틀링 발생 지점을 재확인하고, Reserved Concurrency 상향 또는 ECS Fargate 이관 시점을 판단하는 기준 데이터로 활용할 수 있습니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 4. Terraform IaC 및 보안 강화 — 구성 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "terraform-iac",
      title: "Terraform IaC 및 보안 강화 - 구성 문서",
      subtitle: "인프라 코드화와 AI 생성 코드의 보안 검증 과정",
      background: {
        summary:
          "수동 콘솔 작업은 설정 추적이 안 되고 재현이 어려워 IaC 도입이 필요했습니다.",
        context:
          "수동으로 AWS 콘솔에서 리소스를 만들면 어떤 설정을 했는지 추적이 안 되고, 실수로 삭제하면 동일한 환경을 재현하기 어렵습니다. 특히 Lambda, DynamoDB, SQS, EventBridge, S3, API Gateway, IAM 등 다수의 서비스가 연동된 서버리스 아키텍처에서는 리소스 간 의존 관계를 코드로 명시하고 버전 관리하는 것이 필수적이었습니다.",
        painPoints: [
          "콘솔에서 수동 생성한 리소스의 설정값 추적 불가 — 어떤 설정을 했는지 기억에 의존",
          "실수로 리소스 삭제 시 동일한 환경 재현이 어려움",
          "다수의 AWS 서비스(Lambda, DynamoDB, SQS, EventBridge, S3, API Gateway, IAM) 간 의존 관계 관리 복잡",
          "AI 도구로 생성한 인프라 코드의 보안 설정 검증 필요",
        ],
      },
      comparison: {
        summary:
          "멀티 클라우드 지원과 선언형 구문의 직관성을 근거로 Terraform을 선택했습니다.",
        options: [
          {
            name: "AWS CDK",
            pros: [
              "TypeScript 등 익숙한 프로그래밍 언어로 인프라 정의",
              "AWS 서비스와 깊은 통합",
              "반복문·조건문 등 프로그래밍 패턴 활용 가능",
            ],
            cons: [
              "AWS 전용 — 멀티 클라우드 확장 불가",
              "CloudFormation으로 변환되는 과정에서 디버깅 어려움",
              "추상화 레이어가 두꺼워 실제 리소스 설정 파악이 어려울 수 있음",
            ],
          },
          {
            name: "AWS SAM",
            pros: [
              "서버리스 애플리케이션에 특화된 간결한 문법",
              "로컬 테스트(sam local) 지원",
              "CloudFormation 기반으로 AWS 네이티브",
            ],
            cons: [
              "서버리스 외 리소스(VPC, CloudFront 등) 관리에 제한적",
              "AWS 전용 — 멀티 클라우드 확장 불가",
              "복잡한 인프라 구성에는 CloudFormation 직접 작성 필요",
            ],
          },
          {
            name: "Terraform",
            pros: [
              "선언형 HCL 구문으로 리소스 설정이 직관적",
              "멀티 클라우드 지원 — AWS 외 다른 클라우드로 확장 가능",
              "plan 명령으로 변경 사항 사전 확인 가능",
              "커뮤니티와 모듈 생태계가 풍부",
              "Kiro AWS Terraform MCP와 연동하여 초기 코드 생성 가능",
            ],
            cons: [
              "HCL 문법 학습 필요",
              "상태 파일(tfstate) 관리 부담",
              "AWS 신규 서비스 지원이 CDK/SAM 대비 느릴 수 있음",
            ],
          },
        ],
        decision:
          "멀티 클라우드 확장 가능성, 선언형 HCL의 직관성, plan 명령을 통한 변경 사전 확인, 그리고 Kiro AWS Terraform MCP와의 연동을 근거로 Terraform을 선택했습니다.",
      },
      implementation: {
        summary:
          "7개 AWS 서비스를 Terraform으로 코드화하고, AI 생성 코드에서 발견한 보안 문제 2건을 수정했습니다.",
        description:
          "Kiro AWS Terraform MCP로 초기 인프라 코드를 생성한 뒤, 보안 검증 과정에서 IAM 과도 권한과 S3 퍼블릭 접근 차단 누락 2건을 발견하여 수정했습니다. Lambda, DynamoDB, SQS(Main + DLQ), EventBridge Pipes, S3, API Gateway, IAM Role/Policy를 모두 Terraform으로 관리합니다.",
        steps: [
          "Kiro AWS Terraform MCP로 Lambda, DynamoDB, SQS, EventBridge, S3, API Gateway, IAM 초기 코드 생성",
          "IAM 보안 수정: Cleanup Lambda에 s3:* 와일드카드 권한이 부여되어 있었음 → s3:DeleteObject + 해당 버킷 ARN으로 최소 권한 원칙 적용",
          "S3 보안 수정: aws_s3_bucket_public_access_block 리소스가 누락되어 퍼블릭 ACL이 차단되지 않았음 → block_public_acls, block_public_policy, ignore_public_acls, restrict_public_buckets 전부 true로 설정",
          "AI 생성 코드 보안 검증 체크리스트 적용: IAM 최소 권한 확인, S3 퍼블릭 접근 차단 확인, 환경 변수에 시크릿 노출 여부 확인, 리소스 간 의존 관계 정합성 확인",
        ],
        codeSnippets: [
          {
            title: "IAM 최소 권한 원칙 적용 (수정 후)",
            language: "hcl",
            code: `# Cleanup Lambda IAM 정책 — 최소 권한 원칙 적용
resource "aws_iam_role_policy" "cleanup_lambda" {
  name = "cleanup-lambda-s3-delete"
  role = aws_iam_role.cleanup_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:DeleteObject"]  # s3:* → s3:DeleteObject로 축소
        Resource = "\${aws_s3_bucket.files.arn}/*"
      }
    ]
  })
}`,
          },
          {
            title: "S3 퍼블릭 접근 차단 설정 (누락 → 추가)",
            language: "hcl",
            code: `# S3 퍼블릭 접근 전면 차단 — AI 생성 코드에서 누락된 리소스
resource "aws_s3_bucket_public_access_block" "files" {
  bucket = aws_s3_bucket.files.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`,
          },
        ],
      },
      verification: {
        summary:
          "IAM 과도 권한 1건, S3 퍼블릭 접근 차단 누락 1건을 검출·수정하고, 보안 검증 체크리스트를 수립했습니다.",
        description:
          "AI 생성 코드의 보안 검증 과정에서 2건의 보안 문제를 발견하고 수정했습니다. 이 경험을 바탕으로 AI 생성 인프라 코드를 검증하는 체크리스트를 수립했습니다.",
        metrics: [
          {
            label: "보안 문제 검출",
            value: "2건",
            description:
              "IAM 와일드카드 권한 1건 + S3 퍼블릭 접근 차단 누락 1건",
          },
          {
            label: "IaC 관리 리소스",
            value: "7개 서비스",
            description:
              "Lambda, DynamoDB, SQS, EventBridge, S3, API Gateway, IAM",
          },
          {
            label: "인프라 재현성",
            value: "terraform apply 1회",
            description: "전체 인프라를 코드에서 동일하게 재현 가능",
          },
        ],
        evidence: [
          "AI 생성 코드 보안 검증 체크리스트",
          "  1. IAM 정책에 와일드카드(*) 액션/리소스 없는지 확인",
          "  2. S3 퍼블릭 접근 차단 블록 존재 여부 확인",
          "  3. 환경 변수에 시크릿(API 키, DB 비밀번호) 하드코딩 여부 확인",
          "  4. 리소스 간 의존 관계(ARN 참조) 정합성 확인",
          "  5. terraform plan으로 의도하지 않은 리소스 변경 없는지 확인",
          "terraform plan → apply 과정에서 의도하지 않은 리소스 변경 없이 정상 배포 확인",
        ],
      },
      limitations: {
        summary:
          "tfstate 로컬 관리와 환경 분리 미적용은 다음 프로젝트에서 개선할 항목으로 기록합니다.",
        items: [
          {
            limitation:
              "tfstate를 로컬에서 관리 중이라 팀 협업이나 CI/CD 연동 시 상태 파일 충돌 위험이 있습니다.",
            improvement:
              "S3 + DynamoDB 원격 백엔드를 적용하여 상태 파일을 중앙 관리하고, 상태 잠금(locking)으로 동시 수정 충돌을 방지할 수 있습니다. 다음 프로젝트에서 적용할 개선 항목으로 기록합니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 5. 인증 트러블슈팅 — 문서
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "auth-troubleshooting",
      title: "인증 트러블슈팅 - 문서",
      subtitle:
        "Supabase JWT와 API Gateway 서명 알고리즘 불일치 원인 추적 및 해결 과정",
      background: {
        summary:
          "Supabase Auth와 API Gateway JWT Authorizer를 연동하는 과정에서 모든 인증 요청이 실패했습니다.",
        context:
          "Supabase Auth로 사용자 인증(회원가입·로그인)을 처리하고, API Gateway JWT Authorizer로 토큰을 검증하여 Lambda에 인증된 요청만 전달하는 구조를 설계했습니다. Supabase는 프론트엔드 인증 UI와 토큰 발급을 담당하고, API Gateway는 토큰 검증을 담당하는 역할 분리 구조입니다.",
        painPoints: [
          "API Gateway에서 모든 인증 요청이 403 에러로 실패",
          "프론트엔드에서 Supabase 로그인은 정상 — 토큰 발급까지는 문제없음",
          "토큰을 Authorization 헤더에 포함하여 API 호출 시 일관되게 실패",
          "에러 메시지만으로는 원인 파악이 어려워 추적 과정이 필요했음",
        ],
      },
      comparison: {
        summary:
          "CORS, 환경변수, API Gateway 설정을 순서대로 의심했지만, CloudWatch 로그에서 서명 알고리즘 불일치를 확인했습니다.",
        options: [
          {
            name: "의심 1: CORS 설정 문제",
            pros: [
              "프론트엔드-백엔드 간 통신 실패의 가장 흔한 원인",
              "브라우저 콘솔에서 즉시 확인 가능",
            ],
            cons: [
              "CORS 에러는 브라우저 콘솔에 별도 메시지가 표시됨 — 이번 케이스에서는 CORS 에러 없음",
              "403 응답은 CORS가 아닌 인증 레이어 문제를 가리킴",
            ],
          },
          {
            name: "의심 2: 환경변수 또는 API Gateway 설정 오류",
            pros: [
              "Issuer URL, Audience 값 오타는 흔한 실수",
              "설정값 비교로 빠르게 확인 가능",
            ],
            cons: [
              "Issuer, Audience 설정값을 확인했으나 정상 — 이 원인은 아니었음",
              "설정값이 맞는데도 실패하면 더 깊은 원인 추적 필요",
            ],
          },
          {
            name: "의심 3: JWT 서명 알고리즘 불일치 (실제 원인)",
            pros: [
              "CloudWatch 로그에서 'signing method ES256 is invalid' 메시지로 명확히 확인",
              "Supabase 기본 서명(ES256)과 API Gateway 지원(RS256)의 불일치가 근본 원인",
            ],
            cons: [
              "서명 알고리즘 차이는 설정 화면에서 바로 보이지 않아 로그 분석이 필수",
              "ES256과 RS256의 차이를 이해해야 정확한 해결이 가능",
            ],
          },
        ],
        decision:
          "CloudWatch 로그에서 'signing method ES256 is invalid' 메시지를 확인하고, Supabase의 기본 JWT 서명 알고리즘(ES256)과 API Gateway JWT Authorizer가 지원하는 알고리즘(RS256)의 불일치가 원인임을 파악했습니다. RS256은 RSA 기반 공개키/개인키 방식이고, ES256은 타원곡선 기반 방식으로 서로 호환되지 않습니다.",
        tradeOff:
          "Supabase 설정에서 알고리즘을 RS256으로 변경하면 API Gateway JWT Authorizer를 그대로 활용할 수 있어 Lambda Authorizer 대비 비용과 지연 시간이 절감됩니다.",
      },
      implementation: {
        summary:
          "Supabase 프로젝트 설정에서 JWT 서명 알고리즘을 ES256 → RS256으로 변경하여 즉시 해결했습니다.",
        description:
          "CloudWatch 로그 분석으로 서명 알고리즘 불일치를 확인한 뒤, Supabase 프로젝트 설정에서 JWT 서명 알고리즘을 API Gateway가 지원하는 RS256으로 변경했습니다. 변경 후 새로운 RS256 키로 토큰이 재발급되고, API Gateway JWT Authorizer가 정상적으로 토큰을 검증합니다.",
        steps: [
          "증상 확인: API Gateway에서 모든 인증 요청 403 실패",
          "1차 의심(CORS): 브라우저 콘솔 확인 → CORS 에러 없음 → 배제",
          "2차 의심(설정 오류): API Gateway Issuer, Audience 설정값 확인 → 정상 → 배제",
          "CloudWatch 로그 확인: 'signing method ES256 is invalid' 에러 메시지 발견 → 서명 알고리즘 불일치 확인",
          "Supabase 프로젝트 설정에서 JWT 서명 알고리즘을 ES256 → RS256으로 변경",
          "변경 후 새 RS256 키로 토큰 재발급 → API Gateway 인증 정상 동작 확인",
        ],
        codeSnippets: [
          {
            title: "API Gateway JWT Authorizer 설정 (Terraform)",
            language: "hcl",
            code: `# API Gateway JWT Authorizer — RS256 알고리즘 기반 검증
resource "aws_apigatewayv2_authorizer" "jwt" {
  api_id           = aws_apigatewayv2_api.main.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "supabase-jwt-authorizer"

  jwt_configuration {
    issuer   = "https://<project-ref>.supabase.co/auth/v1"
    audience = ["authenticated"]
  }
}`,
          },
        ],
      },
      verification: {
        summary:
          "알고리즘 변경 한 번으로 403 에러가 완전히 해소되고, 모든 인증 요청이 정상 처리되었습니다.",
        description:
          "Supabase JWT 서명 알고리즘을 RS256으로 변경한 후 모든 인증 요청이 정상적으로 처리되었습니다. API Gateway JWT Authorizer를 유지하여 Lambda Authorizer 대비 비용과 지연 시간을 절감했습니다.",
        metrics: [
          {
            label: "403 에러",
            value: "완전 해소",
            description: "알고리즘 변경 후 모든 인증 요청 정상 처리",
          },
          {
            label: "인증 방식",
            value: "API Gateway JWT Authorizer 유지",
            description:
              "Lambda Authorizer 대비 Cold Start 제거, 호출 비용 절감",
          },
        ],
        evidence: [
          "CloudWatch 로그에서 'signing method ES256 is invalid' 에러 메시지 확인 — 원인 추적의 결정적 단서",
          "RS256 변경 후 API Gateway 인증 정상 동작 확인",
        ],
      },
      limitations: {
        summary:
          "외부 서비스 연동 시 토큰 서명 방식을 설계 단계에서 확인하고, 오류 발생 시 추측보다 로그를 먼저 확인해야 합니다.",
        items: [
          {
            limitation:
              "외부 서비스(Supabase) 연동 시 토큰 서명 알고리즘 호환성을 설계 단계에서 확인하지 않아, 구현 후에야 문제를 발견했습니다.",
            improvement:
              "외부 인증 서비스 연동 시 설계 단계에서 토큰 서명 방식(RS256/ES256/HS256), JWKS 엔드포인트, Issuer/Audience 값을 사전에 확인하는 체크리스트를 적용합니다.",
          },
          {
            limitation:
              "처음에 CORS, 환경변수 등을 추측으로 의심하며 시간을 소비했습니다. 로그를 먼저 확인했다면 더 빠르게 원인을 파악할 수 있었습니다.",
            improvement:
              "오류 발생 시 추측보다 CloudWatch 로그를 먼저 확인하는 습관을 정립했습니다. 인증 실패 시 로그에서 서명 알고리즘, 토큰 만료, Issuer 불일치 등 구체적인 에러 메시지를 우선 확인합니다.",
          },
        ],
      },
    },
  ],
};
