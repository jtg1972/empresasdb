import types from "./types"

const INITIAL_STATE={
    routes:{},
    indexes:{}
}

export default (state=INITIAL_STATE,action)=>{
  console.log("actionplmtm",action.payload)
  switch(action.type){
    case types.ADD_SEGMENT_TO_ROUTE:
      return {...state,routes:{...state.routes,[action.payload.segment]:action.payload.route}}
    case types.GET_ROUTES:
      return state
    case types.ADD_INDEXES_TO_MTMRECORD:

      let newStateIndexes=state.indexes
      if(newStateIndexes?.[action.payload.mtm]==undefined)
        newStateIndexes={
          ...newStateIndexes,
          [action.payload.mtm]:{}
        }
        if(newStateIndexes[action.payload.mtm]?.
          [action.payload.id]==undefined)
          newStateIndexes={
            ...newStateIndexes,
            [action.payload.mtm]:{
              ...newStateIndexes[action.payload.mtm],
              [action.payload.id]:[

              ]
            }
          }  
          newStateIndexes
          [action.payload.mtm]
          [action.payload.id].push(
            {
              action:action.payload.action,
              row:action.payload.row,
              route:action.payload.route,
              nameVar1:action.payload.nameVar1,
              valueVar1:action.payload.valueVar1,
              nameVar2:action.payload.nameVar2,
              valueVar2:action.payload.valueVar2,
              otherId:action.payload.otherId
            }
          )


      return {
        ...state,
        indexes:newStateIndexes
          
      }
    case types.DELETE_INDEX_TO_MTMRECORD:
      return {
        ...state,
        indexes:{
          ...state.indexes,
          [action.payload.mtm]:{
            ...state.indexes?.[action.payload.mtm],
            [action.payload.id]:[]
            
          }
        }
      }
     
    default:
      return state
    
  }
}