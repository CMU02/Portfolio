# 에디토리얼 디자인 개편 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 포트폴리오를 B. 에디토리얼 스타일(라이트 종이 톤 + 다크 네이비 토글)로 개편하고, 첫 화면에 운영 중인 프로젝트 3개와 핵심 수치를 보여 주며, 원본 이미지 대신 WebP 리사이즈본을 받게 해 상세 페이지 이미지 용량을 줄인다.

**Architecture:** 기존 shadcn 토큰 이름을 유지한 채 `:root`(라이트)와 `.dark`(다크)의 값만 바꾸고, `<head>` 인라인 스크립트로 첫 페인트 전에 `<html>`의 `dark` 클래스를 정한다. 홈은 Hero → Work → About → Contact로 다시 구성하고 딥다이브/기타 페이지는 같은 토큰과 구분선 중심 스타일로 맞춘다. 이미지는 스크립트로 `name.w{640|1280|1920}.webp` 변형을 만들어 S3에 올리고, 커스텀 로더가 요청 너비에 맞는 변형 URL을 반환한다.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui(Radix), Tiptap static renderer, bun, vitest + @testing-library/react(jsdom), sharp(이미지 변형), AWS CLI(S3 업로드)

**Spec:** `docs/superpowers/specs/2026-10-21-editorial-redesign-design.md`

## Global Constraints

- 패키지 매니저는 bun. 새 의존성은 `sharp`(devDependency, 이미 node_modules에 0.34.5 있음) 하나만. `next-themes` 금지.
- 색: 라이트 background `#f6f4ef`, foreground `#111111`, border `#d9d5cc`, accent는 `#0f766e` 근처에서 paper 위 4.5:1 이상. 다크는 기존 네이비 토큰(`#0a2342`, `#fffdf7`, `#8ba3c4`, `#264a7a`, `#2ca58d`, `--primary-text`) 유지.
- 강조색은 accent 하나. `tech-*` 장식 색, Tailwind 기본 팔레트 색(`red-400` 등), `glow-*`, 그라데이션, 카드 그림자는 본문 UI에서 쓰지 않는다. 의미가 있는 실패/오류에만 `destructive`.
- 폰트는 Geist + Noto Sans KR 유지(새 폰트 없음). 한글 `keep-all` 유지, 제목 `text-balance`.
- Hero 문구: 라벨 `최현준`, h1 `Idea to Production, Never Let Go.`, 한 줄 `만들고, 배포하고, 운영합니다. 백엔드 · AWS`.
- 홈 순서: Hero → Work(`id="work"`) → About(`id="about"`) → Contact(`id="contact"`). 헤더 메뉴 `Work · About · Contact` + 테마 토글.
- 이미지 변형 너비 `[640, 1280, 1920]`, 키 규칙 `dir/name.ext` → `dir/name.w{width}.webp`. 원본은 지우지 않는다.
- 공개 페이지는 서버 컴포넌트 우선, `"use client"`는 상호작용 잎 컴포넌트에만.
- 접근성: WCAG AA 대비(두 테마), focus-visible, 터치 영역 44px, `prefers-reduced-motion` 존중, 페이지당 h1 하나, 375px 가로 스크롤 없음.
- 검증 명령: `bun run test`, `node node_modules/typescript/bin/tsc --noEmit`, `bunx next build`. ESLint는 기존부터 깨져 있어 범위 밖.
- 커밋 메시지: `type(scope): 한국어 요약` + 짧은 한국어 본문, attribution/trailer 금지. 브랜치 `feat/tiptap-deepdive`에 이어서 커밋.
- 브라우저 확인 도구: `C:/Users/chlgu/AppData/Local/Temp/claude/E--cmu02-portpolio/7d6ddb26-b452-4cd9-b385-0865d90892fc/scratchpad/pw/`(playwright-core + 설치된 Chrome, `chromium.launch({ channel: "chrome" })`). 기존 스크립트 `check.mjs`, `check2.mjs`, `perf.mjs`를 참고/수정해서 쓴다.

## Review Focus

1. 새 이미지를 추가하고 변형을 안 만든 경우 → 이미지가 깨지는 대신 `--check`가 누락 키를 나열하고 0이 아닌 코드로 끝나야 한다. (Task 2 테스트 `listMissing`)
2. `localStorage` 접근이 예외를 던지는 브라우저(사파리 프라이빗 등) → 테마 스크립트가 죽지 않고 OS 설정을 따른다. (Task 3 테스트)
3. 원본이 1920px보다 작은 이미지 → 세 변형 파일이 모두 존재하고 원본보다 커지지 않는다(로더가 어떤 너비를 고르든 404가 나지 않음). (Task 2 테스트)
4. CloudFront가 아닌 src(`/og-image.png`, svg, 이미 변형인 `.w640.webp`) → 로더가 그대로 돌려준다. (Task 1 테스트)
5. 토글 직후/하이드레이션 전 아이콘 불일치 → 아이콘은 CSS(`dark:`)로만 바뀌어 하이드레이션 경고가 없어야 하고, 클릭하면 `<html>` 클래스와 저장값이 함께 바뀐다. (Task 3 테스트)

---

### Task 1: 테스트 환경 + 이미지 변형 키 규칙

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Create: `lib/image-variants.ts`
- Test: `lib/image-variants.test.ts`

**Interfaces:**
- Produces:
  - `export const IMAGE_WIDTHS = [640, 1280, 1920] as const`
  - `export type ImageWidth = (typeof IMAGE_WIDTHS)[number]`
  - `export function pickWidth(requested: number): ImageWidth` — 요청 이상인 가장 작은 너비, 없으면 1920
  - `export function variantKey(key: string, width: ImageWidth): string` — 마지막 확장자만 `.w{width}.webp`로 교체
  - `export function variantUrl(src: string, requested: number): string` — `https://…/key.(png|jpe?g|webp)`이고 이미 `.w{n}.webp`가 아니면 변형 URL, 아니면 `src` 그대로(쿼리 없이)

- [ ] **Step 1: vitest 설정** — `vitest.config.ts`: `@vitejs/plugin-react`, `environment: "jsdom"`, `setupFiles: ["./vitest.setup.ts"]`, `resolve.alias` `@` → 레포 루트, `exclude`에 `videos/**`, `node_modules/**`. `vitest.setup.ts`: `import "@testing-library/jest-dom/vitest"`.

- [ ] **Step 2: 실패하는 테스트 작성** (`lib/image-variants.test.ts`)

```ts
expect(pickWidth(1)).toBe(640); expect(pickWidth(640)).toBe(640);
expect(pickWidth(641)).toBe(1280); expect(pickWidth(3840)).toBe(1920);
expect(variantKey("clean-breath/visit/smok-1-1.png", 640)).toBe("clean-breath/visit/smok-1-1.w640.webp");
expect(variantKey("a/b.c.jpeg", 1280)).toBe("a/b.c.w1280.webp");
expect(variantUrl("https://d.net/x/y.jpg", 828)).toBe("https://d.net/x/y.w1280.webp");
expect(variantUrl("/og-image.png", 640)).toBe("/og-image.png");
expect(variantUrl("https://d.net/x/logo.svg", 640)).toBe("https://d.net/x/logo.svg");
expect(variantUrl("https://d.net/x/y.w640.webp", 1920)).toBe("https://d.net/x/y.w640.webp");
```

- [ ] **Step 3: 실패 확인** — `bun run test lib/image-variants.test.ts` → FAIL(모듈 없음)
- [ ] **Step 4: `lib/image-variants.ts` 구현**
- [ ] **Step 5: 통과 확인** — 같은 명령 → PASS
- [ ] **Step 6: 커밋** — `test: vitest 환경과 이미지 변형 키 규칙 추가`

> 이 태스크는 로더를 아직 바꾸지 않는다. 변형이 S3에 올라가기 전에 로더를 바꾸면 모든 이미지가 깨진다(Task 4에서 연결).

### Task 2: 이미지 변형 생성/검사 스크립트 + S3 업로드

**Files:**
- Create: `scripts/images.ts`
- Test: `scripts/images.test.ts`
- Modify: `package.json`(devDependency `sharp`, scripts `images:generate`, `images:check`), `.gitignore`(`.image-cache/`, `.image-variants/`)

**Interfaces:**
- Consumes: `IMAGE_WIDTHS`, `variantKey` (Task 1)
- Produces:
  - `export function collectImageKeys(sources: string[]): string[]` — 문자열 리터럴 `"…​.(png|jpe?g|webp)"` 중 `/`로 시작하지 않고 `.w\d+.webp`가 아닌 것, 중복 제거·정렬
  - `export async function makeVariants(input: Buffer): Promise<Record<ImageWidth, Buffer>>` — sharp `resize({ width, withoutEnlargement: true }).webp({ quality: 80 })`
  - `export function listMissing(keys: string[], exists: (variantKey: string) => boolean): string[]` — 변형이 하나라도 없는 원본 키 목록
  - CLI: `bun scripts/images.ts generate` / `bun scripts/images.ts check`. 소스 파일은 `data/**/*.ts`, `content/**/*.json`, `components/**/*.tsx`, `features/**/*.tsx`, `app/**/*.tsx`. 원본은 `https://${NEXT_PUBLIC_CLOUD_FRONT_URL}/${key}`에서 받아 `.image-cache/`에 캐시, 변형은 `.image-variants/<variantKey>`에 쓴다. `check`는 각 변형 URL에 HEAD 요청 후 `listMissing` 결과를 출력하고 하나라도 있으면 exit 1.

- [ ] **Step 1: 실패하는 테스트 작성** (`scripts/images.test.ts`)

```ts
expect(collectImageKeys([`{ s3Key: "a/b.png", x: "/og-image.png", y: "a/b.png", z: "c/d.w640.webp", w: "e.JPG" }`, `"f/g.jpeg"`]))
  .toEqual(["a/b.png", "f/g.jpeg"]);            // 대문자 확장자 JPG는 실제 데이터에 없으므로 무시해도 됨(소문자만 매칭)
const out = await makeVariants(await sharp({ create: { width: 800, height: 400, channels: 3, background: "#888" } }).png().toBuffer());
for (const w of [640, 1280, 1920] as const) {
  const meta = await sharp(out[w]).metadata();
  expect(meta.format).toBe("webp");
  expect(meta.width).toBe(Math.min(w, 800));    // 원본보다 커지지 않음 (Review Focus 3)
}
expect(listMissing(["a/b.png", "c/d.jpg"], (k) => k !== "c/d.w1280.webp")).toEqual(["c/d.jpg"]); // Review Focus 1
```

- [ ] **Step 2: 실패 확인** — `bun run test scripts/images.test.ts` → FAIL
- [ ] **Step 3: `bun add -d sharp@0.34.5` 후 `scripts/images.ts` 구현** (CLI 진입은 `if (import.meta.main)`)
- [ ] **Step 4: 통과 확인** — PASS
- [ ] **Step 5: 로컬 생성** — `bun scripts/images.ts generate` → `.image-variants/`에 73개 키 × 3 = 219개 webp. 확인: 모든 파일 존재, 640 변형 합계가 원본 합계의 10% 미만인지 출력(`du -sh .image-cache .image-variants`).
- [ ] **Step 6: 커밋** — `feat(images): WebP 리사이즈본 생성·검사 스크립트`
- [ ] **Step 7: ⛔ 소유자 확인 후 업로드** — 외부 쓰기이므로 실행 전에 반드시 소유자에게 묻는다(구현 서브에이전트라면 여기서 멈추고 컨트롤러에 보고). 승인되면:
  1. AWS MCP로 CloudFront 배포(도메인 `d2jxs31fe0rfi3.cloudfront.net`)의 S3 오리진 버킷 이름을 조회한다.
  2. `aws s3 sync .image-variants s3://<bucket>/ --content-type image/webp --cache-control "public, max-age=31536000, immutable"`
  3. 영상: `videos/phantom-file-pipeline/renders/`의 3개 파일을 `phantom-file/phantomfile-event-pipeline.webm`(video/webm), `.mp4`(video/mp4), `-poster.png`(image/png) 키로 업로드.
- [ ] **Step 8: 검사** — `bun scripts/images.ts check` → exit 0, 누락 0건. 영상 3개 URL도 `curl -sI`로 200 확인.

### Task 3: 테마 시스템 (라이트/다크 토큰 + 깜빡임 없는 토글)

**Files:**
- Create: `lib/theme.ts`, `components/theme-toggle.tsx`
- Modify: `app/globals.css`(`:root` 라이트 토큰, `.dark` 다크 토큰), `app/layout.tsx`(html의 고정 `dark` 제거, `suppressHydrationWarning`, head 인라인 스크립트)
- Modify(고정 `dark` 제거): `app/page.tsx:25`, `app/projects/subhub/privacy/page.tsx:13`, `components/common/page-layout.tsx:16`, `features/projects/DeepDivePage.tsx:35`
- Modify: `components/deepdive/MermaidDiagram.tsx`(하드코딩 `theme: "dark"` → 렌더 시점의 `<html>` 클래스 기준 `"dark" | "neutral"`; 현재 콘텐츠에 mermaid 노드가 없으므로 토글 후 재렌더는 `shortcut:` 주석으로 남김)
- Test: `lib/theme.test.ts`, `components/theme-toggle.test.tsx`, `app/globals-contrast.test.ts`

**Interfaces:**
- Produces:
  - `export const THEME_STORAGE_KEY = "theme"`
  - `export const themeInitScript: string` — 저장값 `"light" | "dark"`가 있으면 그대로, 없거나 읽기 실패면 `matchMedia("(prefers-color-scheme: dark)")`; `<html>`에 `dark` 클래스 토글 + `style.colorScheme` 설정. 전체를 try/catch.
  - `export function ThemeToggle(): JSX.Element` (client) — `aria-label="테마 전환"`, `size-11`, Sun/Moon 아이콘은 `dark:hidden` / `hidden dark:block`로만 전환, 클릭 시 `<html>` 클래스 토글 + `localStorage.setItem(THEME_STORAGE_KEY, …)`(실패 무시)

- [ ] **Step 1: 실패하는 테스트 작성**

```ts
// lib/theme.test.ts — 스크립트를 jsdom에서 실행
const run = (stored: string | null | "throw", prefersDark: boolean) => {
  document.documentElement.className = "";
  vi.stubGlobal("matchMedia", () => ({ matches: prefersDark }));
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { if (stored === "throw") throw new Error(); return stored; });
  new Function(themeInitScript)();
  return document.documentElement.classList.contains("dark");
};
expect(run("light", true)).toBe(false);
expect(run("dark", false)).toBe(true);
expect(run(null, true)).toBe(true);
expect(run(null, false)).toBe(false);
expect(run("throw", true)).toBe(true);   // Review Focus 2

// components/theme-toggle.test.tsx
render(<ThemeToggle />);
await user.click(screen.getByRole("button", { name: "테마 전환" }));
expect(document.documentElement).toHaveClass("dark");
expect(localStorage.getItem("theme")).toBe("dark");
await user.click(screen.getByRole("button", { name: "테마 전환" }));
expect(document.documentElement).not.toHaveClass("dark");
expect(localStorage.getItem("theme")).toBe("light");

// app/globals-contrast.test.ts — globals.css의 :root와 .dark 블록에서 hex 값을 읽어 WCAG 대비 계산
for (const theme of [":root", ".dark"]) {
  expect(contrast(theme, "--foreground", "--background")).toBeGreaterThanOrEqual(4.5);
  expect(contrast(theme, "--muted-foreground", "--background")).toBeGreaterThanOrEqual(4.5);
  expect(contrast(theme, "--primary-text", "--background")).toBeGreaterThanOrEqual(4.5);
  expect(contrast(theme, "--primary-foreground", "--primary")).toBeGreaterThanOrEqual(4.5);
  expect(contrast(theme, "--foreground", "--card")).toBeGreaterThanOrEqual(4.5);
}
```

(라이트 토큰도 모두 hex로 정의해야 이 테스트가 동작한다. `--destructive`가 oklch면 테스트 대상에서 뺀다.)

- [ ] **Step 2: 실패 확인** — `bun run test lib/theme.test.ts components/theme-toggle.test.tsx app/globals-contrast.test.ts` → FAIL
- [ ] **Step 3: 구현** — `lib/theme.ts`, `components/theme-toggle.tsx`, `globals.css` 라이트 토큰(`:root`에 shadcn 토큰 전부: background, foreground, card, card-foreground, popover*, primary, primary-foreground, primary-text, secondary*, muted, muted-foreground, accent*, border, input, ring, chart-*), `.dark`는 기존 값 유지. 스크롤바 색(`#0a2342` 등 하드코딩)도 토큰으로. layout `<head>`에 `<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />`.
- [ ] **Step 4: 통과 확인** — 위 명령 PASS, `tsc` 통과
- [ ] **Step 5: 브라우저 확인** — 개발 서버에서 `/`를 `colorScheme: "light"`와 `"dark"` 두 컨텍스트로 열어 `<html>` 클래스가 각각 없음/`dark`인지, 콘솔에 hydration 경고가 없는지 확인 (Review Focus 5)
- [ ] **Step 6: 커밋** — `feat(theme): 라이트/다크 토큰과 깜빡임 없는 테마 토글`

### Task 4: 이미지 로더를 변형으로 연결

**전제:** Task 2 Step 8 `check`가 0건이어야 시작한다.

**Files:**
- Modify: `lib/image-loader.ts`(본문을 `return variantUrl(src, width)`로), `components/cloudfront-image.tsx`(`unoptimized` prop 제거), `components/deepdive/blocks/GalleryBlock.tsx`(`unoptimized`와 `shortcut:` 주석 제거, 썸네일 `sizes="(max-width: 768px) 50vw, 280px"`, 라이트박스 `sizes="(max-width: 768px) 100vw, 768px"`)
- Test: `lib/image-loader.test.ts`

**Interfaces:**
- Consumes: `variantUrl` (Task 1)

- [ ] **Step 1: 실패하는 테스트** — `cloudFrontLoader({ src: "https://d.net/a/b.png", width: 750, quality: 85 })` → `"https://d.net/a/b.w1280.webp"`; `cloudFrontLoader({ src: "/og-image.png", width: 640 })` → `"/og-image.png"`
- [ ] **Step 2: 실패 확인 → Step 3: 구현 → Step 4: 통과 확인** (`bun run test lib/image-loader.test.ts`)
- [ ] **Step 5: 용량 확인** — `bunx next build && bunx next start -p 3001` 후 `perf.mjs http://localhost:3001` 실행. 기대: `cleanbreath` 이동 `totalKB` < 2000 (기존 13557), `big` 목록에 원본 png/jpg 없음. 브라우저 콘솔에 이미지 404 없음.
- [ ] **Step 6: 커밋** — `perf(images): 커스텀 로더가 WebP 리사이즈본을 반환`

### Task 5: 공통 헤더/푸터

**Files:**
- Modify: `components/navigation.tsx` — 왼쪽 이름 링크(로고 유지 여부는 빌더 재량), 오른쪽 `Work(/#work) · About(/#about) · Contact(/#contact)` + `<ThemeToggle />`. 스크롤 시 `bg-background/90 backdrop-blur` + 하단 `border-b`만, 그림자/등장 애니메이션 없음. 모바일 메뉴 유지(44px).
- Create: `components/site-footer.tsx` — 서버 컴포넌트. `© {new Date().getFullYear()} 최현준` + GitHub/이메일 링크(`SITE_CONFIG` 사용).
- Modify: `app/layout.tsx` — `<body>` 끝에 `<SiteFooter />`. `components/sections/contact-section.tsx`의 자체 푸터(`© 2024`) 제거.
- Test: `components/navigation.test.tsx`

**Interfaces:**
- Consumes: `ThemeToggle` (Task 3)
- Produces: `export function SiteFooter(): JSX.Element`

- [ ] **Step 1: 실패하는 테스트** — `render(<Navigation />)`(usePathname은 `vi.mock("next/navigation", () => ({ usePathname: () => "/" }))`) 후 링크 이름과 href: `Work`→`/#work`, `About`→`/#about`, `Contact`→`/#contact`; `getByRole("button", { name: "테마 전환" })` 존재
- [ ] **Step 2~4: 실패 확인 → 구현 → 통과**
- [ ] **Step 5: 커밋** — `feat(ui): 에디토리얼 헤더와 공통 푸터`

### Task 6: 홈 개편 (Hero → Work → About → Contact) + `/projects` 정리

**Files:**
- Rewrite: `components/sections/hero-section.tsx` — 서버 컴포넌트로(모션 제거 또는 짧은 페이드 하나), `min-h-screen` 제거, 문구는 Global Constraints 그대로.
- Create: `components/sections/work-section.tsx` — 서버 컴포넌트, `<section id="work">`, `projectsData` 순서(phantom-file, subhub, cleanbreath)대로 한 줄씩. 각 줄은 `<Link href={`/projects/${id}`}>` 전체 링크, 왼쪽 `title`(굵게) + `subtitle` + 유형(`personal` → `개인`, `team` → `${teamSize}인 팀`), 오른쪽 `deepDives[id].highlights[0]`의 `value`(큰 숫자)와 `label`. 줄 사이 `border-b`, 첫 줄 위 `border-t border-foreground`. hover는 배경 살짝 + 화살표 이동 정도.
- Create: `components/sections/about-section.tsx` — `<section id="about">`. 기존 `expertise-section.tsx`와 `growth-section.tsx` 문구에서 소개 2~3문장, 기술 목록(텍스트, `data/tech-stack.ts`에서), AWS SAA 자격증(→ `/certifications`), 성장 이야기 2~3줄(`data/growth-stories.ts` 상위 항목 제목 수준).
- Rewrite: `components/sections/contact-section.tsx` — 큰 글자 한 줄 + 이메일/GitHub 링크.
- Modify: `app/page.tsx` — `Hero, Work, About, Contact` 순서.
- Modify: `next.config.ts` — `redirects()`에 `{ source: "/projects", destination: "/#work", permanent: true }`; `app/projects/page.tsx` 삭제.
- Modify: `features/projects/DeepDivePage.tsx:51`, `app/not-found.tsx:39`의 `/projects` 링크 → `/#work`.
- Modify: `public/sitemap.xml` — `/projects` 항목과 존재하지 않는 프로젝트(study-swipe, streamx, react-kakao-sdk) 제거, `/projects/phantom-file` 추가.
- Delete(빌드에서 import가 없음을 grep으로 확인 후): `components/sections/{expertise,growth,projects,tech-stack,troubleshooting}-section.tsx`, `components/project-card.tsx`, 더 이상 쓰지 않는 `data/*.ts`(impact-stories, trouble-shooting 등)와 `components/project-detail/` 중 미사용 컴포넌트.
- Test: `components/sections/work-section.test.tsx`, `components/sections/hero-section.test.tsx`

**Interfaces:**
- Consumes: `projectsData`(`@/data/projects`), `deepDives`(`@/lib/deepdive-content`)
- Produces: `WorkSection()`, `AboutSection()` (서버 컴포넌트, props 없음)

- [ ] **Step 1: 실패하는 테스트**

```tsx
render(await WorkSection());   // 서버 컴포넌트가 async가 아니면 render(<WorkSection />)
const rows = screen.getAllByRole("link");
expect(rows.map((a) => a.getAttribute("href"))).toEqual(["/projects/phantom-file", "/projects/subhub", "/projects/cleanbreath"]);
expect(rows[0]).toHaveTextContent("$5 미만"); expect(rows[1]).toHaveTextContent("97%"); expect(rows[2]).toHaveTextContent("87%↓");
expect(rows[2]).toHaveTextContent("6인 팀"); expect(rows[0]).toHaveTextContent("개인");

render(<HeroSection />);
expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Idea to Production, Never Let Go.");
expect(screen.getByText("만들고, 배포하고, 운영합니다. 백엔드 · AWS")).toBeInTheDocument();
```

- [ ] **Step 2~4: 실패 확인 → 구현 → 통과**
- [ ] **Step 5: 첫 화면 확인** — 개발 서버에서 1440x900, 375x812 두 뷰포트로 `/`를 열어 Work 세 번째 줄의 `getBoundingClientRect().bottom`이 뷰포트 높이 이하인지(375x812에서 안 되면 Hero 여백·글자 크기를 줄인다), `scrollWidth <= clientWidth`인지, 라이트/다크 스크린샷 확인. `/projects` 요청이 `/#work`로 308 리다이렉트되는지 `curl -sI`로 확인.
- [ ] **Step 6: 커밋** — `feat(home): 에디토리얼 홈 (Hero, Work, About, Contact)`

### Task 7: 딥다이브 에디토리얼 스타일

**Files:**
- Modify: `features/projects/DeepDivePage.tsx`(헤더: 카드/배지 장식 줄이고 제목·부제·기술을 텍스트 위계로), `components/deepdive/HighlightCards.tsx`(카드 대신 `<dl>`: 각 항목 `<div>` 안에 `<dt>` 라벨 + `<dd>` 큰 값, 항목 사이 구분선; 홈 Work 수치와 같은 글자 스타일), `TopicSidebar.tsx`, `MobileTopicNav.tsx`, `SubInfoPanel.tsx`(카드 배경 제거, 텍스트 링크 + accent 현재 위치), `RichText.tsx`와 `blocks/{Comparison,MetricGrid,Limitations,Gallery,Video}Block.tsx`(배경 틴트·박스 테두리 → 구분선/여백, 코드 블록은 배경 유지)
- Test: `components/deepdive/HighlightCards.test.tsx`

- [ ] **Step 1: 실패하는 테스트** — `render(<HighlightCards items={[{ label: "월 운영비", value: "$5 미만", icon: "DollarSign" }]} />)` → `getByRole("term")`에 `월 운영비`, `getByRole("definition")`에 `$5 미만`
- [ ] **Step 2~4: 실패 확인 → 구현 → 통과**
- [ ] **Step 5: 브라우저 확인** — 11개 토픽 375px 가로 넘침 0(`check.mjs`의 루프 재사용), 갤러리 Dialog 키보드/포커스 복귀 유지(`check2.mjs`), 라이트/다크 스크린샷으로 블록 가독성 확인
- [ ] **Step 6: 커밋** — `style(deepdive): 딥다이브 에디토리얼 스타일 적용`

### Task 8: 기타 페이지 + 스타일 가드

**Files:**
- Modify: `app/certifications/page.tsx`, `app/not-found.tsx`, `app/loading.tsx`, `app/projects/subhub/privacy/page.tsx`(팔레트 색 → 토큰), `components/common/page-layout.tsx`
- Modify: `app/globals.css` — 쓰지 않게 된 `.glow-*` 등 정리
- Test: `app/style-guard.test.ts`

- [ ] **Step 1: 실패하는 테스트** — `app/`, `components/`, `features/`의 `.tsx` 전체를 읽어(테스트 파일, `components/ui/`, `components/dev-editor/` 제외) 정규식 `/\b(text|bg|border|from|to|via)-(red|green|blue|yellow|purple|pink|cyan|orange|emerald|sky|indigo)-\d{2,3}\b/`와 `/\bglow-/`, `/bg-gradient|bg-linear-/`에 걸리는 파일이 없어야 한다. 실패 시 파일명과 매치를 메시지에 포함.
- [ ] **Step 2: 실패 확인 → Step 3: 페이지 정리 → Step 4: 통과**
- [ ] **Step 5: 커밋** — `style: 기타 페이지 에디토리얼 톤 적용과 스타일 가드 테스트`

### Task 9: 최종 검증과 PR 갱신

- [ ] **Step 1:** `bun run test` 전체 PASS, `tsc --noEmit` 통과, `bunx next build` 통과
- [ ] **Step 2:** 프로덕션 서버(3001)에서 `perf.mjs`로 상세 이동 측정(이미지 용량 기준은 Task 4), 라이트/다크 × 데스크톱/모바일로 홈·딥다이브·자격증 스크린샷을 찍어 직접 본다. `bun scripts/images.ts check` exit 0.
- [ ] **Step 3:** Phantom File event-pipeline 토픽에 video 블록 추가(로컬 편집기 `/dev/editor/phantom-file/event-pipeline` 또는 JSON 직접): `webmKey`/`mp4Key`/`posterKey`는 Task 2 Step 7의 키, 캡션은 "이벤트 기반 정리 파이프라인 (시간 압축 표시)". 아키텍처 이미지 바로 아래.
- [ ] **Step 4:** 커밋 후 push, PR #1 본문의 "남은 작업" 체크리스트 갱신(`gh pr edit 1`)
