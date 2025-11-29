// 임팩트 스토리 데이터
export interface ImpactStory {
  id: string;
  title: string;
  context: string;
  challenge: string;
  action: string[];
  result: {
    metric: string;
    impact: string;
  };
}

export const impactStoriesData: ImpactStory[] = [
  {
    id: "performance-optimization",
    title: "조회 성능 80% 개선",
    context: "대규모 트래픽 환경에서 PostgreSQL 병목 현상 발생",
    challenge: "동일 쿼리 반복 실행으로 DB 부하 증가, 응답 시간 3초 이상",
    action: [
      "Redis 캐싱 레이어 구축 및 TTL 기반 정책 설계",
      "자주 조회되는 데이터 인덱싱 최적화",
      "N+1 쿼리 문제 해결 (Eager Loading 적용)",
    ],
    result: {
      metric: "평균 응답 시간 3초 → 600ms",
      impact: "사용자 이탈률 25% 감소, 서버 비용 20% 절감",
    },
  },
  {
    id: "scalable-architecture",
    title: "확장 가능한 아키텍처 설계",
    context: "급격한 사용자 증가로 시스템 확장성 문제 직면",
    challenge:
      "모놀리식 구조로 인한 배포 리스크, 특정 기능 장애 시 전체 서비스 영향",
    action: [
      "도메인 기반 모듈 분리 및 독립 배포 구조 설계",
      "Docker 기반 컨테이너화로 환경 일관성 확보",
      "GitHub Actions CI/CD 파이프라인 구축",
    ],
    result: {
      metric: "배포 시간 30분 → 5분",
      impact: "무중단 배포 달성, 개발 생산성 40% 향상",
    },
  },
  {
    id: "database-optimization",
    title: "DB 병목 해결",
    context: "동시 접속자 증가 시 Connection Pool 고갈 문제",
    challenge: "피크 시간대 DB 연결 실패로 서비스 장애 발생",
    action: [
      "HikariCP 설정 최적화 (pool size, timeout 조정)",
      "장기 실행 쿼리 모니터링 및 최적화",
      "읽기 전용 Replica DB 분리",
    ],
    result: {
      metric: "동시 접속 500 → 1500 처리 가능",
      impact: "피크 시간대 안정성 확보, 장애 발생률 0%",
    },
  },
];
