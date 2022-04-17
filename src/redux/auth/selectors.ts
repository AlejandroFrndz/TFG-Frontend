import { State } from "src/redux";

export const selectAuthError = (state: State) => state.auth.error;
