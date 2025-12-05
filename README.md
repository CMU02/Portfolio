# CMU02 Portfolio

> 문제를 해결하고 성장하는 것을 즐기는 주니어 풀스택 개발자의 포트폴리오

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 프로젝트 소개

React, Next.js, Spring Boot, NestJS 기반의 풀스택 프로젝트 경험을 담은 개인 포트폴리오 웹사이트입니다.

### ✨ 주요 특징

- **🎨 모던한 UI/UX**: Tailwind CSS v4와 Motion(Framer Motion v12)을 활용한 인터랙티브 디자인
- **🌐 다국어 지원**: next-intl을 통한 한국어/영어 지원
- **📱 반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 최적화
- **⚡ 최적화된 성능**: Next.js 16 App Router와 Server Components 활용
- **☁️ AWS S3 통합**: 프로젝트 이미지 및 자료를 S3에서 동적으로 로드
- **🎯 SEO 최적화**: 메타데이터 및 Open Graph 설정

## 🛠️ 기술 스택

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (Framer Motion v12), tw-animate-css
- **UI Components**: Radix UI
- **Icons**: Lucide React

### Backend & Infrastructure

- **Cloud Storage**: AWS S3 (이미지 호스팅)
- **Internationalization**: next-intl

### Development Tools

- **Linting**: ESLint 9
- **Package Manager**: npm

## 📦 설치 및 실행

### 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/CMU02/cmu02-portfolio.git

# 디렉토리 이동
cd cmu02-portfolio

# 의존성 설치
npm install
```

### 환경 변수 설정

`.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# AWS S3 설정
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-northeast-2
AWS_S3_BUCKET=your_bucket_name
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📂 프로젝트 구조

```
cmu02-portfolio/
├── app/                      # Next.js App Router
│   ├── actions/             # Server Actions
│   ├── projects/            # 프로젝트 상세 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 홈 페이지
│   └── icon.svg             # Favicon
├── components/              # React 컴포넌트
│   ├── common/              # 공통 컴포넌트 (로고 등)
│   ├── sections/            # 섹션 컴포넌트
│   ├── ui/                  # UI 컴포넌트 (shadcn/ui)
│   ├── navigation.tsx       # 네비게이션
│   ├── project-card.tsx     # 프로젝트 카드
│   └── s3-image.tsx         # S3 이미지 컴포넌트
├── data/                    # 데이터 파일
│   ├── projects.ts          # 프로젝트 데이터
│   ├── growth-stories.ts    # 성장 스토리
│   └── tech-stack.ts        # 기술 스택
├── lib/                     # 유틸리티 함수
│   ├── s3.ts                # AWS S3 유틸리티
│   └── utils.ts             # 공통 유틸리티
├── messages/                # 다국어 번역 파일
│   ├── en.json              # 영어
│   └── ko.json              # 한국어
└── public/                  # 정적 파일
```

## 🎯 주요 기능

### 1. 프로젝트 쇼케이스

- 4개의 주요 프로젝트 (Study Swipe, StreamX, SubHub, CleanBreath)
- 각 프로젝트별 상세 페이지
- 기술 스택, 문제 해결 과정, 기여 내용 상세 기록
- ERD, 스크린샷, UI 디자인 개선 전/후 비교

### 2. SEO 성과 및 문제 해결 사례

- Google Search Console 데이터 시각화
- 실제 운영 중 발생한 문제와 해결 과정 기록
- SSL 인증서 자동 갱신 등 DevOps 경험

### 3. 성장 스토리

- 프로젝트를 통해 배운 점 기록
- 기술적 도전과 극복 과정

### 4. AWS S3 통합

- Presigned URL을 통한 안전한 이미지 로딩
- 1시간 유효 기간의 임시 URL 생성
- 로딩 상태 및 에러 처리

## 🌟 프로젝트 하이라이트

### CleanBreath - 안양시 금연·흡연구역 시각화 서비스

- **실제 운영 중**: [https://cleanbreath.cmu02-studio.com](https://cleanbreath.cmu02-studio.com)
- **SEO 성과**: 총 클릭 수 42.4% 증가, 총 노출 수 125.2% 증가
- **기술 스택**: React, TypeScript, Spring Boot, MySQL, Kakao Map API
- **주요 기능**: 위치 기반 금연구역 검색, 관리자 페이지, SSL 자동 갱신

### Study Swipe - AI 기반 스터디 매칭 플랫폼

- **기술 스택**: NestJS, TypeScript, PostgreSQL, OpenAI API
- **핵심 기능**: AI 설문 생성, 가중치 기반 매칭 알고리즘

### StreamX - AI 스트리머 플랫폼

- **기술 스택**: Spring Boot, Unity, LLM, TTS
- **핵심 기능**: 실시간 AI 소통, 3D 인터랙티브 환경

## 📝 라이선스

이 프로젝트는 개인 포트폴리오 목적으로 제작되었습니다.

## 📧 연락처

- **GitHub**: [@CMU02](https://github.com/CMU02)
- **Email**: hyeonjun1968@naver.com

---

**Made with ❤️ by CMU02**
