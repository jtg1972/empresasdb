const Clients={
  otmclientesfacturas:{
    otmclientesdetallesfacturas:{
      dm:[]
    }
  }
  ,
  otmclientestelefonos:{
    otmct1:{
      otmct2:[]
    }
  }
}
let path=[]
let indexes=[]
let indexSize=0
const busca=(clients,aencontrar)=>{
  let keys=Object.keys(clients)
  console.log("clientes",clients,keys)
  let nuevoArray=[]

  if(!Array.isArray(clients)){
    indexSize++
    let ni=indexSize
    for(let i=0;i<keys.length;i++){
        console.log("args",ni,indexSize,path.length)
      if(path.length>=ni){
        path.splice(ni-1)
      }
      path.push(keys[i])
      console.log("path1",path,keys[i],clients[keys[i]])
      if(keys[i]!==aencontrar){
        
        
        const r=busca(clients[keys[i]],aencontrar)
        if(r==true){
          break
        }
      }else{
        console.log("encontro",path)
        return true
      }
      
    }
       
  }else{

    return
  }
      
    
}  

path=[]
busca(Clients,"otmclientesfacturas")

console.log("res",path)