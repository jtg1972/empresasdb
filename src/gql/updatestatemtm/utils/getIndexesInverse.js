export default (addRecord,pivoteTable,otherPivoteTable,path,tableIndexes)=>{
  let ind=[]
  for(let p in path){
    if(path[p]!==pivoteTable){
      let curInd
      curInd=tableIndexes[path[p]]
      ind.push(curInd)
    }else{
      if(path[p].startsWith("mtm")){
        ind=ind.splice(0,ind.length-1)
        ind=ind.splice(0,ind.length-2)
        const uy=`${pivoteTable}Id`
        ind.push(`-${addRecord[uy]}`)
        let n=`${otherPivoteTable}Id`
        ind.push(`-${addRecord[n]}`)
        ind.push(`-${addRecord[uy]}`)
      }
    }
  }
  return ind
}