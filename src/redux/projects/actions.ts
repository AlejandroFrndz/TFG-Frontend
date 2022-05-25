import { IProject } from "src/utils/api/resources/project";

export const SET_PROJECT = "SET_PROJECT";

export type ISET_PROJECT = "SET_PROJECT";

export type SetProject = {
  type: ISET_PROJECT;
  project: IProject;
};

export const setProject = (project: IProject): SetProject => {
  return { type: SET_PROJECT, project };
};

export type ProjectActions = SetProject;
