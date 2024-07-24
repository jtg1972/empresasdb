import React, { useState,useEffect } from 'react'
import Datetime from 'react-datetime'
import './styles.scss'
const DateTimePicker=({placeholder,setFields,name,fields,style,cd,letterColor})=>{
  let now_utc,cd2

  const [currentDate,setCurrentDate]=useState(new Date(fields[name]))//new Date(cd))
  const [initialValue,setInitalValue]=useState("")
  //console.log("cd222",cd)
  console.log("clase",`className:${letterColor}`)
 
  useEffect(()=>{
    cd2=new Date(parseInt(fields[name]))
    now_utc = Date.UTC(
      cd2.getUTCFullYear(), 
      cd2.getUTCMonth(),
      cd2.getUTCDate(), 
      cd2.getUTCHours(),
      cd2.getUTCMinutes(), 
      cd2.getUTCSeconds()
    );

console.log("iso",new Date(now_utc));
//console.log("iso",cd2.toISOString());
setFields(y=>({...y,[name]:new Date(now_utc)}))
setCurrentDate(new Date(now_utc))
  },[])

  
  //let ns=cd2.getDay()+" "+cd2.getMonth()+" "+cd2.getDate()+" "+cd2.getFullYear()+" "+cd2.getHours()+":"+cd2.getMinutes()+":"+cd2.getSeconds()+" "+cd2.getTimezoneOffset()
  
  //console.log("ns",ns,cd2.getTimezoneOffset())//const nd=new Date(cd)
  return <>
    <Datetime 
    inputProps={{placeholder:placeholder,
    style:style,className:letterColor}}
    
   value={fields[name]}
      initialViewDate={fields[name]}
      onChange={(e)=>{
        console.log("timedate",e._d,new Date(e._d))
        let d=e._d
        setCurrentDate(d)
        console.log("cruc",{...fields,[name]:e._d})
        setFields(y=>({...y,[name]:e._d}))
          //(d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear()+"   "+d.getHours()+":"+d.getMinutes())
      }}
    
    />
    <p>{initialValue}</p>
  </>
}
export default DateTimePicker