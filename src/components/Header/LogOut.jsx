import React from 'react'
import authServices from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/userDataSlice'
import { useNavigate } from 'react-router-dom'

function LogOut() {
   const dispatch = useDispatch()
  const navigate = useNavigate()

    function handleClick(){
        authServices.logout().then(()=>{
         dispatch(logout())
        })
        navigate("/")
    }

  return (
      <button  className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={handleClick}>
        LogOut
      </button>
  )
}

export default LogOut