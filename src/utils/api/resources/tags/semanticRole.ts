import { handleAxiosError } from "src/utils/helpers";
import { IError } from "../../logic/errors/IError";
import { FailureOrSuccess, success } from "../../logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { EmptyResponse } from "../../logic";

export type ISemanticRoleTag = {
  tag: string;
  definition: string | null;
};

type AxiosSemanticRoleTagsResponse = {
  tags: ISemanticRoleTag[];
};

type AxiosSemanticRoleTagResponse = {
  tag: ISemanticRoleTag;
};

export type SemanticRoleTagsResponse = FailureOrSuccess<
  IError,
  ISemanticRoleTag[]
>;

export type SemanticRoleTagResponse = FailureOrSuccess<
  IError,
  ISemanticRoleTag
>;

export class SemanticRole {
  private static prefix = "/tag/semanticRole" as const;

  static getAll = async (): Promise<SemanticRoleTagsResponse> => {
    try {
      const response = await client.get<AxiosSemanticRoleTagsResponse>(
        `${this.prefix}`
      );

      return success(response.data.tags);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static delete = async (tagName: string): Promise<EmptyResponse> => {
    try {
      await client.delete(`${this.prefix}/${tagName}`);

      return success(null);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static create = async (
    tag: ISemanticRoleTag
  ): Promise<SemanticRoleTagResponse> => {
    try {
      const response = await client.post<AxiosSemanticRoleTagResponse>(
        this.prefix,
        tag
      );

      return success(response.data.tag);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
