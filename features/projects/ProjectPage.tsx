// id를 받아 첫 번째 토픽의 딥다이브 템플릿을 렌더링합니다.
// 새 프로젝트 추가 시: types.ts에 id 추가 → lib/deepdive-content.ts 레지스트리에 등록
import { ProjectId } from "./types";
import { DeepDivePage } from "./DeepDivePage";
import { deepDives } from "@/lib/deepdive-content";

interface Props {
  id: ProjectId;
}

export function ProjectPage({ id }: Props) {
  return <DeepDivePage projectId={id} topicId={deepDives[id].topics[0].id} />;
}
