import { getVariableValues } from 'graphql'
import gql from 'graphql-tag'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import AddOtmIdFields from '../../AddOtmIdFields'
import { AddCompositeField } from '../../components/AddCompositeField'
import BreadCrumb from '../../components/BreadCrumb'
import FormButton from '../../components/Forms/FormButton'
import SearchSubcategories from '../../components/SearchSubcategories'
import './styles.scss'

const mapToState=({categories})=>({
  currentCategory:categories.currentCategory,
  categories:categories.categories,
  categoryProducts:categories.categoryProducts
})

const Reports=()=>{
  const {
    currentCategory,
    categories,
    categoryProducts
  }=useSelector(mapToState)
  const [openDialog,setOpenDialog]=useState(false)
  const toggleDialog=()=>{setOpenDialog(!openDialog)}
  const [showFields,setShowFields]=useState(false)
  const [fieldsShown,setFieldsShown]=useState([])
  const [otmChoices,setOtmChoices]=useState({})
  const[firstCatNormalFields,setFirstCatNormalFields]=useState([])
  const [reportShow,setReportShow]=useState(false)
  const[specificOtmName,setSpecificOtmName]=useState("")
  const [openCompositeFieldDialog,setOpenCompositeFieldDialog]=useState(false)
  const toggleCompositeFieldDialog=(name)=>{
    setSpecificOtmName(name)
    setOpenCompositeFieldDialog(!openCompositeFieldDialog)
  }
  const [openOtmIdFieldsDialog,setOpenOtmIdFields]=useState(false)
  const toggleOtmIdFieldsDialog=()=>setOpenOtmIdFields(!openOtmIdFieldsDialog)
  const [otmCategoryFields,setOtmCategoryFields]=useState([])
  const [allFieldsByOtm,setAllFieldsByOtm]=useState({})
  const [compFieldsArray,setCompFieldsArray]=useState([])
  const[allCompFieldsCluster,setAllCompFieldsCluster]=useState([])
  let subTotals={}
  const [grandTotalsSt,setGrandTotalsSt]=useState({})
  //console.log("otmchoices",otmChoices,fieldsShown,firstCatNormalFields)
  useEffect(()=>{
    setShowFields(false)
    setFieldsShown([])
  },[currentCategory])
 let sonOtmChoices={}
 //console.log("sonotm")
 let grandTotals={}
 //console.log("grandTotals",grandTotalsSt)
  const clearOtmChoicesSons=(name,padre,choicesSonsvars)=>{
    const partialName=`otm${padre}`
    const lengthName=partialName.length
    let secname=name.substring(lengthName)
    let cc=`otm${secname}`
    //console.log("cc",cc,name)
    sonOtmChoices={...sonOtmChoices,[name]:{normal:[],otm:[],otmdestiny:[],options:[],compositeFields:[]}}
    const sons=Object.keys(sonOtmChoices).
    filter(i=>i.startsWith(cc))
    //console.log("current sons",name,sons,sonOtmChoices,cc)
    sons.forEach(y=>{
      sonOtmChoices={...sonOtmChoices,[y]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}
      secname=`otm${secname}`
      let nv=y.substring(secname.length)
      //console.log("nv",nv)
      clearOtmChoicesSons(y,nv,sonOtmChoices)
    
    })
    

  }

  const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false,dcf={})=>{
    if(otm && !e.target.checked){
      //clearOtmChoicesSons(name,padre)
      sonOtmChoices=otmChoices
      clearOtmChoicesSons(name1,padre,{...otmChoices})
      setOtmChoices(sonOtmChoices)
    }
    if(e.target.checked){
      //console.log("otmchoices",otm,mainCat)
      //console.log("arr",[...fieldsShown,name1])
      if(otm==true)
        setFieldsShown(x=>([...x,name1]))
      if(mainCat){
        setAllCompFieldsCluster(compFieldsArray[`getData${currentCategory.name}`])

        const n=`getData${padre}`
        let  nu={[n]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}
        if(firstCatNormalFields[n]==undefined)
          setFirstCatNormalFields(e=>({...e,...nu}))
        if(otm){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],otm:[...o[n]["otm"],name1]}}))
          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}))
        }else if(otmdestiny=="otmdestiny"){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],otmdestiny:[...o[n]["otmdestiny"],name1]}}))


          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]}}))
        }else if(cf==true){
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],compositeFields:[...o[n]["compositeFields"],dcf]}}))
        }
        else{
          //setFirstCatNormalFields(o=>({...o,[n]:{...o[n],normal:[...o[n]["normal"],name1]}}))
          setFirstCatNormalFields(o=>({...o,[n]:{...o[n],normal:[...o[n]["normal"],{type:declaredType,name1}]}}))
        }
      }
      if(mainCat==false){
        setAllCompFieldsCluster(compFieldsArray[nameOtm])

        if(otm){  
          
          
          setOtmChoices(e=>({...e,[name1]:{otm:[],normal:[],options:[],otmdestiny:[],compositeFields:[]},[nameOtm]:{...e[nameOtm],otm:[...e[nameOtm]["otm"],name1]}}))
        
        }else if(otmdestiny=="otmdestiny"){
          setOtmChoices(e=>({...e,/*[name1]:{otm:[],normal:[]},*/[nameOtm]:{...e[nameOtm],otmdestiny:[...e[nameOtm]["otmdestiny"],name1]}}))
        }else if(cf==true){
          setOtmChoices(o=>({...o,[nameOtm]:{...o[nameOtm],compositeFields:[...o[nameOtm]["compositeFields"],dcf]}}))
        }else{
          setOtmChoices(e=>({...e,/*[name1]:{otm:[],normal:[]},*/[nameOtm]:{...e[nameOtm],normal:[...e[nameOtm]["normal"],{name1,type:declaredType}]}}))
        }
      }
      
    }else{
      //console.log("arr",fieldsShown.filter(x=>x!==name1))
      if(otm==true)
        setFieldsShown(x=>x.filter(r=>r!==name1))
      if(mainCat){
        const n=`getData${padre}`
        if(otm){
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],otm:[...e[n]["otm"].filter(x=>x!==name1)]}}
            return e
          })
        }else if(otmdestiny=="otmdestiny"){
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],otmdestiny:[...e[n]["otmdestiny"].filter(x=>x.name1!==name1)]}}
            return e
          })
        }else if(cf==true){
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],compositeFields:[...e[n]["compositeFields"].filter(x=>x.name1!==name1)]}}
            return e
          })
        }else{
          setFirstCatNormalFields(e=>{
            e={...e,[n]:{...e[n],normal:[...e[n]["normal"].filter(x=>x.name1!==name1)]}}
            return e
          })
        }
        
      }
      if(mainCat==false){
        if(otm){  
          
          
          setOtmChoices(e=>({...e,[name1]:{normal:[],otm:[],otmdestiny:[]},[nameOtm]:{...e[nameOtm],otm:[...e[nameOtm]["otm"].filter(u=>u!==name1)]}}))
        
        }else if(otmdestiny=="otmdestiny"){
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],otmdestiny:[...e[nameOtm]["otmdestiny"].filter(u=>u.name1!==name1)]}}))
        }else if(cf==true){
          setOtmChoices(e=>{
            e={...e,[nameOtm]:{...e[nameOtm],compositeFields:[...e[nameOtm]["compositeFields"].filter(x=>x.name1!==name1)]}}
            return e
          })
        }else{
          setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],normal:[...e[nameOtm]["normal"].filter(u=>u.name1!==name1)]}}))
        }
      }

      
      

    }
  }
  const isChecked=(name)=>{
    if(fieldsShown.filter(x=>x==name).length==1)
      return true
    return false
  }

  const displayMenu=(name,padre)=>{
    //console.log("name",name)
    const partialName=`otm${padre}`
    const lengthName=partialName.length
    const destCatName=name.slice(lengthName)
    const catDestiny=categories.filter(c=>c.name==destCatName)[0]
    //console.log("dcn",destCatName,catDestiny)
    
    if(isChecked(name)){
      return (
    <div style={{marginLeft:"10px",width:"100%",marginBottom:"10px"}}>
      <div style={{display:"flex"}}>
        <input 
        type="checkbox" 
        style={{marginRight:"10px"}}
        onChange={(e)=>{
          if(e.target.checked){
            
            setOtmChoices(e=>({...e,[name]:{...e[name],options:[...e[name]["options"],"1"]}}))
          }else{
            //console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"].filter(
              x=>x!=="1")]}}))
          }

        }}/>
     
        <p>Number of Sons List</p>
      </div>
      <div style={{display:"flex", flexDirection:"row",alignItems:"start"}}>
        <input 
        type="checkbox" 
        style={{marginRight:"10px"}}
        onChange={(e)=>{
          if(e.target.checked){
            
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"],"2"]}}))
          }else{
            //console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"].filter(
              x=>x!=="2")]}}))
          }
        }}/>
        <p style={{flex:1}}>Total and Percentage of Parents Regarding Ranges of Total of Sons</p>
      </div>
      <div style={{display:"flex",flexDirection:"row",alignItems:"start"}}>
        <input 
        type="checkbox" 
        style={{marginRight:"10px"}}
        onChange={(e)=>{
          if(e.target.checked){
            
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"],"3"]}}))
          }else{
            //console.log("res11",{...otmChoices,[name]:{...otmChoices[name],normal:[...otmChoices[name]["normal"],"1"]}})
            setOtmChoices(e=>({...e,[name]:{...e[name],normal:[...e[name]["options"].filter(
              x=>x!=="3")]}}))
          }
        }}/>
        <p>Total and Percentage of Parents Regarding Conditions of Son Atributes</p>
      </div>
      {displayCurCategory(catDestiny,false,false,name,false)}
      <FormButton style={{
        textAlign:"left",
        textDecoration:"underline",
        marginLeft:0,
        paddingLeft:0
      }} onClick={()=>{
        //console.log("click",otmChoices[name]["normal"])
        setOtmCategoryFields(pivote[name])
        toggleCompositeFieldDialog(name)
      }}>Add composite field</FormButton>
      {compFieldsArray[name]?.map(d=>{
          return <>
          <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              /*if(nameOtm!=="" && e.target.checked==true)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:true}}))
              else if(nameOtm!=="" && e.target.checked==false)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:false}}))*/
              //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{

              checkReview(e,d.name1,false,""/*cat.name*/,name,false,true,"",true,d)
            }}
            />
            <a style={{color:"yellow"}}>{d.name1}</a>
            <br/>
            </>
        })}
      <FormButton style={{
        textAlign:"left",
        textDecoration:"underline",
        marginLeft:0,
        paddingLeft:0
      }} onClick={()=>{
        //console.log("click")
        setOtmCategoryFields(pivote[name])

        toggleOtmIdFieldsDialog()
      }}>Add field to identify parent in child relationships</FormButton>
    </div>
    )
    }else{
      delete otmChoices[name]
    }
  }

let pivote={}
const displayCurCategory=(cat,primero,space=true,nameOtm="",mainCat=false)=>{
  let fieldsSingle=[]
  
  if(pivote[`getData${currentCategory.name}`]==undefined)
    pivote={...pivote,[`getData${currentCategory.name}`]:[]}
  if(pivote[nameOtm]==undefined)
     pivote={...pivote,[nameOtm]:[]}
  
  if(cat && showFields){  
    return (
    <div style={{marginLeft:space?"10px":"0px",width:primero?"50%":"100%"}}>
      <p>HOla</p>
      {fieldsSingle=cat?.fields?.map(c=>{
        if(c.relationship=="onetomany"){
          return <>
            <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              /*if(nameOtm!=="" && e.target.checked==true)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:true}}))
              else if(nameOtm!=="" && e.target.checked==false)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:false}}))*/
              checkReview(e,c.name,true,cat.name,nameOtm,mainCat)
            }}
            />
            <a style={{color:"green"}}>{c.name}</a>
            <br/>
            {isChecked(c.name) && displayMenu(c.name,cat.name)}
          </>
        }
       /* return <>
        <input type="checkbox" 
        style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
        onChange={(e)=>checkReview(e,c.name,false,cat.name,nameOtm,mainCat,c.declaredType,c.relationship)}/>
          {c.name}
          <br/>
        </>*/
        if(nameOtm!=="")
          pivote={
            ...pivote,[nameOtm]:[...pivote[nameOtm],{name1:c.name,type:c.declaredType}]
          }
        else
          pivote={
          ...pivote,[`getData${currentCategory.name}`]:[...pivote[`getData${currentCategory.name}`],{name1:c.name,type:c.declaredType}]
          }
       
        //setAllFieldsByOtm(pivote)

          return <>
          <input type="checkbox" 
          style={{marginLeft:"0px",marginRight:"5px",color:"white"}}
          onChange={(e)=>checkReview(e,c.name,false,cat.name,nameOtm,mainCat,c.declaredType,c.relationship)}/>
            {c.name}
            <br/>
          </>

      })}
      {primero && fieldsSingle && (<><FormButton style={{
          textAlign:"left",
          textDecoration:"underline",
          marginLeft:0,
          paddingLeft:0
        }} onClick={()=>{
          setOtmCategoryFields(pivote[`getData${currentCategory.name}`])
          toggleCompositeFieldDialog(`getData${currentCategory.name}`)
          //console.log("click")
        }}>Add composite field</FormButton>
        {compFieldsArray[`getData${currentCategory.name}`]?.map(d=>{
          //const displayCurCategory=(cat,primero,space=true,nameOtm="",mainCat=false)=>{

          return <>
          <input type="checkbox" 
            style={{marginRight:"5px", color:"white"}}
            onChange={(e)=>{
              /*if(nameOtm!=="" && e.target.checked==true)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:true}}))
              else if(nameOtm!=="" && e.target.checked==false)
                setOtmChoices(e=>({...e,[nameOtm]:{...e[nameOtm],[c.name]:false}}))*/
                //const checkReview=(e,name1,otm=false,padre,nameOtm,mainCat=false,declaredType,otmdestiny="",cf=false)=>{

              
              checkReview(e,d.name1,false,cat.name,"",true,false,"",true,d)
            }}
            />
            <a style={{color:"yellow"}}>{d.name1}</a>
            <br/>
            </>
        })}
        {pivote[`getData${currentCategory.name}`]?.map(d=>{
          <p>{d.name1}</p>
        })}
        <FormButton style={{
          textAlign:"left",
          textDecoration:"underline",
          marginLeft:0,
          paddingLeft:0
        }} onClick={()=>{
            //console.log("click")
            setOtmCategoryFields(pivote[`getData${currentCategory.name}`])
            toggleOtmIdFieldsDialog()
        }}>Add field to identify parent in child relationships</FormButton>
          </>)
      

      }
      {/*!primero && fieldsSingle*/}
    </div>)
  }
  

}
const calculateInstancesNumber=(data,otmFieldName)=>{
  const total=data[otmFieldName].length
  return total
}


const calculateGrandRoutes=(grandsRoute,nameCluster)=>{
  let routes={}
  let sons=otmChoices[nameCluster]["otm"].map(l=>{
    routes[l]=[...grandsRoute,l]
    routes={...routes,...calculateGrandRoutes(routes[l],l)}
    
  })
  return routes

}

const calculateRoutes=(parentsRoute)=>{
 let parentNodeName=`getData${currentCategory.name}`
  let data=categoryProducts[parentNodeName]
  let routes={}
  if(firstCatNormalFields[parentNodeName]["otm"].length>0){
    let sons=firstCatNormalFields[parentNodeName]["otm"].map(l=>{
      routes[l]=[...parentsRoute,l]
      routes={...routes,...calculateGrandRoutes(routes[l],l)}
      
    })
  }else
   return {[parentNodeName]:[parentNodeName]}
  return routes


}

const calculateAmountNotBegin=(routeKey,otmField)=>{
  otmChoices[otmField]["otm"].map(o=>{

  })
}
//findfinal(each,routes,x) each es un arreglo de cada una de las llaves de rutas,
//x es cada llave
//comienza con un ciclo por cada una de las llaves de rutas
//si cada elemento de routes[y] incluya cada elemento en each y la longitud de 
//routes[y] es mayor que la longitud de each
//leneach=routes[y].length,finalfield=y, y se vuelve a llamar findfinal
const findFinal=(each,routes,field)=>{
  //console.log("eachroutes",each,routes)
  let lenEach=each.length
  let finalField=field
  Object.keys(routes).forEach(y=>{
    //console.log("checar",[1,2,3].includes([1,3]))
    if(each.every(x=>routes[y].includes(x))
      /*routes[y].includes(each)*/
       && routes[y].length>lenEach){
      lenEach=routes[y].length
      finalField=y
      findFinal([...each,y],routes,y)
    }
    
  })
  return finalField
  
}
//que carajos hace esta funcion?
//empieza con cada llave de las rutas, y lo asigna a la
//variable i findfinal(each,routes,x) each es un arreglo de cada una de las llaves de rutas


//que carajos hace findfinal
const routesFinal=(routes)=>{
  let definitiveRoutes=[]
  //const first=`getData${currentCategory.name}`
  Object.keys(routes).forEach(x=>{
    let each=[...routes[x]]
    const i=findFinal(each,routes,x)
    if(!definitiveRoutes.includes(i))
      definitiveRoutes.push(i)
  })
  return definitiveRoutes
}

/*const calculateAmountsBegins=(routes)=>{
  const begin=`getData${currentCategory.name}`
 let parentNode=firstCatNormalFields[begin]["otm"].map(x=>{
    let r=routes[x]
    if(r){
      Object.keys(routes).forEach(y=>{
        routes[y].forEach((i,index)=>{
          if(routes[y][index]==x && routes[y].length-1!==index){
            let o=routes[y][length-1]
            calculateAmountNotBegin(y,o)
          }
        })

      })
    }
  })

}*/

const getCompFieldString=(row,structure,compF)=>{
  //console.log("structure22",structure,compF)
  let finalString=""
  structure.forEach((x,index)=>{
    if(index%2==0){
      if(row[structure[index+1]]!==null){
        if(x=="none"){
          let did=false
          let c=buscaCompField(compF,structure[index+1])
          if(c!==false){
            if(c.type=="string")
              finalString+=getCompFieldString(row,c.structure,compF)
            else if(c.type=="number")
              finalString+=`${getCompFieldNumber(row,c.structure,compF)}`.toString()
            did=true
            
          }
          if(did==false)
            finalString+=`${row[structure[index+1]]}`+" "
        }else if(x=="concat"){
          let did=false
          let c=buscaCompField(compF,structure[index+1])
          if(c!==false){
            if(c.type=="string")
              finalString+=getCompFieldString(row,c.structure,compF)
            else if(c.type=="number")
              finalString+=`${getCompFieldNumber(row,c.structure,compF)}`.toString()
            did=true

            
          }
          if(did==false)
          
            finalString+=`${row[structure[index+1]]}`+" "
        }else if(x=="add text"){
          
          finalString+=`${structure[index+1].value}`+" "
          
          //finalString+=`${structure[index+1]}`+" "
        }else if(typeof structure[index+1]=="object"){
          if(structure[index+1].op=="substring"){
            let z=structure[index+1]
            
            let y=`${row[structure[index+1].field]}`
            if(y!=="null")
              finalString+=y.substring(
                z.start,z.chars)+" "
            
          }
        }
      }
    }
  })
  return finalString
}

const getCompFieldNumber=(row,structure,compF)=>{
  let subtotal=0
  //console.log("compnum",row,structure)
  let did=false
  structure.forEach((x,index)=>{
    if(index%2==0){
      if(x=="none"){
        let c=buscaCompField(compF,structure[index+1])
          if(c!==false){
            subtotal+=parseFloat(getCompFieldNumber(row,c.structure,compF).toFixed(2))
            subtotal=parseFloat(subtotal.toFixed(2))
              did=true
            
          }
          if(did==false)
            subtotal+=row[structure[index+1]]
        
      }else if(x=="add text"){
        //console.log("j23",structure[index+1],subtotal+structure[index+1].value)
        subtotal+=parseFloat((structure[index+1].value).toFixed(2))
        subtotal=parseFloat(subtotal.toFixed(2))

      }
      else{
        let temp=0
        //console.log("estruc",row,structure,subtotal,index,row[structure[index+1]])
        let c=buscaCompField(compF,structure[index+1])
          if(c!==false){
            temp=parseFloat(getCompFieldNumber(row,c.structure,compF).toFixed(2))

              did=true
            
          }else{
            if(typeof row[structure[index+1]]=="number")
            
              temp=parseFloat(row[structure[index+1]].toFixed(2))
            else  
              temp=0
          }
        
        //if(row[structure[index+1]]!==null){
          if(x=="+")
            subtotal=subtotal+temp
          if(x=="-")
            subtotal=subtotal-temp
          if(x=="/")
            subtotal=subtotal/temp
          if(x=="*")
            subtotal=subtotal*temp
          subtotal=parseFloat(subtotal.toFixed(2))

          //console.log("estruc",row,structure,subtotal,index,row[structure[index+1]])

        //}
      }
    }
   
  })
  //console.log("res68",row.id,subtotal)
  if(typeof subtotal=="number")
    return parseFloat(subtotal.toFixed(2))
  else 
    return 0
}

let totalRoutes={}

const getLevelData=(eachStopData,finalRoutes,eachIndex)=>{
  //console.log("ead",eachStopData)
  let r=finalRoutes
  let current
  
  if(r && r[eachIndex]!==undefined){
    if(grandTotals[r[eachIndex]]==undefined){
      grandTotals={...grandTotals,
        [r[eachIndex]]:{
          
        }
        
      }
    }
  }
  if(r[eachIndex+1]==undefined){
    if(grandTotals[r[eachIndex]][r[eachIndex+1]]==undefined){
      grandTotals={...grandTotals,
        [r[eachIndex]]:{
          [r[eachIndex+1]]:{}  
        }
        
      }
    }
  }

  if(r && r[eachIndex+1]!==undefined){
    current=`${r[eachIndex+1]}total`
  }else
    current='undefinedtotal'


  let definitiveCurrent=current
  if(current=="undefinedtotal")
    definitiveCurrent="final"
  
  //let previous=`${r[eachIndex-1]}total`
 /*if(totalRoutes[r[eachIndex]]==undefined){
  
    totalRoutes={...totalRoutes,[r[eachIndex]]:{[current]:0}}
  
  }else if(totalRoutes[r[eachIndex]][current]==undefined){  
    totalRoutes={...totalRoutes,[r[eachIndex]]:{...totalRoutes[r[eachIndex]],[current]:0}}

  }*/
  //console.log("eachstopdataundefined1",eachStopData)
  if(r && totalRoutes[r[eachIndex]]==undefined)
    totalRoutes={...totalRoutes,[r[eachIndex]]:{}}
  /*if(current=='undefinedtotal'){
    console.log("eachstopdataundefined",eachStopData)
    let uu={}
    if(totalRoutes[r[eachIndex]][r[`${r[eachIndex]}total`]]!==undefined)
      uu={...totalRoutes[r[eachIndex]][`${r[eachIndex]}total`]}
    //if(totalRoutes[r[eachIndex]]==undefined){
    totalRoutes={
      ...totalRoutes,
      [r[eachIndex]]:{
        ...totalRoutes[r[eachIndex]],
        [`${r[eachIndex]}total`]:{
          ...uu
        }
      }
    }
    eachStopData.map((x,indice)=>{
      totalRoutes={
        ...totalRoutes,
        [r[eachIndex]]:{
          ...totalRoutes[r[eachIndex]],
          [`${r[eachIndex]}total`]:{
            ...totalRoutes[r[eachIndex]][`${r[eachIndex]}total`],
            
            [x.id]:{
              normalData:{},
              total:0,
              keys:[],
              
            }
          }
        }
      }
      let normalFields={}
      if(r[eachIndex]==`getData${currentCategory.name}`){
        firstCatNormalFields[r[eachIndex]]["normal"].forEach(oo=>{
          if(oo!=="1" && oo!=="2" && oo!=="3")
            normalFields={...normalFields,[oo]:x[oo]}
        })
      }else{
        otmChoices[r[eachIndex]]["normal"].forEach(oo=>{
          if(oo!=="1" && oo!=="2" && oo!=="3")
            normalFields={...normalFields,[oo]:x[oo]}
        })
      }
      totalRoutes={
        ...totalRoutes,
        [r[eachIndex]]:{
          ...totalRoutes[r[eachIndex]],
          [`${r[eachIndex]}total`]:{
            ...totalRoutes[r[eachIndex]][`${r[eachIndex]}total`],
            
            [x.id]:{
              ...totalRoutes[r[eachIndex]][`${r[eachIndex]}total`][x.id],
              normalData:normalFields,
              total:eachStopData.length,
              keys:[]
            }
          }
          //[previous]:totalRoutes[r[eachIndex-1]][previous]+len}
        }
      }
    })
  }*/

  //if(current!=='undefinedtotal'){
    let uu={}
    if(r && totalRoutes[r[eachIndex]][current]!==undefined)
      uu={...totalRoutes[r[eachIndex]][current]}
  //if(totalRoutes[r[eachIndex]]==undefined){
    totalRoutes={
      ...totalRoutes,
      [r[eachIndex]]:{
        ...totalRoutes[r[eachIndex]],
        [current]:{
          ...uu
        }
      }
    }
  
    
  //if(eachIndex!==r.length){
    let newData
    eachStopData.map((x,indice)=>{
      //console.log("xxxx",x)
      newData=x[r[eachIndex+1]]
      
      //console.log("trigger",r,x,r[eachIndex-1],newData)
      let eachId=r[eachIndex].substring(0,r[eachIndex].length)
      //console.log("eachId",`${eachId}Id`)
      const len=newData?.length
      //console.log("newData",x[r[eachIndex]],r[eachIndex+1])

      
      

      //added code
      let otherAccVars={}
      let otherAccCompositeVars={}
      /*if(x[r[eachIndex+1]].length>0){
        Object.keys(x[r[eachIndex+1]][0]).forEach(u=>{
          if(typeof x[r[eachIndex+1]][0][u]=="number" && u!=="id" && !u.startsWith("otm")){
            const n=`${u}total`
            otherAccVars={...otherAccVars,[n]:0}
        }
        
        })
      }else{*/
        
      if(current!=="undefinedtotal"){
        let doneGt1=false
        otmChoices[r[eachIndex+1]]?.normal.forEach(l=>{
        //if(l!=="1" && l!=="2" && l!=="3"){
          if(l.type=="number"){
            
            otherAccVars={...otherAccVars,[`${l["name1"]}total`]:0}
            /*if(doneGt1==false){
              grandTotals[r[eachIndex]][r[eachIndex+1]]={...grandTotals[r[eachIndex]][r[eachIndex+1]],[`${l["name1"]}GrandTotal`]:0}
              
            }*/
          }
        })
        doneGt1=false
        let doneGt2=false
        otmChoices[r[eachIndex+1]]?.compositeFields.forEach(l=>{
          if(l.type=="number"){
            otherAccVars={...otherAccVars,[`${l["name1"]}total`]:0}
            /*if(doneGt2==false){
              grandTotals[r[eachIndex]][r[eachIndex+1]]={...grandTotals[r[eachIndex]][r[eachIndex+1]],[`${l["name1"]}GrandTotal`]:0}
            }*/

            
          }
        })
        doneGt2=false
        /*if(r[eachIndex+1]=="otmclientesfacturas")
          console.log("prprpr",otherAccVars)*/

      }else{//undefinedtotal
        //console.log("alerta")
        let doneGt3=false
        let doneGt1=false
          /*otmChoices[r[eachIndex]]?.normal.forEach(l=>{
        if(l!=="1" && l!=="2" && l!=="3"){
          if(l.type=="number"){
            console.log("x")
            //otherAccVars={...otherAccVars,[`${l["name1"]}total`]:0}
            //if(doneGt1==false){
              //grandTotals[r[eachIndex]][r[eachIndex+1]]={...grandTotals[r[eachIndex]][r[eachIndex+1]],[`${l["name1"]}GrandTotal`]:0}
              
            //}
          }
        })*/
        doneGt1=false

        otmChoices[r[eachIndex]]?.compositeFields.forEach(l=>{
          if(l.type=="number"){
            otherAccVars={...otherAccVars,[`${l["name1"]}`]:0}
            /*if(doneGt3==false){
              grandTotals[r[eachIndex]]={...grandTotals[r[eachIndex]],[`${l["name1"]}GrandTotal`]:0}
            }*/

            
          }
        })
        doneGt3=false

        //console.log("alerta1",otherAccVars)
      }
        

        
      
      //}
      let final=[]
      let oavTotals=otherAccVars
      //console.log("oavtotals1",oavTotals)//Object.keys(x[r[eachIndex+1]][0]))
      if(current!=="undefinedtotal"){
        x[r[eachIndex+1]]?.forEach(y=>{
          let t=y.id
          final=[...final,t]
          Object.keys(otherAccVars).forEach(p=>{
            const nn=p.substring(0,p.length-5)

            //console.log("ppp",p,y[p],nn)
            //if(typeof y[nn]=="number"){
              //console.log("ppp1",y[nn])
              let oo=buscaCompField(compFieldsArray[r[eachIndex+1]]/*otmChoices[r[eachIndex+1]]?.compositeFields*/,nn)
              if(oo!==false){

                //let otmc=otmChoices[r[eachIndex+1]]?.compositeFields
                //let l=otmc[p]
                if(oo.type=="number"){
                  console.log("gcf",oavTotals,p,oavTotals[p],getCompFieldNumber(y,oo.structure))
                  oavTotals[p]+=parseFloat(getCompFieldNumber(y,oo.structure,compFieldsArray[r[eachIndex+1]])/*otmChoices[r[eachIndex+1]]?.compositeFields*/)
                  oavTotals[p]=parseFloat(oavTotals[p].toFixed(2))
                }
              }else{
                console.log("fijo y nn y[nn] oavtotals p oavtotalsp",y,nn,y[nn],oavTotals,p,oavTotals[p])
                if(y[nn]!==null){
                oavTotals[p]+=parseFloat(y[nn].toFixed(2))
                oavTotals[p]=parseFloat(oavTotals[p].toFixed(2))
                }
              }
            //}
          })
        
            
        /*otmChoices[r[eachIndex+1]]?.compositeFields.forEach(l=>{
          if(l.type=="number"){
            if(oavTotals[`${l["name1"]}total`]==undefined)
              oavTotals={...oavTotals,[`${l["name1"]}total`]:0}
           
              oavTotals[`${l["name1"]}total`]+=getCompFieldNumber(y,l.structure)
          }
        })]*/
          
        
     
        
      })
    }else{//undefinedtotal
      //console.log("adventure",x)
      
        let t=x.id
        final=[...final,t]
        /*Object.keys(otherAccVars).forEach(p=>{
          //const nn=p.substring(0,p.length-5)

          //console.log("ppp",p,y[p],nn)
          //if(typeof y[nn]=="number"){
            //console.log("ppp1",y[nn])
            let oo=buscaCompField(allCompFieldsCluster,p)
            if(oo!==false){

              //let otmc=otmChoices[r[eachIndex+1]]?.compositeFields
              //let l=otmc[p]
              if(oo.type=="number"){
                //console.log("gcf",getCompFieldNumber(x,oo.structure))
                oavTotals[p]+=parseFloat(getCompFieldNumber(x,oo.structure,compFieldsArray[r[eachIndex]]).toFixed(2))
                oavTotals[p]=parseFloat(oavTotals[p].toFixed(2))
              }
            }else{
              if(x[p]!==null){
                console.log("x p x[p]",x,p,x[p])
                oavTotals[p]+=parseFloat(x[p].toFixed(2))
                oavTotals[p]=parseFloat(oavTotals[p].toFixed(2))
              }
            }
          //}
        })
      
          
      /*otmChoices[r[eachIndex+1]]?.compositeFields.forEach(l=>{
        if(l.type=="number"){
          if(oavTotals[`${l["name1"]}total`]==undefined)
            oavTotals={...oavTotals,[`${l["name1"]}total`]:0}
         
            oavTotals[`${l["name1"]}total`]+=getCompFieldNumber(y,l.structure)
        }
      })]*/
        
      
   
      
    
    }

      
    totalRoutes={
      ...totalRoutes,
      [r[eachIndex]]:{
        ...totalRoutes[r[eachIndex]],
        [current]:{...totalRoutes[r[eachIndex]][current],
          
          [x.id]:{
          normalData:{},
          total:0,
          keys:[],
          ...otherAccVars
        }}
      }
    }
    let normalFields={}
    if(r[eachIndex]==`getData${currentCategory.name}`){
      firstCatNormalFields[r[eachIndex]]?.normal.forEach(oo=>{
        if(oo["name1"]!=="1" && oo["name1"]!=="2" && oo["name1"]!=="3")
          normalFields={...normalFields,[oo["name1"]]:x[oo["name1"]]}
      })
      firstCatNormalFields[r[eachIndex]]?.otmdestiny.forEach(oo=>{
        
          normalFields={...normalFields,[oo]:x[oo]}
      })
      firstCatNormalFields[r[eachIndex]]?.compositeFields.forEach(l=>{
        if(l.type=="number"){
        
        
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldNumber(x,l.structure,compFieldsArray[`getData${currentCategory.name}`])}
        }else 
        if(l.type=="string"){
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldString(x,l.structure,compFieldsArray[`getData${currentCategory.name}`])}
        }
      })
      
      normalFields={id:x["id"],...normalFields}
    }else{//diferente a principal
      otmChoices[r[eachIndex]]?.normal.forEach(oo=>{
        //if(oo!=="1" && oo!=="2" && oo!=="3")
        //if(oo.type=="number")
          normalFields={...normalFields,[oo["name1"]]:x[oo["name1"]]}
      })
      otmChoices[r[eachIndex]]?.otmdestiny.forEach(oo=>{
        //if(oo!=="1" && oo!=="2" && oo!=="3")
        //if(oo.type=="number")
          normalFields={...normalFields,[oo]:x[oo]}
      })
      otmChoices[r[eachIndex]]?.compositeFields.forEach(l=>{
        if(l.type=="number"){
        
          //console.log("x l.struc compfiearr[rindex]",x,l.structure,compFieldsArray[r[eachIndex]],getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]]))
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldNumber(x,l.structure,compFieldsArray[r[eachIndex]])}
        }else
          if(l.type=="string"){
          normalFields={...normalFields,[`${l["name1"]}`]:getCompFieldString(x,l.structure,compFieldsArray[r[eachIndex]])}
        }
      })
      normalFields={id:x["id"],...normalFields}
    }
    console.log("vertigo",normalFields)
      //console.log("normalfields",normalFields)
      //console.log("firstCatnormal",firstCatNormalFields)
      //console.log("nd2xid",x[r[eachIndex]],x[r[eachIndex+1]],final,x.id,eachStopData)
      //console.log("parcial",len,totalRoutes,totalRoutes[r[eachIndex]][current],
      //totalRoutes[r[eachIndex-1]][current],finalRoutes,x.id,len,r[eachIndex],r[eachIndex-1])
    if(current!=="undefinedtotal"){
      totalRoutes={
        ...totalRoutes,
        [r[eachIndex]]:{
          ...totalRoutes[r[eachIndex]],
          [current]:{
            ...totalRoutes[r[eachIndex]][current],
            
            [x.id]:
            {

              ...totalRoutes[r[eachIndex]][current][x.id],
              normalData:{...normalFields},
              total:totalRoutes[r[eachIndex]][current][x.id]["total"]==undefined
              ?len:
              totalRoutes[r[eachIndex]][current][x.id]["total"]+len,
              keys:final.length!==0/*eachIndex+1!==finalRoutes.length && x[r[eachIndex]][indice] && x[r[eachIndex]][indice][r[eachIndex+1]]*/?final:[],
              
              ...oavTotals
            }
          }
          /*[previous]:totalRoutes[r[eachIndex-1]][previous]+len}*/
        }
      }
    }else{
      //console.log("oavTotals22",oavTotals)
      totalRoutes={
        ...totalRoutes,
        [r[eachIndex]]:{
          ...totalRoutes[r[eachIndex]],
          [current]:{
            ...totalRoutes[r[eachIndex]][current],
            
            [x.id]:
            {

              ...totalRoutes[r[eachIndex]][current][x.id],
              normalData:{...normalFields/*,...oavTotals*/},
              total:totalRoutes[r[eachIndex]][current][x.id]["total"]==undefined
              ?len:
              totalRoutes[r[eachIndex]][current][x.id]["total"]+len,
              keys:final.length!==0/*eachIndex+1!==finalRoutes.length && x[r[eachIndex]][indice] && x[r[eachIndex]][indice][r[eachIndex+1]]*/?final:[],
              ...oavTotals
              
            }
          }
          
          /*[previous]:totalRoutes[r[eachIndex-1]][previous]+len}*/
        }
      }
      //console.log("tr22",totalRoutes)
    }
    //setGrandTotalsSt(grandTotals)

    
      if(eachIndex+1<r.length)
      getLevelData(newData,finalRoutes,eachIndex+1)
      
    })
  
  }
  
  //}
//}  

const buscaCompField=(compositeRows,busca)=>{
  for(let x in compositeRows){
    if(compositeRows[x].name1==busca)
      return compositeRows[x]
  }
  return false
}
/*const getLevelsData=(route,nameRoute)=>{
  console.log("leveldata",route,nameRoute)
  for(let i=route.length-1;
    i>=0;
    i--){
      getLevelData(categoryProducts[])
    }
}*/

let finalObject={}

const calculateKeys=(finalObjectName,routeIndexToFind,routeIndex,routes,keys,totalRoutes,r,u,otmName,otherAccVars)=>{
  let trr=totalRoutes[routes[routeIndex]][`${routes[routeIndex+1]}total`]
  //console.log("trr",trr)
  let otherfinalvars={}
    keys.forEach(k=>{
    if(routeIndexToFind==routeIndex){
      //console.log("trr1",k,trr,otherAccVars,finalObject[otmName][r]["items"][u])
      Object.keys(otherAccVars).forEach(i=>{
        /*let o=otmChoices[routes[routeIndex+1]].compositeFields
        if(i in o){
          otherfinalvars[i]=finalObject[otmName][r]["items"][u][i]+getCompFieldNumber(trr[k],o[i].structure)
        }else*/
        //console.log("revisai",i)
        let val=0
        
        if(trr[k][i]!==null){
          //console.log("trr",trr[k][i])
          let ooi=trr[k][i]
          val=parseFloat(ooi)
        }

        /*if(i=="j1total")
          console.log("revisa",u,otmName,r,u,i,finalObject[otmName][r]["items"][u][i],trr[k][i],routes[routeIndex],`${routes[routeIndex+1]}total`,trr,k,i,val)*/
        let oop=0
        if(finalObject[otmName][r]["items"][u][i]==undefined){

          finalObject[otmName][r]["items"][u]={...finalObject[otmName][r]["items"][u],[i]:0}
        } 
        if(grandTotals[otmName][r][i]==undefined)
          grandTotals[otmName][r]={...grandTotals[otmName][r],[i]:0}

        oop=finalObject[otmName][r]["items"][u][i]+val
        
        otherfinalvars[i]=parseFloat(oop.toFixed(2))
        grandTotals[otmName][r][i]+=val
        grandTotals[otmName][r][i]=parseFloat(grandTotals[otmName][r][i].toFixed(2))
      })
    
      finalObject={
        ...finalObject,[otmName]:{
          ...finalObject[otmName],[r]:{
            ...finalObject[otmName][r],items:{
              ...finalObject[otmName][r]["items"],
              [u]:{...finalObject[otmName][r]["items"][u],
              total:finalObject[otmName][r]["items"][u]["total"]+trr[k]["total"],
              ...otherfinalvars
            }
            }
          }
        }
      }
    }else{

      calculateKeys(finalObjectName,routeIndexToFind,routeIndex+1,routes,
        totalRoutes[routes[routeIndex-1]][`${routes[routeIndex]}total`][k].keys
        ,totalRoutes,r,u,otmName,otherAccVars)
    }


  })

}

const getData=(routes,otmName,totalRoutes,routeIndex,mainArray=[],begin=false,cor=[],routeIndexToFind=0)=>{

  let dataVar=routes[routeIndex+1]
  let nn=`${routes[routeIndexToFind+1]}total`
  let r=`${dataVar}total`
  //let mainArray=[]
  //console.log("rmainArray",cor,r,begin)
  //if(r!==`undefinedtotal`){
  if(begin==true){
    mainArray=totalRoutes[routes[routeIndex]][r]
  }
  if(finalObject[otmName][nn]==undefined)
    finalObject={...finalObject,[otmName]:{...finalObject[otmName],[nn]:{items:{}}}}
  // console.log("ver22",claves,totalRoutes[routes[routeIndex]][r])
//console.log("mainArray",mainArray)
  if(grandTotals[otmName][`${dataVar}`]==undefined)
    grandTotals={...grandTotals,[otmName]:{...grandTotals[otmName],[nn]:{}}}  
    
    //mainArray=Object.keys(totalRoutes[routes[routeIndex]][r]).forEach(x=>claves)
    //console.log("mainArray",claves,mainArray,routes[routeIndex],r,routeIndex)
  //}
  
  if(mainArray){
    if(Object.keys(mainArray).length>0){
      if(finalObject[otmName]==undefined){
        finalObject[otmName]={}
      }
      if(grandTotals[otmName]==undefined){
        grandTotals[otmName]={}
      }

    
      
      Object.keys(mainArray).forEach(u=>{
        if(finalObject[otmName][nn]==undefined){
          finalObject[otmName]={
            [nn]:{}
            
          }
        }
        if(grandTotals[otmName][nn]==undefined){
          grandTotals[otmName]={
            [nn]:{}
          }
        }
        //console.log("rmainArray",cor,cor[u].normalData,r,begin)

      
        if(finalObject[otmName][nn]["items"]==undefined)
          finalObject[otmName][nn]["items"]={normalFields:{}}
        if(finalObject[otmName][nn]["items"][u]==undefined){
          //finalObject[otmName][nn]["items"][u]=0
          finalObject[otmName][nn]["items"][u]={total:0}
        }
        
        //Added code
        let otherAccVars={}
        //console.log("cor11",cor,cor[0])
        const objlen=Object.keys(cor).length
        let firstkey
        if(objlen>0){
          firstkey=Object.keys(cor)[0]
        
      /*added code 1
      let commonData
      finalObject[otmName][nn]["normalData"]={}
      otmChoices[r[eachIndex+1]]?.normal?.forEach(l=>{
        if(l!=="1" && l!=="2" && l!=="3"){
          //otherAccVars={...otherAccVars,[`${l}total`]:0}
          finalObject[otmName][nn]["items"][u]["normalData"][l]=mainArray[u][l]
        }
      })


      end added code 2*/
      //console.log("cor45",cor[firstkey])

      Object.keys(cor[firstkey]).forEach(iu=>{
        //console.log("cor11iu",iu)
        if(iu!=="keys" && iu!=="total"){
          const n=`${iu}`
          if(finalObject[otmName][nn]["items"][u][n]==undefined)
            finalObject[otmName][nn]["items"][u][n]=0
          if(grandTotals[otmName][nn][n]==undefined)
            grandTotals[otmName][nn][n]=0
          otherAccVars={...otherAccVars,[n]:0}
          
        }
      })
      }

      //tengo que poner los compuestos para inicializarlo


      //console.log("otheraccvars",otherAccVars)
      /*let final=[]
      let oavTotals=otherAccVars
      cor.forEach(y=>{
        let t=y.id
        final=[...final,t]
        Object.keys(otherAccVars).forEach(p=>{
          const nn=p.substring(0,p.length-5)

          console.log("ppp",p,y[p],nn)
          if(typeof y[nn]=="number"){
            console.log("ppp1",y[nn])
            oavTotals[p]+=y[nn]
          }
        })
        
      })*/
      //ends added code

        if(routeIndex==routeIndexToFind){
            finalObject[otmName][nn]["items"][u]["total"]+=cor[u]["total"]
            finalObject[otmName][nn]["items"]["normalFields"][u]=cor[u]["normalData"]
            Object.keys(otherAccVars).forEach(y=>{
              //if(finalObject[otmName][nn]["items"][u][y]!==undefined){
                /*if(y in otmChoices[routes[routeIndex+1]].compositeFields){
                  finalObject[otmName][nn]["items"][u][y]+=getCompFieldNumber(u,otmChoices[routes[routeIndex+1]]["compositeFields"][0].structure)
                }else */
                if(cor[u][y]!==undefined){
                  otherAccVars[y]+=cor[u][y]

                finalObject[otmName][nn]["items"][u][y]+=cor[u][y]
                grandTotals[otmName][nn][y]+=cor[u][y]
              /*}
              else  
               //finalObject[otmName][nn]["items"][u][y]=0*/
              //console.log("prev", finalObject[otmName][nn]["items"][u][y],cor[u][y])
            }

            })
            
          
        }else{
          //console.log("cor11",mainArray,u,mainArray[u])
          let keys=mainArray[u]["keys"]
          let finalObjectName=finalObject[otmName][nn]["items"][u]
          calculateKeys(finalObjectName,routeIndexToFind,routeIndex+1,routes,keys,totalRoutes,nn,u,otmName,otherAccVars)
        }
      })  
      
      
      
    
      
    }
  
  
}
}


const getAccumulated=(routes,
  otmName,routeIndex,begin=false,totalRoutes)=>{
    let total=0
    //if(otmName==routes[routeIndex]){
      let r=routes[routeIndex+1]
      let mainArray=totalRoutes[otmName][`${r}total`]?totalRoutes[routes[routeIndex]][`${r}total`]:[]
      
      //console.log("datalog",otmName,totalRoutes,`${r}total`,mainArray)

      let nuevoTotalVar=`${r}total`
      let totalObject=Object.keys(totalRoutes[routes[routeIndex]][nuevoTotalVar]).length
      finalObject={
        ...finalObject,
        [otmName]:{...finalObject[otmName],
          [`${r}total`]:{granTotal:totalObject}}
      }
      //if(routeIndex+1!==routes.length-1)
        //getAccumulated(routes,otmName,routeIndex+1,false,totalRoutes,true)
    /*}else{

      
    }*/
    for(let i=routeIndex;i<routes.length-1;i++){
      //console.log("ikey",i,totalRoutes[routes[i]][`${routes[i+1]}total`])
      //getData(routes,otmName,totalRoutes,0,null,true,totalRoutes[routes[i]][`${routes[i+1]}total`],i)
      getData(routes,otmName,totalRoutes,routeIndex,null,true,totalRoutes[routes[i]][`${routes[i+1]}total`],i)
    }
    console.log("grandTotals1",grandTotals)
      /*if(Object.keys(mainArray).length>0){
        finalObject[otmName][r]=0
        for(let x in mainArray){
          finalObject[otmName][r]+=mainArray[x].total
        }

      }*/
    
  }

  let reporte=""
let eachHeader
let dataEach=[]
let fullbody=[]

let titleSeg=[]
let outsideTable=[]
let enc=[]

const getDataReport=(routes,finalRoutes)=>{
  const root=`getData${currentCategory.name}`
  totalRoutes={}
  //for(let i=0;i<finalRoutes.length;i++){

   getLevelData(categoryProducts[root],routes[finalRoutes[0]],0)
   //console.log("totalRoutes",totalRoutes,categoryProducts[root],finalRoutes)

  //}
  //console.log("getLevelData",totalRoutes)
  finalObject={}
  totalRoutes={}

  //getLevelData(categoryProducts[root],routes[finalRoutes[0]],0) 
  let totalRoutesArray={}
  let done1=[]
  for(let i=0;i<finalRoutes.length;i++){
  //getAccumulated(routes[finalRoutes[0]],routes[finalRoutes[0]][0],0,false,totalRoutes)
  totalRoutes={}
  
  getLevelData(categoryProducts[root],routes[finalRoutes[i]],0)
    for(let x=0;x<routes[finalRoutes[i]].length-1;x++){
      getAccumulated(routes[finalRoutes[i]],routes[finalRoutes[i]][x],x,false,totalRoutes)
      if(!done1.includes(finalRoutes[i])){
        
        done1.push(finalRoutes[i])
        totalRoutesArray={...totalRoutesArray,[routes[finalRoutes[i]][routes[finalRoutes[i]].length-1]]:totalRoutes[routes[finalRoutes[i]][routes[finalRoutes[i]].length-1]]['undefinedtotal']}
      }

  }
  //console.log("finalObject",finalObject)
  }
  let done=[]
  let printTablesBool=[]
  //console.log("totalRoutesArray",totalRoutesArray)
  for(let i=0;i<finalRoutes.length;i++){
    for(let j=0;j<routes[finalRoutes[i]].length;j++){
      
      reporte=""
      eachHeader=[]
      dataEach=[]
      fullbody=[]

      titleSeg=[]
      outsideTable=[]
      enc=[]
     
      if(j!==routes[finalRoutes[i]].length-1){
        //console.log("check22",printTablesBool,routes[finalRoutes[i]][j])
        if(!printTablesBool.includes(routes[finalRoutes[i]][j])){
          printTable(finalObject[routes[finalRoutes[i]][j]],routes[finalRoutes[i]][j],`${routes[finalRoutes[i]][j+1]}total`)
          printTablesBool.push(routes[finalRoutes[i]][j])
        }
      }
    }
  }
  if(Object.keys(totalRoutesArray).length==0){
    totalRoutesArray={[routes[finalRoutes[0]][routes[finalRoutes[0]].length-1]]:totalRoutes[routes[finalRoutes[0]][routes[finalRoutes[0]].length-1]]['undefinedtotal']}
    

  }
  console.log("grandTotals",grandTotals)
  beginPrintFinalTables(totalRoutesArray)
  //return printTable(finalObject['getDataclientes'],'getDataclientes',`${routes[finalRoutes[0]][1]}total`)
  //printTable(totalRoutesArray,routes,finalRoutes)
}

const printFinalTable=(title,data)=>{
  let fields=[]
  //console.log("data555",data)
  let compF
  let cf
  //console.log("firstcat",firstCatNormalFields)
  if(title!==`getData${currentCategory.name}`){
    fields=otmChoices[title]["normal"].map(x=>x["name1"])
    fields=[...fields,...otmChoices[title]["otmdestiny"]]
    compF=otmChoices[title]["compositeFields"]
    cf=compF.map(x=>x["name1"])
    fields=[...fields,...cf]
  }else{
    fields=firstCatNormalFields[title]["normal"].map(x=>x["name1"])
    compF=firstCatNormalFields[title]["compositeFields"]
    let cf=compF.map(x=>{
      
      
      return x["name1"]
    })
    fields=[...fields,...cf]
  }
  
  let head=[]
  let rowCols=[]
  let rows=[]
  //console.log("fields11",fields)
  Object.keys(data).forEach((x,index)=>{
    let specifics=data[x].normalData
    rowCols=[]
    fields.forEach((f,i)=>{
      
      if(f!=="1" && f!=="2" && f!=="3"){
        if(index==0){
          head.push(<th style={{borderRight:"1px solid white"}}>{f}</th>)
        }
        let bcm=buscaCompField(compF,f)
          if(bcm!==false &&
            bcm.type=="number")
            rowCols.push(<td style={{borderRight:"1px solid white"}}>{specifics[f]}</td>)
          else
            rowCols.push(<td style={{borderRight:"1px solid white"}}>{specifics[f]}</td>)
      }
    })
    rowCols.unshift(<td style={{borderRight:"1px solid white"}}>{specifics["id"]}</td>)
    if(index==0)
      head.unshift(<th style={{borderRight:"1px solid white"}}>Id</th>)
    rows.push(<tr style={{border:"1px solid white"}}>{rowCols}</tr>)
  })
  let tableResult=
  <table style={{marginBottom:"20px"}}>
    <thead>
      <tr style={{backgroundColor:"white",color:"black"}}>
        <th style={{backgroundColor:"white",color:"black"}}>{title}</th>
      </tr>
    </thead>
    <tbody>
      <table style={{border:"1px solid white",width:"100%"}}>
        <thead>
          <tr style={{width:"100%"}}>
            {head}
          </tr>
        </thead>
        <tbody style={{border:"1px solid white"}}>
          {rows}
        </tbody>
      </table>
    </tbody>
  </table>
  totalTables.push(tableResult)
}

const beginPrintFinalTables=(totalRoutesArray)=>{
  Object.keys(totalRoutesArray).forEach(key=>{
    printFinalTable(key,totalRoutesArray[key])
  })
}


const getValues=(o)=>{
  let de=[]
  let re=[]
  let er=[]
  Object.keys(o).forEach((y,index)=>{
        
    if(y!=="normalFields" && y!=="normalData"){
      de.push(<td style={{margin:0,overflowX:"scroll",whiteSpace:"nowrap"}} className="notlastborder">{o[y]}</td>)
    }
  
  })
  //re.push(<td>{er}</td>)
  return de
}
let headerEach=[]

const printReportSegment=(object,primero,segmentTitle)=>{
  
  //let dataEach=[]
  //console.log("object",object)
  let fullheader=[]
  
  //let eachHeader
  let eachRow=[]
  let titya=false
  let eachSeg=[]
  let fullData=[]  
  Object.keys(object).map((u,index)=>{
    if(u!=="normalFields" && u!=="normalData"){
      if(titya==false){
        let inicio=false
        Object.keys(object[u]).forEach(y=>{
          if(y!=="normalFields" && y!=="normalData"){
            headerEach.push(<th>{y}</th>)
            eachSeg.push(<th className="notlastborder" style={{width:"100%"}}>{y}</th>)
          }
          
        })
        
          
        
      
        
        titya=true
      }
    
  
    eachRow=getValues(object[u])
    
      
      
      fullData.push(<tr>{eachRow}</tr>)

    /*else{
      console.log("fulldata",fullData,fullData[index])
      fullData=fullData.map((i,index1)=>{
        if(index1==index)
          return [...i,...eachRow]
        return i
      })
      
        
    }*/
    

  
    
      
    
  }
  })
  
  enc.push(<th style={{textAlign:"center",marginLeft:"5px",marginRight:"5px",padding:"5px",
  /*borderRight:"1px solid black",*/ borderColor:"black",background:"white",color:"black"}}
  >{segmentTitle}</th>)
  outsideTable.push(
    
      <table style={{margin:0,boxSizing:"borderBox",width:"100%"}} >
        <thead><tr style={{textAlign:"center",margin:0,padding:0,borderTop:"1px solid white",borderBottom:"1px solid white",width:"100%"}} className="nlb1">{eachSeg}</tr></thead>
        <tbody style={{margin:0,padding:0}}>
          {fullData.map(x=>{
            return x
          })}
        </tbody>
      </table>
   )
  /*outsideTable.push(
    <th style={{textAlign:"center"}}>{segmentTitle}
      <table style={{margin:0,padding:0}}>
        <thead><tr style={{textAlign:"center"}}>{eachSeg}</tr></thead>
        <tbody style={{background:"brown",margin:0,padding:0}}>{fullData}</tbody>
      </table>
    </th>)*/
  
  /*fullData.push(eachRow)
  reporte=<>{reporte}<table>
    {eachHeader}
    {fullData}
  </table>
  </>*/
}

//const printTable=(totalRoutesArray,routes,finalRoutes)=>{
  
let totalTables=[]
const printTable=(objectToPrint,title,primero)=>{
  reporte=""
  outsideTable=[]
  let keys=Object.keys(objectToPrint)
  //console.log("primero1",primero)

  for(let i=0;i<keys.length;i++){
    let data=objectToPrint[`${keys[i]}`]
    
      
      if(keys[i]==primero){
        //console.log("primero",primero)
        printReportSegment(objectToPrint[primero]["items"]["normalFields"],true,title)         

      }
      printReportSegment(data["items"],false,keys[i])

    

  }

  /*for(let i=0;i<finalRoutes.length;i++){
    let routeSteps=routes[finalRoutes[i]]
    console.log("routesteps",routeSteps)
    let data=finalObject[routeSteps[i]]
    let headers=[]*/
    
    /*for(let j=1;j<routeSteps.length;j++){
      
      
        let subData=data[`${routeSteps[j]}total`]
        console.log("subdata",data,subData)
        if(j==1){
          if(subData["items"]?.normalFields!==undefined){
            printReportSegment(subData["items"]["normalFields"],true,routeSteps[0]) 
          }
        }
        
          printReportSegment(subData["items"],false,routeSteps[j])
        
      
    }*/
    reporte=<table style={{boxSizing:"borderBox",borderLeft:"1px solid white",borderBottom:"1px solid white",borderTop:"1px solid white",borderRight:"none",marginBottom:"20px"}}>
      <thead>
        <tr style={{margin:0,padding:0,textAlign:"center",
      }} className="nlb">
          {enc}
        </tr>
      
      </thead>
      <tbody style={{margin:0,padding:0}}>
        <tr style={{margin:0,padding:0}}>
      {outsideTable.map(y=><td style={{margin:0,padding:0}}>{y}</td>)}
      </tr>
      </tbody>
      
    </table>
    
    /*<table>
      <thead>
        <tr>
      {headerEach.map((o,ind)=>{
        return(
          <>
            {titleSeg[ind]}
            {o.map((x,ind)=>{
              if(ind==0){
                return <div>
                  <p>{titleSeg[ind]}</p>{x}
                  </div>
              return x
              }
            })}
          </>
          
      
        )
      })}
      </tr>
      </thead>
      <tbody>
        
        {fullData.map(x=>{
          return <tr>{x}</tr>
        })}
      </tbody></table>*/
    
  totalTables.push(reporte)
  
}

const beginReport=(primero=false,name1,d1)=>{
  //console.log("croutes",calculateRoutes([`getData${currentCategory.name}`]))
  
  let routes=calculateRoutes([`getData${currentCategory.name}`])
  //console.log("routes111",routes)
  //routesfinal encuentra la ultima parada de cada una de las rutas
  //console.log("routesfinal",routesFinal(routes))
  let finalRoutes=routesFinal(routes)
  //console.log("finalRoutes",finalRoutes)
  getDataReport(routes,finalRoutes)
  //calculateAmountsBegins(routes)

  /*let parentNodeName,parentNode
  let data=[]
  if(primero){
    parentNode=firstCatNormalFields[parentNodeName]
    data=categoryProducts[parentNodeName]
  }else{
    parentNodeName=name1
    parentNode=otmChoices[parentNodeName]
    data=d1
  }
  console.log("importa",parentNode,parentNodeName,firstCatNormalFields,data)
  return <>
    {displayReport(parentNodeName,parentNode,data)}
    {parentNode.otm.map((x,index)=>{
      let nd=[]
     return  nd=otmChoices[x]["otm"].map(l=>{
        console.log("imp2",l,data[x][l])

        return beginReport(false,l,data[x])
      })
      
    })
      //console.log("x555",x,data,data[x])
    }

  </>*/
    

}
const displayReport=(parentNodeName,parentNode,data)=>{
  const singleFields=parentNode["normal"]
  const otmFields=parentNode["otm"]
  //let data=categoryProducts[parentNodeName]
 
  return displayReport1(parentNode,parentNodeName,singleFields,otmFields,data)

  
}

const displayReport1=(parentNode,parentNodeName,singleFields,otmFields,data)=>{
    return (
  <>
    <p>Sons of {parentNodeName}</p>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          {singleFields.map(t=>{
            return <th>{t}</th>
          })}
          {otmFields.map(y=>{
            if(otmChoices[y]["normal"].includes("1"))
              return <th>{y} Instances</th>  
            return ""
          }
            
            )}
          
        </tr>
      </thead>
      <tbody>
        {data.map(e=>{
          return <tr>
            <td>{e.id}</td>
            {singleFields.map(t=>{
            return <td>{e[t]}</td>
            })}
            {otmFields.map(y=>{
              if(otmChoices[y]["normal"].includes("1"))
                return <td>{calculateInstancesNumber(e,y)}</td>  
              return ""
         
            })}
            
          </tr>

        })}
        
      </tbody>
    </table>
    

  </>
  )
}
  return <div className="reports">
    <BreadCrumb toggleDialog={toggleDialog}/>
    {openDialog && 
    <SearchSubcategories
      open={openDialog}
      toggleDialog={toggleDialog}/>}
    <FormButton
      onClick={()=>{
        setShowFields(true)
        //console.log("Add new report")
      }}>
      Add New Report
    </FormButton>
    <AddCompositeField
      open={openCompositeFieldDialog}
      toggleDialog={toggleCompositeFieldDialog}
      otmCategoryFields={otmCategoryFields}
      setOtmChoices={setOtmCategoryFields}
      otmChoices={otmCategoryFields}
      specificOtmName={specificOtmName}
      compFieldsArray={compFieldsArray}
      setCompFieldsArray={setCompFieldsArray}
    />
    <AddOtmIdFields
      open={openOtmIdFieldsDialog}
      toggleDialog={toggleOtmIdFieldsDialog}
      otmCategoryFields={otmCategoryFields}
    />

    
    {showFields 
    && 
    displayCurCategory(currentCategory,true,true,"",true)
    }
    <FormButton onClick={()=>setReportShow(true)}>Show Report</FormButton>

    {reportShow && beginReport(true,"")}
    {totalTables}
  </div>
}

export default Reports