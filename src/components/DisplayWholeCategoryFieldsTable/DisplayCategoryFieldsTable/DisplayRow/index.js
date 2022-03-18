import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'
import {FcTreeStructure} from 'react-icons/fc'
import {IoIosRemoveCircleOutline} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { removeField } from '../../../../redux/category/actions'

const CATEGORIES1=gql`
  query Categories{
    categories{
      id
      name
      parentCategory
      parentCategories
      bookmark{
        id
        name
      }
      fields{
        id
        name
        dataType
        declaredType
        values
        category
      }
    }
  }`

const REMOVE_FIELD=gql`mutation RemoveField($removeFieldId: Int!) {
  removeField(id: $removeFieldId)
}`

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})
const DisplayRow = ({
  f,
  toggleDialogStructure
}) => {
  const {currentCategory}=useSelector(mapToState)
  const dispatch=useDispatch()
  console.log("f",f)

  const [removeField1]=useMutation(REMOVE_FIELD,{
    
    update:(cache,{data})=>{
      const cats=cache.readQuery(
        {query:CATEGORIES1}
      )
      const resultado=data.removeField
      let newCats=[]
      console.log("resultado,cats",resultado,cats.categories)
      if(resultado==true){
        newCats=cats.categories.map(c=>{
          if(c.id!==f.category){
            if(c.parentCategories.includes(f.category)){
              return {...c,fields:c.fields.filter(g=>
                g.id!==f.id
              )}
            }else{
              return c
            }
          }else{
            return {...c,fields:c.fields.
              filter(y=>y.id!==f.id)}
          }

        })
        cache.writeQuery({
          query:CATEGORIES1,
          data:{
            categories:newCats
          }
          
        })
        dispatch(removeField(f))
      //dispatch(setCurrentCategoryId(newCat.id))
      }
    }
  })
  const displayDataTypeTitle=()=>{
    if(f.dataType=="multipleValue")
      return "Multiple"
    else if(f.dataType=="singleValue")
    return "Single"
  }

  const displayTypes=(values)=>{
    if(values!==null){
      return values.map(v=><span>{v.name} &nbsp;</span>)
    }
    return ""
  }


  return (
    <tr>
      <td>{f.name}</td>
      <td>{f.declaredType}</td>
      <td>{displayDataTypeTitle()}</td>
      <td>{f.values!==undefined 
      &&
      displayTypes(f.values)
      }
      </td>
      <td>
      {f.dataType=="multipleValue"
      &&
      <span>
        <FcTreeStructure
        onClick={()=>{
          toggleDialogStructure(f.id)
          
        }}/>

      </span>
      }
      </td>
      <td>
        <span>
        {f.category==currentCategory.id &&
          <IoIosRemoveCircleOutline
          onClick={()=>{
            removeField1({variables:{
              removeFieldId:f.id
            }})
          }}
          />
        }
        </span>
      </td>
    </tr>
  )
}

export default DisplayRow
