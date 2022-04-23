import { State } from "src/redux";

export const selectFiles = (parent: string | null) => (state: State) =>
  state.files.files.filter((file) => file.parent === parent);
