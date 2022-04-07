import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadingTable } from '../../redux/category/actions'
import FormButton from '../Forms/FormButton'
import DisplayCategoryFieldsTable from './DisplayCategoryFieldsTable'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})

const CREATE_TABLE=gql`
mutation Mutation($category: Int!, $typeOfCategory: Int!) {
  createTable(category: $category, typeOfCategory: $typeOfCategory)
}
`

const DisplayWholeCategoryFieldsTable = ({
  toggleDialogField,
  toggleDialogStructure,
  setFieldName
}) => {
  const dispatch=useDispatch()
  const {currentCategory}=useSelector(mapToState)
  const [createTable]=useMutation(CREATE_TABLE,{
    update:(cache,{data})=>{
      const resultado=data.createTable
      if(resultado==true){
        setTimeout(()=>
          dispatch(loadingTable(false)),10000)
      }
    }
  })
      
  return (
    <div>
      <FormButton
      className="addFirstButton"
      onClick={()=>toggleDialogField()}
      >
        Add field to {currentCategory==undefined
        ?"Root":currentCategory.name}
      </FormButton>
      {currentCategory!==null 
      &&
      <DisplayCategoryFieldsTable
      toggleDialogStructure={toggleDialogStructure}
      setFieldName={setFieldName}
      />
      }

      
    </div>
  )
}

export default DisplayWholeCategoryFieldsTable
