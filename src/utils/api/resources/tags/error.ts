import { EmptyResponse, FailureOrSuccess, success } from "../../logic";
import { IError } from "../../logic/errors/IError";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";

export type IErrorTag = {
  errorCode: number;
  humanReadable: string;
};

type AxiosErrorTagResponse = {
  tags: IErrorTag[];
};

export type ErrorTagsResponse = FailureOrSuccess<IError, IErrorTag[]>;

export class ErrorTag {
  private static prefix = "/tag/error" as const;

  static getAll = async (): Promise<ErrorTagsResponse> => {
    try {
      const response = await client.get<AxiosErrorTagResponse>(this.prefix);

      return success(response.data.tags);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static delete = async (errorCode: string): Promise<EmptyResponse> => {
    try {
      await client.delete(`${this.prefix}/${errorCode}`);

      return success(null);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
