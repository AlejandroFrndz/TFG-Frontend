import { ThunkDispatch } from "redux-thunk";
import API from "src/utils/api";
import { IFile } from "src/utils/api/resources/file";

export const SET_FILES = "SET_FILES";
export const UPDATE_FILE = "UPDATE_FILE";
export const ADD_FILE = "ADD_FILE";
export const DELETE_FILE = "DELETE_FILE";
export const CLEAR_FILES = "CLEAR_FILES";

export type ISET_FILES = "SET_FILES";
export type IUPDATE_FILE = "UPDATE_FILE";
export type IADD_FILE = "ADD_FILE";
export type IDELETE_FILE = "DELETE_FILE";
export type ICLEAR_FILES = "CLEAR_FILES";

export type SetFiles = {
  type: ISET_FILES;
  files: IFile[];
};

export const setFiles = (files: IFile[]): SetFiles => {
  return { type: SET_FILES, files };
};

export type UpdateFile = {
  type: IUPDATE_FILE;
  file: IFile;
};

export const updateFile = (file: IFile): UpdateFile => {
  return { type: UPDATE_FILE, file };
};

export type AddFile = {
  type: IADD_FILE;
  file: IFile;
};

export const addFile = (file: IFile): AddFile => {
  return { type: ADD_FILE, file };
};

export type DeleteFile = {
  type: IDELETE_FILE;
  fileId: string;
};

export const deleteFile = (fileId: string): DeleteFile => {
  return { type: DELETE_FILE, fileId };
};

export type ClearFiles = {
  type: ICLEAR_FILES;
};

export const clearFiles = (): ClearFiles => {
  return { type: CLEAR_FILES };
};

export type FilesActions =
  | SetFiles
  | UpdateFile
  | AddFile
  | DeleteFile
  | ClearFiles;

export const updateFileParent =
  (fileId: string, parentId: string | null) =>
  async (dispatch: ThunkDispatch<any, any, any>) => {
    const fileResponse = await API.file.updateParent(fileId, parentId);

    if (fileResponse.isSuccess()) {
      dispatch(updateFile(fileResponse.value.file));
    }
  };

export const createFile =
  (name: string, parent: string | null) =>
  async (dispatch: ThunkDispatch<any, any, any>) => {
    const fileResponse = await API.file.create(name, parent);

    if (fileResponse.isSuccess()) {
      dispatch(addFile(fileResponse.value.file));
    }
  };
