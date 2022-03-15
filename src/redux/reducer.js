import { combineReducers } from "redux";
import categoryReducer from "./category/reducer";

export default combineReducers({
  categories:categoryReducer
})