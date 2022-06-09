
          import {gql} from 'apollo-server-express'

          export default gql`

            
            type atunconagua{
              
              id:Int
name:String
calorias:Int
agen1:String
fats:Int
f1:String
precio:Int

            }

            type Query{
              atunconagua:[atunconagua]
              
              
            }
            type Mutation{
              createatunconagua(
                id:Int,
name:String,
calorias:Int,
agen1:String,
fats:Int,
f1:String,
precio:Int,

                ):atunconagua
              getDataatunconagua:[atunconagua]
              removeatunconagua(id:Int):Boolean!
              editatunconagua(id:Int,
name:String,
calorias:Int,
agen1:String,
fats:Int,
f1:String,
precio:Int,
):atunconagua
              
            }`
          