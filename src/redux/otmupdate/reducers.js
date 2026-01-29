import { typesOtm } from "./types"


const INITIAL_STATE={
    
    indexesOtm:{}
}
/*GET_ROUTES_OTM
ADD_INDEXES_TO_OTMRECORD*/

export default (state=INITIAL_STATE,action)=>{
  //console.log("actionplmtm",action.payload)
  switch(action.type){
    case typesOtm.GET_ROUTES_OTM:
      return state
    case typesOtm.ADD_INDEXES_TO_OTMRECORD:
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
              nameVar:action.payload.fieldId,
              otherId:action.payload.otherId,
              id:action.payload.id,
              childFields:action.payload.childFields,
              firstStage:action.payload.firstStage,
              otherMtmRel:action.payload.otherMtmRel
              //valueVar1:action.payload.valueVar1,
              //nameVar2:action.payload.nameVar2,
              //valueVar2:action.payload.valueVar2,
              //otherId:action.payload.otherId
            }
          )


      return {
        ...state,
        indexesOtm:newStateIndexes
          
      }
    case typesOtm.DELETE_INDEX_TO_OTMRECORD:
      return {
        ...state,
        indexesOtm:{
          ...state.indexesOtm,
          [action.payload.category]:{
            ...state.indexesOtm?.[action.payload.category],
            [action.payload.id]:[]
            
          }
        }
      }
     
    default:
      return state
    
  }
}