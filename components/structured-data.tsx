import { SITE_CONFIG } from "@/lib/constants";

// 구조화된 데이터 컴포넌트 (JSON-LD)
export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.author,
    jobTitle: "풀스택 개발자",
    description: "문제를 해결하고 성장하는 것을 즐기는 풀스택 개발자",
    url: SITE_CONFIG.url,
    sameAs: [SITE_CONFIG.githubUrl],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "NestJS",
      "JavaScript",
      "웹 개발",
      "프론트엔드 개발",
      "백엔드 개발",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "풀스택 개발자",
      occupationLocation: {
        "@type": "Country",
        name: "대한민국",
      },
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: "CMU02의 풀스택 개발자 포트폴리오 웹사이트",
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
    inLanguage: "ko-KR",
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "CMU02 개발자 포트폴리오",
    description:
      "React, Next.js, Spring Boot, NestJS를 활용한 풀스택 개발 프로젝트 모음",
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author,
    },
    url: SITE_CONFIG.url,
    dateCreated: "2024-12-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: "ko-KR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
    </>
  );
}
