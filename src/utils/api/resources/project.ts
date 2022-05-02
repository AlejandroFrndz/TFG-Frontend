import { IError } from "../logic/errors/IError";
import client from "src/utils/api/axios";
import { FailureOrSuccess, success } from "../logic/FailureOrSuccess";
import { handleAxiosError } from "src/utils/helpers";

export enum ProjectLanguage {
  English = "English",
  Spanish = "Spanish",
  French = "French",
}

export type IProject = {
  id: string;
  owner: string;
  language: ProjectLanguage | null;
  domainName: string | null;
  isUsingSubdomains: boolean;
};

type AxiosProjectResponse = {
  project: IProject;
};

export type ProjectResponse = FailureOrSuccess<IError, IProject>;

export class Project {
  private static prefix = "/project" as const;

  static get = async (projectId: string): Promise<ProjectResponse> => {
    try {
      const response = await client.get<AxiosProjectResponse>(
        `${this.prefix}/${projectId}`
      );

      return success(response.data.project);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}