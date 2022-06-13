import { State } from "src/redux";

export const selectAuthError = (state: State) => state.auth.error;
export const selectUser = (state: State) => state.auth.user;
export const selectUserIsAdmin = (state: State) =>
  state.auth.user ? state.auth.user : false;
