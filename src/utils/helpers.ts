import { message } from "antd";
import axios from "axios";
import _ from "lodash";
import { ApiError, UnexpectedError } from "./api/logic/errors";
import { IError } from "./api/logic/errors/IError";
import { failure, FailureOrSuccess } from "./api/logic/FailureOrSuccess";

export const handleAxiosError = (
  error: any
): FailureOrSuccess<IError, never> => {
  if (axios.isAxiosError(error)) {
    const message = error.response ? error.response.data.error : error.message;
    const code = error.response ? error.response.data.type : undefined;
    return failure(new ApiError(message, code, error));
  }

  return failure(new UnexpectedError(error));
};

export const handleActionErrorMessage = (error: IError) => {
  message.error({
    content: `There was an error performing the action: ${error.message}. Please refresh the page and try again later`,
    style: { marginTop: "90vh" },
    duration: 5,
  });
};

export function isNotEmpty<T>(obj: Record<string, any>): obj is T {
  return !_.isEmpty(obj);
}
