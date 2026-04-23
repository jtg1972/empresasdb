import { forgetCache } from '@apollo/client/cache/inmemory/reactiveVars'
import {forwardRef, useEffect,useState} from 'react'
import { SubsetsContDeriveTable } from '../SubsetsContDeriveTable'

const GetSubsetsContributionsForAllSets=({
  vars
}
)=>{
  const {
    order,
    data,
    displayRaw,
    //grandTotals,
    firstCatNormalFields,
    otmChoices,
    subsets,
    finalRoutes,
    routes,
    immediateSons,
    setDummyState,
    subsetsData,
    tablesToCont,
    dataz
  }=vars
  const alreadyDone={}
  
  useEffect(()=>{
    startProcess()
    console.log("dataresult110",dataResult1)
  },[subsets,data,dataz])
  /*console.log("varsfijo",order,
  data,
  displayRaw,
  grandTotals,
  firstCatNormalFields,
  otmChoices,
  subsets,finalRoutes,routes,
  immediateSons)*/
  const [muestra,setMuestra]=useState("")
  const [algo,setAlgo]=useState(false)
  let dataAgainstAll={}
  let dataResult1={}
  let printRaw={}
  let printRawUnique={}
  let grandTotals={}
  let beforeCategories={}
  console.log("tablestocont11",tablesToCont)
  const loadNormalFields=(vars)=>{
    const {cat,data,order,titulo}=vars
  
    //console.log("normalfields")
      Object?.keys(data?.[cat]?.[cat])?.forEach(l=>{
        dataResult1[titulo][cat][l]=data[cat][cat][l]
      })
  }

  const getIfPrintRaws=(vars)=>{
    const {otmChoices,firstCatNormalFields,cat,seg}=vars
    if(cat.startsWith("getData")){
      if(cat==seg)
        return false
      if(firstCatNormalFields[cat].otm.includes(seg) || firstCatNormalFields[cat].mtm.includes(seg))
        return false
      return true
    }else{
      if(cat==seg)
        return false
      if(otmChoices[cat].otm.includes(seg) || otmChoices[cat].mtm.includes(seg))
        return false
      return true
    }
  }

  const getUniqueKeys=(keys,values)=>{
    console.log("garant",[...keys],[...values])
    let newKeysUnique=[]
    let newValuesUnique=[]
    let existArr=[]
    let nkValuesUniqueRaw=[]
    let nkValuesUnique=[]
    let nkKeysUniqueRaw=[]
    let nkKeysUnique=[]
    for(let keys1=0;keys1<keys.length;keys1++){
      for(let keysSingle=0;keysSingle<keys[keys1].length;keysSingle++){
        let current=keys[keys1][keysSingle]
        console.log("current",current,existArr)
        for(let keys1a=0;keys1a<keys.length;keys1a++){
          for(let keysSinglea=0;keysSinglea<keys[keys1a].length;keysSinglea++){
            //current=keys[keys1][keysSingle]

            if(!existArr.includes(current)){
              existArr.push(current)
              if(newKeysUnique?.[keys1]==undefined)
                newKeysUnique[keys1]=[]
              newKeysUnique[keys1].push(current)
              if(newValuesUnique?.[keys1]==undefined)
                newValuesUnique[keys1]=[]
              newValuesUnique[keys1].push(values[keys1][keysSingle])
            }
          }
        }

      }
      console.log("pivotever",newValuesUnique,newKeysUnique)
      for(let i=0;i<Object.keys(newValuesUnique).length;i++){
        let key=Object.keys(newValuesUnique)[i]
        let sum=0
        for(let j=0;j<newValuesUnique[key].length;j++){
          nkValuesUniqueRaw.push(newValuesUnique[key][j])
          nkKeysUniqueRaw.push(newKeysUnique[key][j])

          
         
        }
        if(nkValuesUnique[i]!=undefined)
            nkValuesUnique[i]=[]
          nkValuesUnique[i]=newValuesUnique[i]
        if(nkKeysUnique[i]!=undefined)
          nkKeysUnique[i]=[]
        nkKeysUnique[i]=newKeysUnique[i]
        
      }
      console.log("verporque",nkKeysUnique,nkValuesUnique,nkKeysUniqueRaw,nkValuesUniqueRaw)
      return [nkKeysUnique,nkValuesUnique,nkKeysUniqueRaw,nkValuesUniqueRaw]
     //console.log("verporque",keys,newKeysUnique,values,newValuesUnique,nkUniqueRaw,nkUnique)
    } 
    
    /*let alreadyDone=[]
    let newKeys=[]
    let newValues=[]
    for(let i=0;i<keys.length;i++){
      
      for(let j=0;j<keys.length;j++){
        if(keys[j]==keys[i] && !alreadyDone.includes(keys[i])){
          alreadyDone.push(keys[j])
          newKeys.push(keys[j])
          newValues.push(values[j])
        }
      }
    }
    console.log("newkeys",keys,newKeys,values,newValues)
    return [newKeys,newValues]*/
  }
  let doneAl=[]

  const calculateArrUnique=(arrayFiltered,keys,values,keysSubset,valuesSubset)=>{
    let res=[]
    for(let i=0;i<arrayFiltered.length;i++){
      res={...res,[i]:[]}
    }
    let enc=false
    console.log("keysubset",keysSubset)
    if(arrayFiltered.length>0){
      for(let i=0;i<keysSubset.length;i++){
        enc=false
        for(let j=0;j<arrayFiltered.length;j++){
          for(let k=0;k<arrayFiltered[j].length;k++){
            if(arrayFiltered[j][k]==keysSubset[i]){
              res={...res,[j]:[...res[j],valuesSubset[i]]}
             // res[j].push(valuesSubset[i])
              enc=true
              
            }
          }
          /*if(enc=true)
            break*/
        }
      }
    }
    let res1=[]
    for(let i=0;i<Object.keys(res).length;i++){
      let suma=0
      let keyp=Object.keys(res)[i]
      for(let j=0;j<res[keyp].length;j++){
        suma+=res[i][j]
      }
      res1.push(suma)
    }
    console.log("jorget",arrayFiltered,res,res1,keysSubset,valuesSubset)
    return res1
  }
  const resolveUnique=(keys,values)=>{
    let each
    let newKeys=[]
    let newValues=[]
    let done=[]
    console.log("keysvalues",keys,values)
    for(let i=0;i<keys.length;i++){
      if(!done.includes(keys[i])){
        newKeys.push(keys[i])
        newValues.push(values[i])
        done.push(keys[i])
      }
    }
    console.log("keysver",newKeys,newValues)
    return {keys:[...newKeys],values:[...newValues]}
  }
  const calculateContributions=(vars)=>{
    let {titulo,cat,ssData,seg,otmChoices,gi,giData,rs,field,x,ss,posi,
      requireData,dataResult1DataTitle,title,pivoteTable,toAnalizeTable,dataPivote}=vars
   // console.log("datares99",dataResult1,cat,seg,gi,`${field}total`)
    if(dataResult1?.[titulo]?.[seg]?.["data"]?.[gi]?.[`${field}total`]?.[ss]?.[`${field}RawArray`]==undefined)
        dataResult1[titulo][seg]["data"][gi][`${field}total`][ss][`${field}RawArray`]=[]
    if(dataResult1?.[titulo]?.[seg]?.["data"]?.[gi]?.[`${field}total`]?.[ss]?.[`${field}UniqueRawArray`]==undefined)
      dataResult1[titulo][seg]["data"][gi][`${field}total`][ss][`${field}UniqueRawArray`]=[]
        
   // console.log("alarma",data,cat,seg,gi,ssData,x,rs,dataResult1[titulo][cat][giData]["id"],dataPivote[rs]["parentId"])

    if(dataResult1[titulo][cat][posi]["id"]==dataPivote[rs]["parentId"]){
      let contTotal=0
      let rep=[]
      let contTotalUnique=0
      let contTotalSuperUnique=0
      let contTotalRaw=0
      let contTotalRawUnique=0
    let repUnique=[]
    let arrUniqueKeys=[]
    let arrPrevKeys=[]
      let contTotalSuper=0
      let repSet=[]
     /*if(x==seg){
  
        rep=[...rep,dataPivote[seg][rs][field]]
        contTotal=dataPivote[seg][rs][field]
      
      }else{*/
        
        contTotal=dataPivote[rs][`${field}total`][ss]["value"]
        
        contTotalUnique=dataPivote[rs][`${field}total`][ss]["valueUnique"]
        let emer=0
        let emer1=0
        dataPivote[rs][`${field}total`][ss][`${field}RawArray`].forEach(x=>{
          emer+=x
        })

        contTotalRaw=emer
        contTotalRawUnique=emer
        /*dataPivote[rs][`${field}total`][ss][`${field}UniqueRawArray`].forEach(x=>{
          emer1+=x
        })
        contTotalRawUnique=emer1*/

        rep=[...rep,...dataPivote[rs][`${field}total`][ss][`${field}RawArray`]]
        repUnique=[...dataPivote[rs][`${field}total`][ss][`${field}UniqueRawArray`]]
        contTotalSuper=dataPivote[rs][`${field}total`][`${field}total`]
        contTotalSuperUnique=dataPivote[rs][`${field}total`][`${field}UniqueTotal`]
       // console.log("veryuyu",dataPivote)
        arrUniqueKeys=dataPivote[rs][`${field}total`][ss]["arrUniqueKeys"]//`${dataPivote[rs]["id"]}/${dataPivote[rs]["parentId"]}`]
        console.log("drjorge",dataResult1,titulo,seg,"data",posi,`${field}total`,ss)
        if(!dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["arrPrevKeys"].includes(`${dataPivote[rs][`parentId`]}/${dataPivote[rs][`parentId`]}`)){
          arrPrevKeys=[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["arrPrevKeys"],`${dataPivote[rs][`parentId`]}/${dataPivote[rs][`parentId`]}`]
          contTotalUnique=dataPivote[rs][`${field}total`][ss]["valueUnique"]
        }

       /* let emergUK=[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss][`arrUniqueKeys`],arrUniqueKeys]
        let emergUKValues=[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss][`${field}UniqueRawArray`],repUnique]
        console.log("veryuyu",dataPivote,emergUK,emergUKValues)
        let uKValues=getUniqueKeys(emergUK,emergUKValues)
        uKValues[1].forEach(x=>{
          emer+=x
        })
        uKValues[3].forEach(x=>{
          emer1+=x
        })
        contTotalUnique=emer
        contTotalRawUnique=emer1*/
        
        //contTotalUnique=
        //}
     //console.log("perios",ssData[seg][rs])
  
        //console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}`])                              
  
        //console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"],`${n.name1}total`,ssData[seg][rs][`${n.name1}`])
       // console.log("dataResult1po",dataResult1,title,seg)
        let ru=[]
        ru=resolveUnique([...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["arrUniqueKeys"],...arrUniqueKeys],[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss][`${field}UniqueRawArray`],...repUnique])
       console.log("rujorge",ru)
        let uniq=calculateArrUnique(tablesToCont[cat][seg][posi]?.[`realUniqueIndexesInArrayFiltered`],tablesToCont[cat][seg][posi]?.[`realUniqueIndexes`],tablesToCont[cat][seg][posi]?.[`${field}UniqueTotalArray`],ru.keys,ru.values)
        console.log("uniq66",uniq)

      dataResult1={...dataResult1,
        [titulo]:{
          ...dataResult1[titulo],
          [seg]:{
            ...dataResult1[titulo][seg],
            ["data"]:{
              ...dataResult1[titulo][seg]["data"],
              [posi]:{
                ...dataResult1[titulo][seg]["data"][posi],
                [`${field}total`]:{
                  ...dataResult1[titulo][seg]["data"][posi][`${field}total`],
                  [ss]:{
                    value:dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["value"]+contTotal,
                    arr:[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["arr"],contTotal],
                    [`${field}RawArray`]:[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss][`${field}RawArray`],...rep],
                    valueRaw:dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["valueRaw"]+contTotalRaw,
                 
                    valueUnique:dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["valueUnique"]+contTotalUnique,
                    arrUnique:[...uniq],//[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["arrUnique"],contTotalUnique],//[uKValues[1]],//[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["arrUnique"],contTotalUnique],
                    [`${field}UniqueRawArray`]:[...ru.values],//[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss][`${field}UniqueRawArray`],...repUnique],//[...uKValues[3]],//[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss][`${field}UniqueRawArray`],...repUnique],
                    valueRawUnique:dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["valueRawUnique"]+contTotalRawUnique,
                    arrPrevKeys,
                    arrUniqueKeys:[...ru.keys],//[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["arrUniqueKeys"],...arrUniqueKeys],//......dataResult1[titulo][seg]["data"][posi][`${field}total`][ss]["arrUniqueKeys"],contTotalUnique]]//[uKValues[0]],//[...dataResult1[titulo][seg]["data"][posi][`${field}total`][ss][`arrUniqueKeys`],...arrUniqueKeys]
                    [`realUniqueIndexesInArrayFiltered`]:[...tablesToCont[cat][seg][posi]?.[`realUniqueIndexesInArrayFiltered`]],
                    [`realUniqueIndexes`]:[...tablesToCont[cat][seg][posi]?.[`realUniqueIndexes`]],
                    [`${field}UniqueTotalArray`]:[...tablesToCont[cat][seg][posi]?.[`${field}UniqueTotalArray`]],
                    //arrUnique:calculateArrUnique(tablesToCont[cat][seg][posi]?.[`realUniqueIndexesInArrayFiltered`],tablesToCont[cat][seg][posi]?.[`realUniqueIndexes`],tablesToCont[cat][seg][posi]?.[`${field}UniqueTotalArray`]),
                    realUniqueIndexesGlobal:[...tablesToCont[cat][seg][posi]?.[`realUniqueIndexesInArrayFiltered`]]//[...tablesToCont[cat][seg][posi]?.[`realUniqueIndexes`]]
                  },
                  //total:dataResult1[titulo][seg]["data"][posi][`${field}total`][`total`]+contTotalSuper,
                  //totalUnique:dataResult1[titulo][seg]["data"][posi][`${field}total`][`totalUnique`]+contTotalSuperUnique
  
                }
              }
            }
          } 
  
        }
        
      }
      //console.log("dataResult6",dataResult1)
    }
  }
  
  const calculateContributionsNull=(vars)=>{
    let {cat,ssData,seg,data,otmChoices,gi,giData,rs,field,x,ss,posi,title,dataPivote}=vars
    if(dataResult1?.[title]?.[seg]?.["data"]?.[gi]?.[`${field}total`]?.[ss]?.[`${field}RawArray`]==undefined)
        dataResult1[title][seg]["data"][gi][`${field}total`][ss][`${field}RawArray`]=[]
    if(dataResult1?.[title]?.[seg]?.["data"]?.[gi]?.[`${field}total`]?.[ss]?.[`${field}UniqueRawArray`]==undefined)
      dataResult1[title][seg]["data"][gi][`${field}total`][ss][`${field}UniqueRawArray`]=[]
         
        
    console.log("alarma",data,cat,seg,gi,ssData,x,rs)
    
      let contTotal=0
      let rep=[]
      let contTotalSuper=dataPivote[rs][`${field}total`][`${field}total`]
      let contTotalSuperUnique=dataPivote[rs][`${field}total`][`${field}UniqueTotal`]
     
     // console.log("perios",ssData[seg][rs])
  
        //console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}`])                              
  
        //console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"],`${n.name1}total`,ssData[seg][rs][`${n.name1}`])
      dataResult1={...dataResult1,
        [title]:{
          ...dataResult1[title],
          [seg]:{
            ...dataResult1[title][seg],
            data:{
              ...dataResult1[title][seg]["data"],
              [gi]:{
                ...dataResult1[title][seg]["data"][gi],
                [`${field}total`]:{
                  ...dataResult1[title][seg]["data"][gi][`${field}total`],
                  [ss]:{
                    value:0,
                    arr:[],
                    [`${field}RawArray`]:[],
                    valueUnique:0,
                    arrUnique:[],
                    [`${field}UniqueRawArray`]:[],
                    arrUniqueKeys:[],
                    valueRaw:0,
                    valueRawUnique:0,
                    arrPrevKeys:[],
                    [`${field}UniqueTotalArrayGlobal`]:[],
                    realUniqueIndexesGlobal:[]
                  },
                  //total:dataResult1[title][seg]["data"][posi][`${field}total`][`total`]+contTotalSuper,
                  //totalUnique:dataResult1[title][seg]["data"][posi][`${field}total`][`totalUnique`]+contTotalSuperUnique
                }
  
              }
            }
          } 
  
        }
        
      }
      console.log("dataResult6",dataResult1)
    
  }

  const createVars=(vars1)=>{
    let {title,vars,cat,seg,gi,giInd,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields,
      requireData,dataResult1DataTitle,pivoteTable,toAnalizeTable,dataPivote}=vars1
   // console.log("datamain77",data,dataPivote[rs]["id"])
    
    
    
    vars.forEach(n=>{
      if(n.type=="number"){
  
        if(dataResult1[title][seg]["data"]==undefined)
          dataResult1[title][seg]={...dataResult1[title][seg],data:{}}
  
        
       
        let posi=-1
        let lent=Object.keys(dataResult1[title][seg]["data"]).length-1
          posi=giInd
         // console.log("datapivid",dataPivote[rs])
        if(posi==-1){
          dataResult1[title][seg]["data"]={...dataResult1[title][seg]["data"],
          [lent]:{
            ...dataResult1[title][seg]["data"][lent],
            id:dataPivote[rs]["id"],
            parentId:dataPivote[rs]["parentId"],
            [`${n.name1}total`]:{
              ...dataResult1[title][seg]["data"][lent][`${n.name1}total`],
              //...dataResult[cat][seg][gi][`${n.name1}total`],
              /*[`${n.name1}total`]:data[cat][seg][gi][`${n.name1}total`],
              [`${n.name1}Maximum`]:data[cat][seg][gi][`${n.name1}Acummulatedmaximum`],
              [`${n.name1}Minimum`]:data[cat][seg][gi][`${n.name1}Acummulatedminimum`],
              [`${n.name1}Media`]:data[cat][seg][gi][`${n.name1}Media`],
              [`${n.name1}Median`]:data[cat][seg][gi][`${n.name1}Median`],
              [`%${n.name1}`]:data[cat][seg][gi][`%${n.name1}`],
              [`${n.name1}Count`]:data[cat][seg][gi]?.[`${n.name1}Acummulated`]?.length,
              //[`${n.name1}RawArray`]:[...dataResult[cat][seg][gi][`${n.name1}total`][`${n.name1}RawArray`],...data?.[cat]?.[seg]?.[gi]?.[`${n.name1}Acummulated`]]*/
            }}}
            posi=giInd
          }else{

            posi=giInd
            console.log("tcontui",tablesToCont[cat][seg][posi])
            dataResult1[title][seg]["data"][posi]={
              ...dataResult1[title][seg]["data"][posi],
              //id:dataPivote[rs]["id"],
              //parentId:dataPivote[rs]["parentId"],
              [`${n.name1}total`]:{
                ...dataResult1[title][seg]["data"][posi][`${n.name1}total`],
                //total:0,
                //totalCount:0,
                [`${n.name1}total`]:tablesToCont[cat][seg][posi][`${n.name1}total`],
                [`${n.name1}Maximum`]:tablesToCont[cat][seg][posi][`${n.name1}Acummulatedmaximum`],
                [`${n.name1}Minimum`]:tablesToCont[cat][seg][posi][`${n.name1}Acummulatedminimum`],
                [`${n.name1}Media`]:tablesToCont[cat][seg][posi][`${n.name1}Media`],
                [`${n.name1}Median`]:tablesToCont[cat][seg][posi][`${n.name1}Median`],
                [`%${n.name1}`]:tablesToCont[cat][seg][posi][`%${n.name1}`],
                [`${n.name1}Count`]:tablesToCont[cat][seg][posi][`${n.name1}Acummulated`]?.length,
                
              [`${n.name1}UniqueTotal`]:tablesToCont[cat][seg][posi][`${n.name1}UniqueTotal`],
              [`${n.name1}UniqueMaximum`]:tablesToCont[cat][seg][posi][`${n.name1}AcummulatedUniquemaximum`],
              [`${n.name1}UniqueMinimum`]:tablesToCont[cat][seg][posi][`${n.name1}AcummulatedUniqueminimum`],
              [`${n.name1}UniqueMedia`]:tablesToCont[cat][seg][posi][`${n.name1}MediaUnique`],
              [`${n.name1}UniqueMedian`]:tablesToCont[cat][seg][posi][`${n.name1}MedianUnique`],
              [`%${n.name1}Unique`]:tablesToCont[cat][seg][posi][`%${n.name1}Unique`],
              [`${n.name1}UniqueCount`]:tablesToCont[cat][seg][posi]?.[`${n.name1}UniqueTotalArray`]?.length,
              
              }
            }
          }
          
        //console.log("dataResult45",dataResult1)
        
        
        if(dataResult1?.[title]?.[seg]?.["data"]?.[posi]?.[`${n.name1}total`]?.[ss]==undefined){
          
          dataResult1={...dataResult1,
            [title]:{
              ...dataResult1[title],
              [seg]:{
                ...dataResult1[title][seg],
                data:{
                  ...dataResult1[title][seg]["data"],
                  [posi]:{
                    ...dataResult1[title][seg]["data"][posi],
                    [`${n.name1}total`]:{
                      ...dataResult1[title][seg]["data"][posi][`${n.name1}total`],
                      [ss]:{value:0,arr:[],arrUnique:[],valueUnique:0,arrRawUnique:[],arrUniqueKeys:[],valueRaw:0,valueRawUnique:0,arrPrevKeys:[],
                        [`${n.name1}UniqueTotalArrayGlobal`]:[],
                      realUniqueIndexesGlobal:[]},
                      
                    }
  
                  }
                }
              } 
  
            }
          }
          console.log("dataResult5fijo",dataResult1,cat,seg,ss,posi,`${n.name1}total`)
        }
        let field=n.name1
        calculateContributions({cat,ssData,seg,data,posi,gi:posi,giData:giInd,rs,field,x,ss,order,firstCatNormalFields,otmChoices,
          requireData,dataResult1DataTitle,titulo:title,pivoteTable,toAnalizeTable,dataPivote})
      }
    })
    //console.log("drfijo46",dataResult1)
  
    /*let {vars,cat,seg,gi,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields}=vars1
    console.log("datamain77",data)
    
    
    
    vars.forEach(n=>{
      if(n.type=="number"){
  
        
  
  
        if(dataResult?.[cat]?.[seg]?.[gi]?.[`${n.name1}total`]==undefined)
          dataResult[cat][seg][gi][`${n.name1}total`]={}
          
        dataResult={...dataResult,
          [cat]:{
            ...dataResult[cat],
            [seg]:{
              ...dataResult[cat][seg],
              
              [gi]:{
                ...dataResult[cat][seg][gi],
                [`${n.name1}total`]:{
                  ...dataResult[cat][seg][gi][`${n.name1}total`],
                  [`${n.name1}total`]:data[cat][seg][gi][`${n.name1}total`],
                  [`${n.name1}Maximum`]:data[cat][seg][gi][`${n.name1}Acummulatedmaximum`],
                  [`${n.name1}Minimum`]:data[cat][seg][gi][`${n.name1}Acummulatedminimum`],
                  [`${n.name1}Media`]:data[cat][seg][gi][`${n.name1}Media`],
                  [`${n.name1}Median`]:data[cat][seg][gi][`${n.name1}Median`],
                  [`%${n.name1}`]:data[cat][seg][gi][`%${n.name1}`],
                  [`${n.name1}Count`]:data[cat][seg][gi]?.[`${n.name1}Acummulated`]?.length,
                  //[`${n.name1}RawArray`]:[...dataResult[cat][seg][gi][`${n.name1}total`][`${n.name1}RawArray`],...data?.[cat]?.[seg]?.[gi]?.[`${n.name1}Acummulated`]]
                }
              }
            } 
  
          }
        }
          
        console.log("dataResult4",dataResult)
        
        
        if(dataResult?.[cat]?.[seg]?.[gi]?.[`${n.name1}total`]?.[ss]==undefined){
          
          dataResult={...dataResult,
            [cat]:{
              ...dataResult[cat],
              [seg]:{
                ...dataResult[cat][seg],
                [gi]:{
                  ...dataResult[cat][seg][gi],
                  [`${n.name1}total`]:{
                    ...dataResult[cat][seg][gi][`${n.name1}total`],
                    [ss]:{value:0,arr:[]}
  
                  }
                }
              } 
  
            }
          }
          console.log("dataResult5",dataResult)
        }
        let field=n.name1
        calculateContributions({cat,ssData,seg,dataResult,data,gi,rs,field,x,ss,order,firstCatNormalFields,otmChoices})
      }
    })*/
  
  }
  const createVarsNull=(vars1)=>{
    let {vars,cat,seg,gi,giInd,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields,title,dataPivote}=vars1
    console.log("datamain77",data)
    
    
    
    vars.forEach(n=>{
      if(n.type=="number"){
  
        if(dataResult1[title][seg]["data"]==undefined)
          dataResult1[title][seg]={...dataResult1[title][seg],data:{}}
  
        
          
       /*dataResult={...dataResult,
          [cat]:{
            ...dataResult[cat],
            [seg]:{
              ...dataResult[cat][seg],
              
              /*data:[
                ...dataResult[cat][seg]["data"],
  
                /*[`${n.name1}total`]:{
                  ...dataResult[cat][seg][gi][`${n.name1}total`],
                  [`${n.name1}total`]:data[cat][seg][gi][`${n.name1}total`],
                  [`${n.name1}Maximum`]:data[cat][seg][gi][`${n.name1}Acummulatedmaximum`],
                  [`${n.name1}Minimum`]:data[cat][seg][gi][`${n.name1}Acummulatedminimum`],
                  [`${n.name1}Media`]:data[cat][seg][gi][`${n.name1}Media`],
                  [`${n.name1}Median`]:data[cat][seg][gi][`${n.name1}Median`],
                  [`%${n.name1}`]:data[cat][seg][gi][`%${n.name1}`],
                  [`${n.name1}Count`]:data[cat][seg][gi]?.[`${n.name1}Acummulated`]?.length,
                  //[`${n.name1}RawArray`]:[...dataResult[cat][seg][gi][`${n.name1}total`][`${n.name1}RawArray`],...data?.[cat]?.[seg]?.[gi]?.[`${n.name1}Acummulated`]]
                }
              ]
            } 
  
          }
        }*/
        let posi=-1
        Object.keys(dataResult1[title][seg]["data"])?.forEach((x,ind)=>{
          if(dataResult1[title][seg]["data"][x].id==data[cat][seg][gi].id)
            posi=ind
          
        })
        let lent=Object.keys(dataResult1[title][seg]["data"]).length-1
        /*if(dataResult[cat][seg]["data"][posi][`${n.name1}total`]==undefined)
          dataResult[cat][seg]["data"][posi]={...dataResult[cat][seg]["data"][posi],[`${n.name1}total`]:{}}*/
          posi=giInd
        if(posi==-1){
          dataResult1[title][seg]["data"]={...dataResult1[title][seg]["data"],
          [lent]:{
            ...dataResult1[title][seg]["data"][lent],
            id:data[cat][seg][gi]["id"],
            [`${n.name1}total`]:{
              ...dataResult1[title][seg]["data"][lent][`${n.name1}total`],
              //...dataResult[cat][seg][gi][`${n.name1}total`],
              /*[`${n.name1}total`]:data[cat][seg][gi][`${n.name1}total`],
              [`${n.name1}Maximum`]:data[cat][seg][gi][`${n.name1}Acummulatedmaximum`],
              [`${n.name1}Minimum`]:data[cat][seg][gi][`${n.name1}Acummulatedminimum`],
              [`${n.name1}Media`]:data[cat][seg][gi][`${n.name1}Media`],
              [`${n.name1}Median`]:data[cat][seg][gi][`${n.name1}Median`],
              [`%${n.name1}`]:data[cat][seg][gi][`%${n.name1}`],
              [`${n.name1}Count`]:data[cat][seg][gi]?.[`${n.name1}Acummulated`]?.length,*/
              //[`${n.name1}RawArray`]:[...dataResult[cat][seg][gi][`${n.name1}total`][`${n.name1}RawArray`],...data?.[cat]?.[seg]?.[gi]?.[`${n.name1}Acummulated`]]
            }}}
            posi=lent
          }else{
            dataResult1[title][seg]["data"][posi]={
              ...dataResult1[title][seg]["data"][posi],
              //id:dataPivote[rs]["id"],
              //parentId:dataPivote[rs]["parentId"],
              [`${n.name1}total`]:{
                ...dataResult1[title][seg]["data"][posi][`${n.name1}total`],
                /*[`${n.name1}total`]:data[cat][seg][gi][`${n.name1}total`],
                [`${n.name1}Maximum`]:data[cat][seg][gi][`${n.name1}Acummulatedmaximum`],
                [`${n.name1}Minimum`]:data[cat][seg][gi][`${n.name1}Acummulatedminimum`],
                [`${n.name1}Media`]:data[cat][seg][gi][`${n.name1}Media`],
                [`${n.name1}Median`]:data[cat][seg][gi][`${n.name1}Median`],
                [`%${n.name1}`]:data[cat][seg][gi][`%${n.name1}`],
                [`${n.name1}Count`]:data[cat][seg][gi]?.[`${n.name1}Acummulated`]?.length,*/
              }
            }
          }
          
        console.log("dataResult4",dataResult1)
        
        
        if(dataResult1?.[title]?.[seg]?.["data"]?.[posi]?.[`${n.name1}total`]?.[ss]==undefined){
          
          dataResult1={...dataResult1,
            [title]:{
              ...dataResult1[title],
              [seg]:{
                ...dataResult1[title][seg],
                data:{
                  ...dataResult1[title][seg]["data"],
                  [posi]:{
                    ...dataResult1[title][seg]["data"][posi],
                    [`${n.name1}total`]:{
                      ...dataResult1[title][seg]["data"][posi][`${n.name1}total`],
                      [ss]:{value:0,arr:[],arrRaw:[],valueUnique:0,arrUnique:[],arrRawUnique:[],arrUniqueKeys:[],valueRaw:0,valueRawUnique:0,arrPrevKeys:[],
                        [`${n.name1}UniqueTotalArrayGlobal`]:[],
                      realUniqueIndexesGlobal:[]}
                    }
  
                  }
                }
              } 
  
            }
          }
          console.log("dataResult5",dataResult1)
        }
        let field=n.name1
        calculateContributionsNull({title,cat,seg,data,gi:posi,giData:gi,rs,field,x,ss,order,firstCatNormalFields,otmChoices,dataPivote})
      }
    })
  }
  

  const initializeVarsAndSubsets=(vars)=>{
    let {title,cat,ssData,seg,data,otmChoices,x,ss,order,firstCatNormalFields,
    pivoteTable,toAnalizeTable,tableToDefine,requireData,dataResult1DataTitle}=vars

    if(printRaw[title]==undefined)
     printRaw={...printRaw,[title]:{}}
    if(printRaw[title][seg]==undefined)
      printRaw={...printRaw,[title]:{...printRaw[title],[seg]:getIfPrintRaws({otmChoices,firstCatNormalFields,cat:pivoteTable,seg})}}
  

   
    let dataPivote=requireData?data[pivoteTable][seg]["data"]:dataResult1[dataResult1DataTitle][seg]["data"]
    /*if(printRaw[title][seg]==undefined)
      printRaw={...printRaw,[title]:{...printRaw[title],[seg]:getIfPrintRaws({otmChoices,firstCatNormalFields,title,seg})}}
      */
    //  console.log("tabledefine",tableToDefine,data[pivoteTable][seg]["data"],data[pivoteTable][pivoteTable],data[tableToDefine][tableToDefine],pivoteTable,seg,cat)
    if(pivoteTable!=seg){
      if(Object.keys(dataPivote).length>0){//Object.keys(data[pivoteTable][seg]["data"]).length>0){
        //Object.keys(data[pivoteTable][seg]["data"]).forEach((rs,ind1)=>{
        Object.keys(dataPivote).forEach((rs,ind1)=>{
      
          Object.keys(dataResult1[title][seg]["data"]).forEach((gi,ind)=>{
              createVars({vars:otmChoices[seg].normal,cat,seg,gi,giInd:ind,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields,tableToDefine,title,pivoteTable,toAnalizeTable,requireData,dataResult1DataTitle,dataPivote}) 
              createVars({vars:otmChoices[seg].compositeFields,cat,seg,gi,giInd:ind,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields,tableToDefine,title,pivoteTable,toAnalizeTable,requireData,dataResult1DataTitle,dataPivote})
          })
        })
      }else{
        Object.keys(dataResult1[title][seg]).forEach((gi,ind)=>{
          createVarsNull({vars:otmChoices[seg].normal,cat,seg,gi,giInd:ind,x,ss,ssData,data,order,otmChoices,firstCatNormalFields,title,pivoteTable,toAnalizeTable}) 
          createVarsNull({vars:otmChoices[seg].compositeFields,cat,seg,gi,giInd:ind,x,ss,ssData,data,order,otmChoices,firstCatNormalFields,title,pivoteTable,toAnalizeTable})
        })
      }
    }
   //console.log("drfijo46",dataResult1)
    
  }

  const initializeSegAndInd=(vars)=>{
    let {title,cat,seg,data,x,order,pivoteTable,toAnalizeTable}=vars
    //let title=`${cat}_${toAnalizeTable}`
    if(dataResult1?.[title]?.[seg]==undefined){
      dataResult1={
        ...dataResult1,
        [title]:{
          ...dataResult1[title],
          [seg]:{
            ...dataResult1[title][seg],
            data:{
  
            }
          }
        }
      }  
    }
  
    Object.keys(data[cat][cat]).forEach((gi,index)=>{
      //if(dataResult?.[cat]?.[seg]?.[gi]==undefined){
        dataResult1={
          ...dataResult1,
          [title]:{
            ...dataResult1[title],
            [seg]:{
              ...dataResult1[title][seg],
              data:{
                ...dataResult1[title][seg]["data"],
                [index]:{
                  ...dataResult1[title][seg]["data"][index],
                  id:data[cat][cat][gi].id,
                  parentId:data[cat][cat][gi]["parentId"],
                  
                }
              }
              
            }
  
          }
        }
    
      }
    )
    
  console.log("dataresult11",dataResult1)
  }
  

  const doImmediateSonsMath=(vars)=>{
    let {
      /*subsets,
      subsetsData,
      data,*/
      categories,
      toAnalizeTable,
      pivoteTable,
      mainTable,
      tableToDefine,
      requireData,
      dataResult1DataTitle
      /*cat,
      otmChoices,
      order,
      firstCatNormalFields*/
    }=vars
    //console.log("catssubsets",categories,subsets,pivoteTable,mainTable,toAnalizeTable)
    let otmmtm=[...otmChoices[pivoteTable].otm,...otmChoices[pivoteTable].mtm]
    otmmtm.forEach((x)=>{
     //console.log("tabletodefinesubsets",pivoteTable,mainTable,data[pivoteTable],toAnalizeTable,subsets[toAnalizeTable])
      //if(subsets[toAnalizeTable]!=undefined){
        if(subsets[x]!=undefined){
          Object.keys(subsetsData[x]).forEach(ss=>{
           // console.log("ssalarm",ss)
            let ssData=subsetsData[x][ss]
            let title=`${mainTable}_${toAnalizeTable}`
            Object.keys(ssData).forEach(seg=>{
              initializeSegAndInd({title,cat:mainTable,seg,data,order,pivoteTable,toAnalizeTable,tableToDefine,requireData,dataResult1DataTitle})
              initializeVarsAndSubsets({title,cat:mainTable,ssData,seg,data,otmChoices,x,ss,order,firstCatNormalFields,pivoteTable,toAnalizeTable,tableToDefine,requireData,dataResult1DataTitle})
            })
          })
        }

      /*  Object.keys(data[pivoteTable]).forEach(ss=>{
            console.log("datapivotet",data[pivoteTable][x])
          let ssData=subsetsData[tabletoAnalize]
          
          //console.log("ssalarmjj",ss,x,pivoteTable,ssData,mainTable,data)
         ///Object.keys(ssData[pivoteTable]).forEach(seg=>{
            if(pivoteTable!=x && typeof data[pivoteTable][x][ss]=="object"){
            let title=`${mainTable}_${toAnalizeTable}`
            initializeSegAndInd({title,cat:mainTable,seg:x,data,order,pivoteTable,toAnalizeTable})
            initializeVarsAndSubsets({title,cat:mainTable,seg:x,data,otmChoices,ss,order,firstCatNormalFields,pivoteTable,toAnalizeTable,
            tableToDefine})
            }
          //})
        })
      }*/
    
    }) 
    //console.log("dr1",dataResult1) 
  }

  const loadMainData=({
    //subsetsData,
    //subsets,
    mainTable,
    toAnalizeTable,
    otmChoices,
    firstCatNormalFields,
    //order,
    getTableToSort
  })=>{
    //printRaw={}
   // console.log("maindata")
  
   //console.log("datamain",data,subsets,subsetsData)
    //dataResult={}
        let titulo=`${mainTable}_${toAnalizeTable}`
        if(dataResult1[titulo]==undefined)
          dataResult1={...dataResult1,[titulo]:{}}
        if(dataResult1[titulo][mainTable]==undefined){
          dataResult1={...dataResult1,[titulo]:{...dataResult1[titulo],[mainTable]:{}}}
          loadNormalFields({cat:mainTable,data,order,titulo})
        }
      
    
     /*console.log("dataAllresult",dataAllResult)
        if(data[cat]!=undefined){
          if(cat.startsWith("getData")){
            doImmediateSonsMath({
              categories:[...firstCatNormalFields[cat].otm,...firstCatNormalFields[cat].mtm],
              //data,
              //subsetsData,
              //subsets,
              //dataResult,
              //cat,
              //otmChoices,
              //order,
              //firstCatNormalFields
            })
          }else{
            doImmediateSonsMath({
              categories:[...otmChoices[cat].otm,...otmChoices[cat].mtm],
              
            })
          }
        }
      })*/
     /*initiateStatistics(otmChoices)
      calculateGrandTotals(otmChoices)
      calculateGrandTotalsStatistics(otmChoices,order,subsets,firstCatNormalFields)
      calculatePercentageByGrandTotalsAndInRow(otmChoices,data)
    }
    console.log("dataResult",dataResult,printRaw,grandTotals)
    return [dataResult,printRaw,grandTotals]
  */
  }

  const initializeVars=()=>{

  }

  const calcSubsetVariables=(key,subsets,toAnalizeTable,segment,dataSegment)=>{
    let fieldsNormal=otmChoices[segment].normal.filter(x=>x.type=="number")
    let fieldsComposite=otmChoices[segment].composite.filter(x=>x.type=="number")
    let totalFields=[...fieldsNormal,...fieldsComposite]
    
    initializeVars(key,dataSegment,totalFields)
    

  }

 /*const initializeVariablesSubsets=(dataMainTable,mainTable,route,dataToAnalizeTable,toAnalizeTable)=>{
    let pivote=route[1]
    let recordsToAnalize=[]
    
     
      if(Object.keys(dataToAnalizeTable[seg]).length>0){
        Object.keys(ssData[seg]).forEach((rs,ind1)=>{
    
          Object.keys(data[cat][seg]).forEach((gi,ind)=>{
              createVars({vars:otmChoices[seg].normal,cat,seg,gi,giInd:ind,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields}) 
              createVars({vars:otmChoices[seg].compositeFields,cat,seg,gi,giInd:ind,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields})
          })
        })
      }else{
        Object.keys(data[cat][seg]).forEach((gi,ind)=>{
          createVarsNull({vars:otmChoices[seg].normal,cat,seg,gi,giInd:ind,x,ss,ssData,data,order,otmChoices,firstCatNormalFields}) 
          createVarsNull({vars:otmChoices[seg].compositeFields,cat,seg,gi,giInd:ind,x,ss,ssData,data,order,otmChoices,firstCatNormalFields})
        })
      }
      
      for(let j=0;j<Object.keys(data[pivote]).length;j++){
        if(Object.keys(data[pivote])[j]!=pivote){
          console.log("nonouij",data,data[pivote],pivote,Object.keys(data[pivote])[j])
          recordsToAnalize=Object.keys(data[pivote][Object.keys(data[pivote])[j]]["data"]).map(p=>{
            console.log("keyskeys",data[pivote][pivote][p].id,rec.id)
            if(data[pivote][pivote][p]["parentId"]==rec.id)
              return data[pivote][Object.keys(data[pivote])[j]]["data"][p]
            else
            return ""
          }).filter(o=>o!="")
          console.log("subsetspoiuy",subsets[toAnalizeTable],pivote,mainTable,recordsToAnalize,rec.id)
          if(subsets[pivote]!=undefined){
            for(let ss=0;ss<Object.keys(subsets[pivote]).length;ss++)
              calcSubsetVariables(rec.keys?.[i],subsets[pivote][ss],toAnalizeTable,Object.keys(data[pivote])[j],recordsToAnalize)
          }
            
        }
      }
      
    


  }*/
  const createSubsetMain=(mainTable,toAnalizeTable,route)=>{
    let pivoteTable=route[route.length-2]
    beforeCategories={...beforeCategories,[route[route.length-1]]:route[route.length-2]}
    //console.log("maintable",mainTable,toAnalizeTable,route,pivoteTable,data)
    loadMainData({mainTable,toAnalizeTable})
    if(Object.keys(data[pivoteTable]).length>=2){
      if(toAnalizeTable.startsWith("getData")){
        doImmediateSonsMath({
          categories:[...firstCatNormalFields[toAnalizeTable].otm,...firstCatNormalFields[toAnalizeTable].mtm],
          pivoteTable,
          tableToDefine:route[route.length-3],
          mainTable,
          toAnalizeTable,
          
          //data,
          //subsetsData,
          //subsets,
          //dataResult,
          //cat,
          //otmChoices,
          //order,
          //firstCatNormalFields
        })
      }else{
        let isNextToLast=pivoteTable==route[1]
        let dataResult1DataTitle=""
        
        if(!isNextToLast)
          dataResult1DataTitle=`${route[1]}_${toAnalizeTable}`
        //console.log("routeposi",dataResult1DataTitle,route,isNextToLast,mainTable,pivoteTable,toAnalizeTable)
       
        doImmediateSonsMath({
          categories:[...otmChoices[pivoteTable].otm,...otmChoices[pivoteTable].mtm],
          pivoteTable,
          toAnalizeTable,
          mainTable,
          tableToDefine:route[route.length-3],
          requireData:isNextToLast,
          dataResult1DataTitle
          
        })
      }
    }
    //for(let j=0;j<Object.keys(data[mainTable][mainTable]).length;j++){
      //initializeVariablesSubsets(data[mainTable][mainTable][j],mainTable,route,toAnalizeTable)
    //}
    //initializeVariablesSubsets(data[mainTable][mainTable],mainTable,route,data[toAnalizeTable],toAnalizeTable)

  }
  const calRoute=(table,begin,end)=>{
    let route=[]
    for(let o=begin;o<=end;o++)
      route.push(table[o])
   //console.log("routecalc",route)
    return route
  }

  const beginContributions=(tables)=>{
    let startIndex=0
    
    for(let j=tables.length-1;j>=0;j--){
      startIndex=j-2
      for(let i=startIndex;i>=0;i--){
       // console.log("tablarespectiva80",tables[i],tables[j])
        
        createSubsetMain(tables[i],tables[j],calRoute(tables,i,j))

      }
    }
   console.log("tabla18010",dataResult1)
    
  }

  const calculateStatistics=(arr,ivar)=>{
    let res={}
    res["min"]=0
    res["max"]=0
    res["media"]=0
    res["median"]=0
    res["totalCount"]=0
    res["total"]=0
    if(arr?.length>0){
      arr=arr.map(x=>{
        if(x==undefined || x==null)
          return 0
        return x
      })
      arr=arr.sort((x,y)=>x>y?1:-1)
      res["min"]=arr[0]==null?0:arr[0]
      res["max"]=arr[arr.length-1]==null?0:arr[arr.length-1]
      let suma=0
      arr.forEach(y=>{
        if(y!=undefined)
          suma+=y
      })
      res["media"]=suma/arr.length
      let length=arr.length
      let median=0
      if(length%2==1){
        median=arr[Math.floor(length/2)]
        if(median==undefined || median==null)
          median=0
      }else{
        let op1,op2
        if(arr[(length/2)-1]==undefined)
          op1=0
        else
          op1=arr[(length/2)-1]
        if(arr[(length/2)]==undefined)
          op2=0
        else
          op2=arr[(length/2)]
        median=(op1+op2)/2
        if(isNaN(median))
          median=0
      }
      res["median"]=median
      res["totalCount"]=arr.length
      res["total"]=suma
      return res
    }
    return res
  }

  /*const calculateStatisticsRaw=(arr,ivar)=>{
    let res={}
    res["minRaw"]=0
    res["maxRaw"]=0
    res["mediaRaw"]=0
    res["medianRaw"]=0
    res["totalCountRaw"]=0
    res["totalRaw"]=0
    if(arr?.length>0){
      arr=arr.map(x=>{
        if(x==undefined || x==null)
          return 0
        return x
      })
      arr=arr.sort((x,y)=>x>y?1:-1)
      res["minRaw"]=arr[0]==null?0:arr[0]
      res["maxRaw"]=arr[arr.length-1]==null?0:arr[arr.length-1]
      let suma=0
      arr.forEach(y=>{
        if(y!=undefined)
          suma+=y
      })
      res["mediaRaw"]=suma/arr.length
      let length=arr.length
      let median=0
      if(length%2==1){
        median=arr[Math.floor(length/2)]
        if(median==undefined || median==null)
          median=0
      }else{
        let op1,op2
        if(arr[(length/2)-1]==undefined)
          op1=0
        else
          op1=arr[(length/2)-1]
        if(arr[(length/2)]==undefined)
          op2=0
        else
          op2=arr[(length/2)]
        median=(op1+op2)/2
        if(isNaN(median))
          median=0
      }
      res["medianRaw"]=median
      res["totalCountRaw"]=arr.length
      res["totalRaw"]=suma
      return res
    }
    return res
  }*/

  const calculateStatisticsUnique=(arr,ivar)=>{
    let res={}
    res["minUnique"]=0
    res["maxUnique"]=0
    res["mediaUnique"]=0
    res["medianUnique"]=0
    res["totalCountUnique"]=0
    res["totalUnique"]=0
    if(arr?.length>0){
      arr=arr.map(x=>{
        if(x==undefined || x==null)
          return 0
        return x
      })
      arr=arr.sort((x,y)=>x>y?1:-1)
      res["minUnique"]=arr[0]==null?0:arr[0]
      res["maxUnique"]=arr[arr.length-1]==null?0:arr[arr.length-1]
      let suma=0
      arr.forEach(y=>{
        if(y!=undefined)
          suma+=y
      })
      res["mediaUnique"]=suma/arr.length
      let length=arr.length
      let median=0
      if(length%2==1){
        median=arr[Math.floor(length/2)]
        if(median==undefined || median==null)
          median=0
      }else{
        let op1,op2
        if(arr[(length/2)-1]==undefined)
          op1=0
        else
          op1=arr[(length/2)-1]
        if(arr[(length/2)]==undefined)
          op2=0
        else
          op2=arr[(length/2)]
        median=(op1+op2)/2
        if(isNaN(median))
          median=0
      }
      res["medianUnique"]=median
      res["totalCountUnique"]=arr.length
      res["totalUnique"]=suma
      return res
    }
    return res
  }

  const calculateStatisticsRawUnique=(arr,ivar)=>{
    let res={}
    res["minRawUnique"]=0
    res["maxRawUnique"]=0
    res["mediaRawUnique"]=0
    res["medianRawUnique"]=0
    res["totalCountRawUnique"]=0
    res["totalRawUnique"]=0
    if(arr?.length>0){
      arr=arr.map(x=>{
        if(x==undefined || x==null)
          return 0
        return x
      })
      arr=arr.sort((x,y)=>x>y?1:-1)
      res["minRawUnique"]=arr[0]==null?0:arr[0]
      res["maxRawUnique"]=arr[arr.length-1]==null?0:arr[arr.length-1]
      let suma=0
      arr.forEach(y=>{
        if(y!=undefined)
          suma+=y
      })
      res["mediaRawUnique"]=suma/arr.length
      let length=arr.length
      let median=0
      if(length%2==1){
        median=arr[Math.floor(length/2)]
        if(median==undefined || median==null)
          median=0
      }else{
        let op1,op2
        if(arr[(length/2)-1]==undefined)
          op1=0
        else
          op1=arr[(length/2)-1]
        if(arr[(length/2)]==undefined)
          op2=0
        else
          op2=arr[(length/2)]
        median=(op1+op2)/2
        if(isNaN(median))
          median=0
      }
      res["medianRawUnique"]=median
      res["totalCountRawUnique"]=arr.length
      res["totalRawUnique"]=suma
      return res
    }
    return res
  }
  const calculateStatisticsRaw=(arr,ivar)=>{
    let res={}
    res["minRaw"]=0
    res["maxRaw"]=0
    res["mediaRaw"]=0
    res["medianRaw"]=0
    res["totalCountRaw"]=0
    res["totalRaw"]=0
    if(arr?.length>0){
      arr=arr.sort((x,y)=>x>y?1:-1)
      arr=arr.map(x=>(x==undefined || x==null)?0:x)
      res["minRaw"]=arr[0]==null?0:arr[0]
      res["maxRaw"]=arr[arr.length-1]==null?0:arr[arr.length-1]
      let suma=0
      arr.forEach(y=>suma+=y)
      res["mediaRaw"]=suma/arr.length
      let length=arr.length
      let median=0
      if(length%2==1){
        if(arr[Math.floor(length/2)]==undefined ||
          arr[Math.floor(length/2)]==null)
          median=0
        else{
          median=arr[Math.floor(length/2)]
        }
      }else{
        if(arr[Math.floor(length/2)-1]==undefined ||
          arr[Math.floor(length/2)-1]==null)
          arr[Math.floor(length/2)-1]=0
        if(arr[Math.floor(length/2)]==undefined ||
          arr[Math.floor(length/2)]==null)
          arr[Math.floor(length/2)]=0
        
        median=(arr[(length/2)-1]+arr[(length/2)])/2
        if(isNaN(median))
          median=0
      }
      res["medianRaw"]=median
      res["totalCountRaw"]=arr.length
      res["totalRaw"]=suma
      return res
    }
    return res
  }

  /*const calculateStatisticsRawUnique=(arr,ivar)=>{
    let res={}
    res["minRawUnique"]=0
    res["maxRawUnique"]=0
    res["mediaRawUnique"]=0
    res["medianRawUnique"]=0
    res["totalCountRawUnique"]=0
    res["totalRawUnique"]=0
    if(arr?.length>0){
      arr=arr.sort((x,y)=>x>y?1:-1)
      arr=arr.map(x=>(x==undefined || x==null)?0:x)
      res["minRawUnique"]=arr[0]==null?0:arr[0]
      res["maxRawUnique"]=arr[arr.length-1]==null?0:arr[arr.length-1]
      let suma=0
      arr.forEach(y=>suma+=y)
      res["mediaRawUnique"]=suma/arr.length
      let length=arr.length
      let median=0
      if(length%2==1){
        if(arr[Math.floor(length/2)]==undefined ||
          arr[Math.floor(length/2)]==null)
          median=0
        else{
          median=arr[Math.floor(length/2)]
        }
      }else{
        if(arr[Math.floor(length/2)-1]==undefined ||
          arr[Math.floor(length/2)-1]==null)
          arr[Math.floor(length/2)-1]=0
        if(arr[Math.floor(length/2)]==undefined ||
          arr[Math.floor(length/2)]==null)
          arr[Math.floor(length/2)]=0
        
        median=(arr[(length/2)-1]+arr[(length/2)])/2
        if(isNaN(median))
          median=0
      }
      res["medianRawUnique"]=median
      res["totalCountRawUnique"]=arr.length
      res["totalRawUnique"]=suma
      return res
    }
    return res
  }*/
  const initiateStatistics=(otmChoices)=>{
    
    Object.keys(dataResult1).forEach(cat=>{
      Object.keys(dataResult1[cat]).forEach(seg=>{
        let catReal=cat.split("_")[0]
        if(catReal!==seg){
          //console.log("dresult",dataResult1[cat][seg],cat,seg)
          Object.keys(dataResult1[cat][seg]["data"]).forEach(ind=>{
            //if(cat!=seg){
            let arr=[]
            //console.log("checarpipo",dataResult[cat][seg],ind)
            if(dataResult1[cat][seg]["data"][ind]!=undefined){
              
              otmChoices[seg].normal.forEach(field=>{
                if(field.type=="number"){
                  if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]!=undefined){
                    Object.keys(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]).forEach(sg=>{
                      if(sg!==`${field.name1}total` && 
                      sg!==`${field.name1}Media`
                      && sg!==`${field.name1}Median`
                      && sg!==`${field.name1}Maximum`
                      && sg!==`${field.name1}Minimum`
                      && sg!==`%${field.name1}`
                      && sg!==`${field.name1}Count`
                      && sg!==`${field.name1}UniqueTotal`  
                    && sg!==`${field.name1}UniqueMedia`
                    && sg!==`${field.name1}UniqueMedian`
                    && sg!==`${field.name1}UniqueMaximum`
                    && sg!==`${field.name1}UniqueMinimum`
                    && sg!==`%${field.name1}Unique`
                    && sg!==`${field.name1}UniqueCount`){
                        dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg]={
                          ...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg],
                          
                          ...calculateStatistics(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["arr"],dataResult1?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]),
                          ...calculateStatisticsRaw(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.[`${field.name1}RawArray`]),

                          ...calculateStatisticsUnique(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["arrUnique"],dataResult1?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]),
                          ...calculateStatisticsRawUnique(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.[`${field.name1}UniqueRawArray`])
  
                        }
                        
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRow"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRow"]=0
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["arrRow"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRow"]=[]
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRowCount"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowCount"]=0

                          if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRawRow"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRow"]=0
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["arrRawRow"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRow"]=[]
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRawRowCount"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowCount"]=0

                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRowUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowUnique"]=0
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["arrRowUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRowUnique"]=[]
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRowCountUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowCountUnique"]=0

                          if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRawRowUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowUnique"]=0
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["arrRawRowUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRowUnique"]=[]
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRawRowCountUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowCountUnique"]=0
                        
                        let val
                        let val1
                        if(dataResult1[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["value"]!=undefined){  
                          val=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["value"]
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRow"]+=val
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowCount"]+=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["arr"].length
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRow"]=[...dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRow"],...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg]["arr"/*`${field.name1}RawArray`*/]/*val*/]
                        }
                        if(dataResult1[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["valueRaw"]!=undefined){  
                          //`${field}RawArray`
                          val=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["valueRaw"]
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRow"]+=val
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowCount"]+=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg][`${field.name1}RawArray`].length
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRow"]=[...dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRow"],...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg][`${field.name1}RawArray`]/*val*/]
                        }

                        if(dataResult1[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["valueUnique"]!=undefined){  
                          val1=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["valueUnique"]
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowUnique"]+=val1
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowCountUnique"]+=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["arrUnique"].length
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRowUnique"]=[...dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRowUnique"],...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg][`arrUnique`]]
                        }

                        if(dataResult1[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["valueRawUnique"]!=undefined){  
                          val1=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["valueRawUnique"]
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowUnique"]+=val1
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowCountUnique"]+=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg][`${field.name1}UniqueRawArray`].length/*`${field.name1}UniqueRawArray`].length*/
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRowUnique"]=[...dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRowUnique"],...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg][`${field.name1}UniqueRawArray`/*val1*/]]
                        }
                      }
                    })
                  }
                }
                
                
                
              })
              otmChoices[seg].normal.forEach(field=>{
                
                if(field.type=="number"){
                  dataResult1[cat][seg]["data"][ind][`${field.name1}total`]={
                    ...dataResult1[cat][seg]["data"][ind][`${field.name1}total`],
                    
                    ...calculateStatistics(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.["arrRow"]),//,dataResult[cat][seg][ind][`${field.name1}total`][sg])

                    ...calculateStatisticsUnique(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.["arrRowUnique"]),//,dataResult[cat][seg][ind][`${field.name1}total`][sg])

                    ...calculateStatisticsRaw(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.["arrRawRow"]),
                    ...calculateStatisticsRawUnique(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.["arrRawRowUnique"]),


                    
                  }
                }
              })
              otmChoices[seg].compositeFields.forEach(field=>{
                if(field.type=="number"){
                  if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]!=undefined){
                    Object.keys(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]).forEach(sg=>{
                      if(sg!==`${field.name1}total` && 
                      sg!==`${field.name1}Media`
                      && sg!==`${field.name1}Median`
                      && sg!==`${field.name1}Maximum`
                      && sg!==`${field.name1}Minimum`
                      && sg!==`%${field.name1}`
                      && sg!==`${field.name1}Count`
                      && sg!==`${field.name1}UniqueTotal`  
                      && sg!==`${field.name1}UniqueMedia`
                      && sg!==`${field.name1}UniqueMedian`
                      && sg!==`${field.name1}UniqueMaximum`
                      && sg!==`${field.name1}UniqueMinimum`
                      && sg!==`%${field.name1}Unique`
                      && sg!==`${field.name1}UniqueCount`){
                        dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg]={
                          ...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg],
                          
                          ...calculateStatistics(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["arr"],dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]),
                          ...calculateStatisticsRaw(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.[`${field.name1}RawArray`]),

                          ...calculateStatisticsUnique(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["arrUnique"],dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]),
                          ...calculateStatisticsRawUnique(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.[`${field.name1}UniqueRawArray`])
                        }
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRow"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRow"]=0
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["arrRow"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRow"]=[]
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRowCount"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowCount"]=0

                          if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRawRow"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRow"]=0
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["arrRawRow"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRow"]=[]
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRawRowCount"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowCount"]=0

                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRowUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowUnique"]=0
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["arrRowUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRowUnique"]=[]
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRowCountUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowCountUnique"]=0

                          if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRawRowUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowUnique"]=0
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["arrRawRowUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRowUnique"]=[]
                        if(dataResult1[cat][seg]["data"][ind][`${field.name1}total`]?.["totalRawRowCountUnique"]==undefined)
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowCountUnique"]=0
                        
                        let val
                        let val1
                        if(dataResult1[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["value"]!=undefined){  
                          val=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["value"]
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRow"]+=val
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowCount"]+=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["arr"].length
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRow"]=[...dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRow"],...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg]["arr"/*`${field.name1}RawArray`*/]/*val*/]
                        }
                        if(dataResult1[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["valueRaw"]!=undefined){  
                          //`${field}RawArray`
                          val=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["valueRaw"]
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRow"]+=val
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowCount"]+=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg][`${field.name1}RawArray`].length
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRow"]=[...dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRow"],...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg][`${field.name1}RawArray`]/*val*/]
                        }

                        if(dataResult1[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["valueUnique"]!=undefined){  
                          val1=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["valueUnique"]
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowUnique"]+=val1
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRowCountUnique"]+=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg][`arrUnique`].length
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRowUnique"]=[...dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRowUnique"],...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg][`arrUnique`]]
                        }

                        if(dataResult1[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.[sg]?.["valueRawUnique"]!=undefined){  
                          val1=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg]["valueRawUnique"]
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowUnique"]+=val1
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["totalRawRowCountUnique"]+=dataResult1[cat][seg]?.["data"]?.[ind][`${field.name1}total`][sg][`${field.name1}UniqueRawArray`].length/*`${field.name1}UniqueRawArray`].length*/
                          dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRowUnique"]=[...dataResult1[cat][seg]["data"][ind][`${field.name1}total`]["arrRawRowUnique"],...dataResult1[cat][seg]["data"][ind][`${field.name1}total`][sg][`${field.name1}UniqueRawArray`/*val1*/]]
                        }
                      }
                    })
                  }
                }
                
                
                
              })
              otmChoices[seg].compositeFields.forEach(field=>{
                if(field.type=="number"){
                  dataResult1[cat][seg]["data"][ind][`${field.name1}total`]={
                    ...dataResult1[cat][seg]["data"][ind][`${field.name1}total`],
                    
                    ...calculateStatistics(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.["arrRow"]),

                    ...calculateStatisticsUnique(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.["arrRowUnique"]),

                    ...calculateStatisticsRaw(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.["arrRawRow"]),
                    ...calculateStatisticsRawUnique(dataResult1?.[cat]?.[seg]?.["data"]?.[ind]?.[`${field.name1}total`]?.["arrRawRowUnique"]),
                  }
                }
              })
            }
            
          })
        }
      })
    })
    //console.log("datareswithstats",dataResult)
  }

  const calculateGrandTotals=(otmChoices)=>{
    grandTotals={}
    Object.keys(dataResult1).forEach(mainCat=>{
      if(grandTotals[mainCat]==undefined)
        grandTotals={...grandTotals,[mainCat]:{}}
      
      Object.keys(dataResult1[mainCat]).forEach(seg=>{
        let mainCatReal=mainCat.split("_")[0]
        if(mainCatReal!==seg){
          if(grandTotals[mainCat][seg]==undefined)
            grandTotals={
              ...grandTotals,
              [mainCat]:{
                ...grandTotals[mainCat],
                [seg]:{}
              }
            }
          Object.keys(dataResult1[mainCat][seg]["data"]).forEach(reg=>{
            otmChoices[seg].normal.forEach(field=>{
              if(field.type=="number"){
                console.log("piv66",dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`])
                if(grandTotals[mainCat][seg][`${field.name1}total`]==undefined)
                  grandTotals={
                    ...grandTotals,
                    [mainCat]:{
                      ...grandTotals[mainCat],
                      [seg]:{
                        ...grandTotals[mainCat][seg],
                        [`${field.name1}total`]:{
                          ["superSetArray"]:[],
                          ["superSetCountArray"]:[],
                          ["subsetsArray"]:[],
                          ["subsetsCountArray"]:[]
                        }
                      }
                    }
                  } 
                  grandTotals={
                    ...grandTotals,
                    [mainCat]:{
                      ...grandTotals[mainCat],
                      [seg]:{
                        ...grandTotals[mainCat][seg],
                        [`${field.name1}total`]:{
  
                          ...grandTotals[mainCat][seg][`${field.name1}total`],
                          [`superSetArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`superSetArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][`${field.name1}total`]],
                            superSetCountArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`superSetCountArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][`${field.name1}Count`]],
                            subsetsArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`subsetsArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][`totalRow`]],
                            subsetsCountArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`subsetsCountArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`]["totalRowCount"]],
                        }
                      }
                    }
                  }
                     
                Object.keys(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`]).forEach(sg=>{
                  if(typeof dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]=="object" &&
                  sg!=="arrRow" && sg!="arrRowUnique" && sg!="arrRawRow" && sg!="arrRawRowUnique"){// && sg!="totalUnique" && sg!="totalRowUnique"){
                    console.log("segforone",sg)
                    if(grandTotals[mainCat][seg][`${field.name1}total`][sg]==undefined)
                      grandTotals={
                        ...grandTotals,
                        [mainCat]:{
                          ...grandTotals[mainCat],
                          [seg]:{
                            ...grandTotals[mainCat][seg],
                            [`${field.name1}total`]:{
                              ...grandTotals[mainCat][seg][`${field.name1}total`],
                              [sg]:0,
                              [`${sg}Array`]:[],
                              [`${sg}CountArray`]:[],
                              [`${sg}RawArray`]:[],
                              [`${sg}RawCountArray`]:[]
                              
                            }
                          }
                        }
                      }
                      let sumTotalRaw=0
                      let sumCountRaw=0
                      console.log("pivfijo11",`${field.name1}RawArray`,dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`])
                      console.log("piv66",dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`],sg,field.name1)
                      console.log("datafocus",dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg])
                      dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`${field.name1}RawArray`].forEach(p=>{
                        sumTotalRaw+=p
                        sumCountRaw=dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`${field.name1}RawArray`].length
                      })
                    grandTotals={
                      ...grandTotals,
                      [mainCat]:{
                        ...grandTotals[mainCat],
                        [seg]:{
                          ...grandTotals[mainCat][seg],
                          [`${field.name1}total`]:{
                            ...grandTotals[mainCat][seg][`${field.name1}total`],
                            [sg]:grandTotals[mainCat][seg][`${field.name1}total`][sg]+dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"],
                            [`${sg}CountArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}CountArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["totalCount"]],
                            [`${sg}Array`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}Array`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"]],
                            [`${sg}RawArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}RawArray`],sumTotalRaw],
                            [`${sg}RawCountArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}RawCountArray`],sumCountRaw],
                          }
                        }
                      }
                    }
                  }
                })
              }
            })
            otmChoices?.[seg]?.compositeFields?.forEach(field=>{
              if(field.type=="number"){
                if(grandTotals[mainCat][seg][`${field.name1}total`]==undefined)
                  grandTotals={
                    ...grandTotals,
                    [mainCat]:{
                      ...grandTotals[mainCat],
                      [seg]:{
                        ...grandTotals[mainCat][seg],
                        [`${field.name1}total`]:{
                          ["superSetArray"]:[],
                          ["superSetCountArray"]:[],
                          ["subsetsArray"]:[],
                          subsetsCountArray:[]
                        }
                      }
                    }
                  }
                  grandTotals={
                    ...grandTotals,
                    [mainCat]:{
                      ...grandTotals[mainCat],
                      [seg]:{
                        ...grandTotals[mainCat][seg],
                        [`${field.name1}total`]:{
                          ...grandTotals[mainCat][seg][`${field.name1}total`],
                          [`superSetArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`superSetArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][`${field.name1}total`]],
                            superSetCountArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`superSetCountArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][`${field.name1}Count`]],
                            subsetsArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`subsetsArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][`totalRow`]],
                            subsetsCountArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`subsetsCountArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][`totalRowCount`]],
                        }
                      }
                    }
                  }
  
                       
                Object.keys(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`]).forEach(sg=>{
                  console.log("segforone",sg)
                  if(typeof dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]=="object" &&
                  sg!=="arrRow" && sg!="arrRowUnique" && sg!="arrRawRow" && sg!="arrRawRowUnique"){
                    if(grandTotals[mainCat][seg][`${field.name1}total`][sg]==undefined)
                      grandTotals={
                        ...grandTotals,
                        [mainCat]:{
                          ...grandTotals[mainCat],
                          [seg]:{
                            ...grandTotals[mainCat][seg],
                            [`${field.name1}total`]:{
                              ...grandTotals[mainCat][seg][`${field.name1}total`],
                              [sg]:0,
                              [`${sg}Array`]:[],
                              [`${sg}CountArray`]:[],
                              [`${sg}RawArray`]:[],
                              [`${sg}RawCountArray`]:[]
                             
                            }
                          }
                        }
                      }
                      let sumTotalRaw=0
                      let sumCountRaw=0
                      console.log("porpor11",dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg])
                      dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`${field.name1}RawArray`].forEach(p=>{
                        sumTotalRaw+=p
                        sumCountRaw=dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`${field.name1}RawArray`].length
                      })
                    grandTotals={
                      ...grandTotals,
                      [mainCat]:{
                        ...grandTotals[mainCat],
                        [seg]:{
                          ...grandTotals[mainCat][seg],
                          [`${field.name1}total`]:{
                            ...grandTotals[mainCat][seg][`${field.name1}total`],
                            [sg]:grandTotals[mainCat][seg][`${field.name1}total`][sg]+dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"],
                            
                            [`${sg}Array`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}Array`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"]],
                            [`${sg}CountArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}CountArray`],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["totalCount"]],
                            [`${sg}RawArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}RawArray`],sumTotalRaw],
                            [`${sg}RawCountArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}RawCountArray`],sumCountRaw],
                          }
                        }
                      }
                    }
                  }
                })
              }
            })
          })
        }
      })
      
    })
  
   // console.log("gtotalsacum",dataResult,grandTotals)
  }
  const calculateGrandTotalsStatistics=(otmChoices,order,subsets,firstCatNormalFields)=>{
    let firstCats
    let pivote
    
    Object.keys(grandTotals).forEach(mainCat=>{
    
      Object.keys(grandTotals[mainCat]).forEach(seg=>{

        let mainCatSeg=mainCat.split("_")[1]
        mainCatSeg=beforeCategories[mainCatSeg]
       // console.log("befcat",mainCatSeg)
        

          if(otmChoices[mainCatSeg]?.otm!=undefined)
            firstCats=[...otmChoices[mainCatSeg].otm]
          if(otmChoices[mainCatSeg]?.mtm!=undefined)
            firstCats=[...firstCats,...otmChoices[mainCatSeg]?.mtm]
        
        firstCats.forEach(x=>{
          if(order[1][x].includes(seg))
            pivote=x
        })
       // console.log("ssio",subsets,pivote,mainCat,seg)
  
        otmChoices[seg].normal.forEach(field=>{
          if(field.type=="number"){
            grandTotals[mainCat][seg][`${field.name1}total`]={
              ...grandTotals[mainCat][seg][`${field.name1}total`],
              [`statSuperSetArray`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`superSetArray`])},
              [`statSuperSetArrayCount`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`superSetCountArray`])},
              [`statSubsetsArray`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`subsetsArray`])},
              [`statSubsetsArrayCount`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`subsetsCountArray`])}
              
            }
       //  console.log("pivoteii",subsets,pivote)
    Object.keys(subsets[pivote]).forEach(sg=>{
             // console.log("ssio",mainCat,seg,field.name1,grandTotals[mainCat][seg][`${field.name1}total`][`${sg}Array`],grandTotals[mainCat][seg][`${field.name1}total`][`${sg}CountArray`])
              grandTotals[mainCat][seg][`${field.name1}total`]={
                ...grandTotals[mainCat][seg][`${field.name1}total`],
                [`statArray${sg}`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`${sg}Array`])},
                [`statArrayCount${sg}`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`${sg}CountArray`])},
                [`statArrayRaw${sg}`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`${sg}RawArray`])},
                [`statArrayCountRaw${sg}`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`${sg}RawCountArray`])}
              }
  
            
          })
          }
        })
        otmChoices[seg].compositeFields.forEach(field=>{
          if(field.type=="number"){
            grandTotals[mainCat][seg][`${field.name1}total`]={
              ...grandTotals[mainCat][seg][`${field.name1}total`],
              [`statSuperSetArray`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`superSetArray`])},
              [`statSuperSetArrayCount`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`superSetCountArray`])},
              [`statSubsetsArray`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`subsetsArray`])},
              [`statSubsetsArrayCount`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`subsetsCountArray`])}
            }
            Object.keys(subsets[pivote]).forEach(sg=>{
              grandTotals[mainCat][seg][`${field.name1}total`]={
                ...grandTotals[mainCat][seg][`${field.name1}total`],
                [`statArray${sg}`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`${sg}Array`])},
                [`statArrayCount${sg}`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`${sg}CountArray`])},
                [`statArrayRaw${sg}`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`${sg}RawArray`])},
                [`statArrayCountRaw${sg}`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`${sg}RawCountArray`])}
              }
            
            })
          }
        })
      })
    })
    //console.log("grandTotalStats",grandTotals)
  }

  const calculatePercentageByGrandTotalsAndInRow=(otmChoices,data)=>{
    Object.keys(dataResult1).forEach(mainCat=>{
      Object.keys(dataResult1[mainCat]).forEach(seg=>{
        let realMainCat=mainCat.split("_")[0]
        if(realMainCat!==seg){
          Object.keys(dataResult1[mainCat][seg]["data"]).forEach(reg=>{
            otmChoices[seg].normal.forEach(field=>{
              if(field.type=="number"){
                Object.keys(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`]).forEach(sg=>{
                  if(typeof dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]=="object" &&
                  sg!=="arrRow" && sg!=="arrRowUnique"){
                 //   console.log("punto",dataResult[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}GrandTotal`])
                    if(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}GrandTotal`]==undefined){
                      dataResult1={
                        ...dataResult1,
                        [mainCat]:{
                          ...dataResult1[mainCat],
                          [seg]:{
                            ...dataResult1[mainCat][seg],
                            data:{
                              ...dataResult1[mainCat][seg]["data"],
                              [reg]:{
                                ...dataResult1[mainCat][seg]["data"][reg],
                                [`${field.name1}total`]:{
                                  ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`],
                                  [sg]:{
                                    ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],
                                    [`%of${field.name1}Grandtotal`]:dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"]/grandTotals[mainCat][seg][`${field.name1}total`][sg]
                                  }
                                }
                              }
                            }
                              
                          }
                          
                        }
                      
                      }
                    //  console.log("punto1",dataResult[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                    }
                    if(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}Total`]==undefined){
                      dataResult1={
                        ...dataResult1,
                        [mainCat]:{
                          ...dataResult1[mainCat],
                          [seg]:{
                            ...dataResult1[mainCat][seg],
                            data:{
                              ...dataResult1[mainCat][seg]["data"],
                              [reg]:{
                                ...dataResult1[mainCat][seg]["data"][reg],
                                [`${field.name1}total`]:{
                                  ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`],
                                  [sg]:{
                                    ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],
                                    [`%of${field.name1}Total`]:dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"]/tablesToCont[realMainCat][seg][reg][`${field.name1}total`]
                                  }
                                }
                              }
                            }
                                
                          }
                          
                        }
                      
                      }
                     // console.log("punto1",dataResult[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                    }
                    if(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}SubgroupsTotal`]==undefined){
                      dataResult1={
                        ...dataResult1,
                        [mainCat]:{
                          ...dataResult1[mainCat],
                          [seg]:{
                            ...dataResult1[mainCat][seg],
                            data:{
                              ...dataResult1[mainCat][seg]["data"],
  
                              [reg]:{
                                ...dataResult1[mainCat][seg]["data"][reg],
                                [`${field.name1}total`]:{
                                  ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`],
                                  [sg]:{
                                    ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],
                                    [`%of${field.name1}SubgroupsTotal`]:dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"]/dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`]["totalRow"]
                                  }
                                }
                              }
                            }
                              
                          }
                          
                        }
                      
                      }
                   //   console.log("punto1",dataResult[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                    }
                  }
                })
              }
            })
          
            otmChoices?.[seg]?.compositeFields?.forEach(field=>{
              if(field.type=="number"){
                Object.keys(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`]).forEach(sg=>{
                  if(typeof dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]=="object" &&
                  sg!=="arrRow" && sg!="arrRowUnique"){
                    console.log("punto",dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}GrandTotal`],grandTotals[mainCat],mainCat,seg,field.name1)
                    if(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}GrandTotal`]==undefined){
                      dataResult1={
                        ...dataResult1,
                        [mainCat]:{
                          ...dataResult1[mainCat],
                          [seg]:{
                            ...dataResult1[mainCat][seg],
                            data:{
                              ...dataResult1[mainCat][seg]["data"],
                              [reg]:{
                                ...dataResult1[mainCat][seg]["data"][reg],
                                [`${field.name1}total`]:{
                                  ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`],
                                  [sg]:{
                                    ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],
                                    [`%of${field.name1}Grandtotal`]:dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"]/grandTotals[mainCat][seg][`${field.name1}total`][sg]
                                  }
                                }
                              }
                            }
                              
                          }
                          
                        }
                      
                      }
                      console.log("punto1",dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                    }
                    if(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}Total`]==undefined){
                      dataResult1={
                        ...dataResult1,
                        [mainCat]:{
                          ...dataResult1[mainCat],
                          [seg]:{
                            ...dataResult1[mainCat][seg],
                            data:{
                              ...dataResult1[mainCat][seg]["data"],
                              [reg]:{
                                ...dataResult1[mainCat][seg]["data"][reg],
                                [`${field.name1}total`]:{
                                  ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`],
                                  [sg]:{
                                    ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],
                                    [`%of${field.name1}Total`]:dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"]/tablesToCont[realMainCat][seg][reg][`${field.name1}total`]
                                  }
                                }
                              }
                            }
                              
                          }
                          
                        }
                      
                      }
                      console.log("punto1",dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                    }
                    if(dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}SubgroupsTotal`]==undefined){
                      dataResult1={
                        ...dataResult1,
                        [mainCat]:{
                          ...dataResult1[mainCat],
                          [seg]:{
                            ...dataResult1[mainCat][seg],
                            data:{
                              ...dataResult1[mainCat][seg]["data"],
                              [reg]:{
                                ...dataResult1[mainCat][seg]["data"][reg],
                                [`${field.name1}total`]:{
                                  ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`],
                                  [sg]:{
                                    ...dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],
                                    [`%of${field.name1}SubgroupsTotal`]:dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg]["value"]/dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`]["totalRow"]
                                  }
                                }
                              }
                            }
                              
                          }
                          
                        }
                      
                      }
                      console.log("punto1",dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg],dataResult1[mainCat][seg]["data"][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                    }
                  }
                })
              }
            })
          })
        }
      })
      
    })
    //console.log("finalstatsok",dataResult)
  }
  

  const startProcess=()=>{
    //getSubsetsCont({})
    
   //console.log("orderbegin",order[0].length)
    for(let i=0;i<finalRoutes.length;i++){
      let route=routes[finalRoutes[i]]
      beginContributions(route)
      
    }
    
    initiateStatistics(otmChoices)
    calculateGrandTotals(otmChoices)
    calculateGrandTotalsStatistics(otmChoices,order,subsets,firstCatNormalFields)
    calculatePercentageByGrandTotalsAndInRow(otmChoices,data)
    console.log("resultgrand",dataResult1,data,grandTotals)
    setMuestra(displayTablesOrder())
  }
  const displayTablesOrder=()=>{
    let pivoteTable=""
    let tableToAnalize=""
    let mainTable=""
    let orderPrint=[]
    let startIndex=0
    let mainRelationsShips=[]
    setAlgo(false)
    let entro=false
    for(let i=0;i<finalRoutes.length;i++){
      let route=routes[finalRoutes[i]]
      for(let j=0;j<route.length;j++){
        mainTable=route[j]
        startIndex=j+1
        let val=false
        let partial=[]
        for(let i=startIndex;i<route.length;i++){
          partial=[]
          pivoteTable=route[i-1]
          tableToAnalize=route[i]
          let otmmtm
          if(pivoteTable.startsWith("getData")){
            otmmtm=[...firstCatNormalFields[pivoteTable].otm,...firstCatNormalFields[pivoteTable].mtm]
          }else{
            otmmtm=[...otmChoices[pivoteTable].otm,...otmChoices[pivoteTable].mtm]
          }
            //for(let z=0;z<otmmtm.length;z++){
              
              //if(subsets[otmmtm[z]]!=undefined){
              if(Object.keys(dataz[0][pivoteTable]).length>1){
                
                if(j!=i-1){
                  entro=true
                  
                  orderPrint.push(<SubsetsContDeriveTable
                    setAlgo={setAlgo}
                    algo={algo}
                    order={order}
                    data={dataResult1}
                    displayRaw={printRaw}
                    displayRawUnique={printRaw}
                    grandTotals={grandTotals}
                    firstCatNormalFields={firstCatNormalFields}
                    otmChoices={otmChoices}
                    subsets={subsets}
                    mainTable={`${mainTable}_${tableToAnalize}`}
                    cat={mainTable}
                    pivoteTable={pivoteTable}
                    tableToAnalize={tableToAnalize}
                    end={false}
                  
                  />)
                
                
                }
                val=true
                if(val==true){
                  for(let o=j+1;o<i-1;o++){
                  //orderPrint.push("intermediate")
                    orderPrint.push(<SubsetsContDeriveTable
                      setAlgo={setAlgo}
                      algo={algo}
                      order={order}
                      data={dataResult1}
                      displayRaw={printRaw}
                      displayRawUnique={printRaw}
                      grandTotals={grandTotals}
                      firstCatNormalFields={firstCatNormalFields}
                      otmChoices={otmChoices}
                      subsets={subsets}
                      mainTable={`${route[o]}_${tableToAnalize}`}
                      cat={route[o]}
                      pivoteTable={pivoteTable}
                      tableToAnalize={tableToAnalize}
                      end={false}
                    
                      />)
                  }
                }
                //orderPrint.push("final")
                
                orderPrint.push(<SubsetsContDeriveTable
                  setAlgo={setAlgo}
                  algo={algo}
                  order={order}
                  data={dataz[0]}
                  displayRaw={dataz[1]}
                  displayRawUnique={dataz[1]}
                  grandTotals={dataz[2]}
                  firstCatNormalFields={firstCatNormalFields}
                  otmChoices={otmChoices}
                  subsets={subsets}
                  mainTable={pivoteTable}
                  cat={pivoteTable}
                  pivoteTable={pivoteTable}
                  tableToAnalize={tableToAnalize}
                  end={true}
                />)
                 
              }
            }
            //}
          
        //}
      }
    }
    return orderPrint
  }

  return <>
  {muestra}
  {!algo && <div>
    <p style={{margin:"0px", padding:"5px",color:"yellow",background:"black"}}>There is no sets with numeric variables to analize</p>
    <div style={{height:"3px",marginTop:"0px",marginBottom:"15px",color:"yellow",backgroundColor:"yellow"}}></div>
  </div>}
  {/*<SubsetsContDeriveTable
      order={order}
      data={dataResult1["getDa"]}
      displayRaw={z[1]}
      grandTotals={z[2]}
      firstCatNormalFields={firstCatNormalFields}
      otmChoices={otmChoices}
      subsets={subsets}
      
     //subsetsForAll={subsetsForAll}
    >*/}
  </>
}
export {GetSubsetsContributionsForAllSets}