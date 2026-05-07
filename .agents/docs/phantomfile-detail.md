---
inclusion: manual
---

# PhantomFile

1. 프로젝트 개요

- SNS 파일 공유 시 서버 영구 기록 및 만료 누락 문제를 해결하는 휘발성 보안 파일 공유 서비스
- 기간: 2026.01.31 ~ 2026.02.17
- 참여인원: 1인 기획·설계·개발·운영
- 기술 스택: AWS(Lambda, DynamoDB, EventBridge Pipes, SQS, S3, API Gateway), Next.js, Terraform, Supabase, K6

## 성과

1. 아키텍처 및 데이터 전략 (비율 및 확장성 최적화)

- 서버리스 인프라 구축: 트래픽 변동 폭이 큰 개인 서비스 특성 상 AWS Lambda, DynamoDB, S3 기반 서버리스 아키텍처를 설계하여서버 운영 부담 제거 및 사용량 비례 과금 구조로 월 운영비 $5 이하로 달성했습니다.
- DynamoDB 도입 및 Trade-off: 파일 조회/상태/갱신 위주의 키-값 기반 접근과 스키마 유연성을 고려하여 DynamoDB를 선택했습니다.복잡한 통계 쿼리에 유리한 RDS 대신에, 서버리스 친화성과 운영 단순성을 우선순위에 두는 의사결정을 내렸습니다.

2. 데이터 수명 주기 및 안정성 (이벤트 기반 파이프 라인)

- 비동기 파일 처리 파이프라인: 파일 만료 후 후속 처리의 안정성과 재처리를 보장하기 위해DynamoDB TTL 만료 이벤트를 Streams → Eventbridge Pipes → SQS → Lambda로 이어지는 비동기 구조를 설계했습니다.

- 장애 대응: 데이터 유실 방지를 우선하여, 장애 시 DLQ와 재시도 매커니즘을 통해 복구가 가능하도록 구현했습니다.부하 테스트 중 의도적으로 장애 주입 시 100% 재처리 성공 확인했습니다.

3. 성능 분석 및 시스템 신뢰성 (임계치 기반 최적화)

- 시스템 임계치 및 확장 매커니즘 검증: K6 부하테스트를 활용하여 서버리스 아키텍처의 동시 요청 수용 능력을 시뮬레이션하고,인프라의 응답 한계 지점을 파악했습니다.
- 리소스 최적화 및 지연 시간 관리: 테스트 결과를 분석하여 Lambda의 메모리 할당량과 동시성 설정을 최적화함으로써, 부하 상황에서도 P99 671ms의 안정적인 응답 성능을 확보했습니다.
- 보안 및 인프라 자동화: Kiro IDE를 활용하여 초기 구현 속도를 높였으며, AWS Terrform MCP로 인프라 패턴을 재점검했습니다.분석 결과 발견된 과도한 IAM 권한 및 S3 보안 설정 누락을 수정하여 최소 권한 원칙을 적용했습니다.

4. 트러블 슈팅 (인증 아키텍처 해결)

- 서명 알고리즘 불일치 해결: Supabase와 API Gateway 연동 중 모든 요청이 실패하는 현상을 발견했습니다.
- 원인 분석 및 해결: CloudWatch 로그 분석을 통해 서명 알고리즘의 불일치(RS256 vs ES256)를 확인했습니다.Supabase 프로젝트의 알고리즘 설정을 API Gateway와 일치하도록 수정하여 인증 실패 문제를 해결했습니다.

## 배경 및 문제 정의

### 서비스 배경

- 카카오톡·슬랙·이메일 등 메신저로 계약서, 신분증 사본, 임시 비밀번호 같은 민감 파일을 공유할 때 발생하는 불안이 출발점이었다. 한번 전송된 파일은 상대방 서버, 백업, 스크린샷 등으로 통제 불가능하게 남는다.

- 기존 클라우드 드라이브(Google Drive, iCloud)는 만료 설정이 번거롭고, UI가 보안 특화 관점이 아니며, 실수로 잘못된 공유 링크를 보냈을 때 즉시 무효화하기 어렵다는 구조적 한계를 갖는다.

### 핵심 문제 두 가지

1. 영구 저장 리스크: 수신자 서버에 파일이 영구히 남아 추후 유출 가능성
2. 만료 누락 리스크: TTL 단독 의존 시 DynamoDB TTL은 최대 48시간 지연이 발생할 수 있어 만료가 보장되지 않음

## 방안 도출 과정

### 아키텍처 선책 - 왜 서버리스를 선택했는가?

- 초기 비용과 트래픽 패턴이 첫번 째 제약
- 개인 프로젝트 특성상 트래픽 불규칙하고 예측이 어려운데, EC2를 상시 운영하면 유휴 시간에도 비용이 발생한다.
- AWS Lambda + DynamoDB + S3 조합은 요청이 없으면 비용에 0이 가까운 사용량 기반 과금 구조로, 초기 운영 비용 없이 런칭이 가능함

> Trade-off 감수: Lambda 동시성 제한으로 인해 갑작스러운 트래픽 급증 시 스로틀링 발생 가능. 이는 개인 서비스 규모에서 감수 가능한 수준으로 판단했다.

### Database 선택 - 왜 DyanmoDB인가?

파일 공유 서비스의 접근 패턴은 대부분 단순 키 기반 조회/만료/상태 갱신이다.

- RDS의 복잡한 JOIN이 필요없고, TTL 내장기능이며, 스키마 변경 가능성이 높다는 세가지 이유로 DynamoDB를 선택했다.

### 만료 파이프라인 — 왜 TTL 단독이 아닌가?

DynamoDB TTL은 명세상 최대 48시간 지연이 허용되기 때문에 단독 의존은 "만료가 되어야 하는 파일이 살아있는 상태"로 접근 가능한 기간이 발생한다.
이 문제를 해결하기 위해 아래 파이프라인을 구성했다.

```text
DynamoDB TTL 만료
  → DynamoDB Streams (삭제 이벤트 감지)
  → EventBridge Pipes (이벤트 필터링·변환)
  → SQS (버퍼링 + 재처리 보장)
  → Cleanup Lambda (S3 파일 실제 삭제)
  → SQS DLQ (실패 이벤트 보존)
  → CloudWatch → SNS → Discord Webhook 알림
```

SQS를 중간에 두어 Lambda 일시 장애나 트래픽 폭주 상황에서도 이벤트를 손실 없이 보존하고 재처리할 수 있게 했다.

### 인증 — Supabase JWT + API Gateway Lambda Authorizer

Supabase가 발급하는 JWT는 ES256(P-256 ECDSA) 방식이다.
API Gateway와 연동 시 RS256 vs ES256 서명 알고리즘 불일치로 모든 인증 요청이 실패하는 문제가 발생했다.
CloudWatch 로그로 원인을 추적한 후, Lambda Authorizer에서 Supabase JWKS endpoint의 ES256 공개키로 검증하는 방식으로 규격을 맞춰 해결했다.

#### 1. API Gateway JWT Authorizer 알고리즘 불일치 문제

- 문제 상황
  - API Gateway에서 401 Unauthorized 에러 발생
  - 에러 로그: `"authorizerError":"invalid_token: signing method ES256 is invalid"`
  - 사용자 인증이 정상적으로 이루어지지 않음

- 원인 분석
- **AWS API Gateway의 JWT Authorizer는 RS256 (RSA) 알고리즘만 지원**
- Supabase에서 기본으로 제공하는 JWT 서명 키는 **ES256 (ECDSA) 알고리즘** 사용
- 알고리즘 불일치로 인해 JWT 토큰 검증 실패

- 해결 방법
  1. Supabase 프로젝트 설정에서 JWT 서명 알고리즘을 **RS256으로 변경**
  2. 새로운 RS256 키로 JWT 토큰 재발급
  3. API Gateway JWT Authorizer 설정 유지
  - Issuer: `https://bchlucgbgwavcdvyvchw.supabase.co/auth/v1`
  - Audience: `authenticated`

- 시도했던 대안
  - Lambda Authorizer 구현 (ES256 지원)
    - `jsonwebtoken`과 `jwks-rsa` 라이브러리 사용
    - ES256, RS256 모두 지원 가능
    - 최종적으로는 Supabase 설정 변경으로 해결하여 사용하지 않음

  - 참고 사항
    - API Gateway JWT Authorizer는 성능과 비용 측면에서 Lambda Authorizer보다 유리
    - RS256 알고리즘은 공개키/개인키 방식으로 보안성이 우수
    - 향후 ES256이 필요한 경우 Lambda Authorizer 코드 활용 가능 (`functions/jwt-authorizer/`)

### 파일 전송 — Pre-signed URL 방식 선택

파일 자체를 Lambda로 중계하면 API Gateway 요청 크기 제한(10MB)과 Lambda 실행 비용이 급증한다.
대신 S3 Pre-signed URL을 발급해 클라이언트가 S3에 직접 업로드/다운로드하게 구성했다.
Lambda는 메타데이터 처리와 URL 발급만 담당하므로 실행 시간과 비용이 최소화된다.

## 결과 및 검증

### 부하 테스트 (K6)

- 실제 사용 흐름(업로드 → 링크 조회 → 다운로드 → 만료 삭제)을 시나리오로 작성해 k6로 검증했다.

  | 항목              | 결과       |
  | ----------------- | ---------- |
  | 테스트 기준 TPS   | 17 TPS     |
  | 총 요청 수 (10분) | 약 9,800건 |
  | P99 응답 속도     | 671ms      |
  | 요청 유실         | 0건        |

> 점진적으로 TPS를 올려 120TPS까지 시도했을 때 Lambda 동시성 제한으로 스로틀링이 발생하는 지점을 확인했다. 이를 통해 현재 계정 한도 기반에서 병목 구간이 Lambda 동시성에 있음을 명확히 식별했다.

### 만료 파이프라인 검증

테스트 환경에서 TTL 만료 이벤트를 반복 발생시키고, 각 파이프라인 단계(Streams → Pipes → SQS → Lambda)의 이벤트 전달과 S3 실제 삭제를 확인했다. 장애 시뮬레이션(Lambda 강제 오류 발생) 상황에서도 SQS DLQ에 이벤트가 보존되어 재처리 가능한 상태임을 검증했다.

### 보안 설정 검증

Kiro IDE로 초기 기능 구현 속도를 높이고, AWS Terraform MCP로 Terraform 코드의 IAM 권한과 S3 설정을 재점검해 과도 권한 부여와 퍼블릭 ACL 노출 등 초기 구현에서 놓친 보안 설정 누락을 사전에 검출·수정했다.

## 한계점 보완 방향

### Lambda 동시성 한계 (확장성)

AWS 계정의 Lambda 동시성 기본 한도는 1,000이지만, 실제 적용된 계정 수준 할당값은 10으로 제한되어 있었기 때문에 120TPS 부하 테스트 시 스로틀링이 발생했다. 개인 프로젝트 규모에서는 현재 트래픽을 감당하는 데 문제가 없지만, 트래픽이 급증하는 시점에는 장애로 이어질 수 있다.

- 보완점: 보완 방향: 함수별 Reserved Concurrency를 조정해 동시성 할당값을 트래픽 예측치에 맞게 상향하고, API Gateway 앞단에 CloudFront + WAF를 두어 Rate Limiting으로 급격한 트래픽 유입 자체를 제어하는 구조를 추가하거나, 트래픽 규모가 커질 경우 ECS Fargate로 워크로드 이관을 고려할 수 있다.

### DynamoDB TTL 만료 지연

TTL 만료 후 Streams 이벤트가 발생하기까지 최대 수분~수십 분의 지연이 존재한다. 현재 파이프라인은 TTL 이후의 후처리를 최대한 빠르게 처리하지만, 만료 시각 이후에도 Pre-signed URL이 유효한 경우 파일이 일시적으로 접근 가능한 짧은 윈도우가 남는다.

- 보완 방향: 현재 인증 흐름은 Lambda Authorizer 없이 API Gateway의 기본 Authorization 기능으로 처리하고 있기 때문에, 만료된 링크 접근 차단을 위한 별도 검증 레이어가 없는 상태다. Pre-signed URL의 유효 시간을 파일 만료 시각 직전까지만 발급하도록 제한하고, 링크 조회 Lambda(get-link) 내부에서 DynamoDB의 만료 상태를 명시적으로 확인해 만료된 링크는 즉시 410 Gone으로 응답하는 검증 로직을 추가하면 이 윈도우를 최소화할 수 있다.

### 모니터링 커버리지 부족

현재는 DLQ 메시지 수 기준 CloudWatch 알람 + Discord 알림만 구성되어 있다. 실제 서비스 수준에서는 각 Lambda 함수의 P99 응답 시간, 에러율, SQS 대기 시간을 대시보드로 가시화하는 Observability가 부족하다.

- 보완 방향: CloudWatch Dashboards로 핵심 지표를 한 화면에 통합하거나, AWS X-Ray로 Lambda 간 트레이스를 추가해 어느 단계에서 지연이 발생하는지 추적 가능하게 구성

### 파일 암호화 미적용

현재 S3에 업로드되는 파일은 S3 서버 측 암호화(SSE-S3)가 적용되어 있지만, 클라이언트 사이드 암호화(E2E)는 없다. AWS 내부 접근 권한을 가진 주체가 이론적으로 파일에 접근 가능하다.

- 보완 방향: Web Crypto API를 활용해 브라우저에서 AES-GCM으로 파일을 암호화한 뒤 S3에 업로드하고, 복호화 키를 URL 프래그먼트(#key=...)에 포함시켜 서버에 키가 전달되지 않는 클라이언트 사이드 암호화 구조를 추가하면 완전한 Zero-Knowledge 구조로 발전시킬 수 있다.
