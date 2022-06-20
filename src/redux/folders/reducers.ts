import { IFolder } from "src/utils/api/resources/folder";
import {
  ADD_FOLDER,
  CLEAR_FOLDERS,
  DELETE_FOLDER,
  FoldersActions,
  SET_FOLDERS,
  UPDATE_FOLDER,
} from "./actions";

export type FoldersState = {
  folders: IFolder[];
};

const INITIAL_STATE: FoldersState = {
  folders: [],
};

/**
 * Deletes a folder and all its children recursively
 * @param folderArray Array with all the folders
 * @param folderId Id of the root folder to delete
 * @returns A new array without the root folder or any of its children
 *
 * I'm not sure to what extent this is worth it vs just deleting the parent thus preventing access to the children.
 * The children will stay in the state, which will eventually be recreated and then the deleted children wont be there
 */
function recursivelyDeleteFolder(
  folderArray: IFolder[],
  folderId: string
): IFolder[] {
  const toDelete = folderArray.filter((folder) => folder.parent === folderId);

  let deletedArray = folderArray.filter((folder) => folder.id !== folderId);

  toDelete.map((folderToDelete) => {
    //eslint-disable-next-line
    deletedArray = recursivelyDeleteFolder(deletedArray, folderToDelete.id);
    return folderToDelete;
  });

  return deletedArray;
}

const reducer = (
  state: FoldersState = INITIAL_STATE,
  action: FoldersActions
): FoldersState => {
  switch (action.type) {
    case SET_FOLDERS:
      return {
        ...state,
        folders: action.folders,
      };
    case UPDATE_FOLDER:
      return {
        ...state,
        folders: (() => {
          let sortFlag = false;
          const folders = state.folders.map((folder) => {
            if (folder.id === action.folder.id) {
              if (folder.name !== action.folder.name) {
                sortFlag = true;
              }
              return action.folder;
            } else {
              return folder;
            }
          });

          return sortFlag
            ? folders.sort((folderA, folderB) =>
                folderA.name.localeCompare(
                  folderB.name,
                  ["en", "es", "fr", "ge"],
                  { ignorePunctuation: true }
                )
              )
            : folders;
        })(),
      };
    case ADD_FOLDER:
      return {
        ...state,
        folders: [...state.folders, action.folder].sort((folderA, folderB) =>
          folderA.name.localeCompare(folderB.name, ["en", "es", "fr", "ge"], {
            ignorePunctuation: true,
          })
        ),
      };
    case DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder.id !== action.folderId
        ),
      };
    case CLEAR_FOLDERS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
