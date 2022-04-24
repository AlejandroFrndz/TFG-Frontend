import { IError } from "src/utils/api/logic/errors/IError";
import {
  failure,
  FailureOrSuccess,
  success,
} from "src/utils/api/logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import axios from "axios";
import { ApiError, UnexpectedError } from "src/utils/api/logic/errors";
import { IFolder } from "./folder";
import { IFile } from "./file";

export type IUser = {
  id: string;
  username: string;
  email: string;
  isEmailVerfied: boolean;
  isAdmin: boolean;
};

type MeResponse = {
  user: IUser;
  folders: IFolder[];
  files: IFile[];
};

export class User {
  static me = async (): Promise<FailureOrSuccess<IError, MeResponse>> => {
    try {
      const response = await client.get<MeResponse>("/user/me");
      return success(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response
          ? error.response.data.error
          : error.message;
        return failure(new ApiError(message, error));
      }

      return failure(new UnexpectedError(error));
    }
  };
}
