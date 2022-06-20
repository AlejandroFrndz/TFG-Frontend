import { IError } from "../../logic/errors/IError";
import { FailureOrSuccess, success } from "../../logic/FailureOrSuccess";
import { ILexicalDomainTag, LexicalDomain } from "./lexicalDomain";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";
import { ISemanticRoleTag, SemanticRole } from "./semanticRole";
import { ISemanticCategoryTag, SemanticCategory } from "./semanticCategory";
import { ErrorTag, IErrorTag } from "./error";

export type IAllTags = {
  lexicalDomain: ILexicalDomainTag[];
  semanticRole: ISemanticRoleTag[];
  semanticCategory: ISemanticCategoryTag[];
  errors: IErrorTag[];
};

type TagsResponse = FailureOrSuccess<IError, IAllTags>;

export class Tags {
  private static prefix = "/tag" as const;

  static lexicalDomain = LexicalDomain;
  static semanticRole = SemanticRole;
  static semanticCategory = SemanticCategory;
  static error = ErrorTag;

  static getAll = async (): Promise<TagsResponse> => {
    try {
      const response = await client.get<IAllTags>(`${this.prefix}`);

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
