import { IError } from "./errors/IError";
import { FailureOrSuccess } from "./FailureOrSuccess";

export type EmptyResponse = FailureOrSuccess<IError, null>;

export * from "./FailureOrSuccess";
