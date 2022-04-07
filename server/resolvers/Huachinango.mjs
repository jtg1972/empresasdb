
export default{
  Query:{
  
    Huachinango:async(parent,args,{db})=>{
      const products=await db.Huachinango.findAll()
      return products     
    }
  },
  Mutation:{
    createHuachinango:async(parent,args,{db})=>{
      const product=await db.Huachinango.create(args)
      return product
    },
    getDataHuachinango:async(parent,args,{db})=>{
      const products=await db.Huachinango.findAll()
      return products     
    }
  }
}
