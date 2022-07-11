import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_TABLES_STATE } from '../../pages/DetailedProduct'
import { setTablesState } from '../../redux/category/actions'

import FormButton from '../Forms/FormButton'

const CREATE_TABLE=gql`
mutation CreateTableGood($categoryIds: [Int]) {
  createTableGood(categoryIds: $categoryIds)
}
`
const GET_STATES=gql`
query TableStates {
  tableStates {
    id
    name
    category
    state
  }
}
`

const mapToState=({categories})=>({
  
  tablesStateRecords:categories.tablesStateRecords,
  
})

const DisplayTableStatus = () => {
  const {
    
    tablesStateRecords
  }=useSelector(mapToState)
  const dispatch=useDispatch()

  const [createTable]=useMutation(CREATE_TABLE,{
    update:(cache,{data})=>{
      const res=data.createTableGood

      if(res==true){
        setTimeout(()=>{
          const cats=cache.readQuery({query:GET_STATES})
          const newCats=cats.tableStates.map(c=>
            ({...c,state:"OK"})
          )
          cache.writeQuery({
            query:GET_STATES,
            data:{tableStates:newCats}
          })
        
          dispatch(setTablesState(newCats))
        },20000)
        
      }
    }
  })
  return (
    <div>
      <table>
        <tr>
          <th>Category Id</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
        {tablesStateRecords.map(ts=>
          <tr>
            <td>{ts.category}</td>
            <td>{ts.name}</td>
            <td>{ts.state}</td>
          </tr>
        )}
        
      </table>

      <FormButton
        onClick={()=>{
          const recs=tablesStateRecords.filter(t=>
            t.state!=="OK")
          const ids=recs.map(r=>r.category)
          //console.log("ids",ids)
          createTable({
            variables:{
              categoryIds:ids
            }
          })
        }}
      >Press to update your database</FormButton>
    </div>
  )
}

export default DisplayTableStatus
