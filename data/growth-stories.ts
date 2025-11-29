// 성장 스토리 데이터
export interface GrowthStory {
  id: string;
  title: string;
  project: string;
  challenge: string;
  approach: string[];
  learned: string;
}

export const growthStoriesData: GrowthStory[] = [
  {
    id: "ai-integration",
    title: "AI API 통합과 프롬프트 엔지니어링",
    project: "Study Swipe 프로젝트",
    challenge:
      "OpenAI API를 활용해 사용자 맞춤형 설문을 생성해야 했지만, 일관성 있는 결과를 얻기 어려웠습니다.",
    approach: [
      "OpenAI API 문서를 읽고 프롬프트 작성 방법 학습",
      "다양한 프롬프트 패턴 실험 및 결과 비교",
      "JSON 스키마를 활용한 구조화된 응답 설계",
      "에러 핸들링 및 재시도 로직 구현",
    ],
    learned:
      "AI를 실제 서비스에 통합하는 방법을 배웠습니다. 프롬프트 엔지니어링의 중요성과 AI 응답의 불확실성을 다루는 법을 익혔습니다.",
  },

  {
    id: "mobile-development",
    title: "모바일 앱 개발 첫 경험",
    project: "SubHub 프로젝트",
    challenge:
      "웹 개발 경험만 있던 상태에서 모바일 앱을 처음 개발하게 되었습니다.",
    approach: [
      "React Native와 Expo 공식 문서 학습",
      "모바일 UI/UX 패턴 연구",
      "Supabase를 활용한 백엔드리스 아키텍처 구현",
      "푸시 알림 기능 구현 및 테스트",
    ],
    learned:
      "웹과 모바일의 차이점을 이해했습니다. Expo의 편리함과 크로스 플랫폼 개발의 장점을 체감했습니다.",
  },
  {
    id: "docker-deployment",
    title: "Docker로 배포 환경 구축하기",
    project: "StreamX & Study Swipe",
    challenge:
      "로컬에서는 잘 동작하던 애플리케이션이 서버에서 실행되지 않는 문제가 발생했습니다.",
    approach: [
      "Docker 공식 문서를 읽고 컨테이너 개념 학습",
      "Dockerfile 작성 및 이미지 빌드 실습",
      "Docker Compose로 DB와 애플리케이션 연동",
      "GitHub Actions로 자동 배포 파이프라인 구축",
    ],
    learned:
      "환경 차이로 인한 문제를 해결하는 방법을 배웠습니다. 컨테이너화의 중요성과 CI/CD의 필요성을 체감했습니다.",
  },
  {
    id: "team-collaboration",
    title: "팀 협업과 Git 사용",
    project: "CleanBreath 프로젝트",
    challenge:
      "팀원들과 코드를 공유하고 협업하는 과정에서 충돌이 자주 발생했습니다.",
    approach: [
      "Git 브랜치 전략 학습 (feature, develop, main)",
      "커밋 메시지 컨벤션 적용",
      "Pull Request를 통한 코드 리뷰 경험",
      "충돌 해결 방법 학습",
    ],
    learned:
      "협업에서 커뮤니케이션과 규칙의 중요성을 배웠습니다. 코드 리뷰를 통해 더 나은 코드를 작성하는 법을 배웠습니다.",
  },
];
