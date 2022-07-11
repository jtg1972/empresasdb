import { checkFetcher } from '@apollo/client'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FormButton from '../Forms/FormButton'

const mapToState=({categories})=>({
  filterResults:categories.filterResults
})

const DisplayFilterProductsTable = ({
  titles,
  setSearchProductsFilter
}) => {
  const {filterResults}=useSelector(mapToState)
  const [order,setOrder]=useState([])
  
  //console.log("titles",titles)

  const displayTitles=()=>{
    let res=[]
    const arr=Array.from(titles)
    /*for(let a in arr){
      res.push(<p>{arr[a]}</p>)
      
    }
    console.log("res",res)*/
    return arr
  }

  const findIdx=(title)=>{
    const ord=order.findIndex(o=>o==title)
    if(ord==-1){
      return ""
    }else
    return <span>({ord+1})</span>
  }

  const displayShowAndSeqOfTable=()=>{
    const titles=displayTitles()
    const titlesSort=titles.sort((a,b)=>{
      if(a>b)
        return 1
      else if(a<b)
        return -1
      else
      return 0
    })
    let cont=[]
    const cg=[]
    for(let t in titlesSort){
      cg.push(<div style={{display:"flex",alignItems:"center"}}>
        <input 
        type="checkbox"
        onChange={(e)=>{
          if(e.target.checked==true){
            setOrder(o=>([...o,titles[t]]))
          }else{
            setOrder(o=>o.filter(x=>x!==titles[t]))
          }
        }}/>&nbsp;
        <span>{titles[t]} {findIdx(titles[t])}</span>&nbsp;&nbsp;&nbsp;
      </div>)
    }
    cont.push(<div style={{display:"flex",flexWrap:"wrap",marginBottom:"5px"}}>{cg}</div>)
    return cont
  }

  const displayTable=()=>{
    const headers=[]
    const arrhed=order.length==0?displayTitles():order
    for(let a in arrhed){
      headers.push(<th>{arrhed[a]}</th>)
    }
    const head=[]
    head.push(<thead>{headers}</thead>)
    //console.log("headers",headers)
    let recs=[]
    let rec=[]
    for(let r in filterResults){
      const row=filterResults[r]
      rec=[]
      for(let a in arrhed){     
        rec.push(<td>{row[arrhed[a]]}</td>)
      }
      recs.push(<tr>{rec}</tr>)
    }
    let table=[]
    table.push(<table>
        {head}
        <tbody>
          {recs}
        </tbody>
      </table>)
    return table
  }

  return (
    <div>
      <FormButton
      onClick={()=>{
        setSearchProductsFilter(false)
        
      }}
      style={{
        width:"auto",
        backgroundColor:"orange",
        color:"black",
        textAlign:"left",
        marginTop:"10px",
        marginBottom:"10px"
      }}>
        Remove Filters
    </FormButton>
      {displayShowAndSeqOfTable()}
      {displayTable()}
    </div>
  )
}

export default DisplayFilterProductsTable
