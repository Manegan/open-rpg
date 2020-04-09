import {combineReducers} from "redux";
import auth from "./auth";
import user from "./user";
import characters from "./characters";

export default combineReducers({auth, user, characters});