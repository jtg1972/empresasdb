import React from 'react'
import Dialog from '../components/Dialog'
import './styles.scss'

const AddOtmIdFields = ({
  open,
  toggleDialog,
  otmCategoryFields
}) => {
  return (
    <Dialog
      open={open}
      closeDialog={toggleDialog}
      headline="Add Fields to Identify parent Relation"  
    >
      <p>Add Fields to Identify Parent Relation</p>
      {otmCategoryFields.map(x=><p>{x.name1}</p>)}
    </Dialog>
  )
}

export default AddOtmIdFields
