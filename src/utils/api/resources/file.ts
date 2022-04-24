import { IError } from "../logic/errors/IError";
import { FailureOrSuccess, success } from "../logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";

export type IFile = {
  id: string;
  name: string;
  owner: string;
  parent: string | null;
  project: string;
};

type FileResponse = {
  file: IFile;
};

export class File {
  private static prefix = "/file" as const;

  static updateParent = async (
    fileId: string,
    parentId: string | null
  ): Promise<FailureOrSuccess<IError, FileResponse>> => {
    try {
      const response = await client.patch<FileResponse>(
        `${this.prefix}/${fileId}/updateParent`,
        { parentId }
      );

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static create = async (
    name: string,
    parent: string | null
  ): Promise<FailureOrSuccess<IError, FileResponse>> => {
    try {
      const response = await client.post<FileResponse>(`${this.prefix}`, {
        name,
        parent,
      });

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static rename = async (
    fileId: string,
    name: string
  ): Promise<FailureOrSuccess<IError, FileResponse>> => {
    try {
      const response = await client.patch<FileResponse>(
        `${this.prefix}/${fileId}/rename`,
        { name }
      );

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static delete = async (
    fileId: string
  ): Promise<FailureOrSuccess<IError, null>> => {
    try {
      await client.delete(`${this.prefix}/${fileId}`);
      return success(null);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
