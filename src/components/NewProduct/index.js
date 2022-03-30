import React from 'react'
import Dialog from '../Dialog'
import FormButton from '../Forms/FormButton'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory
})

const NewProduct = ({
  openDialog,
  toggleDialog
}) => {
  const [fields,setFields]=useState({})

  const buttonClick=()=>{

  }
  const dialogConfig={
    open:openDialog,
    closeDialog:toggleDialog,
    headline:"Add Product of "+currentCategory.name
  }

  const displayFieldsConfig=(f,index)=>({
    key:index,
    structure:currentCategory.fields,
    fields,
    setFields
  })

  const formButtonConfig={
    onClick:()=>buttonClick()
  }

  return (
    <Dialog 
    {...dialogConfig}>
      {currentCategory.fields.map((f,index)=>
        <DisplayFields
        {...displayFieldsConfig(f,index)}    
        />)
      }
      <FormButton 
      {...formButtonConfig}>
        Create Product
      </FormButton>
    </Dialog>
  )
}

export default NewProduct
