let path=[]
let indexSize=1
export const getPath=(fields,titulo)=>{
    
  if(titulo.startsWith('getData')){
    return path
  }
  let keys=Object.keys(fields)
  if(keys?.length>0){
    indexSize++
    let ni=indexSize
    for(let f in keys){
      if(path.length>=ni){
        path.splice(ni-1)
      }
      path.push(fields[f].name)
      if(fields[f].name!==titulo){
        const relCatId=fields[f].relationCategory
        const curCat=categories.filter(x=>x.id==relCatId)[0]
        
        
        const r=getPath(curCat.fields.filter(x=>x.dataType=="relationship"))
        if(r==true)
            break
      }else{
        return true
      }
    }
  }else
    return

}
export {path}
