import gql from 'graphql-tag'
import React from 'react'

export const getMutationManyToManyData=(cat,id,titlepart,nfktd)=>{
  const args=`$${id}:Int`
  const args1=`${id}:$${id}`
  const fields=cat.fields.filter(x=>!x.name.startsWith("mtm"))
  let ftod=fields.map(f=>{
    return f.name
  })
  
  ftod.push(nfktd)
  ftod=ftod.join("\n")
  const mutation=`mutation GetMutationManyToManyData(${args}){
    ${cat.name}By${titlepart}Id(${args1}){
      ${ftod}
    }
  }`
  console.log("fieldsmtmmut",fields,args,args1,mutation)
  return gql`${mutation}`

}

const GetQueryManyToManyData = (cat,id) => {

  return (
    <div>
      
    </div>
  )
}

export default GetQueryManyToManyData
