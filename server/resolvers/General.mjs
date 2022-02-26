
export default{
  Query:{
  
    General:async(parent,args,{db})=>{
      const products=await db.General.findAll({})
      return products
    }
  },
  Mutation:{
    createGeneral:async(parent,args,{db})=>{
      const product=await db.General.create(args)
      return product
    }
  }
}
