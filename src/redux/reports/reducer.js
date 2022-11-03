import types from "../reports/types"

const INITAL_STATE={
    reportInput:{}
}

export default (state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.SET_REPORT_INPUT:
      return {...state,reportInput:action.payload}
    default:
      return state
    
  }
}