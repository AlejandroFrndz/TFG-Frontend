import { useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import { IProject, ProjectPhase } from "src/utils/api/resources/project";
import { isNotEmpty } from "src/utils/helpers";

export const useStep = (): readonly [number, boolean] => {
  const project = useSelector(selectProject());

  if (isNotEmpty<IProject>(project)) {
    switch (project.phase) {
      case ProjectPhase.Creation:
        return [0, false];
      case ProjectPhase.Analysis:
        return [1, false];
      case ProjectPhase.Tagging:
        return [2, false];
      case ProjectPhase.Visualization:
        return [3, false];
      case ProjectPhase.ExecutingParse:
        return [1, true];
      case ProjectPhase.ExecutingSearch:
        return [2, true];
      case ProjectPhase.ExecutingGroup:
        return [3, true];
    }
  }

  return [-1, false];
};
