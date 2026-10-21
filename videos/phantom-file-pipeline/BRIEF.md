---
workflow: motion-graphics
flow: automation
storyboard: no
message: "만료 파일은 TTL 이벤트로 정리되고, Lambda가 실패해도 DLQ와 재처리 덕분에 이벤트가 유실되지 않는다"
destination: portfolio-deep-dive
aspect: 1280x720
language: ko
audience: 포트폴리오를 보는 채용 담당자, 백엔드/클라우드 엔지니어
length: 9s
angle: architecture-loop
---

## Intent

Phantom File 딥다이브의 "event-pipeline" 토픽에 넣을 무음 루프 영상. 정적 아키텍처 이미지
(`phantom-file/phantomfile-event-pipeline.png`) 옆에서 데이터가 실제로 어떻게 흐르는지 보여 준다.
TTL 만료 → DynamoDB Streams → EventBridge Pipes 필터(eventName == REMOVE, 수동 삭제는 걸러짐)
→ SQS Main Queue → Cleanup Lambda → S3 객체 삭제. 실패 분기: Lambda 오류 → SQS 재시도 →
DLQ 격리 → 수동 재처리. 마지막 비트에 data 파일의 실제 지표.

## Assets

- ../../data/projects/phantomfile-data.ts — 단계·지표·한계 문구의 원본(이벤트 파이프라인 토픽).
- ../../.agents/docs/phantomfile-detail.md — 보조 설명.

## Customizations

- TTL 만료와 Streams 사이에 시간 압축 표시("~수십 분"). 즉시 삭제처럼 보이면 안 된다.
- 끝 비트 지표 문구는 data 파일과 동일: "장애 주입 재처리 성공률 100%", "이벤트 유실 0건".
- 출력: WebM(VP9) + MP4(H.264) + 최종 상태 포스터 PNG(prefers-reduced-motion 대체용). 각 800KB 미만 목표.

## Notes

- 16:9 1280x720, ~9s, 매끄러운 무음 루프, 내레이션·음악 없음.
- 사이트 팔레트: bg #0a2342, card #112d55, border #264a7a, primary #2ca58d, sage #84bc9c,
  warm white #fffdf7, accent pink #f46197(실패 분기에만).
- 폰트: Geist(라틴) + Noto Sans KR(한글).
- 무인 실행(autonomous): 질문 없이 진행, Studio 프리뷰 단계 생략. S3/CloudFront 업로드 금지.
