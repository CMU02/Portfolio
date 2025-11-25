// 트러블슈팅 데이터
export interface TroubleCase {
  id: string;
  problem: string;
  cause: string;
  solution: string[];
  result: string;
}

export const troubleShootingData: TroubleCase[] = [
  {
    id: "redis-cache",
    problem: "Redis 도입 전 대규모 트래픽 조회 시 PostgreSQL 병목 발생",
    cause: "캐시 미사용, 동일 쿼리 반복 발생",
    solution: [
      "Redis 캐싱 레이어 구축",
      "TTL 기반 캐시 정책 설계",
      "인덱스 최적화 및 쿼리 튜닝",
    ],
    result: "조회 성능 80% 개선",
  },
  {
    id: "db-connection",
    problem: "동시 접속자 증가 시 DB Connection Pool 고갈",
    cause: "Connection Pool 크기 미설정, 커넥션 누수",
    solution: [
      "HikariCP 설정 최적화",
      "커넥션 타임아웃 설정",
      "쿼리 실행 시간 모니터링 추가",
    ],
    result: "안정적인 동시 접속 처리 (1000+ concurrent)",
  },
  {
    id: "n-plus-one",
    problem: "N+1 쿼리 문제로 인한 API 응답 지연",
    cause: "ORM Lazy Loading으로 인한 추가 쿼리 발생",
    solution: [
      "Eager Loading 전략 적용",
      "QueryDSL을 활용한 최적화된 쿼리 작성",
      "배치 페칭 설정",
    ],
    result: "API 응답 시간 70% 단축",
  },
];
