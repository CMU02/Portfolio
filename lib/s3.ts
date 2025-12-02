import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// S3 클라이언트 생성
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || "cmu02-portpolio";

// S3에서 이미지 URL 생성 (Presigned URL)
export async function getS3ImageUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  // 1시간 동안 유효한 presigned URL 생성
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return url;
}

// 여러 이미지 URL 한번에 가져오기
export async function getS3ImageUrls(keys: string[]): Promise<string[]> {
  const urls = await Promise.all(keys.map((key) => getS3ImageUrl(key)));
  return urls;
}

// CleanBreath 프로젝트 이미지 키 목록
export const cleanBreathImages = {
  erd: {
    legacy: "clean-breath/erd_legacy.png",
    latest: "clean-breath/erd_latest.png",
  },
  screenshots: [
    "clean-breath/clean_breath_01.png",
    "clean-breath/clean_breath_02.png",
    "clean-breath/clean_breath_03.png",
  ],
  seo: {
    before: [
      "clean-breath/google_search_console_before.webp",
      "clean-breath/google_search_console_keyword_before.webp",
      "cleanbreath_before.png",
    ],
    after: [
      "clean-breath/google_search_console_after.webp",
      "clean-breath/google_search_console_keyword_after.webp",
      "cleanbreath_after.png",
    ],
    timeline: [
      "clean-breath/2024_10_31_seo.png",
      "clean-breath/2024_11_11_seo_01.png",
      "clean-breath/2024_11_11_seo_02.png",
      "clean-breath/2024_11_18_seo.png",
    ],
  },
  fieldSurvey: "clean-breath/field_survey_area.png",
};
