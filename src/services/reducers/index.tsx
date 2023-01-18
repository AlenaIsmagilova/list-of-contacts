import { combineReducers } from "redux";
import { userReducer } from "./reducers";

export const rootReducer = combineReducers({
  userReducer,
});
