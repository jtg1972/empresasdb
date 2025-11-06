import { combineReducers } from "redux";
import categoryReducer from "./category/reducer";
import routesReducer from "./mtmupdate/reducers"
import routesOtmReducer from "./otmupdate/reducers"
export default combineReducers({
  categories:categoryReducer,
  routes:routesReducer,
  routesOtm:routesOtmReducer
})