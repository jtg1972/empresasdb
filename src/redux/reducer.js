import { combineReducers } from "redux";
import categoryReducer from "./category/reducer";
import routesReducer from "./mtmupdate/reducers"
export default combineReducers({
  categories:categoryReducer,
  routes:routesReducer
})