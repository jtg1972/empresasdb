import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import createSagaMiddle from 'redux-saga'
import rootSaga from './rootSaga'
import rootReducer from "./reducer";
const sagaMiddleware=createSagaMiddle()
const middlewares=[thunk,sagaMiddleware,logger]
const store=createStore(rootReducer,{},applyMiddleware(...middlewares))
sagaMiddleware.run(rootSaga)
export default store