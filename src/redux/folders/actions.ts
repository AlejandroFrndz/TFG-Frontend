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
