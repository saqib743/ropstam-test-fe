import { combineReducers } from "redux";

import authReducer from "./auth/auth";
import uiReducer from "./ui/ui";

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
});
