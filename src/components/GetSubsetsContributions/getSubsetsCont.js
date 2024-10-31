import { valueToObjectRepresentation } from "@apollo/client/utilities"

let dataResult={}
let grandTotals={}
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

const createVars=(vars1)=>{
  let {vars,cat,seg,gi,rs,x,ss,ssData,data}=vars1
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
      calculateContributions({cat,ssData,seg,dataResult,data,gi,rs,field,x,ss})
    }
  })

}

/*133 140 165 166 169 170
/*171 173 174 175 176 177 178 179*/

const initializeVarsAndSubsets=(vars)=>{
  let {cat,ssData,seg,data,otmChoices,x,ss}=vars
  Object.keys(ssData[seg]).forEach((rs,ind1)=>{
    Object.keys(data[cat][seg]).forEach(gi=>{
        createVars({vars:otmChoices[seg].normal,cat,seg,gi,rs,x,ss,ssData,data}) 
        createVars({vars:otmChoices[seg].compositeFields,cat,seg,gi,rs,x,ss,ssData,data})
    })
  })
}

const initializeSegAndInd=(vars)=>{
  let {cat,seg,data,x}=vars
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
    otmChoices
  }=vars
  categories.forEach((x)=>{
    if(subsets[x]!=undefined){
      Object.keys(subsetsData[x]).forEach(ss=>{
        let ssData=subsetsData[x][ss]
        Object.keys(ssData).forEach(seg=>{
          initializeSegAndInd({cat,seg,data})
          initializeVarsAndSubsets({cat,ssData,seg,data,otmChoices,x,ss})
        })
      })
    } 
  })  
}

const loadNormalFields=(vars)=>{
  const {cat,data}=vars
  Object.keys(data[cat][cat]).forEach(l=>{
    dataResult[cat][cat][data[cat][cat][l]["id"]]=data[cat][cat][l]
  })
}


export const getSubsetsCont=({
  data,
  subsetsData,
  subsets,
  otmChoices,
  firstCatNormalFields
})=>{
  console.log("datamain",data)
  dataResult={}
  if(data!=undefined){
    
    Object.keys(data).forEach(cat=>{
      if(dataResult[cat]==undefined)
        dataResult={...dataResult,[cat]:{}}
      if(dataResult[cat][cat]==undefined){
        dataResult={...dataResult,[cat]:{...dataResult[cat],[cat]:{}}}
        loadNormalFields({cat,data})
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
            otmChoices
          })
        }else{
          doImmediateSonsMath({
            categories:otmChoices[cat].otm,
            data,
            subsetsData,
            subsets,
            dataResult,
            cat,
            otmChoices
          })
        }
      }
    })
    initiateStatistics(otmChoices)
    calculateGrandTotals(otmChoices)
    calculatePercentageByGrandTotalsAndInRow(otmChoices,data)
  }
  console.log("dataResult",dataResult)/*,subsetsData,data)*/
  return dataResult
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
                  
                  ...calculateStatistics(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.["arrRow"])//,dataResult[cat][seg][ind][`${field.name1}total`][sg])
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
                        
                        ...calculateStatistics(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.["arr"],dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg])
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
                  
                  ...calculateStatistics(dataResult?.[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.["arrRow"])//,dataResult[cat][seg][ind][`${field.name1}total`][sg])
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
                      [`${field.name1}total`]:{}
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
                            [sg]:0
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
                          [sg]:grandTotals[mainCat][seg][`${field.name1}total`][sg]+dataResult[mainCat][seg][reg][`${field.name1}total`][sg]["value"]
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
  
 

const calculateStatistics=(arr,ivar)=>{
  let res={}
  res["min"]=0
  res["max"]=0
  res["media"]=0
  res["median"]=0
  res["totalCount"]=0
  if(arr?.length>0){
    arr=arr.sort((x,y)=>x>y?1:-1)
    res["min"]=arr[0]==null?0:arr[0]
    res["max"]=arr[arr.length-1]==null?0:arr[arr.length-1]
    let suma=0
    arr.forEach(y=>suma+=y)
    res["media"]=suma/arr.length
    let length=arr.length
    let median=0
    if(length%2==1){
      median=arr[Math.floor(length/2)]
    }else{
      median=(arr[(length/2)-1]+arr[(length/2)])/2
    }
    res["median"]=median
    res["totalCount"]=arr.length
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
    res["minRaw"]=arr[0]==null?0:arr[0]
    res["maxRaw"]=arr[arr.length-1]==null?0:arr[arr.length-1]
    let suma=0
    arr.forEach(y=>suma+=y)
    res["mediaRaw"]=suma/arr.length
    let length=arr.length
    let median=0
    if(length%2==1){
      median=arr[Math.floor(length/2)]
    }else{
      median=(arr[(length/2)-1]+arr[(length/2)])/2
    }
    res["medianRaw"]=median
    res["totalCountRaw"]=arr.length
    return res
  }
  return res
}