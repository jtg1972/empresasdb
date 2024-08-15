import { getDataFromTree } from '@apollo/client/react/ssr'
import {useState,useEffect} from 'react'
import { GetCategorySubset } from '../GetCategorySubset'

export const GetCategorySubsets=({data,subsets,category,
subsetsData,setSubsetsData,conditionsWhere,
order,firstCatNormalFields,otmChoices,
parentCategories,parentIdentifiers,otmChoicesStatistics})=>{
  const [subsets1,setSubsets1]=useState(subsets)
  console.log("problema",subsets)
  let tableTotalRecords
  useEffect(()=>{

    let ssd=subsetsData
    console.log("ssd111",ssd,subsets)
    //setSubsetsData(ssd)
  },[])
  
 
    return <div>
      {subsets?.[category]!=undefined ? Object.keys(subsets[category])?.map(subset=>{
      return <GetCategorySubset
      data={data}
      subset={subset}
      category={category}
      subsets={subsets}
      subsetsData={subsetsData}
      setSubsetsData={setSubsetsData}
      conditionsWhere={conditionsWhere}
      order={order}
      firstCatNormalFields={firstCatNormalFields}
      otmChoices={otmChoices}
      parentCategories={parentCategories}
      parentIdentifiers={parentIdentifiers}
      otmChoicesStatistics={otmChoicesStatistics}
    />}):
    <div>jorge
    </div>}
    </div>
  
  
}