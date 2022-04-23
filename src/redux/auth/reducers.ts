import { IUser } from "src/utils/api/resources/user";
import {
  AuthActions,
  CLEAR_AUTH,
  SET_USER,
  SET_AUTH_ERROR,
  UPDATE_USER,
  CLEAR_AUTH_ERROR,
} from "src/redux/auth/actions";

type AuthState = {
  user: IUser | {};
  error: boolean;
};

const INITIAL_STATE: AuthState = {
  user: {},
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
