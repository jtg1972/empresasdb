import types from "./types";


export const setRoutes=payload=>({
  type:types.ADD_SEGMENT_TO_ROUTE,
  payload
})
export const getRoutes=payload=>({
  type:types.GET_ROUTES
})
export const addIndexesToMtmrecord=payload=>({
  type:types.ADD_INDEXES_TO_MTMRECORD,
  payload
})
export const deleteIndexToMtmrecord=payload=>({
  type:types.DELETE_INDEX_TO_MTMRECORD,
  payload
})