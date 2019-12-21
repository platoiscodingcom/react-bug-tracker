import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";
import fileReducer from "./fileReducer";

export default combineReducers({
  errors: errorReducer,
  category: categoryReducer,
  project: projectReducer,
  task: taskReducer,
  file: fileReducer
});