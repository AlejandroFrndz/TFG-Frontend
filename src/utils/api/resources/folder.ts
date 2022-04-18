import { IError } from "src/utils/api/logic/errors/IError";
import {
  failure,
  FailureOrSuccess,
  success,
} from "src/utils/api/logic/FailureOrSuccess";
import client from "src/utils/api/axios";
import axios from "axios";
import { ApiError, UnexpectedError } from "src/utils/api/logic/errors";

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
  static updateParent = async (
    childId: string,
    parentId: string | null
  ): Promise<FailureOrSuccess<IError, FolderResponse>> => {
    try {
      const response = await client.patch<FolderResponse>(
        `/folder/${childId}/updateParent`,
        { newParentId: parentId }
      );

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

  static create = async (
    name: string,
    parent: string | null
  ): Promise<FailureOrSuccess<IError, FolderResponse>> => {
    try {
      const response = await client.post<FolderResponse>(`/folder`, {
        name,
        parent,
      });

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

  static rename = async (
    folderId: string,
    name: string
  ): Promise<FailureOrSuccess<IError, FolderResponse>> => {
    try {
      const response = await client.patch<FolderResponse>(
        `/folder/${folderId}/rename`,
        { name }
      );

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
