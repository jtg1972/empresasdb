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