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

export const getCategoryProducts=(payload)=>({
  type:types.GET_CATEGORY_PRODUCTS,
  payload
})