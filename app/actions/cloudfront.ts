"use server";

import {
  getCloudFrontImageUrl,
  getCloudFrontImageUrls,
} from "@/lib/cloudfront";

// 단일 이미지 URL 가져오기 (Server Action이므로 async 필요)
export async function fetchCloudFrontImageUrl(key: string): Promise<string> {
  return getCloudFrontImageUrl(key);
}

// 여러 이미지 URL 가져오기 (Server Action이므로 async 필요)
export async function fetchCloudFrontImageUrls(
  keys: string[]
): Promise<string[]> {
  return getCloudFrontImageUrls(keys);
}
