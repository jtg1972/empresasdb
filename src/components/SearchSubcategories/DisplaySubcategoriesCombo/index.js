import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentCategoryId } from '../../../redux/category/actions'

const DisplaySubcategoriesCombo = ({
  subCategories,
  setIsSearching,
  toggleDialog
}) => {
  const dispatch=useDispatch()
  useEffect(()=>{
    return ()=>setIsSearching(false)
  }
  ,[])
  return (
    subCategories.length>0
    &&
    <div className="containerCombo">
      <div className="scrollCombo">
      {subCategories.map((sc,i)=>
        <div 
        className="combo"
        key={i}
        onClick={()=>{
          //console.log("sctype",sc.typeOfCategory)
          if(sc.typeOfCategory==1){
            setIsSearching(false)
            dispatch(setCurrentCategoryId(sc.id))
          }else if(sc.typeOfCategory==0){
            setIsSearching(false)
            dispatch(setCurrentCategoryId(sc.id))
            toggleDialog()

          }
        }}>
          {sc.name}
          {sc.typeOfCategory==1
          ?
          "(category)"
          :
          "(product)"
          }
        </div>

      )}

      </div>

    </div>
  )
}

export default DisplaySubcategoriesCombo
