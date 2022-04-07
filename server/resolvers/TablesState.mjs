export default{
  Query:{
  
    tableStates:async(parent,args,{db})=>{
      const states=await db.TablesState.findAll({raw:true})
      return states
    }
  },
  Mutation:{
    createTableState:async(parent,args,{db})=>{
      const state=await db.TablesState.create(args)
      return state
    },
    editTableState:async(parent,args,{db})=>{
      const state1=await db.TablesState.update(
        
          {state:args.state},
          {where:{category:args.category}}
          
        )
      const res=await db.TablesState.findOne({where:{category:args.category},raw:true})
      return res
    }

  }
}