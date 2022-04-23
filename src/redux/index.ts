import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "src/redux/auth/reducers";
import foldersReducer from "src/redux/folders/reducers";
import filesReducer from "src/redux/files/reducers";

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Redux dev tools set up

// Combine reducers into root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  folders: foldersReducer,
  files: filesReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

export type State = ReturnType<typeof rootReducer>;
