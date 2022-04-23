import { ThunkDispatch } from "redux-thunk";
import API from "src/utils/api";
import { IFolder } from "src/utils/api/resources/folder";

export const SET_FOLDERS = "SET_FOLDERS";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const ADD_FOLDER = "ADD_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const CLEAR_FOLDERS = "CLEAR_FOLDERS";

export type ISET_FOLDERS = "SET_FOLDERS";
export type IUPDATE_FOLDER = "UPDATE_FOLDER";
export type IADD_FOLDER = "ADD_FOLDER";
export type IDELETE_FOLDER = "DELETE_FOLDER";
export type ICLEAR_FOLDERS = "CLEAR_FOLDERS";

export type SetFolders = {
  type: ISET_FOLDERS;
  folders: IFolder[];
};

export const setFolders = (folders: IFolder[]): SetFolders => {
  return { type: SET_FOLDERS, folders };
};

export type UpdateFolder = {
  type: IUPDATE_FOLDER;
  folder: IFolder;
};

export const updateFolder = (folder: IFolder): UpdateFolder => {
  return { type: UPDATE_FOLDER, folder };
};

export type AddFolder = {
  type: IADD_FOLDER;
  folder: IFolder;
};

export const addFolder = (folder: IFolder): AddFolder => {
  return { type: ADD_FOLDER, folder };
};

export type DeleteFolder = {
  type: IDELETE_FOLDER;
  folderId: string;
};

export const deleteFolder = (folderId: string): DeleteFolder => {
  return { type: DELETE_FOLDER, folderId };
};

export type ClearFolders = {
  type: ICLEAR_FOLDERS;
};

export const clearFolders = (): ClearFolders => {
  return { type: CLEAR_FOLDERS };
};

export type FoldersActions =
  | SetFolders
  | UpdateFolder
  | AddFolder
  | DeleteFolder
  | ClearFolders;

export const updateFolderParent =
  (childId: string, parentId: string | null) =>
  async (dispatch: ThunkDispatch<any, any, any>) => {
    const folderResponse = await API.folder.updateParent(childId, parentId);

    if (folderResponse.isSuccess()) {
      dispatch(updateFolder(folderResponse.value.folder));
    }
  };

export const createFolder =
  (name: string, parent: string | null) =>
  async (dispatch: ThunkDispatch<any, any, any>) => {
    const folderResponse = await API.folder.create(name, parent);

    if (folderResponse.isSuccess()) {
      dispatch(addFolder(folderResponse.value.folder));
    }
  };

export const renameFolder =
  (folderId: string, name: string) =>
  async (dispatch: ThunkDispatch<any, any, any>) => {
    const folderResponse = await API.folder.rename(folderId, name);

    if (folderResponse.isSuccess()) {
      dispatch(updateFolder(folderResponse.value.folder));
    }
  };

export const removeFolder =
  (folderId: string) => async (dispatch: ThunkDispatch<any, any, any>) => {
    const response = await API.folder.delete(folderId);

    if (response.isSuccess()) dispatch(deleteFolder(folderId));
  };
