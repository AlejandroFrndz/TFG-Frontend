import { IError } from "src/utils/api/logic/errors/IError";
import {
  FailureOrSuccess,
  success,
} from "src/utils/api/logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { IFolder } from "./folder";
import { IFile } from "./file";
import { handleAxiosError } from "src/utils/helpers";

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

type UserResponse = {
  user: IUser;
};

type UpdateUserParams = {
  username?: string;
  email?: string;
  password?: string;
};
export class User {
  private static prefix = "/user" as const;

  static me = async (): Promise<FailureOrSuccess<IError, MeResponse>> => {
    try {
      const response = await client.get<MeResponse>(`${this.prefix}/me`);
      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static update = async (
    params: UpdateUserParams
  ): Promise<FailureOrSuccess<IError, UserResponse>> => {
    try {
      const response = await client.patch<UserResponse>(
        `${this.prefix}/`,
        params
      );

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
