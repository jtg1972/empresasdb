//currentData=updateState(currentData,0,0,tablaoriginal,otherPivoteTable,pivoteTable,recs[x])

const updateState=(prods,indexPartials=0,indexArray=0,to,pt,st,rec,path,ind,deleteRecord)=>{
  console.log("entro  aqui",to,pt,st)  
  indexPartials=parseInt(indexPartials)
    indexArray=parseInt(indexArray)
   //let ti=Object.keys(tableIndexes).map(x=>parseInt(tableIndexes[x]))
  
  //  console.log("tipartials",ti,partials)
    let cp 
      
      let partials=path
      let ti=ind

    
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
      if(partials[indexPartials]==to){
        let ni
        let nv
        console.log("to",to)
          
          nv=rec["id"]
          

        //console.log("ui",partials[indexPartials],cp[partials[indexPartials]])
        return {...cp,
          [partials[indexPartials]]:cp[partials[indexPartials]].map(x=>{
            //console.log("xid deleteid",x.id,deleteId,x.id!==deleteId)
            let n=`${pt}Id`// en el ejemplo mtmgruposalumnosid
            let m=`${st}Id`//en el ejemplo metmalumnosgruposid
            console.log("nm",n,m)
            let newR,newSr
            if(x.id==rec[m]){
            //estoy en tabla original y el id es igual al registro en
            //el campo de la primera tabla de muchos a muchos  
              newR=x[pt].filter(y=>{
                if(y.id==rec[n]){
                  
                  if(y[n]==deleteRecord[n] && y[m]==deleteRecord[m]){
                    return false
                  }
                }
                return true
              })
              newSr=newR.map(j=>{
                if(j[n]==rec[n]){
                  let nst
                  nst=j[st].filter(h=>{
                    if(h[m]==deleteRecord[m] && h[n]==deleteRecord[n])
                      return false
                    else
                      return true
                  
                  })
                  return {...j,[st]:nst}
                }else
                  return j
              })
              return {...x,[pt]:newSr}
            }else
              return x
            }
          )
        }
      }else{
        //console.log("entro no final")
        return {...cp,[partials[indexPartials]]:updateState(cp[partials[indexPartials]],indexPartials+1,indexArray,to,pt,st,rec,path,ind,deleteRecord)}
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
          return updateState(cp[ti[indexArray]],indexPartials,indexArray+1,to,pt,st,rec,path,ind,deleteRecord)
        }
        return y
      })
    
    
  } 
    
}
export default updateState