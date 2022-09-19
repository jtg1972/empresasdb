const simpleUpdateState=(prods,indexPartials=0,indexArray=0,tit,path,ind,deleteId)=>{
  //console.log("entro  aqui",to,pt,st)  
  indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
    //let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
  
  //  console.log("tipartials",ti,partials)
    let cp 
      
      let partials=path
      let ti=ind

    console.log("titdeleteid",tit,deleteId)
    if(!Array.isArray(prods)){
      cp={...prods}
      //console.log("no arreglo")
      //console.log("prods partlength partials",prods,partials.length,partials)
      let ui
      //console.log("pip",partials[indexPartials],cp[partials[indexPartials]])
      //console.log("params",cp[partials[indexPartials]],indexPartials+1,indexArray)
      //console.log("se modifica campo",partials[indexPartials])
      //if((indexPartials+1)==partials.length){
      //console.log("importante",partials[indexPartials],titulo)
      if(partials[indexPartials]==tit){
        let ni
        let nv
        
        //console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
        return {...cp,
          [partials[indexPartials]]:cp[partials[indexPartials]].filter(x=>
            x.id!==deleteId
          )}
      }else{
        //console.log("entro no final")
        return {...cp,[partials[indexPartials]]:simpleUpdateState(cp[partials[indexPartials]],indexPartials+1,indexArray,tit,path,ind,deleteId)}
      }
    
    } else if(Array.isArray(prods)){
      cp=[...prods]
      //console.log("arraglo",indexArray,ti.length)
      //console.log("deliddd",deleteId)
      //console.log("prods",prods)
        //console.log("partarr",cp[ti[indexArray]])
      //console.log("paramsarr",cp[ti[indexArray]],indexPartials,indexArray+1,titulo)
      let nv
      let nia
      //console.log("jorgevio",ti[indexArray])
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
          return simpleUpdateState(cp[ti[indexArray]],indexPartials,indexArray+1,tit,path,ind,deleteId)
        }
        return y
      })
    
    
  }
}

export default simpleUpdateState