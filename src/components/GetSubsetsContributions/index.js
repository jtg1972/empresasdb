import React,{useEffect} from 'react'

export const GetSubsetsContribution=({subsetsData,order,subsets,otmChoices,firstCatNormalFields,finalObject})=>{

  useEffect(()=>{
    calculateSubsetContributions()
  },[])
  const calculateSubsetContributions=()=>{
    console.log("its called")
    Object.keys(order[1]).forEach(category=>{
      let nextSons=[]
      if(category.startsWith("getData"))
        nextSons=firstCatNormalFields[category].otm
      else
        nextSons=otmChoices[category].otm
      console.log("nextsons",nextSons,subsets)
      nextSons.forEach(x=>{
        if(subsets[x]!=undefined){
          Object.keys(subsets[x]).forEach(y=>{
            console.log("prompt445",nextSons,x,y,subsets[x][y],subsetsData,finalObject)

          })
        }
      })
    })
  }
  return <p>Jorge</p>
    

}