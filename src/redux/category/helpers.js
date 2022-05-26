export const fetchFilterResults=(data,payload)=>{
  console.log("args1",data,payload)
  const finalResults=data.filter(record=>{
    const results=Object.keys(payload).map(k=>{
      console.log("resp", k,payload[k][k],new Date(payload[k][k]),payload[k])
      if(!payload[k].operator){
        return record[k].includes(payload[k].val)
      }else if(payload[k].operator=="mayor"){
        return record[k]>parseFloat(payload[k].val)
      }else if(payload[k].operator=="menor"){
        return record[k]<parseFloat(payload[k].val)
      }else if(payload[k].operator=="igual"){
        return record[k]==parseFloat(payload[k].val)

      }else if(payload[k].operator=="rango"){
        const n1=`${k}1`
        const n2=`${k}2`
        return record[k]>=parseFloat(payload[k][n1])
        &&
        record[k]<=parseFloat(payload[k][n2])

      }else if(payload[k].operator=="mayorDate"){

        return new Date(record[k])>new Date(payload[k][k])
      }else if(payload[k].operator=="menorDate"){
        
        return new Date(record[k])<new Date(payload[k][k])

      }else if(payload[k].operator=="igualDate"){
        console.log("res",new Date(record[k])==new Date(payload[k][k]))
        return new Date(record[k])==new Date(payload[k][k])
      }else if(payload[k].operator=="rangoDate"){
        const o1=`${k}1`
        const o2=`${k}2`
        return new Date(record[k])>=new Date(payload[k][o1])
        &&
        new Date(record[k])<=new Date(payload[k][o2])
      }
    })
    return !results.includes(false)
  })
  console.log("final results",finalResults)

  const sortResults=finalResults.sort((a,b)=>{
    console.log("a,b",a,b)
    let conds=Object.keys(payload).map(key=>{
      console.log("abkeys",a[key],b[key])
      console.log("akybky",a[key],b[key],a[key]>b[key])
      if(payload[key].operator!=="mayorDate"
      &&
      payload[key].operator!=="menorDate"
      &&
      payload[key].operator!=="igualDate"
      &&
      payload[key].operator!=="rangoDate"
      ){
        if(payload[key].order=="asc"){
          if(a[key]>b[key]){
            return 1
          }else if(a[key]<b[key]){
            return -1
          }else{
            return 0
          }
        }else if(payload[key].order=="desc"){
          if(a[key]<b[key]){
            return 1
          }else if(a[key]>b[key]){
            return -1
          }else{
            return 0
          }
        }else{
          return 0
        }
      }else{ //is date
        if(payload[key].order=="asc"){
          if(new Date(a[key])>new Date(b[key])){
            return 1
          }else if(new Date(a[key])<new Date(b[key])){
            return -1
          }else{
            return 0
          }
        }else if(payload[key].order=="desc"){
          if(new Date(a[key])<new Date(b[key])){
            return 1
          }else if(new Date(a[key])>new Date(b[key])){
            return -1
          }else{
            return 0
          }
        }else{
          return 0
        }
      }

    })
    console.log("conds",conds)
    let prev=conds[0]
    let respuesta
    let i=0
    for(i=0;i<conds.length;i++){
      prev=conds[i]
      if(prev!==0){
        respuesta=prev
        break
      }else{
        respuesta=prev
      }
    }
    return respuesta
  })
  return sortResults
}
