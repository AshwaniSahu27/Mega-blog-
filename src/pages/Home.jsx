import React, { useEffect, useState } from "react";
import services from "../appwrite/config";
import AllPosts from "./AllPosts";
import { useDispatch, useSelector } from "react-redux";
import { logOpen } from "../store/actionsSlice";
import Loading from "../components/Loading/Loading";
import authServices from "../appwrite/auth";
import { login } from "../store/userDataSlice";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const status = useSelector((state)=>state.userInfo.status);
  const dispatch = useDispatch()

 useEffect(()=>{

  authServices.getCurrentUser().then((userData) => {
    
    if (userData) {
      dispatch(login(userData));

      services.getPosts([]).then((post) => {
          setPosts(post.documents);
          setLoading(false);
        });

    }
    else{
      setLoading(false);
      setPosts([])
    }
  
  })


 },[status])

  if (loading) {
    return <Loading/>
  } else {

    if (posts.length === 0) {
      return (
        <div className="w-full h-[50vh] py-8 text-center bg-slate-700">
            <div className="flex flex-wrap">
              <div className="p-2 w-full">
                <h1 onClick={()=>dispatch(logOpen())}  className="text-2xl cursor-pointer font-bold hover:text-gray-500">
                  Login to read posts
                </h1>
              </div>
            </div>
        </div>
      );
    }
    if (posts.length > 0) {
      return <AllPosts />
      
      
    }
  }
}

export default Home;
