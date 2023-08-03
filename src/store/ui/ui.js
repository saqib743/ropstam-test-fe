import { combineReducers } from "redux";
import NavBar from "./navBar";
import errorReducer from "./error";
export default combineReducers({
  navBar: NavBar,
error: errorReducer,
});
