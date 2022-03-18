import { searchCategories } from "./actions"
import types from "./types"

const INITIAL_STATE={
  currentCategory:{},
  currentSons:[],
  categories:[],
  currentCategoryId:0,
  searchCategories:[]
}

export default (state=INITIAL_STATE,action)=>{
  switch(action.type){
    case types.SET_CATEGORIES:
      let sons=[]
      if(state.currentCategoryId==0){
        sons=action.payload
      }
      else{
        sons=action.payload.filter(x=>
          x.parentCategory==state.currentCategoryId)
        }
      return {
        ...state,
        searchCategories:[],
        categories:action.payload,
        currentSons:sons,
        currentCategory:action.payload.find(x=>
        x.id==state.currentCategoryId),
        
      }
    case types.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory:action.payload,
        searchCategories:[]
      }
    case types.SET_CURRENT_SONS:
      return {
        ...state,
        currentSons:action.payload
      }
    case types.SET_CURRENT_CATEGORY_ID:
      let x=[]
      console.log("sc",state.categories)
      if(action.payload==0){
        
        x=[...state.categories]
      }else{
        x=state.categories.filter(c=>
          c.parentCategory==action.payload)
      }
      console.log("x",x)

      return {
        ...state,
        currentCategory:state.categories.find(c=>
          c.id==action.payload
        ),
        currentSons:[...x],
        currentCategoryId:action.payload,
        searchCategories:[]
  
      }
    case types.SEARCH_CATEGORIES:
      return {
        ...state,
        searchCategories:state.currentSons.filter(c=>
          c.name.includes(action.payload)  
        )
      }
    case types.ADD_CATEGORY:
      return {
        ...state,
        categories:[...state.categories,action.payload],
        currentSons:[...state.currentSons,action.payload],
        searchCategories:[]
      }
    case types.ADD_CATEGORY_FIELD:
      return {
        ...state,
        categories:state.categories.filter(c=>{
          if(c.id!==action.payload.category){
            if(c.parentCategories.includes(action.payload.category)){
              return {...c,fields:[...c.fields,action.payload]}
            }else{
              return c
            }
          }
          else{
            return {...c,fields:[...c.fields,action.payload]}
          }
          
        }),
        currentCategory:{...state.currentCategory,
          fields:[...state.currentCategory.fields,
          action.payload]
        }
      }

    case types.REMOVE_FIELD:
      console.log("action.payload",action.payload)
      return {
        ...state,
        categories:state.categories.map(c=>{
          if(c.id!==action.payload.category){
            if(c.parentCategories.includes(action.payload.category)){
              return {...c,fields:c.fields.filter(u=>
                u.id!==action.payload.id 
              )}
            }else{
              return c
            }
          }else{
            return {...c,fields:c.fields.
              filter(y=>y.id!==action.payload.id)}
          }

        }),
        currentCategory:{...state.currentCategory,
          fields:state.currentCategory.fields.filter(y=>
            y.id!==action.payload.id  
          )
        }
      }
    default:
      return state
  }
}