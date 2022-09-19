let indexSize=1
let path=[]

const getPath=(fields,tit,categories,p,primera=false)=>{
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
          let r=getPath(curCat.fields.filter(x=>x.dataType=="relationship"),tit,categories,p,false)
          if(r==true)
            break
        }else{
          return true
        }
      }
    }else{
      return
    }
}
export const resultPath=(fields,tit,categories,p,primera=false)=>{
  getPath(fields,tit,categories,p,primera)
  return path
}


export default getPath