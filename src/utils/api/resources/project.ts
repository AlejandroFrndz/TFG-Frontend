import { IError } from "../logic/errors/IError";
import client from "src/utils/api/axios";
import { FailureOrSuccess, success } from "../logic/FailureOrSuccess";
import { handleAxiosError } from "src/utils/helpers";

export enum ProjectLanguage {
  English = "English",
  Spanish = "Spanish",
  French = "French",
}

export enum ProjectPhase {
  Creation = "Creation",
  Analysis = "Analysis",
  Tagging = "Tagging",
  Visualization = "Visualization",
}

export type IProject = {
  id: string;
  owner: string;
  phase: ProjectPhase;
  language: ProjectLanguage | null;
  domainName: string | null;
  isUsingSubdomains: boolean;
};

export type ProjectDetails = {
  language: ProjectLanguage;
  domainName: string;
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

  static updateDetails = async (
    projectId: string,
    projectDetails: ProjectDetails
  ) => {
    try {
      const response = await client.patch<AxiosProjectResponse>(
        `${this.prefix}/${projectId}`,
        projectDetails
      );

      return success(response.data.project);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static uploadCorpus = async (projectId: string, data: FormData) => {
    try {
      const response = await client.post<AxiosProjectResponse>(
        `${this.prefix}/${projectId}/uploadCorpus`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return success(response.data.project);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
