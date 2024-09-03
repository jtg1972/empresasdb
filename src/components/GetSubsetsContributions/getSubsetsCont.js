import { valueToObjectRepresentation } from "@apollo/client/utilities"

export const getSubsetsCont=({
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
}

const initiateStatistics=(dataResult,otmChoices)=>{
  console.log("dresult",dataResult)
  Object.keys(dataResult).forEach(cat=>{
    Object.keys(dataResult[cat]).forEach(seg=>{
      Object.keys(dataResult[cat][seg]).forEach(ind=>{
        //if(cat!=seg){
          let arr=[]
          console.log("checarpipo",dataResult[cat][seg],ind)
          if(dataResult[cat][seg][ind]!=undefined){
            
            otmChoices[seg].normal.forEach(field=>{
              if(field.type=="number"){
                if(dataResult[cat][seg][ind][`${field.name1}total`]!=undefined){
                  Object.keys(dataResult[cat][seg][ind][`${field.name1}total`]).forEach(sg=>{
                    
                    dataResult[cat][seg][ind][`${field.name1}total`][sg]={
                      ...dataResult[cat][seg][ind][`${field.name1}total`][sg],
                      
                      ...calculateStatistics(dataResult[cat][seg][ind][`${field.name1}total`][sg]["arr"],dataResult[cat][seg][ind][`${field.name1}total`][sg])
                    }
                    
                    if(dataResult[cat][seg][ind][`${field.name1}total`]?.["totalRow"]==undefined)
                      dataResult[cat][seg][ind][`${field.name1}total`]["totalRow"]=0
                    let val
                    if(dataResult[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.["value"]!=undefined){  
                      val=dataResult[cat][seg][ind][`${field.name1}total`][sg]["value"]
                      dataResult[cat][seg][ind][`${field.name1}total`]["totalRow"]+=val
                    }
                  })
                }
              }
              
              
              
            })
            otmChoices[seg].compositeFields.forEach(field=>{
              if(field.type=="number"){
                if(dataResult[cat][seg][ind][`${field.name1}total`]!=undefined){
                  Object.keys(dataResult[cat][seg][ind][`${field.name1}total`]).forEach(sg=>{
                    
                    dataResult[cat][seg][ind][`${field.name1}total`][sg]={
                      ...dataResult[cat][seg][ind][`${field.name1}total`][sg],
                      
                      ...calculateStatistics(dataResult[cat][seg][ind][`${field.name1}total`][sg]["arr"],dataResult[cat][seg][ind][`${field.name1}total`][sg])
                    }
                    if(dataResult[cat][seg][ind][`${field.name1}total`]?.["totalRow"]==undefined)
                      dataResult[cat][seg][ind][`${field.name1}total`]["totalRow"]=0
                    let val=0
                    if(dataResult[cat]?.[seg]?.[ind]?.[`${field.name1}total`]?.[sg]?.["value"]!=undefined){  
                      val=dataResult[cat][seg][ind][`${field.name1}total`][sg]["value"]
                      dataResult[cat][seg][ind][`${field.name1}total`]["totalRow"]+=val
                    }
                  })
                }
              }
              
              
              
            })
          }
        //}
      })
    })
  })
  console.log("datareswithstats",dataResult)
}
  
 

const calculateStatistics=(arr,ivar)=>{
  let res={}
  if(arr.length>0){
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
}