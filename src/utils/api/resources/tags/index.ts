import { IError } from "../../logic/errors/IError";
import { FailureOrSuccess, success } from "../../logic/FailureOrSuccess";
import { ILexicalDomainTag, LexicalDomain } from "./lexicalDomain";
import { ISemanticRoleTag, SemanticRole } from "./SemanticRole";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";

export type IAllTags = {
  lexicalDomain: ILexicalDomainTag[];
  semanticRole: ISemanticRoleTag[];
};

type TagsResponse = FailureOrSuccess<IError, IAllTags>;

export class Tags {
  private static prefix = "/tag" as const;

  static lexicalDomain = LexicalDomain;
  static semanticRole = SemanticRole;

  static getAll = async (): Promise<TagsResponse> => {
    try {
      const response = await client.get<IAllTags>(`${this.prefix}`);

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
