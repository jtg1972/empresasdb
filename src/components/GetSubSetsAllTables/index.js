import { valueToObjectRepresentation } from '@apollo/client/utilities'
import {useState,useEffect} from 'react'
import { GetCategorySubsets } from '../GetCategorySubsets'
import { getSubsetsData } from './getSubsetsData'
export const GetSubsetsAllTables=({
  finalObject,subsets,conditionsWhere,
  subsetsData,setSubsetsData,order,
  firstCatNormalFields,otmChoices,
  parentCategories,
  parentIdentifiers,
  otmChoicesStatistics
})=>{

  const [keys,setKeys]=useState(Object.keys(finalObject))
  const [keys1,setKeys1]=useState(Object.keys(subsets))
  let y
  useEffect(()=>{
    /*y=getSubsetsData({
        data:finalObject,
        subsets:subsets,
       
       
        
        conditionsWhere:conditionsWhere,
        order:order,
        firstCatNormalFields:firstCatNormalFields,
        otmChoices:otmChoices,
        parentCategories:parentCategories,
        parentIdentifiers:parentIdentifiers,
        otmChoicesStatistics:otmChoicesStatistics,
    })*/
    //setSubsetsData(y)
  },[subsets,finalObject])
  

  console.log("varsglobal",finalObject,subsets)
  return <div>
    
    {subsets!=undefined ? Object.keys(subsets).map(cat=>
    <>
      <p>{cat}</p>
      
      <GetCategorySubsets
        data={finalObject[cat]}
        subsets={subsets}
        category={cat}
        subsetsData={subsetsData}
        setSubsetsData={setSubsetsData}
        conditionsWhere={conditionsWhere}
        order={order}
        firstCatNormalFields={firstCatNormalFields}
        otmChoices={otmChoices}
        parentCategories={parentCategories}
        parentIdentifiers={parentIdentifiers}
        otmChoicesStatistics={otmChoicesStatistics}
      />
      </>
    ):<div>Jorge</div>}
    
    
    {/*<p style={{color:"white"}}>jorge toro</p>*/}
    {/*keys.map(o=><p style={{color:"white"}}>{o}</p>)*/}
    {/*keys1.map(o=><p style={{color:"white"}}>{o}</p>)*/}
  </div>
}