"use server";

import { getS3ImageUrl, getS3ImageUrls } from "@/lib/s3";

// 단일 이미지 URL 가져오기
export async function fetchS3ImageUrl(key: string): Promise<string> {
  return await getS3ImageUrl(key);
}

// 여러 이미지 URL 가져오기
export async function fetchS3ImageUrls(keys: string[]): Promise<string[]> {
  return await getS3ImageUrls(keys);
}
