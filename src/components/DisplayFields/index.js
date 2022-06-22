import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { mockComponent } from 'react-dom/test-utils';
import FormInput from '../Forms/FormInput';
import moment from 'moment'
import DisplayQuerySearch from './DisplayQuerySearch';
import { useSelector } from 'react-redux';
/*import { registerLocale, setDefaultLocale } from  "react-datepicker";
import en from 'date-fns/locale/en-GB'
registerLocale('en',en)
setDefaultLocale('en')*/
const mapToState=({categories})=>({
  categories:categories.categories
})

const DisplayFields = ({
  structure,
  fields,
  setFields,
  parentId,
  isManyToMany,
  parentCatId,
  category,
  categoryNameRelDestiny
}) => {
  const {categories}=useSelector(mapToState)
  console.log("fieldsdf pid",fields,parentId)
  console.log("parentcat id   displayfields",parentCatId)
  const inputChange=(cat,e)=>{
    const fieldName=cat.name
    setFields({
      ...fields,
      [fieldName]:cat.declaredType=="number"?parseInt(e.target.value):e.target.value
    })
  }

  const selectChange=(cat,e)=>{
    const fieldName=cat.name
    setFields({
      ...fields,
      [fieldName]:e.target.value
    })
  }

  const dateChange=(cat,e)=>{
    const fieldName=cat.name
    console.log("date",e)
    let dateObj = new Date(e);
    /*let month = dateObj.getUTCMonth() + 1
    let day = dateObj.getUTCDate()
    let year = dateObj.getUTCFullYear()
    let  nD = month + "/" + day + "/" + year*/
    const nD=moment(dateObj).format()
    console.log("nD",nD)
    setFields({
      ...fields,
      [fieldName]:nD
    })
  }

  const formInputConfig=(cat,index)=>({
    key:index,
    placeholder:cat.name,
    value:cat.declaredType=="number"?parseInt(fields[cat.name]):fields[cat.name],
    onChange:(e)=>inputChange(cat,e),
    type:cat.declaredType=="number"?"number":"text"
  })

  const selectConfig=(cat,index)=>({
    value:fields[cat.name],
    onChange:(e)=>selectChange(cat,e)
  })

  const trDate=(val)=>{
    let dateObj = new Date(val);
    let month = dateObj.getUTCMonth() + 1
    let day = dateObj.getUTCDate()
    let year = dateObj.getUTCFullYear()
    let  nD = year + "/" + month + "/" + day
    setFields({...fields,date1:nD})
    
  }

  const convertToDate=d=>{
    console.log("DATEEEE",d)
    const newDate=new Date(d)
    console.log("DATEEE",newDate)
    const nD=moment(newDate).format()
    console.log("NDCOTODATE",nD,typeof nD)
    return new Date(nD)
  }


  return (
    <div>
    {structure.map((cat,index)=>{
       console.log("pcid cqc",parentCatId,cat.queryCategory,category)
       const catNames=category.name.split("_")
       const firstCat=categories.filter(x=>x.name==catNames[0])[0]
       const secondCat=categories.filter(y=>y.name==catNames[1])[0]
       let nnField
       if(firstCat.name==categoryNameRelDestiny)        
         nnField=`mtm${secondCat.name}${firstCat.name}Id`
       else
         nnField=`mtm${firstCat.name}${secondCat.name}Id`
       console.log("keyes fc sc parentId",firstCat,secondCat,parentId,categoryNameRelDestiny)
       console.log("resultadooooo",{[nnField]:parentCatId},cat.name,nnField)
      
      if(cat.dataType=="queryCategory"
      && cat.name!==nnField){
        
          //setFields({...fields,[nnField]:parentCatId})
          
            return <DisplayQuerySearch
            fields={fields}
            setFields={setFields}
            queryCategory={cat.queryCategory}
            queryFieldName={cat.name}
            structure={structure}
            isManyToMany={isManyToMany}
            parentId={parentId}
            parentCatId={parentCatId}
            fieldMtm={nnField}
            />
        }
        
          //aqui tengo que obtener todos los productos de las categorias finales de esta categoria
          //exactamente la misma mutacion de displaywholetable
      else if(cat.dataType=="singleValue"){
        console.log("CAT",cat)
        if(cat.declaredType=="string" ||
        cat.declaredType=="number"
        && cat.relationship!=="otmdestiny"){
          return <FormInput
          {...formInputConfig(cat,index)}
          ></FormInput>
        }
        else if(cat.declaredType=="date"){
          console.log("cat, fields, fcn",cat,fields,fields[cat.name])
          return (
            <div>
              <p>{cat.name}:</p>
              <p>fcn {fields[cat.name]} {typeof fields[cat.name]} {new Date().toDateString()}</p>
              <ReactDatePicker
              placeholder={cat.name}
              selected={//trDate(fields[cat.name])
                //new Date(`"${trDate(fields[cat.name])}"`)
                //trDate(new Date(`"${fields[cat.name]}"`))
                //new Date(fields[cat.name])
                //new Date("2021/09/21")
                (fields[cat.name]!==undefined && fields[cat.name]!=="")
                ?
                new Date(fields[cat.name])
                :
                new Date()
              }
              onChange={e=>{
                dateChange(cat,e)
              
              }}
            />

            </div>
          )
        }
      }else if(cat.dataType=="multipleValue"){
        return (
          <div>
            <select 
            {...selectConfig(cat,index)}>
              <option value="">Select {cat.name}</option>
              {cat.values.map(v=>
                <option value={v.value}>
                  {v.value}
                </option>)}
            </select>
          </div>
        )
      }

    })}
    </div>
  )
}

export default DisplayFields
