import React from 'react'
import { useSelector } from 'react-redux'
import FormButton from '../Forms/FormButton'
import DisplayCategoryFieldsTable from './DisplayCategoryFieldsTable'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})

const DisplayWholeCategoryFieldsTable = ({
  toggleDialogField,
  toggleDialogStructure,
  setFieldName
}) => {
  const {currentCategory}=useSelector(mapToState)
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
