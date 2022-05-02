import { IProject } from "src/utils/api/resources/project";
import { ProjectActions, SET_PROJECT } from "./actions";

export type ProjectState = IProject | {};

const INITIAL_STATE: ProjectState = {};

const reducer = (
  state: ProjectState = INITIAL_STATE,
  action: ProjectActions
): ProjectState => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        ...action.project,
      };

    default:
      return state;
  }
};

export default reducer;
