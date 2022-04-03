import axios from "axios";
import client from "../axios";
import { ApiError, UnexpectedError } from "../logic/errors";
import { IError } from "../logic/errors/IError";
import { failure, FailureOrSuccess, success } from "../logic/FailureOrSuccess";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export class Auth {
  static login = async (
    data: LoginRequest
  ): Promise<FailureOrSuccess<IError, LoginResponse>> => {
    try {
      const response = await client.post<LoginResponse>("/auth/singin", data);
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
