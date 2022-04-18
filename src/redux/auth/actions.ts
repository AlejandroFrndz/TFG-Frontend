import { ThunkDispatch } from "redux-thunk";
import API from "src/utils/api";
import { IFolder } from "src/utils/api/resources/folder";
import { IUser } from "src/utils/api/resources/user";

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const SET_FOLDERS = "SET_FOLDERS";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const ADD_FOLDER = "ADD_FOLDER";
export const CLEAR_AUTH = "CLEAR_AUTH";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";

export type ISET_USER = "SET_USER";
export type IUPDATE_USER = "UPDATE_USER";
export type ISET_FOLDERS = "SET_FOLDERS";
export type IUPDATE_FOLDER = "UPDATE_FOLDER";
export type IADD_FOLDER = "ADD_FOLDER";
export type ICLEAR_AUTH = "CLEAR_AUTH";
export type ISET_AUTH_ERROR = "SET_AUTH_ERROR";
export type ICLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";

export type SetUser = {
  type: ISET_USER;
  user: IUser;
};

export const setUser = (user: IUser): SetUser => {
  return { type: SET_USER, user };
};

export type UpdateUser = {
  type: IUPDATE_USER;
  user: IUser;
};

export const updateUser = (user: IUser): UpdateUser => {
  return { type: UPDATE_USER, user };
};

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

export type ClearAuth = {
  type: ICLEAR_AUTH;
};

export const clearAuth = (): ClearAuth => {
  return { type: CLEAR_AUTH };
};

export type SetAuthError = {
  type: ISET_AUTH_ERROR;
};

export const setAuthError = (): SetAuthError => {
  return { type: SET_AUTH_ERROR };
};

export type ClearAuthError = {
  type: ICLEAR_AUTH_ERROR;
};

export const clearAuthError = (): ClearAuthError => {
  return { type: CLEAR_AUTH_ERROR };
};

export type AuthActions =
  | SetUser
  | UpdateUser
  | SetFolders
  | UpdateFolder
  | AddFolder
  | ClearAuth
  | SetAuthError
  | ClearAuthError;

export const fetchMe = () => async (dispatch: ThunkDispatch<any, any, any>) => {
  const meResponse = await API.user.me();

  if (meResponse.isFailure()) {
    dispatch(setAuthError());
    return;
  }

  dispatch(setUser(meResponse.value.user));
  dispatch(setFolders(meResponse.value.folders));
  dispatch(clearAuthError());
};

export const logOut = () => async (dispatch: ThunkDispatch<any, any, any>) => {
  API.deleteToken();
  localStorage.removeItem("token");
  dispatch(clearAuth());
};

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
