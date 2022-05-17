import { useMutation } from "@apollo/client"
import gql from "graphql-tag"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../../redux/category/actions"

const getMutationForDelete=(categoryName)=>{
  const mutation=`mutation Remove${categoryName}($id: Int) {
    remove${categoryName}(id: $id)

  }`
  console.log("mutation",mutation)
  return gql`${mutation}`

}

const DeleteProductRecord=(
  catName
)=>{
  const DELETE_PRODUCT=getMutationForDelete(catName)
  console.log("DELEPRODMUT",DELETE_PRODUCT)
  console.log("catnamedisp",catName)
  
  return [DELETE_PRODUCT]
}
export default DeleteProductRecord