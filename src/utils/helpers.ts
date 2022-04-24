import axios from "axios";
import { ApiError, UnexpectedError } from "./api/logic/errors";
import { IError } from "./api/logic/errors/IError";
import { failure, FailureOrSuccess } from "./api/logic/FailureOrSuccess";

export const handleAxiosError = (
  error: any
): FailureOrSuccess<IError, never> => {
  if (axios.isAxiosError(error)) {
    const message = error.response ? error.response.data.error : error.message;
    return failure(new ApiError(message, error));
  }

  return failure(new UnexpectedError(error));
};
