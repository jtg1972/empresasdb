const simpleUpdateState=(prods,indexPartials=0,indexArray=0,recToAdd,tit,path,ind)=>{
  indexPartials=parseInt(indexPartials)
  indexArray=parseInt(indexArray)
  console.log("argsbien",recToAdd,tit)
  //let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
  let cp 
  let partials=path
  let ti=ind    
  if(!Array.isArray(prods)){
    cp={...prods}
    let ui
    if(partials[indexPartials]==tit){
      return {...cp,
        [partials[indexPartials]]:[...cp[partials[indexPartials]],recToAdd]
      }
          
    }else{          
      return {...cp,[partials[indexPartials]]:simpleUpdateState(cp[partials[indexPartials]],indexPartials+1,indexArray,recToAdd,tit,path,ind)}
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
        return simpleUpdateState(cp[ti[indexArray]],indexPartials,indexArray+1,recToAdd,tit,path,ind)
      }
      return y
    })
  }
}

export default simpleUpdateState