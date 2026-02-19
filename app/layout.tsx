import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cmu02-studio.com"),
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
  authors: [{ name: "CMU02", url: "https://github.com/CMU02" }],
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
    url: "https://cmu02-studio.com",
    siteName: "CMU02 Portfolio",
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
    canonical: "https://cmu02-studio.com",
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "naver-site-verification": "naver0674842125a8eb4f556999e5c9605548",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
