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
  queryFieldName,
  structure,
  isManyToMany,
  parentId,
  parentCatId,
  fieldMtm
}) => {
  console.log("fieldMtm",fieldMtm)
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
          let nameMtm
          if(isManyToMany)
            nameMtm=`${queryFieldName}`

          const qcFields=structure.filter(x=>
            x.dataType=="queryCategory")
          let newValues={}

          qcFields.map(q=>{
            const targets=q.targets.split(",")
            targets.forEach((t,i)=>{
              if(i%2==0){
                newValues={
                  ...newValues,
                  [targets[i+1]]:sc[targets[i]]
                }
                console.log("newValues",newValues)
              }
            })
          })
          if(!isManyToMany){
            setFields({...fields,
              [gcqName]:queryCategory,
              [fcqName]:sc.catId,
              [pName]:sc.id,
              
              ...newValues
            
            })
          }else{
            console.log("fieldsnuevo",
            {...fields,
              [gcqName]:queryCategory,
              [fcqName]:sc.catId,
              [pName]:sc.id,
              [nameMtm]:sc.id,
              [fieldMtm]:parentCatId,
              ...newValues
              //...newValues
            })
            setFields({...fields,
              [gcqName]:queryCategory,
              [fcqName]:sc.catId,
              [pName]:sc.id,
              [nameMtm]:sc.id,
              [fieldMtm]:parentCatId,

              ...newValues
            
            })
          }
        }}>

          {displayRow(sc)}

        </div>
        )}
      </div>
    </div>
  )
}

export default DisplaySearchProducts
