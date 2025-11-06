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
  fieldMtm,
  titulo,
  otrotitulo,
  productsTable
}) => {
  //console.log("fieldMtm",fieldMtm)
  const displayRow=(sc)=>{
    const values=Object.keys(sc).map(k=>`${k}: ${sc[k]}`)
    return values.join(", ")
  }

  const searchInCurrent=(row)=>{
    for(let x=0;x<productsTable[titulo].length;x++){
      let c=productsTable[titulo][x]
      if(c.id==row.id)
        return false
    }
    return true
  }

  return (
    searchProducts.length>0
    &&
    <div className="containerCombo">
      <div className="scrollCombo">
        {searchProducts.map((sc,i)=>{
          const gcqName=`${queryFieldName}GlobalCatQuery`
          const fcqName=`${queryFieldName}FinalCatQuery`
          const pName=`${queryFieldName}ProductQuery`
          console.log("pname",pName,sc,sc.otmsbareasbcarrerasId,titulo,sc[`${titulo}Id`,parentId])
        return <div 
        className="combo"
        key={i}
        onClick={()=>{
          //console.log("sc",sc)
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
            newValues.id=sc.id
            targets.forEach((t,i)=>{
              if(i%2==0){
                newValues={
                  ...newValues,
                  [targets[i+1]]:sc[targets[i]]
                }
                //console.log("newValues",newValues)
              }
            })
          })
          if(!isManyToMany){
            setFields({...fields,
              [gcqName]:queryCategory,
              [fcqName]:sc.catId,
              [pName]:sc.id,
              id:sc.id,
              
              ...newValues
            
            })
          }else{
            /*console.log("fieldsnuevo",
            {...fields,
              [gcqName]:queryCategory,
              [fcqName]:sc.catId,
              [pName]:sc.id,
              [nameMtm]:sc.id,
              [fieldMtm]:parentCatId,
              ...newValues
              //...newValues
            })*/
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
          
          {!isManyToMany && sc?.[`${titulo}Id`]==0 && displayRow(sc)}
          {isManyToMany && (
            searchInCurrent(sc)) &&
          displayRow(sc)}

        </div>
      })}
      </div>
    </div>
  )
}

export default DisplaySearchProducts
