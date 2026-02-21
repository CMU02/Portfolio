// 프로젝트 ID 유니온 타입 — 새 프로젝트 추가 시 여기에만 추가하면 됩니다.
export type ProjectId = "subhub" | "phantom-file" | "cleanbreath" | "streamx";

export const PROJECT_IDS: ProjectId[] = [
  "subhub",
  "phantom-file",
  "cleanbreath",
  "streamx",
];

export function isValidProjectId(id: string): id is ProjectId {
  return PROJECT_IDS.includes(id as ProjectId);
}
