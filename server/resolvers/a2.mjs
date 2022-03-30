
export default{
  Query:{
  
    a2:async(parent,args,{db})=>{
      const products=await db.a2.findAll({})
      return products
    }
  },
  Mutation:{
    createa2:async(parent,args,{db})=>{
      const product=await db.a2.create(args)
      return product
    }
  }
}
