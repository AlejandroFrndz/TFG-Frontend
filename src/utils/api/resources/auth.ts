import axios from "axios";
import client from "src/utils/api/axios";
import { ApiError, UnexpectedError } from "src/utils/api/logic/errors";
import { IError } from "src/utils/api/logic/errors/IError";
import {
  failure,
  FailureOrSuccess,
  success,
} from "src/utils/api/logic/FailureOrSuccess";

type LoginRequest = {
  email: string;
  password: string;
};

type TokenResponse = {
  token: string;
};

type SingUpRequest = {
  username: string;
  email: string;
  password: string;
};

export class Auth {
  private static prefix = "/auth" as const;

  static login = async (
    data: LoginRequest
  ): Promise<FailureOrSuccess<IError, TokenResponse>> => {
    try {
      const response = await client.post<TokenResponse>(
        `${this.prefix}/singin`,
        data
      );
      return success(response.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const message = error.response
          ? error.response.data.error
          : error.message;
        return failure(new ApiError(message, undefined, error));
      }

      return failure(new UnexpectedError(error));
    }
  };

  static singup = async (
    data: SingUpRequest
  ): Promise<FailureOrSuccess<IError, TokenResponse>> => {
    try {
      const response = await client.post<TokenResponse>(
        `${this.prefix}/singup`,
        data
      );
      return success(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response
          ? error.response.data.error
          : error.message;
        return failure(new ApiError(message, undefined, error));
      }

      return failure(new UnexpectedError(error));
    }
  };
}
