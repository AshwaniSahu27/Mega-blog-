import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOpen } from '../store/actionsSlice'

function AuthLayout({children,authentication = true}) {
  const status =   useSelector((state)=>state.userInfo.status)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true);
  
  useEffect(()=>{
       
      if(!authentication&& status  !== authentication){
        navigate("/")
      }
      setLoading(false)

  },[navigate,status])

  return loading ? <h1>"loading..."</h1> :<>{children}</>
  
}

export default AuthLayout