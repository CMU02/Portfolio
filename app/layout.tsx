import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMU02 | Full Stack Developer Portfolio",
  description:
    "문제를 해결하고 성장하는 것을 즐기는 주니어 풀스택 개발자입니다. React, Next.js, Spring Boot, NestJS 기반의 프로젝트를 진행합니다.",
  keywords: [
    "풀스택 개발자",
    "포트폴리오",
    "React",
    "Next.js",
    "Spring Boot",
    "NestJS",
    "TypeScript",
  ],
  authors: [{ name: "CMU02" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "CMU02 | Full Stack Developer Portfolio",
    description:
      "문제를 해결하고 성장하는 것을 즐기는 주니어 풀스택 개발자입니다.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
