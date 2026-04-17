// id를 받아 해당 프로젝트 컴포넌트로 분기합니다.
// 새 프로젝트 추가 시: types.ts에 id 추가 → 컴포넌트 생성 → 여기에 case 추가
import { ProjectId } from "./types";
import { SubhubDeepDivePage } from "./subhub/SubhubDeepDivePage";
import { PhantomFileDeepDivePage } from "./phantom-file/PhantomFileDeepDivePage";
import { CleanBreathDeepDivePage } from "./cleanbreath/CleanBreathDeepDivePage";
import { phantomFileDeepDive } from "@/data/projects/phantomfile-data";
import { subhubDeepDive } from "@/data/projects/subhub-data";
import { cleanbreathDeepDive } from "@/data/projects/cleanbreath-data";

interface Props {
  id: ProjectId;
}

export function ProjectPage({ id }: Props) {
  switch (id) {
    case "subhub":
      return <SubhubDeepDivePage topicId={subhubDeepDive.topics[0].id} />;
    case "phantom-file":
      return (
        <PhantomFileDeepDivePage topicId={phantomFileDeepDive.topics[0].id} />
      );
    case "cleanbreath":
      return (
        <CleanBreathDeepDivePage topicId={cleanbreathDeepDive.topics[0].id} />
      );
    default:
      return null;
  }
}
