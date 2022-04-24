import { IError } from "src/utils/api/logic/errors/IError";
import {
  FailureOrSuccess,
  success,
} from "src/utils/api/logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import { handleAxiosError } from "src/utils/helpers";

export type IFolder = {
  id: string;
  name: string;
  owner: string;
  parent: string | null;
};

type FolderResponse = {
  folder: IFolder;
};
export class Folder {
  private static prefix = "/folder" as const;

  static updateParent = async (
    childId: string,
    parentId: string | null
  ): Promise<FailureOrSuccess<IError, FolderResponse>> => {
    try {
      const response = await client.patch<FolderResponse>(
        `${this.prefix}/${childId}/updateParent`,
        { newParentId: parentId }
      );

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static create = async (
    name: string,
    parent: string | null
  ): Promise<FailureOrSuccess<IError, FolderResponse>> => {
    try {
      const response = await client.post<FolderResponse>(`${this.prefix}`, {
        name,
        parent,
      });

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static rename = async (
    folderId: string,
    name: string
  ): Promise<FailureOrSuccess<IError, FolderResponse>> => {
    try {
      const response = await client.patch<FolderResponse>(
        `${this.prefix}/${folderId}/rename`,
        { name }
      );

      return success(response.data);
    } catch (error) {
      return handleAxiosError(error);
    }
  };

  static delete = async (
    folderId: string
  ): Promise<FailureOrSuccess<IError, null>> => {
    try {
      await client.delete(`${this.prefix}/${folderId}`);
      return success(null);
    } catch (error) {
      return handleAxiosError(error);
    }
  };
}
