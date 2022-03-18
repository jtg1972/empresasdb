import React from 'react'
import { useSelector } from 'react-redux'
import DisplayHeader from './DisplayHeader'
import DisplayRow from './DisplayRow'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})

const DisplayCategoryFieldsTable = ({
  toggleDialogStructure
}) => {
  const {currentCategory}=useSelector(mapToState)

  return (
    currentCategory?.fields?.length>0
    &&
  
    <div>
      <table>
        <DisplayHeader/>
        {currentCategory.fields.map(f=>
        <DisplayRow
          f={f}
          toggleDialogStructure={toggleDialogStructure}  
        />
        )}
      </table>  
    </div>
  )
}

export default DisplayCategoryFieldsTable
