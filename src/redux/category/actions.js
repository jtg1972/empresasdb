import types from "./types";

export const setCategories=(payload)=>({
  type:types.SET_CATEGORIES,
  payload
})

export const setCurrentCategoryId=(payload)=>
({
  type:types.SET_CURRENT_CATEGORY_ID,
  payload
})
export const setCurrentCategory=(payload)=>({
  type:types.SET_CURRENT_CATEGORY,
  payload
})

export const setCurrentSons=(payload)=>({
  type:types.SET_CURRENT_SONS,
  payload
})

export const searchCategories=(payload)=>({
  type:types.SEARCH_CATEGORIES,
  payload
})

export const addCategory=(payload)=>({
  type:types.ADD_CATEGORY,
  payload
})

export const addCategoryField=(payload)=>({
  type:types.ADD_CATEGORY_FIELD,
  payload
})

export const removeField=(payload)=>({
  type:types.REMOVE_FIELD,
  payload

})

export const addMultipleFieldValue=(payload)=>({
  type:types.ADD_MULTIPLE_FIELD_VALUE,
  payload
})

export const removeMultipleFieldValue=(payload)=>({
  type:types.REMOVE_MULTIPLE_FIELD_VALUE,
  payload
})

export const loadingTable=(payload)=>({
  type:types.LOADING_TABLE,
  payload
})

export const setCategoryProducts=(payload)=>({
  type:types.SET_CATEGORY_PRODUCTS,
  payload
})

export const setTablesState=payload=>({
  type:types.SET_TABLES_STATE,
  payload
})

export const getTablesState=payload=>({
  type:types.GET_TABLES_STATE,
  payload
})

export const setTableState=payload=>({
  type:types.SET_TABLE_STATE,
  payload
})

export const deleteProduct=payload=>({
  type:types.DELETE_PRODUCT,
  payload
})

export const editProduct=payload=>({
  type:types.EDIT_PRODUCT,
  payload
})

export const addProduct=payload=>({
  type:types.ADD_PRODUCT,
  payload
})

export const addFilterCriteria=payload=>({
  type:types.ADD_FILTER_CRITERIA,
  payload
})

export  const removeFilterCriteria=payload=>({
  type:types.REMOVE_FILTER_CRITERIA,
  payload
})

export const fetchFilterResults=payload=>({
  type:types.FETCH_FILTER_RESULTS,
  payload
})

export const deleteAllFilters=()=>({
  type:types.DELETE_ALL_FILTERS
})


