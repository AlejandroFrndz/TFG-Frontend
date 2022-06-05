import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";
import { IError } from "../logic/errors/IError";
import { FailureOrSuccess, success } from "../logic/FailureOrSuccess";

export type SearchParameterType = "string" | "file" | "any";

export type SearchParameter = {
  type: SearchParameterType;
  value: string;
};

export type ISearch = {
  id: string;
  project: string;
  noun1: SearchParameter;
  verb: SearchParameter;
  noun2: SearchParameter;
  isUsingSynt: boolean;
};

type AxiosSearchResponse = {
  search: ISearch;
};

type AxiosSearchesResponse = {
  searches: ISearch[];
};

export type CreateSearchRequestParameter = {
  type: SearchParameterType;
  value: string | null;
};

export type CreateSearchRequest = {
  noun1: CreateSearchRequestParameter;
  verb: CreateSearchRequestParameter;
  noun2: CreateSearchRequestParameter;
  isUsingSynt: boolean;
  project: string;
};

type SearchResponse = FailureOrSuccess<IError, ISearch>;
type SearchesResponse = FailureOrSuccess<IError, ISearch[]>;

export class Search {
  private static prefix = "/search" as const;

  static create = async (data: FormData): Promise<SearchResponse> => {
    try {
      const response = await client.post<AxiosSearchResponse>(
        `${this.prefix}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return success(response.data.search);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static delete = async (
    searchId: string
  ): Promise<FailureOrSuccess<IError, null>> => {
    try {
      await client.delete(`${this.prefix}/${searchId}`);
      return success(null);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static getAllForProject = async (
    projectId: string
  ): Promise<SearchesResponse> => {
    try {
      const response = await client.get<AxiosSearchesResponse>(
        `${this.prefix}/project/${projectId}`
      );

      return success(response.data.searches);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
