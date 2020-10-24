import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import categoryReducer from "./categoryReducer";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";
import fileReducer from "./fileReducer";
import authReducer from './authReducer';
import activityReducer from './activityReducer';
import workingTimeReducer from './workingTimeReducer'

export default combineReducers({
  errors: errorReducer,
  category: categoryReducer,
  project: projectReducer,
  task: taskReducer,
  file: fileReducer,
  auth: authReducer,
  activity: activityReducer,
  workingTime: workingTimeReducer
});