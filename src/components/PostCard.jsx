import React, { useState } from "react";
import services from "../appwrite/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostCard({post}) {
    const {$id,title,blogImage} = post;
    const [hover,setHover] = useState(false);
    const currentUserId = useSelector((state)=>state.userInfo)
    
    function handleClick(e){

      if(currentUserId.status){
        if(e.target.id==currentUserId.userData.$id){
          setHover(true)
        }
      }
    }

  return (
    <div onMouseEnter={handleClick} onMouseLeave={()=>setHover(false)} className=" relative">
    <Link to={`/post/${$id}`}>
    <div  id={post.userId}  className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
            <img src={services.getFilePreview(blogImage)} alt={title}
            className='rounded-xl' />
        </div>
        <h2
        className='text-xl font-bold'
        >{title}</h2>
        
       
    </div>
    </Link>
    <Link  to={`/edit-post/${$id}`} className={`absolute ${hover?"visible scale-1":"invisible scale-0"} transition-all  duration-75  top-3 right-3 py-1 px-4 rounded-lg bg-emerald-200 `}>Edit</Link>
    </div>
  );
}

export default PostCard;
