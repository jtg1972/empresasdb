export default (tableIndexes,path)=>{
  let ind=[]
  for(let p in path){
    let curInd
    curInd=tableIndexes[path[p]]
    ind.push(curInd)
  }
  return ind
}