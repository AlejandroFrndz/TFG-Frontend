import { IError } from "./IError";

export class UnexpectedError implements IError {
  public readonly type = "UnexpectedError";
  public readonly message = "An unexpected error ocurred";
  constructor(readonly error?: any) {}
}
