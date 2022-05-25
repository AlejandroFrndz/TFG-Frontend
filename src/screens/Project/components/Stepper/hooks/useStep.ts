import { useSelector } from "react-redux";
import { selectProject } from "src/redux/projects/selectors";
import { IProject, ProjectPhase } from "src/utils/api/resources/project";
import { isNotEmpty } from "src/utils/helpers";

export const useStep = () => {
  const project = useSelector(selectProject());

  if (isNotEmpty<IProject>(project)) {
    switch (project.phase) {
      case ProjectPhase.Creation:
        return 0;
      case ProjectPhase.Analysis:
        return 1;
      case ProjectPhase.Tagging:
        return 2;
      case ProjectPhase.Visualization:
        return 3;
    }
  }

  return -1;
};
