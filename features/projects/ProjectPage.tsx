// id를 받아 해당 프로젝트 컴포넌트로 분기합니다.
// 새 프로젝트 추가 시: types.ts에 id 추가 → 컴포넌트 생성 → 여기에 case 추가
import { ProjectId } from "./types";
import { SubhubPage } from "./subhub/SubhubPage";
import { PhantomFileDeepDivePage } from "./phantom-file/PhantomFileDeepDivePage";
import { CleanBreathPage } from "./cleanbreath/CleanBreathPage";
import { phantomFileDeepDive } from "@/data/projects/phantomfile-data";

interface Props {
  id: ProjectId;
}

export function ProjectPage({ id }: Props) {
  switch (id) {
    case "subhub":
      return <SubhubPage />;
    case "phantom-file":
      // 첫 번째 토픽의 DeepDive 페이지를 기본으로 렌더링
      return (
        <PhantomFileDeepDivePage topicId={phantomFileDeepDive.topics[0].id} />
      );
    case "cleanbreath":
      return <CleanBreathPage />;
    default:
      // isValidProjectId로 이미 검증되었으므로 여기 도달하면 안 됨
      return null;
  }
}
