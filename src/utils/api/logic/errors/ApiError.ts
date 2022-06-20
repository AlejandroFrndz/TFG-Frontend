import { IError } from "src/utils/api/logic/errors/IError";

export class ApiError implements IError {
  public readonly type = "ApiError";

  constructor(
    readonly message: string,
    readonly code?: string,
    readonly error?: any
  ) {}
}
