import { IError } from "../../logic/errors/IError";
import { FailureOrSuccess, success } from "../../logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";

export type ISemanticCategoryTag = {
  tag: string;
  ancestor: string | null;
  subTags: ISemanticCategoryTag[];
};

type AxiosSemanticCategoryTagsResponse = {
  tags: ISemanticCategoryTag[];
};

type SemanticCategoryTagsResponse = FailureOrSuccess<
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
}
