import { State } from "src/redux";

export const selectFolders = (parent: string | null) => (state: State) =>
  state.folders.folders.filter((folder) => folder.parent === parent);
