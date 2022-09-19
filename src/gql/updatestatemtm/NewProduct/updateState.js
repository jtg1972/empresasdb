const updateState=(prods,indexPartials=0,indexArray=0,to,pt,st,rec,addRecord,dg,firstTableRecord,path,ind,titulo,existe=false)=>{
  indexPartials=parseInt(indexPartials)
  indexArray=parseInt(indexArray)
  //let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
  let cp 
  let partials=path
  let ti=ind    
  if(!Array.isArray(prods)){
    cp={...prods}
    let ui
    if(partials[indexPartials]==to){
      let ni
      let nv      
      nv=rec["id"]
      return {...cp,
        [partials[indexPartials]]:cp[partials[indexPartials]].map(x=>{              
          let n=`${pt}Id`// en el ejemplo mtmgruposalumnosid
          let m=`${st}Id`//en el ejemplo metmalumnosgruposid
          let newR={}
          if(x["id"]==rec[m]){
            if(rec[m]==addRecord[m] && rec[n]==addRecord[n]){
              if(titulo!==st){
                if(existe==false){
                  newR={...x,[pt]:[...x[pt],{...addRecord}]}
                  existe=true
                }else
                  newR=x
              }else if(titulo==st){                
                newR={...x,[pt]:[...x[pt],{...firstTableRecord,[st]:dg}]}
              }              
            }else{                
              newR={...x,[pt]:x[pt].map(y=>{
                if(y[n]==rec[n])
                  return {...y,[st]:dg}
                else
                  return y
              })}
            }
            return newR
          }else
            return x
        })
      }
      

    }else{          
      return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,to,pt,st,rec,addRecord,dg,firstTableRecord,path,ind,titulo,existe)}
    }
  }else if(Array.isArray(prods)){
    cp=[...prods]
    let nv
    if(ti[indexArray].toString().startsWith("-")){
      nv=parseInt(ti[indexArray].substr(1))
      cp.forEach((x,indx)=>{
        if(x.id==nv){
          ti[indexArray]=indx
        }
      })    
    }     
    return cp.map((y,index)=>{
      if(index==ti[indexArray]){
        return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,to,pt,st,rec,addRecord,dg,firstTableRecord,path,ind,titulo,existe)
      }
      return y
    })
  } 
}

export default updateState