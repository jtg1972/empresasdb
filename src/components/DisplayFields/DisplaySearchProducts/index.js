import { FieldsOnCorrectTypeRule } from 'graphql'
import React from 'react'
import './styles.scss'

const DisplaySearchProducts = ({
  searchProducts,
  setChosenProduct,
  setFields,
  fields,
  queryCategory,
  nameCategory,
  queryFieldName
}) => {
  const displayRow=(sc)=>{
    const values=Object.keys(sc).map(k=>`${k}: ${sc[k]}`)
    return values.join(", ")
  }

  return (
    searchProducts.length>0
    &&
    <div className="containerCombo">
      <div className="scrollCombo">
        {searchProducts.map((sc,i)=>
        <div 
        className="combo"
        key={i}
        onClick={()=>{
          console.log("sc",sc)
          const gcqName=`${queryFieldName}GlobalCatQuery`
          const fcqName=`${queryFieldName}FinalCatQuery`
          const pName=`${queryFieldName}ProductQuery`
          setFields({...fields,
            [gcqName]:queryCategory,
            [fcqName]:sc.catId,
            [pName]:sc.id
          
          })
        }}>

          {displayRow(sc)}

        </div>
        )}
      </div>
    </div>
  )
}

export default DisplaySearchProducts
