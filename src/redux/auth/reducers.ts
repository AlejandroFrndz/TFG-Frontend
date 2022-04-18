import { IUser } from "src/utils/api/resources/user";
import {
  AuthActions,
  CLEAR_AUTH,
  SET_USER,
  SET_AUTH_ERROR,
  UPDATE_USER,
  CLEAR_AUTH_ERROR,
  SET_FOLDERS,
  UPDATE_FOLDER,
  ADD_FOLDER,
} from "src/redux/auth/actions";
import { IFolder } from "src/utils/api/resources/folder";

type AuthState = {
  user: IUser | {};
  folders: IFolder[];
  error: boolean;
};

const INITIAL_STATE = {
  user: {},
  folders: [],
  error: false,
};

const reducer = (state: AuthState = INITIAL_STATE, action: AuthActions) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
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
    case CLEAR_AUTH:
      return INITIAL_STATE;
    case SET_AUTH_ERROR:
      return {
        ...state,
        error: true,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
