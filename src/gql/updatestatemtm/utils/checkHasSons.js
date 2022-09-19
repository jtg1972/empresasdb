const checkHasSons=(prods,indexPartials=0,indexArray=0,tit,path,ind)=>{
  indexPartials=parseInt(indexPartials)
  indexArray=parseInt(indexArray)
  //let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
  let cp
  let partials=path
  let ti=ind
  if(!Array.isArray(prods)){
    cp={...prods}
    if(partials[indexPartials]==tit){
      return cp[partials[indexPartials]]
    }else{
      return checkHasSons(cp[partials[indexPartials]],indexPartials+1,indexArray,tit,path,ind)

    }
  }else if(Array.isArray(prods)){
    cp=[...prods]
    let nv
    if(ti[indexArray].toString().startsWith("-")){
      nv=parseInt(ti[indexArray].substr(1))
      cp.forEach((x,indx)=>{
        if(x.id==nv)
          ti[indexArray]=indx
      })
     }
    return checkHasSons(cp[ti[indexArray]],indexPartials,indexArray+1,tit,path,ind)
  }
}
export default checkHasSons