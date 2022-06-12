import { IError } from "../../logic/errors/IError";
import { FailureOrSuccess, success } from "../../logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";

export type ILexicalDomainTag = {
  tag: string;
  protoVerbs: string | null;
};

type AxiosLexicalDomainTagsResponse = {
  tags: ILexicalDomainTag[];
};

export type LexicalDomainTagsResponse = FailureOrSuccess<
  IError,
  ILexicalDomainTag[]
>;

export class LexicalDomain {
  private static prefix = "/tag/lexicalDomain" as const;

  static getAll = async (): Promise<LexicalDomainTagsResponse> => {
    try {
      const response = await client.get<AxiosLexicalDomainTagsResponse>(
        `${this.prefix}`
      );

      return success(response.data.tags);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
