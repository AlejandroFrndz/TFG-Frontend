import { IFile } from "src/utils/api/resources/file";
import {
  ADD_FILE,
  CLEAR_FILES,
  DELETE_FILE,
  FilesActions,
  SET_FILES,
  UPDATE_FILE,
} from "./actions";

export type FilesState = {
  files: IFile[];
};

const INITIAL_STATE: FilesState = {
  files: [],
};

const reducer = (
  state: FilesState = INITIAL_STATE,
  action: FilesActions
): FilesState => {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.files,
      };
    case UPDATE_FILE:
      return {
        ...state,
        files: (() => {
          let sortFlag = false;
          const files = state.files.map((file) => {
            if (file.id === action.file.id) {
              if (file.name !== action.file.name) {
                sortFlag = true;
              }
              return action.file;
            } else {
              return file;
            }
          });

          return sortFlag
            ? files.sort((fileA, fileB) =>
                fileA.name.localeCompare(fileB.name, ["en", "es", "fr", "ge"], {
                  ignorePunctuation: true,
                })
              )
            : files;
        })(),
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.file].sort((fileA, fileB) =>
          fileA.name.localeCompare(fileB.name, ["en", "es", "fr", "ge"], {
            ignorePunctuation: true,
          })
        ),
      };
    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.fileId),
      };
    case CLEAR_FILES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
