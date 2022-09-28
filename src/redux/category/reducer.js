import { fetchFilterResults, getPath } from "./helpers"
import types from "./types"

const INITIAL_STATE={
  currentCategory:{},
  currentSons:[],
  categories:[],
  currentCategoryId:0,
  searchCategories:[],
  loadingTable:false,
  categoryProducts:{},
  tablesStateRecords:[],
  tablesStateStatus:false,
  filterCriterias:[],
  path:[]
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
      //console.log("sc",state.categories)
      if(action.payload==0){
        
        x=[...state.categories]
      }else{
        x=state.categories.filter(c=>
          c.parentCategory==action.payload)
      }
      //console.log("x",x)

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
        categories:[...state.categories,{...action.payload,fields:[]}],
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
      //console.log("action.payload",action.payload)
      
      return {
        ...state,
        categories:state.categories.map(c=>{
        
          if(c.parentCategories.includes(action.payload.category)){
            return {...c,fields:c.fields.filter(u=>
              u.id!==action.payload.id 
            )}
          }else if(c.parentCategories.includes(action.payload.relationCategory)){
            const relCat=state.categories.find(x=>
              x.id==action.payload.relationCategory)
            if(relCat){
              return {...c,fields:c.fields.filter(u=>
                u.name!==`${state.currentCategory.name}${relCat[0].name}Id`
            )}}else{
              return c
            }

          }else{
              return c
          }
        }),
        currentCategory:{...state.currentCategory,
          fields:state.currentCategory.fields.filter(y=>
            y.id!==action.payload.id  
          )
        }
    
      }
    
    case types.ADD_MULTIPLE_FIELD_VALUE:
      const ncats=state.categories.map(c=>{
        if(c.id!==action.payload.category){
          return c
        }else{
          const nf=c.fields.map(f=>{
            if(f.id!==action.payload.id){
              return f
            }else{
              return action.payload
            }
          })
          return {...c,fields:nf}
        }
      })
      return {...state,
        categories:ncats,
        currentCategory:{...state.currentCategory,
        fields:state.currentCategory.fields.map(r=>{
          if(r.id!==action.payload.id){
            return r
          }else{
            return action.payload
          }

        })}
      }
    case types.REMOVE_MULTIPLE_FIELD_VALUE:
      const nb=state.categories.map(o=>{
        if(o.id!==action.payload.category){
          if(Array.isArray(o?.fields)){
          const newF=o.fields.map(f=>{
            if(f.id==action.payload.fieldId){
              if(Array.isArray(o?.fields?.values)){
                if(o.fields.values.includes(action.payload.value)){
                  let nar1=[]
      
                  for(let u in o.fields.values){
                    if(o["fields"]["values"][u]!==action.payload.value){
                      nar1.push(o["fields"]["values"][u])
                    }
                  }
                  return {...f,values:nar1}
                }else{
                  return f
                }
              }
            }
            else{
              return f
            }
          })
          return {...o,fields:newF}
        }
      }
      })
      
      const nf=state?.currenCategory?.fields.filter(i=>{
      if(i.id!==action.payload.fieldId){
        return i
      }else{
        let newValues=[]
        if(Array.isArray(i["values"])){
          for(let u in i["values"]){
            if(i["values"][u]!==action.payload.value){
              newValues.push(u)
            }
          }
        
          return {...i,values:newValues}
        }
      }
      
    })
      return {
        ...state,
        categories:nb,
        currentCategory:{...state.currentCategory,fields:nf}
      }
    case types.LOADING_TABLE:
      return {...state,
        loadingTable:action.payload
      }
    case types.SET_CATEGORY_PRODUCTS:
      return {
        ...state,
        categoryProducts:action.payload
      }
    case types.SET_TABLES_STATE:
      return {
        ...state,
        tablesStateRecords:action.payload,
        tablesStateStatus:action.payload.filter(ts=>
          ts.state!=="OK"  
        ).length>0?"NO_OK":"OK"
      }
    case types.SET_TABLE_STATE:
      let found=false
      let newRecs=state.tablesStateRecords.map(t=>{
        if(t.category==action.payload.category){
          found=true
          return {...t,...action.payload}
        }else
          return t
      })
      if(found==false){
        newRecs=[...newRecs,action.payload]
      }
      return {...state,
        tablesStateRecords:newRecs,
        tablesStateStatus:newRecs.filter(ts=>
          ts.state!=="OK"  
        ).length>0?"NO_OK":"OK"
      }
    /*case types.SET_TABLE_STATE:
      const newRecs=state.tablesStateRecords.map(t=>{
        if(t.category==action.payload.category)
          return {...t,...action.payload}
        else
          return t
      })
      return {...state,
        tablesStateRecords:newRecs,
        tablesStateStatus:newRecs.filter(ts=>
          ts.state!=="OK"  
        ).length>0?"NO_OK":"OK"
      }*/
    case types.GET_TABLES_STATE:
      let resultado=""
      const noOkCount=state.tablesStateRecords.filter(t=>
          t.state=="OK"?false:true)
      if(noOkCount.length>0)
        resultado="NO_OK"
      else
        resultado="OK"

      return {
        ...state,
        tablesStateStatus:resultado

      }
    case types.DELETE_PRODUCT:
      const prodCat=`getData${action.payload.categoryName}`
      return {...state,
        categoryProducts:{
          ...state.categoryProducts,
          [prodCat]:state["categoryProducts"][prodCat].filter(f=>
            f.id!==action.payload.productId)
        }
      }
    case types.EDIT_PRODUCT:
      const prodCat1=`getData${action.payload.categoryName}`

      return {...state,
        categoryProducts:{
          ...state.categoryProducts,
          [prodCat1]:state["categoryProducts"][prodCat1].map(f=>{
            
            if(f.id!==action.payload.product.id){
              return f
            }else
              return action.payload.product

          })
        }
      }
    case types.ADD_PRODUCT:
      const seg=`getData${action.payload.categoryName}`
      return {
        ...state,
        categoryProducts:{...state.categoryProducts,
          [seg]:[...state.categoryProducts[seg],action.payload.product]
        }
      }

    case types.ADD_FILTER_CRITERIA:
      return {
        ...state,
        filterCriterias:[
          ...state.filterCriterias,
          action.payload
        ]
      }
    case types.REMOVE_FILTER_CRITERIA:
      return {
        ...state,
        filterCriterias:[
          ...state.filterCriterias.filter(fc=>
            fc.name!==action.payload
          )
        ]
      }
    case types.FETCH_FILTER_RESULTS:
      return {
        ...state,
        filterResults:fetchFilterResults(action.payload.data,action.payload.conds)
      }
    case types.ADD_TABLE_STATE:
      const nR=[...state.tablesStateRecords,
        action.payload]
      console.log("NR",nR,action.payload)
      return {
        ...state,
        tablesStateRecords:nR,
        tablesStateStatus:nR.filter(ts=>
            ts.state!=="OK"  
          ).length>0?"NO_OK":"OK"
      }
    default:
      return state
    
  }
}