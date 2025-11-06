import { typesOtm } from "./types"

export const getRoutesOtm=payload=>({
  type:typesOtm.GET_ROUTES_OTM
})
export const addIndexesToOtmrecord=payload=>({
  type:typesOtm.ADD_INDEXES_TO_OTMRECORD,
  payload
})
export const deleteIndexToOtmrecord=payload=>({
  type:typesOtm.DELETE_INDEX_TO_OTMRECORD,
  payload
})