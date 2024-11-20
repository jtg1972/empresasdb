import { valueToObjectRepresentation } from "@apollo/client/utilities"
import { findAllByTestId } from "@testing-library/dom"

let dataResult={}
let grandTotals={}
let printRaw={}
const calculateContributions=(vars)=>{
  let {cat,ssData,seg,data,otmChoices,gi,rs,field,x,ss}=vars
  if(dataResult?.[cat]?.[seg]?.[gi]?.[`${field}total`]?.[ss]?.[`${field}RawArray`]==undefined)
      dataResult[cat][seg][gi][`${field}total`][ss][`${field}RawArray`]=[]
       
      
  console.log("alarma",data,cat,seg,gi,ssData,x,rs)
  if(data[cat][seg][gi]["keys"].includes(ssData[x][rs]["id"])){
    let contTotal=0
    let rep=[]
    if(x==seg){

      rep=[...rep,ssData[seg][rs][field]]
      contTotal=ssData[seg][rs][field]
    
    }else{
      contTotal=ssData[seg][rs][`${field}total`]
      rep=[...rep,...ssData[seg][rs][`${field}Acummulated`]]
    }
    console.log("perios",ssData[seg][rs])

      //console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}`])                              

      //console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"],`${n.name1}total`,ssData[seg][rs][`${n.name1}`])
    dataResult={...dataResult,
      [cat]:{
        ...dataResult[cat],
        [seg]:{
          ...dataResult[cat][seg],
          [gi]:{
            ...dataResult[cat][seg][gi],
            [`${field}total`]:{
              ...dataResult[cat][seg][gi][`${field}total`],
              [ss]:{
                value:dataResult[cat][seg][gi][`${field}total`][ss]["value"]+contTotal,
                arr:[...dataResult[cat][seg][gi][`${field}total`][ss]["arr"],contTotal],
                [`${field}RawArray`]:[...dataResult[cat][seg][gi][`${field}total`][ss][`${field}RawArray`],...rep]
              }

            }
          }
        } 

      }
      
    }
    console.log("dataResult6",dataResult)
  }
}

const calculateContributionsNull=(vars)=>{
  let {cat,ssData,seg,data,otmChoices,gi,rs,field,x,ss}=vars
  if(dataResult?.[cat]?.[seg]?.[gi]?.[`${field}total`]?.[ss]?.[`${field}RawArray`]==undefined)
      dataResult[cat][seg][gi][`${field}total`][ss][`${field}RawArray`]=[]
       
      
  console.log("alarma",data,cat,seg,gi,ssData,x,rs)
  
    let contTotal=0
    let rep=[]
    /*if(x==seg){

      rep=[...rep,ssData[seg][rs][field]]
      contTotal=ssData[seg][rs][field]
    
    }else{
      contTotal=ssData[seg][rs][`${field}total`]
      rep=[...rep,...ssData[seg][rs][`${field}Acummulated`]]
    }*/
    console.log("perios",ssData[seg][rs])

      //console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}`])                              

      //console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"],`${n.name1}total`,ssData[seg][rs][`${n.name1}`])
    dataResult={...dataResult,
      [cat]:{
        ...dataResult[cat],
        [seg]:{
          ...dataResult[cat][seg],
          [gi]:{
            ...dataResult[cat][seg][gi],
            [`${field}total`]:{
              ...dataResult[cat][seg][gi][`${field}total`],
              [ss]:{
                value:0,
                arr:[],
                [`${field}RawArray`]:[]
              }

            }
          }
        } 

      }
      
    }
    console.log("dataResult6",dataResult)
  
}

const createVars=(vars1)=>{
  let {vars,cat,seg,gi,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields}=vars1
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
  })

}
const createVarsNull=(vars1)=>{
  let {vars,cat,seg,gi,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields}=vars1
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
      calculateContributionsNull({cat,ssData,seg,dataResult,data,gi,rs,field,x,ss,order,firstCatNormalFields,otmChoices})
    }
  })

}

/*133 140 165 166 169 170
/*171 173 174 175 176 177 178 179*/

const getIfPrintRaws=(vars)=>{
  const {otmChoices,firstCatNormalFields,cat,seg}=vars
  if(cat.startsWith("getData")){
    if(cat==seg)
      return false
    if(firstCatNormalFields[cat].otm.includes(seg))
      return false
    return true
  }else{
    if(cat==seg)
      return false
    if(otmChoices[cat].otm.includes(seg))
      return false
    return true
  }
}

const initializeVarsAndSubsets=(vars)=>{
  let {cat,ssData,seg,data,otmChoices,x,ss,order,firstCatNormalFields}=vars
  if(printRaw[cat]==undefined)
     printRaw={...printRaw,[cat]:{}}
  if(printRaw[cat][seg]==undefined)
    printRaw={...printRaw,[cat]:{...printRaw[cat],[seg]:getIfPrintRaws({otmChoices,firstCatNormalFields,cat,seg})}}
  
  if(Object.keys(ssData[seg]).length>0){
    Object.keys(ssData[seg]).forEach((rs,ind1)=>{

      Object.keys(data[cat][seg]).forEach(gi=>{
          createVars({vars:otmChoices[seg].normal,cat,seg,gi,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields}) 
          createVars({vars:otmChoices[seg].compositeFields,cat,seg,gi,rs,x,ss,ssData,data,order,otmChoices,firstCatNormalFields})
      })
    })
  }else{
    Object.keys(data[cat][seg]).forEach(gi=>{
      createVarsNull({vars:otmChoices[seg].normal,cat,seg,gi,x,ss,ssData,data,order,otmChoices,firstCatNormalFields}) 
      createVarsNull({vars:otmChoices[seg].compositeFields,cat,seg,gi,x,ss,ssData,data,order,otmChoices,firstCatNormalFields})
    })
  }
  
}

const initializeSegAndInd=(vars)=>{
  let {cat,seg,data,x,order}=vars
  if(dataResult?.[cat]?.[seg]==undefined){
    dataResult={
      ...dataResult,
      [cat]:{
        ...dataResult[cat],[seg]:{}
      }
    }  
  }
  Object.keys(data[cat][seg]).forEach(gi=>{
    if(dataResult?.[cat]?.[seg]?.[gi]==undefined){
      dataResult={
        ...dataResult,
        [cat]:{
          ...dataResult[cat],
          [seg]:{
            ...dataResult[cat][seg],
            [gi]:{}
          } 

        }
      }
    }
  })
}

export const doImmediateSonsMath=(vars)=>{
  let {
    subsets,
    subsetsData,
    data,
    categories,
    cat,
    otmChoices,
    order,
    firstCatNormalFields
  }=vars
  categories.forEach((x)=>{
    if(subsets[x]!=undefined){
      Object.keys(subsetsData[x]).forEach(ss=>{
        let ssData=subsetsData[x][ss]
        Object.keys(ssData).forEach(seg=>{
          initializeSegAndInd({cat,seg,data,order})
          initializeVarsAndSubsets({cat,ssData,seg,data,otmChoices,x,ss,order,firstCatNormalFields})
        })
      })
    } 
  })  
}

const loadNormalFields=(vars)=>{
  const {cat,data,order}=vars
  if(data?.[cat]?.[cat]!=undefined)
  Object?.keys(data?.[cat]?.[cat])?.forEach(l=>{
    dataResult[cat][cat][l]=data[cat][cat][l]
  })
}


export const getSubsetsCont=({
  data,
  subsetsData,
  subsets,
  otmChoices,
  firstCatNormalFields,
  order,
  getTableToSort
})=>{
  printRaw={}

  console.log("datamain",data)
  dataResult={}
  if(data!=undefined){
    
    Object.keys(data)?.forEach(cat=>{
      if(dataResult[cat]==undefined)
        dataResult={...dataResult,[cat]:{}}
      if(dataResult[cat][cat]==undefined){
        dataResult={...dataResult,[cat]:{...dataResult[cat],[cat]:{}}}
        loadNormalFields({cat,data,order})
      }
      if(data[cat]!=undefined){
        if(cat.startsWith("getData")){
          doImmediateSonsMath({
            categories:firstCatNormalFields[cat].otm,
            data,
            subsetsData,
            subsets,
            dataResult,
            cat,
            otmChoices,
            order,
            firstCatNormalFields
          })
        }else{
          doImmediateSonsMath({
            categories:otmChoices[cat].otm,
            data:data,
            subsetsData,
            subsets,
            dataResult,
            cat,
            otmChoices,
            order,
            firstCatNormalFields
          })
        }
      }
    })
    initiateStatistics(otmChoices)
    calculateGrandTotals(otmChoices)
    calculateGrandTotalsStatistics(otmChoices,order,subsets,firstCatNormalFields)
    calculatePercentageByGrandTotalsAndInRow(otmChoices,data)
  }
  console.log("dataResult",dataResult,printRaw,grandTotals)/*,subsetsData,data)*/
  return [dataResult,printRaw,grandTotals]

}

/*original export const getSubsetsCont=({
  data,
  subsetsData,
  subsets,
  otmChoices,
  firstCatNormalFields
})=>{
  console.log("verty",data,subsetsData)
  let dataResult={}
  if(data!=undefined){
    Object.keys(data).forEach(cat=>{
      if(dataResult[cat]==undefined)
        dataResult={...dataResult,[cat]:{}}
      if(data[cat]!=undefined){
        if(cat.startsWith("getData")){
          firstCatNormalFields[cat].otm.forEach((x)=>{
            console.log("subsetsfijo",subsets,x)
            if(subsets[x]!=undefined){
              console.log("ssfijo",subsets[x])
              Object.keys(subsetsData[x]).forEach(ss=>{
                console.log("ssfijo",subsets[x],subsetsData[x],ss,subsetsData[x][ss])

                let ssData=subsetsData[x][ss]
                Object.keys(ssData).forEach(seg=>{
                  
                  if(dataResult?.[cat]?.[seg]==undefined){
                    dataResult={
                      ...dataResult,
                      [cat]:{
                        ...dataResult[cat],[seg]:{}
                      }
                    }
                  }
                
                  Object.keys(data[cat][seg]).forEach(gi=>{
                    if(dataResult?.[cat]?.[seg]?.[gi]==undefined){
                      dataResult={
                        ...dataResult,
                        [cat]:{
                          ...dataResult[cat],
                          [seg]:{
                            ...dataResult[cat][seg],
                            [gi]:{}
                          } 

                        }
                      }
                    }
                  })
                  Object.keys(ssData[seg]).forEach((rs,ind1)=>{
                    console.log("counteree",cat,seg,Object.keys(ssData[seg]).length,ind1)
                    Object.keys(data[cat][seg]).forEach(gi=>{
                      if(dataResult?.[cat]?.[seg]?.[gi]==undefined){
                        dataResult={...dataResult,
                          [cat]:{
                            ...dataResult[cat],
                            [seg]:{
                              ...dataResult[cat][seg],
                              [gi]:{}
                            } 

                          }
                        }
                      }
                      //if(data[cat][seg][gi]["keys"].includes(ssData[seg][rs]["id"])){
                      console.log("ssdataverif",cat,x,ssData,seg,otmChoices[seg]["normal"],x,ss,subsetsData[x][ss])
                      console.log("otmverfirstcat",otmChoices[seg]["normal"])
                      //Object.keys(subsetsData[x][ss]).forEach(seg1=>{

                        console.log("checarseg",seg,otmChoices[seg].normal) 
                        otmChoices[seg].normal.forEach(n=>{
                          if(n.type=="number"){

                            if(dataResult?.[cat]?.[seg]?.[gi]?.[`${n.name1}total`]==undefined){
                              
                              dataResult={...dataResult,
                                [cat]:{
                                  ...dataResult[cat],
                                  [seg]:{
                                    ...dataResult[cat][seg],
                                    [gi]:{
                                      ...dataResult[cat][seg][gi],
                                      [`${n.name1}total`]:{}
                                    }
                                  } 
      
                                }
                              }
                            }
                            
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

                            }
                            console.log("kerker1234",cat,seg,gi,`${n.name1}total`,dataResult[cat][seg][gi][`${n.name1}total`],rs,ssData[seg])

                            if(data[cat][seg][gi]["keys"].includes(ssData[x][rs]["id"])){
                              if(x==seg){
                                console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}`])                              

                                console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"],`${n.name1}total`,ssData[seg][rs][`${n.name1}`])
                                dataResult={...dataResult,
                                  [cat]:{
                                    ...dataResult[cat],
                                    [seg]:{
                                      ...dataResult[cat][seg],
                                      [gi]:{
                                        ...dataResult[cat][seg][gi],
                                        [`${n.name1}total`]:{
                                          ...dataResult[cat][seg][gi][`${n.name1}total`],
                                          [ss]:{
                                            value:dataResult[cat][seg][gi][`${n.name1}total`][ss]["value"]+ssData[seg][rs][`${n.name1}`],
                                            arr:[...dataResult[cat][seg][gi][`${n.name1}total`][ss]["arr"],ssData[seg][rs][`${n.name1}`]]
                                          }
          
                                        }
                                      }
                                    } 
        
                                  }
                                }
                              }else{
                                console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"])
                                console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}total`])                             
                                

                                dataResult={...dataResult,
                                  [cat]:{
                                    ...dataResult[cat],
                                    [seg]:{
                                      ...dataResult[cat][seg],
                                      [gi]:{
                                        ...dataResult[cat][seg][gi],
                                        [`${n.name1}total`]:{
                                          ...dataResult[cat][seg][gi][`${n.name1}total`],
                                          [ss]:{
                                            value:dataResult[cat][seg][gi][`${n.name1}total`][ss]["value"]+ssData[seg][rs][`${n.name1}total`],
                                            arr:[...dataResult[cat][seg][gi][`${n.name1}total`][ss]["arr"],ssData[seg][rs][`${n.name1}total`]]
                                          
                                          }
          
                                        }
                                      }
                                    } 
        
                                  }
                                }
                              }
                            }
                          }
                        })
                        otmChoices[seg].compositeFields.forEach(n=>{
                          if(n.type=="number"){
                            if(dataResult?.[cat]?.[seg]?.[gi]==undefined){
                              dataResult[cat][seg]={...dataResult[cat][seg],[gi]:{}}
                            }
                            if(dataResult?.[cat]?.[seg]?.[gi]?.[`${n.name1}total`]==undefined){
                              dataResult={...dataResult,
                                [cat]:{
                                  ...dataResult[cat],
                                  [seg]:{
                                    ...dataResult[cat][seg],
                                    [gi]:{
                                      ...dataResult[cat][seg][gi],
                                      [`${n.name1}total`]:{}
                                    }
                                  } 
      
                                }
                              }
                            }
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
                            }

                            console.log("cheq22",cat,seg,data[cat][seg][gi]["keys"],rs,ssData)
                            console.log("kerker1234",cat,seg,gi,`${n.name1}total`,dataResult[cat][seg][gi][`${n.name1}total`],rs,ssData[cat])

                              if(data[cat][seg][gi]["keys"].includes(ssData[x][rs]["id"])){
                              if(x==seg){
                                console.log("uiruirc",cat,seg,gi,data[cat][seg][gi]["keys"],`${n.name1}total`)
                                console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}`])

                                dataResult={...dataResult,
                                  [cat]:{
                                    ...dataResult[cat],
                                    [seg]:{
                                      ...dataResult[cat][seg],
                                      [gi]:{
                                        ...dataResult[cat][seg][gi],
                                        [`${n.name1}total`]:{
                                          ...dataResult[cat][seg][gi][`${n.name1}total`],
                                          [ss]:{
                                            value:dataResult[cat][seg][gi][`${n.name1}total`][ss]["value"]+ssData[seg][rs][`${n.name1}`],
                                            arr:[...dataResult[cat][seg][gi][`${n.name1}total`][ss]["arr"],ssData[seg][rs][`${n.name1}`]]
                                          }
          
                                        }
                                      }
                                    } 
        
                                  }
                                }
                              }else{
                                console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}total`])

                                console.log("uiruirbien",cat,seg,gi,data[cat][seg][gi]["keys"],ssData[seg][rs]["id"],`${n.name1}total`)
                                dataResult={...dataResult,
                                  [cat]:{
                                    ...dataResult[cat],
                                    [seg]:{
                                      ...dataResult[cat][seg],
                                      [gi]:{
                                        ...dataResult[cat][seg][gi],
                                        [`${n.name1}total`]:{
                                          ...dataResult[cat][seg][gi][`${n.name1}total`],
                                          [ss]:{
                                            value:dataResult[cat][seg][gi][`${n.name1}total`][ss]["value"]+ssData[seg][rs][`${n.name1}total`],
                                            arr:[...dataResult[cat][seg][gi][`${n.name1}total`][ss]["arr"],ssData[seg][rs][`${n.name1}total`]]
                                          
                                          }
          
                                        }
                                      }
                                    } 
        
                                  }
                                }
                              }
                            }
                          }

                            

                          
                          

                        })
                        

                      //})
                      console.log("foundmain",gi,rs)
                      
                    
                    })
                    console.log("rstyu",ssData[seg][rs],dataResult)
                  })
                })
              })
            } 
          })
          

        }else{
          otmChoices[cat].otm.forEach((x)=>{
            if(subsets[x]!=undefined){
              
              Object.keys(subsetsData[x]).forEach(ss=>{
                let ssData=subsetsData[x][ss]
                Object.keys(ssData).forEach(seg=>{
                  if(dataResult?.[cat]?.[seg]==undefined)
                    dataResult={...dataResult,[cat]:{
                      ...dataResult[cat],[seg]:{}
                    }}
                    Object.keys(ssData[seg]).forEach((rs,ind1)=>{
                      console.log("counteree",cat,seg,Object.keys(ssData[seg]).length,ind1)
                      Object.keys(data[cat][seg]).forEach(gi=>{
                        if(dataResult?.[cat]?.[seg]?.[gi]==undefined){
                          dataResult={...dataResult,
                            [cat]:{
                              ...dataResult[cat],
                              [seg]:{
                                ...dataResult[cat][seg],
                                [gi]:{}
                              } 
  
                            }
                          }
                        }
                        //if(data[cat][seg][gi]["keys"].includes(ssData[seg][rs]["id"])){
                        console.log("ssdataverif",cat,x,ssData,seg,otmChoices[seg]["normal"],x,ss,subsetsData[x][ss])
                        console.log("otmverfirstcat",otmChoices[seg]["normal"])
                        //Object.keys(subsetsData[x][ss]).forEach(seg1=>{
  
                          console.log("checarseg",seg,otmChoices[seg].normal) 
                          otmChoices[seg].normal.forEach(n=>{
                            if(n.type=="number"){
  
                              if(dataResult?.[cat]?.[seg]?.[gi]?.[`${n.name1}total`]==undefined){
                                
                                dataResult={...dataResult,
                                  [cat]:{
                                    ...dataResult[cat],
                                    [seg]:{
                                      ...dataResult[cat][seg],
                                      [gi]:{
                                        ...dataResult[cat][seg][gi],
                                        [`${n.name1}total`]:{}
                                      }
                                    } 
        
                                  }
                                }
                              }
                              
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
  
                              }
                              console.log("kerker1234",cat,seg,gi,`${n.name1}total`,dataResult[cat][seg][gi][`${n.name1}total`],rs,ssData)

                              if(data[cat][seg][gi]["keys"].includes(ssData[x][rs]["id"])){
                                if(x==seg){
                                  console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}`])                              
  
                                  console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"],`${n.name1}total`,ssData[seg][rs][`${n.name1}`])
                                  dataResult={...dataResult,
                                    [cat]:{
                                      ...dataResult[cat],
                                      [seg]:{
                                        ...dataResult[cat][seg],
                                        [gi]:{
                                          ...dataResult[cat][seg][gi],
                                          [`${n.name1}total`]:{
                                            ...dataResult[cat][seg][gi][`${n.name1}total`],
                                            [ss]:{
                                              value:dataResult[cat][seg][gi][`${n.name1}total`][ss]["value"]+ssData[seg][rs][`${n.name1}`],
                                              arr:[...dataResult[cat][seg][gi][`${n.name1}total`][ss]["arr"],ssData[seg][rs][`${n.name1}`]]
                                            }
            
                                          }
                                        }
                                      } 
          
                                    }
                                  }
                                }else{
                                  console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"],ssData[seg][rs]["id"])
                                  console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}total`])                             
                                  
  
                                  dataResult={...dataResult,
                                    [cat]:{
                                      ...dataResult[cat],
                                      [seg]:{
                                        ...dataResult[cat][seg],
                                        [gi]:{
                                          ...dataResult[cat][seg][gi],
                                          [`${n.name1}total`]:{
                                            ...dataResult[cat][seg][gi][`${n.name1}total`],
                                            [ss]:{
                                              value:dataResult[cat][seg][gi][`${n.name1}total`][ss]["value"]+ssData[seg][rs][`${n.name1}total`],
                                              arr:[...dataResult[cat][seg][gi][`${n.name1}total`][ss]["arr"],ssData[seg][rs][`${n.name1}total`]]
                                            
                                            }
            
                                          }
                                        }
                                      } 
          
                                    }
                                  }
                                }
                              }
                            }
                          })
                          otmChoices[seg].compositeFields.forEach(n=>{
                            if(n.type=="number"){
                              if(dataResult?.[cat]?.[seg]?.[gi]==undefined){
                                dataResult[cat][seg]={...dataResult[cat][seg],[gi]:{}}
                              }
                              if(dataResult?.[cat]?.[seg]?.[gi]?.[`${n.name1}total`]==undefined){
                                dataResult={...dataResult,
                                  [cat]:{
                                    ...dataResult[cat],
                                    [seg]:{
                                      ...dataResult[cat][seg],
                                      [gi]:{
                                        ...dataResult[cat][seg][gi],
                                        [`${n.name1}total`]:{}
                                      }
                                    } 
        
                                  }
                                }
                              }
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
                              }
                              console.log("kerker1234",cat,seg,gi,`${n.name1}total`,dataResult[cat][seg][gi][`${n.name1}total`],rs,ssData[cat])

                              if(data[cat][seg][gi]["keys"].includes(ssData[x][rs]["id"])){
                                if(x==seg){
                                  console.log("uiruirc",cat,seg,gi,data[cat][seg][gi]["keys"],`${n.name1}total`)
                                  console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}`])
  
                                  dataResult={...dataResult,
                                    [cat]:{
                                      ...dataResult[cat],
                                      [seg]:{
                                        ...dataResult[cat][seg],
                                        [gi]:{
                                          ...dataResult[cat][seg][gi],
                                          [`${n.name1}total`]:{
                                            ...dataResult[cat][seg][gi][`${n.name1}total`],
                                            [ss]:{
                                              value:dataResult[cat][seg][gi][`${n.name1}total`][ss]["value"]+ssData[seg][rs][`${n.name1}`],
                                              arr:[...dataResult[cat][seg][gi][`${n.name1}total`][ss]["arr"],ssData[seg][rs][`${n.name1}`]]
                                            }
            
                                          }
                                        }
                                      } 
          
                                    }
                                  }
                                }else{
                                  console.log("checarque",cat,seg,gi,`${n.name1}total`,ssData[seg][rs][`${n.name1}total`])
  
                                  console.log("uiruir",cat,seg,gi,data[cat][seg][gi]["keys"],ssData[cat][rs]["id"],`${n.name1}total`)
                                  dataResult={...dataResult,
                                    [cat]:{
                                      ...dataResult[cat],
                                      [seg]:{
                                        ...dataResult[cat][seg],
                                        [gi]:{
                                          ...dataResult[cat][seg][gi],
                                          [`${n.name1}total`]:{
                                            ...dataResult[cat][seg][gi][`${n.name1}total`],
                                            [ss]:{
                                              value:dataResult[cat][seg][gi][`${n.name1}total`][ss]["value"]+ssData[seg][rs][`${n.name1}total`],
                                              arr:[...dataResult[cat][seg][gi][`${n.name1}total`][ss]["arr"],ssData[seg][rs][`${n.name1}total`]]
                                            
                                            }
            
                                          }
                                        }
                                      } 
          
                                    }
                                  }
                                }
                              }
                            }
  
                              
  
                            
                            
  
                          })
                          
  
                        //})
                        console.log("foundmain",gi,rs)
                        
                      
                      })
                      console.log("rstyu",ssData[seg][rs],dataResult)
                    })
                })
              })
            } 
          })
          
        }
      }
    })
    initiateStatistics(dataResult,otmChoices)
  }
}*/

const initiateStatistics=(otmChoices)=>{
  console.log("dresult",dataResult)
  Object.keys(dataResult).forEach(cat=>{
    Object.keys(dataResult[cat]).forEach(seg=>{
      if(cat!==seg){
        Object.keys(dataResult[cat][seg]).forEach(ind=>{
          //if(cat!=seg){
          let arr=[]
          console.log("checarpipo",dataResult[cat][seg],ind)
          if(dataResult[cat][seg][ind]!=undefined){
            
            otmChoices[seg].normal.forEach(field=>{
              if(field.type=="number"){
                if(dataResult[cat][seg][ind][`${field.name1}total`]!=undefined){
                  Object.keys(dataResult[cat][seg][ind][`${field.name1}total`]).forEach(sg=>{
                    if(sg!==`${field.name1}total` && 
                    sg!==`${field.name1}Media`
                    && sg!==`${field.name1}Median`
                    && sg!==`${field.name1}Maximum`
                    && sg!==`${field.name1}Minimum`
                    && sg!==`%${field.name1}`
                    && sg!==`${field.name1}Count`){
                      dataResult[cat][seg][ind][`${field.name1}total`][sg]={
                        ...dataResult[cat][seg][ind][`${field.name1}total`][sg],
                        
                        ...calculateStatistics(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.["arr"],dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]),
                        ...calculateStatisticsRaw(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.[`${field.name1}RawArray`])

                      }
                      
                      if(dataResult[cat][seg][ind][`${field.name1}total`]?.["totalRow"]==undefined)
                        dataResult[cat][seg][ind][`${field.name1}total`]["totalRow"]=0
                      if(dataResult[cat][seg][ind][`${field.name1}total`]?.["arrRow"]==undefined)
                        dataResult[cat][seg][ind][`${field.name1}total`]["arrRow"]=[]
                      
                      let val
                      if(dataResult[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.["value"]!=undefined){  
                        val=dataResult[cat][seg][ind][`${field.name1}total`][sg]["value"]
                        dataResult[cat][seg][ind][`${field.name1}total`]["totalRow"]+=val
                        dataResult[cat][seg][ind][`${field.name1}total`]["arrRow"]=[...dataResult[cat][seg][ind][`${field.name1}total`]["arrRow"],val]
                      }
                    }
                  })
                }
              }
              
              
              
            })
            otmChoices[seg].normal.forEach(field=>{
              
              if(field.type=="number"){
                dataResult[cat][seg][ind][`${field.name1}total`]={
                  ...dataResult[cat][seg][ind][`${field.name1}total`],
                  
                  ...calculateStatistics(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.["arrRow"]),//,dataResult[cat][seg][ind][`${field.name1}total`][sg])
                  
                }
              }
            })
            otmChoices[seg].compositeFields.forEach(field=>{
              if(field.type=="number"){
                if(dataResult[cat][seg][ind][`${field.name1}total`]!=undefined){
                  Object.keys(dataResult[cat][seg][ind][`${field.name1}total`]).forEach(sg=>{
                    if(sg!==`${field.name1}total` && 
                    sg!==`${field.name1}Media`
                    && sg!==`${field.name1}Median`
                    && sg!==`${field.name1}Maximum`
                    && sg!==`${field.name1}Minimum`
                    && sg!==`%${field.name1}`
                    && sg!==`${field.name1}Count`){
                      dataResult[cat][seg][ind][`${field.name1}total`][sg]={
                        ...dataResult[cat][seg][ind][`${field.name1}total`][sg],
                        
                        ...calculateStatistics(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.["arr"],dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]),
                        ...calculateStatisticsRaw(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.[`${field.name1}RawArray`])
                      }
                      if(dataResult[cat][seg][ind][`${field.name1}total`]?.["totalRow"]==undefined)
                        dataResult[cat][seg][ind][`${field.name1}total`]["totalRow"]=0
                      if(dataResult[cat][seg][ind][`${field.name1}total`]?.["arrRow"]==undefined)
                        dataResult[cat][seg][ind][`${field.name1}total`]["arrRow"]=[]
                      let val=0
                      if(dataResult[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.["value"]!=undefined){  
                        val=dataResult[cat][seg][ind][`${field.name1}total`][sg]["value"]
                        dataResult[cat][seg][ind][`${field.name1}total`]["totalRow"]+=val
                        dataResult[cat][seg][ind][`${field.name1}total`]["arrRow"]=[...dataResult[cat][seg][ind][`${field.name1}total`]["arrRow"],val]
                      }
                    }
                  })
                }
              }
              
              
              
            })
            otmChoices[seg].compositeFields.forEach(field=>{
              if(field.type=="number"){
                dataResult[cat][seg][ind][`${field.name1}total`]={
                  ...dataResult[cat][seg][ind][`${field.name1}total`],
                  
                  ...calculateStatistics(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.["arrRow"]),
                }
              }
            })
          }
          
        })
      }
    })
  })
  console.log("datareswithstats",dataResult)
}

const calculatePercentageByGrandTotalsAndInRow=(otmChoices,data)=>{
  Object.keys(dataResult).forEach(mainCat=>{
    Object.keys(dataResult[mainCat]).forEach(seg=>{
      if(mainCat!==seg){
        Object.keys(dataResult[mainCat][seg]).forEach(reg=>{
          otmChoices[seg].normal.forEach(field=>{
            if(field.type=="number"){
              Object.keys(dataResult[mainCat][seg][reg][`${field.name1}total`]).forEach(sg=>{
                if(typeof dataResult[mainCat][seg][reg][`${field.name1}total`][sg]=="object" &&
                sg!=="arrRow"){
                  console.log("punto",dataResult[mainCat][seg][reg][`${field.name1}total`][sg],dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}GrandTotal`])
                  if(dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}GrandTotal`]==undefined){
                    dataResult={
                      ...dataResult,
                      [mainCat]:{
                        ...dataResult[mainCat],
                        [seg]:{
                          ...dataResult[mainCat][seg],
                          [reg]:{
                            ...dataResult[mainCat][seg][reg],
                            [`${field.name1}total`]:{
                              ...dataResult[mainCat][seg][reg][`${field.name1}total`],
                              [sg]:{
                                ...dataResult[mainCat][seg][reg][`${field.name1}total`][sg],
                                [`%of${field.name1}Grandtotal`]:dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]/grandTotals[mainCat][seg][`${field.name1}total`][sg]
                              }
                            }
                          }
                            
                        }
                        
                      }
                    
                    }
                    console.log("punto1",dataResult[mainCat][seg][reg][`${field.name1}total`][sg],dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                  }
                  if(dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}Total`]==undefined){
                    dataResult={
                      ...dataResult,
                      [mainCat]:{
                        ...dataResult[mainCat],
                        [seg]:{
                          ...dataResult[mainCat][seg],
                          [reg]:{
                            ...dataResult[mainCat][seg][reg],
                            [`${field.name1}total`]:{
                              ...dataResult[mainCat][seg][reg][`${field.name1}total`],
                              [sg]:{
                                ...dataResult[mainCat][seg][reg][`${field.name1}total`][sg],
                                [`%of${field.name1}Total`]:dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]/data[mainCat][seg][reg][`${field.name1}total`]
                              }
                            }
                          }
                            
                        }
                        
                      }
                    
                    }
                    console.log("punto1",dataResult[mainCat][seg][reg][`${field.name1}total`][sg],dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                  }
                  if(dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}SubgroupsTotal`]==undefined){
                    dataResult={
                      ...dataResult,
                      [mainCat]:{
                        ...dataResult[mainCat],
                        [seg]:{
                          ...dataResult[mainCat][seg],
                          [reg]:{
                            ...dataResult[mainCat][seg][reg],
                            [`${field.name1}total`]:{
                              ...dataResult[mainCat][seg][reg][`${field.name1}total`],
                              [sg]:{
                                ...dataResult[mainCat][seg][reg][`${field.name1}total`][sg],
                                [`%of${field.name1}SubgroupsTotal`]:dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]/dataResult[mainCat][seg][reg][`${field.name1}total`]["totalRow"]
                              }
                            }
                          }
                            
                        }
                        
                      }
                    
                    }
                    console.log("punto1",dataResult[mainCat][seg][reg][`${field.name1}total`][sg],dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                  }
                }
              })
            }
          })
        
          otmChoices?.[seg]?.compositeFields?.forEach(field=>{
            if(field.type=="number"){
              Object.keys(dataResult[mainCat][seg][reg][`${field.name1}total`]).forEach(sg=>{
                if(typeof dataResult[mainCat][seg][reg][`${field.name1}total`][sg]=="object" &&
                sg!=="arrRow"){
                  console.log("punto",dataResult[mainCat][seg][reg][`${field.name1}total`][sg],dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}GrandTotal`],grandTotals[mainCat],mainCat,seg,field.name1)
                  if(dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}GrandTotal`]==undefined){
                    dataResult={
                      ...dataResult,
                      [mainCat]:{
                        ...dataResult[mainCat],
                        [seg]:{
                          ...dataResult[mainCat][seg],
                          [reg]:{
                            ...dataResult[mainCat][seg][reg],
                            [`${field.name1}total`]:{
                              ...dataResult[mainCat][seg][reg][`${field.name1}total`],
                              [sg]:{
                                ...dataResult[mainCat][seg][reg][`${field.name1}total`][sg],
                                [`%of${field.name1}Grandtotal`]:dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]/grandTotals[mainCat][seg][`${field.name1}total`][sg]
                              }
                            }
                          }
                            
                        }
                        
                      }
                    
                    }
                    console.log("punto1",dataResult[mainCat][seg][reg][`${field.name1}total`][sg],dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                  }
                  if(dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}Total`]==undefined){
                    dataResult={
                      ...dataResult,
                      [mainCat]:{
                        ...dataResult[mainCat],
                        [seg]:{
                          ...dataResult[mainCat][seg],
                          [reg]:{
                            ...dataResult[mainCat][seg][reg],
                            [`${field.name1}total`]:{
                              ...dataResult[mainCat][seg][reg][`${field.name1}total`],
                              [sg]:{
                                ...dataResult[mainCat][seg][reg][`${field.name1}total`][sg],
                                [`%of${field.name1}Total`]:dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]/data[mainCat][seg][reg][`${field.name1}total`]
                              }
                            }
                          }
                            
                        }
                        
                      }
                    
                    }
                    console.log("punto1",dataResult[mainCat][seg][reg][`${field.name1}total`][sg],dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                  }
                  if(dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}SubgroupsTotal`]==undefined){
                    dataResult={
                      ...dataResult,
                      [mainCat]:{
                        ...dataResult[mainCat],
                        [seg]:{
                          ...dataResult[mainCat][seg],
                          [reg]:{
                            ...dataResult[mainCat][seg][reg],
                            [`${field.name1}total`]:{
                              ...dataResult[mainCat][seg][reg][`${field.name1}total`],
                              [sg]:{
                                ...dataResult[mainCat][seg][reg][`${field.name1}total`][sg],
                                [`%of${field.name1}SubgroupsTotal`]:dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]/dataResult[mainCat][seg][reg][`${field.name1}total`]["totalRow"]
                              }
                            }
                          }
                            
                        }
                        
                      }
                    
                    }
                    console.log("punto1",dataResult[mainCat][seg][reg][`${field.name1}total`][sg],dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`%of${field.name1}total`])
                  }
                }
              })
            }
          })
        })
      }
    })
    
  })
}

const calculateGrandTotals=(otmChoices)=>{
  grandTotals={}
  Object.keys(dataResult).forEach(mainCat=>{
    if(grandTotals[mainCat]==undefined)
      grandTotals={...grandTotals,[mainCat]:{}}
    
    Object.keys(dataResult[mainCat]).forEach(seg=>{
      if(mainCat!==seg){
        if(grandTotals[mainCat][seg]==undefined)
          grandTotals={
            ...grandTotals,
            [mainCat]:{
              ...grandTotals[mainCat],
              [seg]:{}
            }
          }
        Object.keys(dataResult[mainCat][seg]).forEach(reg=>{
          otmChoices[seg].normal.forEach(field=>{
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
                        [`superSetArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`superSetArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][`${field.name1}total`]],
                          superSetCountArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`superSetCountArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][`${field.name1}Count`]],
                          subsetsArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`subsetsArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][`totalRow`]],
                          subsetsCountArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`subsetsCountArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][`totalCount`]],
                      }
                    }
                  }
                }
                     
              Object.keys(dataResult[mainCat][seg][reg][`${field.name1}total`]).forEach(sg=>{
                if(typeof dataResult[mainCat][seg][reg][`${field.name1}total`][sg]=="object" &&
                sg!=="arrRow"){
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
                    dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`${field.name1}RawArray`].forEach(p=>{
                      sumTotalRaw+=p
                      sumCountRaw=dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`${field.name1}RawArray`].length
                    })
                  grandTotals={
                    ...grandTotals,
                    [mainCat]:{
                      ...grandTotals[mainCat],
                      [seg]:{
                        ...grandTotals[mainCat][seg],
                        [`${field.name1}total`]:{
                          ...grandTotals[mainCat][seg][`${field.name1}total`],
                          [sg]:grandTotals[mainCat][seg][`${field.name1}total`][sg]+dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"],
                          [`${sg}CountArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}CountArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["totalCount"]],
                          [`${sg}Array`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}Array`],dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]],
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
                        [`superSetArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`superSetArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][`${field.name1}total`]],
                          superSetCountArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`superSetCountArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][`${field.name1}Count`]],
                          subsetsArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`subsetsArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][`totalRow`]],
                          subsetsCountArray:[...grandTotals[mainCat][seg][`${field.name1}total`][`subsetsCountArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][`totalCount`]],
                      }
                    }
                  }
                }

                     
              Object.keys(dataResult[mainCat][seg][reg][`${field.name1}total`]).forEach(sg=>{
                if(typeof dataResult[mainCat][seg][reg][`${field.name1}total`][sg]=="object" &&
                sg!=="arrRow"){
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
                    dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`${field.name1}RawArray`].forEach(p=>{
                      sumTotalRaw+=p
                      sumCountRaw=dataResult[mainCat][seg][reg][`${field.name1}total`][sg][`${field.name1}RawArray`].length
                    })
                  grandTotals={
                    ...grandTotals,
                    [mainCat]:{
                      ...grandTotals[mainCat],
                      [seg]:{
                        ...grandTotals[mainCat][seg],
                        [`${field.name1}total`]:{
                          ...grandTotals[mainCat][seg][`${field.name1}total`],
                          [sg]:grandTotals[mainCat][seg][`${field.name1}total`][sg]+dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"],
                          
                          [`${sg}Array`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}Array`],dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]],
                          [`${sg}CountArray`]:[...grandTotals[mainCat][seg][`${field.name1}total`][`${sg}CountArray`],dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["totalCount"]],
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

  console.log("gtotalsacum",grandTotals)
}

const calculateGrandTotalsStatistics=(otmChoices,order,subsets,firstCatNormalFields)=>{
  let firstCats
  let pivote
  
  Object.keys(grandTotals).forEach(mainCat=>{
  
    Object.keys(grandTotals[mainCat]).forEach(seg=>{

      if(mainCat.startsWith("getData"))
        firstCats=firstCatNormalFields[mainCat].otm
      else
        firstCats=otmChoices[mainCat].otm
      firstCats.forEach(x=>{
        if(order[1][x].includes(seg))
          pivote=x
      })
      console.log("ssio",subsets,pivote,mainCat,seg)

      otmChoices[seg].normal.forEach(field=>{
        if(field.type=="number"){
          grandTotals[mainCat][seg][`${field.name1}total`]={
            ...grandTotals[mainCat][seg][`${field.name1}total`],
            [`statSuperSetArray`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`superSetArray`])},
            [`statSuperSetArrayCount`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`superSetCountArray`])},
            [`statSubsetsArray`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`subsetsArray`])},
            [`statSubsetsArrayCount`]:{...calculateStatistics(grandTotals[mainCat][seg][`${field.name1}total`][`subsetsCountArray`])}
            
          }
       
  Object.keys(subsets[pivote]).forEach(sg=>{
            console.log("ssio",mainCat,seg,field.name1,grandTotals[mainCat][seg][`${field.name1}total`][`${sg}Array`],grandTotals[mainCat][seg][`${field.name1}total`][`${sg}CountArray`])
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
  console.log("grandTotalStats",grandTotals)
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
const calculateStatisticsRaw=(arr,ivar)=>{
  let res={}
  res["minRaw"]=0
  res["maxRaw"]=0
  res["mediaRaw"]=0
  res["medianRaw"]=0
  res["totalCountRaw"]=0
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
    return res
  }
  return res
}