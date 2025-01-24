let indexSize=1
let path=[]
let mtmpassed=[]
/*const getPath=(fields,tit,categories,p,primera=false)=>{
   if(primera==true){
     path=p
     indexSize=1
  }
  if(tit.startsWith('getData')){
    return path
  }
  let keys=Object.keys(fields)
  if(keys?.length>0){
      indexSize++
      let ni=indexSize
      for(let f in keys){
        if(path.length>=ni)
          path.splice(ni-1)
        path.push(fields[f].name)
        if(fields[f].name!==tit){
          const relCatId=fields[f].relationCategory
          const curCat=categories.filter(x=>x.id==relCatId)[0]
          if(fields[f].relationship=="manytomany")
            break;
          let r=getPath(curCat.fields.filter(x=>x.dataType=="relationship"),tit,categories,p,false)
          if(r==true)
            break
        }else{
          console.log("pathjorge",path)
          return true
        }
      }
    }else{
      return
    }
}*/
let prevmtm=false
const getPath=(fields,tit,categories,p,primera=false,mtm="no")=>{
  if(primera==true){
    path=p
    indexSize=1
 }
 if(tit.startsWith('getData')){
   return path
 }
 let keys=Object.keys(fields)
 
 if(keys?.length>0){//) || mtm=="manytomany"){
     indexSize++
     let ni=indexSize
     for(let f in keys){
       console.log("pathiop",path)
       if(path.length>=ni){
         //prevmtm=false
         path.splice(ni-1)
       }
       path.push(fields[f].name)
       if(fields[f].name!==tit){
        /*if(prevmtm==true){
          prevmtm=false
          path=path.slice(0,path.length-2)
          console.log("slice",path)
        }*/
         const relCatId=fields[f].relationCategory
         const curCat=categories.filter(x=>x.id==relCatId)[0]
         //if(fields[f].relationship=="manytomany")
            //continue
          //}else
            //continue
         
        let r
        if(fields[f].relationship=="onetomany")
          r=getPath(curCat.fields.filter(x=>x.dataType=="relationship"),tit,categories,p,false)
        else{
          //prevmtm=true
          continue
        }
        //else
          //r=getPath(["ok"],tit,categories,p,false,"manytomany")
         if(r==true)
           return true
        
       }else{
         console.log("pathjorge",path)
         return true
       }
     }
   }else{
     
      return
   }
}
export const resultPath=(fields,tit,categories,p,primera=false)=>{
  getPath(fields,tit,categories,p,primera)
  console.log("resultpath88",path)
  return path
}


export default getPath