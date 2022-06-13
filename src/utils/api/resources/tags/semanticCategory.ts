import { IError } from "../../logic/errors/IError";
import { FailureOrSuccess, success } from "../../logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";
import { EmptyResponse } from "../../logic";

export type ISemanticCategoryTag = {
  tag: string;
  ancestor: string | null;
  subTags: ISemanticCategoryTag[];
};

type AxiosSemanticCategoryTagsResponse = {
  tags: ISemanticCategoryTag[];
};

export type SemanticCategoryTagsResponse = FailureOrSuccess<
  IError,
  ISemanticCategoryTag[]
>;

export class SemanticCategory {
  private static prefix = "/tag/semanticCategory" as const;

  static getAll = async (): Promise<SemanticCategoryTagsResponse> => {
    try {
      const response = await client.get<AxiosSemanticCategoryTagsResponse>(
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
}
