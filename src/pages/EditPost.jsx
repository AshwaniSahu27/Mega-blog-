import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import services from '../appwrite/config'
import PostForm from '../components/PostForm/PostForm'

function EditPost() {
    const navigate = useNavigate()
    const {name} = useParams()
    const [post,setPost] = useState()
   
  
    
    useEffect(()=>{
        if(name){
  
        services.getPost(name).then((post)=>{
            setPost(post)
        })}else{
            navigate("/")
        }
    },[name,navigate])


  return (
    <div className='py-4 px-3 bg-[#b49b20]'>
        <PostForm post={post} />
    </div>
  )
}

export default EditPost