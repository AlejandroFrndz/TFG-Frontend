import { State } from "..";

export const selectAuthError = (state: State) => state.auth.error;
