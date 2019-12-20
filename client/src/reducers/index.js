import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  errors: errorReducer,
  category: categoryReducer,
  project: projectReducer,
  task: taskReducer
});