import { ThunkDispatch } from "redux-thunk";
import API from "src/utils/api";
import { IUser } from "src/utils/api/resources/user";

export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const CLEAR_AUTH = "CLEAR_AUTH";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const CLEAR_AUTH_ERROR = "CLEAR_AUTH_ERROR";

export type ISET_USER = "SET_USER";
export type IUPDATE_USER = "UPDATE_USER";
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
  dispatch(clearAuthError());
};

export const logOut = () => async (dispatch: ThunkDispatch<any, any, any>) => {
  API.deleteToken();
  localStorage.removeItem("token");
  dispatch(clearAuth());
};
