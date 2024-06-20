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
  const status = useSelector((state) => state.userInfo.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authServices.getCurrentUser().then((userData) => {
      if (userData.$id) {
        dispatch(login(userData));

        services.getPosts([]).then((post) => {
          setPosts(post.documents);
          setLoading(false);
        });
      } else {
        if (userData.includes("Network")) {
          navigate("/network-error");
        }
        setLoading(false);
        setPosts([]);
      }
    });
  }, [status]);

  if (loading) {
    return <Loading />;
  } else {
    if (posts.length === 0) {
      return (
        <div className="home min-h-screen w-full py-8 flex flex-col justify-start items-center gap-2">
          <div className="mt-8">
              <h1
                onClick={() => dispatch(logOpen())}
                className="cursor-pointer text-3xl text-black font-bold hover:text-gray-500"
              >
                Login to read posts
              </h1>
          </div>
           <h1 className="text-xl text-blue-500/50 mt-32">Here is sample to login</h1>
           <div className="text-[#f70]/70 text-xl">
            <h1>Email : test@test.com</h1>
            <h1>password : test1234</h1>

           </div>

     
           


        </div>
      );
    }
    if (posts.length > 0) {
      return <AllPosts />;
    }
  }
}

export default Home;
