export const searchRecordsFromQuery=(payload,products)=>{
  const s=payload.split(" ")
  //console.log("s",s)
  let resultado={}
  for(let i=1;i<=s.length;i++){
    resultado[i]=[]
  }
  let already=[]
  products.forEach(pr=>{
    //console.log("pr",pr)
    let matches=0
    already=[]
    for(let key in pr){
      for(let skey in s){
        if(pr[key]!==null){ //&& typeof pr[key]!=="number"){
          const varToStr=pr[key].toString()
          //console.log("prkey key",pr[key],key)
          //if(pr[key]!==null && pr[key].includes(s[skey])){
          if(varToStr!==null && varToStr.includes(s[skey])){
            if(!already.includes(s[skey])){
              already.push(s[skey])
              matches++
              break
            }
          }
        }
      }
    }
    if(matches>=1){
      //console.log("matchesasd",matches)

      resultado[matches].push(pr)
    }
  })
  let real=[]
  Object.keys(resultado).forEach(r=>{
    if(resultado[r].length>0)
      real=resultado[r]
  })
  //console.log("resultado",real)
  return real
}
