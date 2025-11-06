import gql from "graphql-tag"

export default (categoryName)=>{
  const mutation=`mutation Remove${categoryName}($id: Int,$parentArg:String,$hardDelete:Boolean,$otmCategoryIds:[String],$mtmCategoryIds:[String]){
    remove${categoryName}(id:$id,parentArg:$parentArg,hardDelete:$hardDelete,otmCategoryIds:$otmCategoryIds,mtmCategoryIds:$mtmCategoryIds)
  }`
  console.log("mutation",mutation)
  return gql`${mutation}`

}