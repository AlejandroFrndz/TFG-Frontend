import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "src/redux/auth/reducers";
import foldersReducer from "src/redux/folders/reducers";
import filesReducer from "src/redux/files/reducers";
import projectReducer from "src/redux/projects/reducers";
import config from "src/config";

const composeEnhancers = config.isDevEnv
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose; //Redux dev tools set up

// Combine reducers into root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  folders: foldersReducer,
  files: filesReducer,
  project: projectReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

export type State = ReturnType<typeof rootReducer>;
