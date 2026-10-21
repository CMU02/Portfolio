import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";
import { SITE_CONFIG } from "@/lib/constants";
import { MotionProvider } from "@/components/motion-provider";
import { themeInitScript } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist에는 한글 글리프가 없어 한글은 이 폰트로 대체된다
const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "CMU02 | 풀스택 개발자 포트폴리오",
    template: "%s | CMU02 Portfolio",
  },
  description:
    "문제를 해결하고 성장하는 것을 즐기는 풀스택 개발자 CMU02입니다. React, Next.js, Spring Boot, NestJS를 활용한 실무 프로젝트와 오픈소스 라이브러리 개발 경험을 소개합니다.",
  keywords: [
    "풀스택 개발자",
    "포트폴리오",
    "React 개발자",
    "Next.js",
    "Spring Boot",
    "NestJS",
    "TypeScript",
    "웹 개발",
    "프론트엔드",
    "백엔드",
    "CMU02",
    "개발자 이력서",
    "프로젝트 포트폴리오",
  ],
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.githubUrl }],
  creator: "CMU02",
  publisher: "CMU02",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "CMU02 | 풀스택 개발자 포트폴리오",
    description:
      "문제를 해결하고 성장하는 것을 즐기는 풀스택 개발자 CMU02입니다. React, Next.js, Spring Boot, NestJS를 활용한 실무 프로젝트와 오픈소스 라이브러리 개발 경험을 소개합니다.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CMU02 풀스택 개발자 포트폴리오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CMU02 | 풀스택 개발자 포트폴리오",
    description:
      "문제를 해결하고 성장하는 것을 즐기는 풀스택 개발자 CMU02입니다.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 폰트 변수는 html에 둬야 Tailwind의 html font-family(--font-sans)가 해석된다
    // dark 클래스·colorScheme은 head 스크립트가 하이드레이션 전에 바꾸므로 경고를 끈다
    <html
      lang="ko"
      className={`${geistSans.variable} ${notoSansKr.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* 첫 페인트 전에 테마를 정해 깜빡임을 막는다 */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <StructuredData />
      </head>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
