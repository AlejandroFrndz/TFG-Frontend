import { IError } from "src/utils/api/logic/errors/IError";
import {
  FailureOrSuccess,
  success,
} from "src/utils/api/logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { IFolder } from "./folder";
import { IFile } from "./file";
import { handleAxiosError } from "src/utils/helpers";
import { EmptyResponse } from "../logic";

export type IUser = {
  id: string;
  username: string;
  email: string;
  isEmailVerfied: boolean;
  isAdmin: boolean;
};

type AxiosMeResponse = {
  user: IUser;
  folders: IFolder[];
  files: IFile[];
};

type AxiosUserResponse = {
  user: IUser;
};

type AxiosUsersResponse = {
  users: IUser[];
};

type MeResponse = FailureOrSuccess<IError, AxiosMeResponse>;

type UserResponse = FailureOrSuccess<IError, AxiosUserResponse>;

type UsersResponse = FailureOrSuccess<IError, IUser[]>;

type UpdateUserParams = {
  username?: string;
  email?: string;
  password?: string;
};
export class User {
  private static prefix = "/user" as const;

  static me = async (): Promise<MeResponse> => {
    try {
      const response = await client.get<AxiosMeResponse>(`${this.prefix}/me`);
      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static updateMe = async (params: UpdateUserParams): Promise<UserResponse> => {
    try {
      const response = await client.patch<AxiosUserResponse>(
        `${this.prefix}/me`,
        params
      );

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static deleteMe = async (): Promise<EmptyResponse> => {
    try {
      await client.delete(`${this.prefix}/me`);
      return success(null);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static getAll = async (): Promise<UsersResponse> => {
    try {
      const response = await client.get<AxiosUsersResponse>(this.prefix);

      return success(response.data.users);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static adminUpdate = async (
    userId: string,
    user: Partial<Omit<IUser, "id">>
  ) => {
    try {
      const response = await client.patch<AxiosUserResponse>(
        `${this.prefix}/${userId}`,
        user
      );

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static adminDelete = async (userId: string): Promise<EmptyResponse> => {
    try {
      await client.delete(`${this.prefix}/${userId}`);

      return success(null);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
