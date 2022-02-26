
export default{
  Query:{
  
    Alimentos:async(parent,args,{db})=>{
      const products=await db.Alimentos.findAll({})
      return products
    }
  },
  Mutation:{
    createAlimentos:async(parent,args,{db})=>{
      const product=await db.Alimentos.create(args)
      return product
    }
  }
}
