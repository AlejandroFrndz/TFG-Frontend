import { handleAxiosError } from "src/utils/helpers";
import { IError } from "../../logic/errors/IError";
import { FailureOrSuccess, success } from "../../logic/FailureOrSuccess";
import client from "src/utils/api/axios";

export type ISemanticRoleTag = {
  tag: string;
  definition: string | null;
};

type AxiosSemanticRoleTagsResponse = {
  tags: ISemanticRoleTag[];
};

type LexicalDomainTagsResponse = FailureOrSuccess<IError, ISemanticRoleTag[]>;

export class SemanticRole {
  private static prefix = "/tag/lexicalDomain" as const;

  static getAll = async (): Promise<LexicalDomainTagsResponse> => {
    try {
      const response = await client.get<AxiosSemanticRoleTagsResponse>(
        `${this.prefix}`
      );

      return success(response.data.tags);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
