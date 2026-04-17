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
    // 1. 아키텍처 및 데이터 전략
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "serverless-architecture",
      title: "아키텍처 및 데이터 전략",
      subtitle: "서버리스 인프라 구축과 DynamoDB 도입의 의사결정 과정",
      background: {
        summary:
          "서버리스 전환으로 유휴 비용을 제거하고, DynamoDB로 운영 단순성을 확보했습니다.",
        context:
          "개인 프로젝트 특성상 트래픽이 불규칙하고 예측이 어렵습니다. EC2를 상시 운영하면 유휴 시간에도 비용이 발생하며, 파일 공유 서비스의 접근 패턴은 대부분 단순 키 기반 조회/만료/상태 갱신입니다.",
        painPoints: [
          "트래픽 변동 폭이 큰 개인 서비스에서 EC2 상시 운영 시 유휴 비용 발생",
          "파일 메타데이터는 단순 키-값 접근인데 RDS의 복잡한 JOIN이 불필요",
          "스키마 변경 가능성이 높은 초기 단계에서 RDS의 마이그레이션 부담",
          "서버 운영·패치·스케일링 등 인프라 관리 부담",
        ],
      },
      comparison: {
        options: [
          {
            name: "EC2 + RDS",
            pros: [
              "복잡한 JOIN 쿼리와 통계 분석에 유리",
              "트랜잭션 처리가 강력함",
              "익숙한 SQL 기반 데이터 모델링",
            ],
            cons: [
              "상시 운영 비용 발생 (유휴 시간 포함)",
              "트래픽 급증 시 수동 스케일링 필요",
              "서버 패치·모니터링 등 운영 부담",
              "스키마 변경 시 마이그레이션 필요",
            ],
          },
          {
            name: "Lambda + DynamoDB + S3 (서버리스)",
            pros: [
              "사용량 비례 과금으로 유휴 비용 제로",
              "자동 스케일링으로 트래픽 대응",
              "TTL 내장 기능으로 만료 처리 용이",
              "스키마리스(Schemaless)로 유연한 데이터 모델 변경",
              "서버 운영 부담 제거",
            ],
            cons: [
              "Lambda 동시성 제한으로 급격한 트래픽 급증 시 스로틀링 가능",
              "복잡한 쿼리 패턴에 부적합",
              "Cold Start로 인한 초기 응답 지연",
            ],
          },
        ],
        decision:
          "파일 조회/상태/갱신 위주의 키-값 기반 접근 패턴과 서버리스 친화성, 운영 단순성을 우선순위에 두고 Lambda + DynamoDB + S3 조합을 선택했습니다.",
        tradeOff:
          "Lambda 동시성 제한으로 인해 갑작스러운 트래픽 급증 시 스로틀링이 발생할 수 있으나, 개인 서비스 규모에서 감수 가능한 수준으로 판단했습니다.",
        summary:
          "Lambda+DynamoDB 조합 선택, 동시성 제한은 개인 서비스 규모에서 감수 가능한 수준으로 판단했습니다.",
      },
      implementation: {
        summary:
          "Pre-signed URL로 Lambda 파일 중계를 제거하고, Terraform으로 전체 인프라를 코드화했습니다.",
        description:
          "AWS Lambda, DynamoDB, S3 기반 서버리스 아키텍처를 설계하여 서버 운영 부담을 제거하고, 사용량 비례 과금 구조로 비용을 최적화했습니다. 파일 자체는 S3 Pre-signed URL을 통해 클라이언트가 직접 업로드/다운로드하며, Lambda는 메타데이터 처리와 URL 발급만 담당합니다.",
        architecture: "phantom-file/phantomfile-serverless-architecture.jpg",
        architectureType: "image",
        steps: [
          "S3 Pre-signed URL 발급으로 Lambda를 통한 파일 중계 제거 → API Gateway 10MB 제한 회피",
          "DynamoDB에 파일 메타데이터(링크, 만료 시각, 상태) 저장 및 TTL 설정",
          "Supabase Auth 기반 사용자 인증 → API Gateway JWT Authorizer 연동",
          "Terraform IaC로 전체 AWS 인프라 코드화 및 버전 관리",
        ],
      },
      verification: {
        summary:
          "서버리스 전환으로 월 운영비 $5 이하 달성, 유휴 비용 제로를 실현했습니다.",
        description:
          "서버리스 아키텍처 도입으로 인프라 운영 비용과 관리 부담을 대폭 절감했습니다.",
        metrics: [
          {
            label: "월 운영비",
            value: "$5 이하",
            description: "사용량 비례 과금 구조로 유휴 비용 제로",
          },
          {
            label: "서버 운영 부담",
            value: "제거",
            description: "Lambda 자동 스케일링으로 패치·모니터링 불필요",
          },
          {
            label: "파일 전송 방식",
            value: "Pre-signed URL 직접 전송",
            description: "Lambda 실행 시간과 비용 최소화",
          },
        ],
      },
      limitations: {
        summary:
          "Lambda 동시성 한계는 Reserved Concurrency 조정과 CloudFront WAF Rate Limiting으로 보완 가능합니다.",
        items: [
          {
            limitation:
              "AWS 계정의 Lambda 동시성 기본 한도는 1,000이지만, 실제 적용된 계정 수준 할당값은 10으로 제한되어 120TPS 부하 테스트 시 스로틀링이 발생했습니다.",
            improvement:
              "함수별 Reserved Concurrency를 트래픽 예측치에 맞게 상향하고, API Gateway 앞단에 CloudFront + WAF를 두어 Rate Limiting으로 급격한 트래픽 유입을 제어하거나, 트래픽 규모가 커질 경우 ECS Fargate로 워크로드 이관을 고려할 수 있습니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2. 데이터 수명 주기 및 안정성
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "event-pipeline",
      title: "데이터 수명 주기 및 안정성",
      subtitle: "이벤트 기반 비동기 파일 처리 파이프라인 설계",
      background: {
        summary:
          "TTL 단독 의존 시 최대 48시간 지연으로 만료 파일이 잔존할 수 있어 이벤트 기반 파이프라인이 필요했습니다.",
        context:
          'DynamoDB TTL은 명세상 최대 48시간 지연이 허용되기 때문에, TTL 단독 의존은 "만료되어야 하는 파일이 살아있는 상태"로 접근 가능한 기간이 발생합니다. 파일 만료 후 S3 실제 삭제까지의 후속 처리 안정성과 재처리 보장이 핵심 과제였습니다.',
        painPoints: [
          "DynamoDB TTL 단독 의존 시 최대 48시간 만료 지연 가능",
          "만료된 파일이 S3에 잔존하여 접근 가능한 보안 윈도우 발생",
          "Lambda 일시 장애 시 삭제 이벤트 유실 위험",
          "크론 기반 배치 처리는 정확한 시점 보장이 어려움",
        ],
      },
      comparison: {
        options: [
          {
            name: "TTL 단독 의존",
            pros: ["구현이 단순함", "추가 인프라 불필요"],
            cons: [
              "최대 48시간 만료 지연 허용",
              "S3 파일 실제 삭제 보장 불가",
              "장애 시 이벤트 유실 위험",
            ],
          },
          {
            name: "이벤트 기반 파이프라인 (Streams → Pipes → SQS → Lambda)",
            pros: [
              "TTL 만료 즉시 후속 처리 트리거",
              "SQS 버퍼링으로 이벤트 손실 방지",
              "DLQ + 재시도로 장애 복구 보장",
              "각 단계별 모니터링 가능",
            ],
            cons: [
              "파이프라인 구성 복잡도 증가",
              "추가 AWS 서비스 비용 (미미한 수준)",
              "디버깅 시 여러 서비스 로그 확인 필요",
            ],
          },
        ],
        decision:
          "파일 만료 후 후속 처리의 안정성과 재처리를 보장하기 위해 DynamoDB TTL 만료 이벤트를 Streams → EventBridge Pipes → SQS → Lambda로 이어지는 비동기 파이프라인을 선택했습니다.",
        summary:
          "이벤트 기반 파이프라인 선택, SQS DLQ로 장애 시에도 이벤트 유실 없이 100% 재처리를 보장합니다.",
      },
      implementation: {
        summary:
          "TTL 만료 → Streams → Pipes → SQS → Lambda 5단계 파이프라인으로 크론 없이 정확한 시점에 파일을 삭제합니다.",
        description:
          "DynamoDB TTL 만료 시 Streams에 REMOVE 이벤트가 기록되고, EventBridge Pipes가 이를 필터링하여 SQS로 전달합니다. Cleanup Lambda가 SQS 메시지를 소비하여 S3 파일을 실제 삭제하며, 실패 시 DLQ에 보존됩니다.",
        architecture: `graph TD
  A["DynamoDB TTL 만료"] --> B["DynamoDB Streams"]
  B --> C["EventBridge Pipes"]
  C -->|"REMOVE 필터"| D["SQS Main Queue"]

  D --> E["Cleanup Lambda"]
  E --> F["S3 파일 삭제"]

  D -->|"재시도 실패"| G["SQS DLQ"]
  G --> H["CloudWatch 알람"]
  H --> I["SNS / Discord"]`,
        architectureType: "mermaid",
        steps: [
          "DynamoDB Streams 활성화 → TTL 만료 시 REMOVE 이벤트 자동 기록",
          "EventBridge Pipes에서 eventName == REMOVE 조건 필터 적용 → 불필요한 Lambda 호출 제거",
          "SQS Main Queue로 이벤트 전달 → 버퍼링 및 재시도 보장",
          "Cleanup Lambda가 S3 DeleteObject 실행 (HeadObject 사전 확인 제거로 API 호출 50% 감소)",
          "Redrive Policy로 반복 실패 메시지를 DLQ로 격리 → 관리자 재처리 가능",
        ],
      },
      verification: {
        summary:
          "장애 주입 시 100% 재처리 성공, HeadObject 제거로 API 호출 50% 감소를 검증했습니다.",
        description:
          "테스트 환경에서 TTL 만료 이벤트를 반복 발생시키고, 각 파이프라인 단계의 이벤트 전달과 S3 실제 삭제를 확인했습니다.",
        metrics: [
          {
            label: "장애 시뮬레이션 재처리 성공률",
            value: "100%",
            description:
              "Lambda 강제 오류 발생 시에도 SQS DLQ에 이벤트 보존 후 재처리 성공",
          },
          {
            label: "API 호출 감소",
            value: "50%",
            description:
              "HeadObject 제거로 DeleteObject만 사용하여 네트워크 왕복 제거",
          },
        ],
        evidence: [
          "장애 시뮬레이션(Lambda 강제 오류 발생) 상황에서 SQS DLQ에 이벤트가 보존되어 재처리 가능한 상태 검증",
          "파이프라인 각 단계(Streams → Pipes → SQS → Lambda)의 이벤트 전달 정상 동작 확인",
        ],
      },
      limitations: {
        summary:
          "Pre-signed URL 유효 시간 제한과 만료 상태 검증 로직 추가로 보안 윈도우를 최소화할 수 있습니다.",
        items: [
          {
            limitation:
              "TTL 만료 후 Streams 이벤트가 발생하기까지 최대 수분~수십 분의 지연이 존재합니다. 만료 시각 이후에도 Pre-signed URL이 유효한 경우 파일이 일시적으로 접근 가능한 짧은 윈도우가 남습니다.",
            improvement:
              "Pre-signed URL의 유효 시간을 파일 만료 시각 직전까지만 발급하도록 제한하고, 링크 조회 Lambda(get-link) 내부에서 DynamoDB의 만료 상태를 명시적으로 확인해 만료된 링크는 즉시 410 Gone으로 응답하는 검증 로직을 추가하면 이 윈도우를 최소화할 수 있습니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. 성능 분석 및 시스템 신뢰성
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "performance-optimization",
      title: "성능 분석 및 시스템 신뢰성",
      subtitle: "K6 부하테스트 기반 임계치 분석과 리소스 최적화",
      background: {
        summary:
          "K6 부하테스트로 서버리스 임계치를 검증하고, Terraform MCP로 보안 설정 누락을 사전에 검출했습니다.",
        context:
          "서버리스 아키텍처의 동시 요청 수용 능력을 시뮬레이션하고, 인프라의 응답 한계 지점을 파악해야 했습니다. 또한 Kiro IDE를 활용한 초기 구현에서 발생할 수 있는 보안 설정 누락을 사전에 검출할 필요가 있었습니다.",
        painPoints: [
          "서버리스 환경에서 실제 부하 상황의 응답 성능 미검증",
          "Lambda 메모리 할당량과 동시성 설정의 최적값 미확인",
          "초기 구현 시 과도한 IAM 권한 부여 가능성",
          "S3 보안 설정(퍼블릭 ACL 등) 누락 위험",
        ],
      },
      comparison: {
        options: [
          {
            name: "수동 테스트 (Postman 등)",
            pros: ["설정이 간단함", "개별 API 동작 확인에 적합"],
            cons: [
              "동시 요청 시뮬레이션 불가",
              "임계치 파악 어려움",
              "반복 실행 자동화 어려움",
            ],
          },
          {
            name: "K6 부하테스트",
            pros: [
              "실제 사용 흐름 시나리오 작성 가능",
              "점진적 TPS 증가로 임계치 파악",
              "P99, P95 등 상세 응답 시간 분석",
              "스크립트 기반 반복 실행 가능",
            ],
            cons: [
              "시나리오 작성에 초기 학습 비용",
              "테스트 환경과 프로덕션 환경 차이 존재",
            ],
          },
        ],
        decision:
          "실제 사용 흐름(업로드 → 링크 조회 → 다운로드 → 만료 삭제)을 시나리오로 작성하여 K6로 검증하고, AWS Terraform MCP로 인프라 보안 설정을 재점검하는 방식을 선택했습니다.",
        summary:
          "K6 시나리오 기반 부하테스트로 실제 사용 흐름을 검증하고, Terraform MCP로 보안 설정을 재점검했습니다.",
      },
      implementation: {
        summary:
          "17 TPS 기준 9,800건 처리, P99 671ms 달성. 120TPS에서 Lambda 동시성 병목 지점을 명확히 식별했습니다.",
        description:
          "K6 부하테스트를 활용하여 서버리스 아키텍처의 동시 요청 수용 능력을 시뮬레이션하고, 테스트 결과를 기반으로 Lambda 메모리 할당량과 동시성 설정을 최적화했습니다. 또한 AWS Terraform MCP로 IAM 권한과 S3 보안 설정을 재점검했습니다.",
        steps: [
          "K6 시나리오 작성: 업로드 → 링크 조회 → 다운로드 → 만료 삭제 실제 사용 흐름 구현",
          "점진적 TPS 증가 테스트: 17 TPS → 120 TPS까지 단계적 부하 증가",
          "Lambda 메모리/동시성 설정 튜닝: 테스트 결과 기반 최적값 도출",
          "AWS Terraform MCP로 IAM 권한 최소화 및 S3 퍼블릭 ACL 노출 수정",
        ],
      },
      verification: {
        summary:
          "P99 671ms, 요청 유실 0건 달성. 120TPS에서 Lambda 동시성 한계를 병목으로 명확히 식별했습니다.",
        description:
          "10분간 약 9,800건의 요청을 처리하며 P99 671ms의 안정적인 응답 성능을 확보했습니다. 120TPS에서 Lambda 동시성 제한으로 스로틀링이 발생하는 병목 구간을 명확히 식별했습니다.",
        metrics: [
          {
            label: "테스트 기준 TPS",
            value: "17 TPS",
          },
          {
            label: "총 요청 수 (10분)",
            value: "약 9,800건",
          },
          {
            label: "P99 응답 속도",
            value: "671ms",
            description: "Lambda 메모리 할당량과 동시성 설정 최적화 후 달성",
          },
          {
            label: "요청 유실",
            value: "0건",
          },
          {
            label: "스로틀링 발생 지점",
            value: "120 TPS",
            description: "Lambda 동시성 제한(계정 할당값 10)으로 인한 병목",
          },
        ],
        evidence: [
          "점진적 TPS 증가로 120TPS에서 Lambda 동시성 제한 스로틀링 발생 지점 확인",
          "AWS Terraform MCP로 과도한 IAM 권한 및 S3 보안 설정 누락 검출·수정",
        ],
      },
      limitations: {
        summary:
          "CloudWatch X-Ray 트레이싱과 클라이언트 사이드 AES-GCM 암호화로 Observability와 보안을 강화할 수 있습니다.",
        items: [
          {
            limitation:
              "현재는 DLQ 메시지 수 기준 CloudWatch 알람 + Discord 알림만 구성되어 있어, 각 Lambda 함수의 P99 응답 시간, 에러율, SQS 대기 시간을 가시화하는 Observability가 부족합니다.",
            improvement:
              "CloudWatch Dashboards로 핵심 지표를 한 화면에 통합하거나, AWS X-Ray로 Lambda 간 트레이스를 추가해 어느 단계에서 지연이 발생하는지 추적 가능하게 구성할 수 있습니다.",
          },
          {
            limitation:
              "현재 S3에 업로드되는 파일은 SSE-S3 서버 측 암호화만 적용되어 있고, 클라이언트 사이드 암호화(E2E)는 없습니다. AWS 내부 접근 권한을 가진 주체가 이론적으로 파일에 접근 가능합니다.",
            improvement:
              "Web Crypto API를 활용해 브라우저에서 AES-GCM으로 파일을 암호화한 뒤 S3에 업로드하고, 복호화 키를 URL 프래그먼트(#key=...)에 포함시켜 서버에 키가 전달되지 않는 Zero-Knowledge 구조를 추가할 수 있습니다.",
          },
        ],
      },
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 4. 인증 아키텍처 트러블슈팅
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
      id: "auth-architecture",
      title: "인증 아키텍처 트러블슈팅",
      subtitle: "Supabase JWT와 API Gateway 서명 알고리즘 불일치 해결",
      background: {
        summary:
          "Supabase ES256 기본 설정과 API Gateway RS256 전용 지원의 알고리즘 불일치로 모든 인증 요청이 실패했습니다.",
        context:
          "Supabase Auth로 사용자 인증을 처리하고 API Gateway에서 JWT를 검증하는 구조를 설계했으나, 연동 과정에서 모든 인증 요청이 실패하는 치명적인 문제가 발생했습니다.",
        painPoints: [
          "API Gateway에서 401 Unauthorized 에러 발생으로 모든 요청 실패",
          'CloudWatch 로그에서 "signing method ES256 is invalid" 에러 확인',
          "Supabase 기본 JWT 서명(ES256)과 API Gateway 지원 알고리즘(RS256) 불일치",
          "인증 실패로 서비스 전체 기능 사용 불가",
        ],
      },
      comparison: {
        options: [
          {
            name: "API Gateway JWT Authorizer (RS256)",
            pros: [
              "AWS 관리형 서비스로 운영 부담 없음",
              "Lambda 호출 없이 인증 처리 → 비용 절감",
              "낮은 지연 시간",
              "RS256은 공개키/개인키 방식으로 보안성 우수",
            ],
            cons: [
              "RS256 알고리즘만 지원",
              "Supabase 기본 설정(ES256)과 호환 불가",
              "커스텀 검증 로직 추가 불가",
            ],
          },
          {
            name: "Lambda Authorizer (ES256 지원)",
            pros: [
              "ES256, RS256 등 다양한 알고리즘 지원",
              "jsonwebtoken + jwks-rsa 라이브러리로 유연한 검증",
              "커스텀 인증 로직 추가 가능",
            ],
            cons: [
              "Lambda 호출 비용 추가 발생",
              "Cold Start로 인한 인증 지연",
              "코드 유지보수 부담",
            ],
          },
        ],
        decision:
          "Supabase 프로젝트 설정에서 JWT 서명 알고리즘을 RS256으로 변경하여 API Gateway JWT Authorizer를 그대로 활용하는 방식을 선택했습니다. 성능과 비용 측면에서 Lambda Authorizer보다 유리하기 때문입니다.",
        tradeOff:
          "Supabase 설정 변경이 필요하지만, Lambda Authorizer 대비 운영 비용과 지연 시간이 절감됩니다. 향후 ES256이 필요한 경우를 대비해 Lambda Authorizer 코드(functions/jwt-authorizer/)를 보존해두었습니다.",
        summary:
          "Supabase를 RS256으로 변경해 API Gateway JWT Authorizer를 유지, Lambda Authorizer 대비 비용과 지연 시간을 절감했습니다.",
      },
      implementation: {
        summary:
          "CloudWatch 로그로 ES256/RS256 불일치를 확인하고, Supabase 알고리즘 설정 변경으로 즉시 해결했습니다.",
        description:
          "CloudWatch 로그 분석을 통해 서명 알고리즘 불일치(RS256 vs ES256)를 확인하고, Supabase 프로젝트의 알고리즘 설정을 API Gateway와 일치하도록 수정하여 인증 실패 문제를 해결했습니다.",
        steps: [
          'CloudWatch 로그에서 "signing method ES256 is invalid" 에러 메시지 확인',
          "API Gateway JWT Authorizer가 RS256만 지원한다는 사실 파악",
          "Supabase 프로젝트 설정에서 JWT 서명 알고리즘을 ES256 → RS256으로 변경",
          "새로운 RS256 키로 JWT 토큰 재발급 확인",
          "API Gateway JWT Authorizer 설정(Issuer, Audience) 유지",
        ],
        codeSnippets: [
          {
            title: "API Gateway JWT Authorizer 설정",
            language: "hcl",
            code: `# API Gateway JWT Authorizer 설정 (Terraform)
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
          "알고리즘 변경 한 번으로 401 에러 완전 해소, Lambda Authorizer 없이 Cold Start 비용도 제거했습니다.",
        description:
          "알고리즘 변경 후 모든 인증 요청이 정상적으로 처리되었으며, API Gateway JWT Authorizer의 성능·비용 이점을 유지할 수 있었습니다.",
        evidence: [
          "RS256 알고리즘 변경 후 401 Unauthorized 에러 완전 해소",
          "Lambda Authorizer 대비 인증 지연 시간 감소 (Cold Start 제거)",
          "Lambda 호출 비용 절감 (인증 요청당 Lambda 실행 불필요)",
        ],
      },
      limitations: {
        summary:
          "ES256 필요 시 보존된 Lambda Authorizer 코드를 활성화하면 다양한 알고리즘을 지원할 수 있습니다.",
        items: [
          {
            limitation:
              "현재 API Gateway JWT Authorizer는 RS256만 지원하므로, 향후 ES256 기반 외부 서비스 연동 시 별도 처리가 필요합니다.",
            improvement:
              "Lambda Authorizer 코드(functions/jwt-authorizer/)를 보존해두었으므로, ES256이 필요한 경우 해당 코드를 활성화하여 다양한 알고리즘을 지원할 수 있습니다.",
          },
        ],
      },
    },
  ],
};
