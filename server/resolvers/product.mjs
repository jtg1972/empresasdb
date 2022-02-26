export default{
  Query:{
  
    products:async(parent,args,{db})=>{
      const products=await db.Product.findAll({})
      return products
    }
  },
  Mutation:{
    createProduct:async(parent,args,{db})=>{
      const product=await db.Product.create(args)
      return product
    }
  }
}