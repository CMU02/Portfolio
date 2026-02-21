// id를 받아 해당 프로젝트 컴포넌트로 분기합니다.
// 새 프로젝트 추가 시: types.ts에 id 추가 → 컴포넌트 생성 → 여기에 case 추가
import { ProjectId } from "./types";
import { SubhubPage } from "./subhub/SubhubPage";
import { PhantomFilePage } from "./phantom-file/PhantomFilePage";
import { CleanBreathPage } from "./cleanbreath/CleanBreathPage";
import { StreamxPage } from "./streamx/StreamxPage";

interface Props {
  id: ProjectId;
}

export function ProjectPage({ id }: Props) {
  switch (id) {
    case "subhub":
      return <SubhubPage />;
    case "phantom-file":
      return <PhantomFilePage />;
    case "cleanbreath":
      return <CleanBreathPage />;
    case "streamx":
      return <StreamxPage />;
  }
}
