import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS, type ImageWidth, variantKey } from "../lib/image-variants";

const SOURCE_DIRS: [dir: string, ext: string][] = [
  ["data", ".ts"],
  ["content", ".json"],
  ["components", ".tsx"],
  ["features", ".tsx"],
  ["app", ".tsx"],
];

/** 소스 문자열에서 래스터 원본 키를 모은다 (절대 경로, 이미 변형인 것 제외) */
export function collectImageKeys(sources: string[]): string[] {
  const keys = new Set<string>();
  for (const src of sources) {
    // 포스터(posterKey)는 <video poster>로 원본을 바로 쓰고 로더를 거치지 않으므로 변형 대상이 아니다
    for (const m of src.matchAll(/(?<!posterKey"?\s*:\s*)"([^"\s]+\.(?:png|jpe?g|webp))"/g)) {
      if (!m[1].startsWith("/") && !/\.w\d+\.webp$/.test(m[1])) keys.add(m[1]);
    }
  }
  return [...keys].sort();
}

export async function makeVariants(input: Buffer): Promise<Record<ImageWidth, Buffer>> {
  const entries = await Promise.all(
    IMAGE_WIDTHS.map(async (w) => [
      w,
      await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer(),
    ]),
  );
  return Object.fromEntries(entries) as Record<ImageWidth, Buffer>;
}

/** 변형이 하나라도 없는 원본 키 */
export function listMissing(keys: string[], exists: (variantKey: string) => boolean): string[] {
  return keys.filter((k) => !IMAGE_WIDTHS.every((w) => exists(variantKey(k, w))));
}

function walk(dir: string, ext: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name), ext) : e.name.endsWith(ext) ? [join(dir, e.name)] : [],
  );
}

function projectKeys(): string[] {
  const files = SOURCE_DIRS.flatMap(([dir, ext]) => walk(dir, ext));
  return collectImageKeys(files.map((f) => readFileSync(f, "utf8")));
}

function baseUrl(): string {
  const host = process.env.NEXT_PUBLIC_CLOUD_FRONT_URL;
  if (!host) throw new Error("NEXT_PUBLIC_CLOUD_FRONT_URL 이 필요합니다");
  return `https://${host}`;
}

async function generate() {
  const keys = projectKeys();
  for (const key of keys) {
    const cache = join(".image-cache", key);
    let input: Buffer;
    if (existsSync(cache)) {
      input = readFileSync(cache);
    } else {
      const res = await fetch(`${baseUrl()}/${key}`);
      if (!res.ok) throw new Error(`${key}: ${res.status}`);
      input = Buffer.from(await res.arrayBuffer());
      mkdirSync(dirname(cache), { recursive: true });
      writeFileSync(cache, input);
    }
    const out = await makeVariants(input);
    for (const w of IMAGE_WIDTHS) {
      const dest = join(".image-variants", variantKey(key, w));
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, out[w]);
    }
    console.log(`ok ${key}`);
  }
  console.log(`${keys.length}개 키 x ${IMAGE_WIDTHS.length} 변형 생성`);
}

async function check() {
  const keys = projectKeys();
  const found = new Set<string>();
  const urls = keys.flatMap((k) => IMAGE_WIDTHS.map((w) => variantKey(k, w)));
  await Promise.all(
    urls.map(async (v) => {
      const res = await fetch(`${baseUrl()}/${v}`, { method: "HEAD" });
      if (res.ok) found.add(v);
    }),
  );
  const missing = listMissing(keys, (v) => found.has(v));
  console.log(missing.length ? `누락 ${missing.length}건:\n${missing.join("\n")}` : `누락 0건 (${keys.length}개 키)`);
  if (missing.length) process.exit(1);
}

// bun-types 없이 직접 실행 여부를 판별 (vitest import 시에는 실행하지 않음)
if (process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/images.ts")) {
  const cmd = process.argv[2];
  if (cmd === "generate") await generate();
  else if (cmd === "check") await check();
  else {
    console.error("usage: bun scripts/images.ts generate|check");
    process.exit(1);
  }
}
