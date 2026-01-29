import types from "./types"


const INITIAL_STATE={
    routes:{},
    indexes:{}
}
/*GET_ROUTES_OTM
ADD_INDEXES_TO_OTMRECORD*/

export default (state=INITIAL_STATE,action)=>{
  //console.log("actionplmtm",action.payload)
  switch(action.type){
    case types.ADD_SEGMENT_TO_ROUTE:
      return {...state,routes:{...state.routes,[action.payload.segment]:action.payload.route}}
    case types.GET_ROUTES:
      return state
    case types.ADD_INDEXES_TO_MTMRECORD:
      /*
        vamos a enviar a redux otm para anadir 
        category:i,
        id:parId,
        fieldId:{titulo}Id
        row:data[nombre],
        action:"add"
        */
      let newStateIndexes=state.indexesOtm
      if(newStateIndexes?.[action.payload.category]==undefined)
        newStateIndexes={
          ...newStateIndexes,
          [action.payload.category]:{}
        }
        if(newStateIndexes[action.payload.category]?.
          [action.payload.id]==undefined)
          newStateIndexes={
            ...newStateIndexes,
            [action.payload.category]:{
              ...newStateIndexes[action.payload.category],
              [action.payload.id]:[

              ]
            }
          }  
          newStateIndexes
          [action.payload.category]
          [action.payload.id].push(
            {
              category:action.payload.category,
              action:action.payload.action,
              row:action.payload.row,
              //route:action.payload.route,
              nameVar:action.payload.fieldId
              //valueVar1:action.payload.valueVar1,
              //nameVar2:action.payload.nameVar2,
              //valueVar2:action.payload.valueVar2,
              //otherId:action.payload.otherId
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
          [action.payload.category]:{
            ...state.indexes?.[action.payload.category],
            [action.payload.id]:[]
            
          }
        }
      }
     
    default:
      return state
    
  }
}