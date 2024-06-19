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
        <div className="h-[50vh] w-full bg-slate-700 py-8 text-center">
          <div className="flex flex-wrap">
            <div className="w-full p-2">
              <h1
                onClick={() => dispatch(logOpen())}
                className="cursor-pointer text-2xl font-bold hover:text-gray-500"
              >
                Login to read posts
              </h1>
              <h1 className="mt-5 text-zinc-900 flex flex-col justify-start items-center" >
                Here is test Command To login: 

                <h2 className=" text-blue-400 text-2xl">&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Email  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: test@test.com</h2>
                <h2 className=" text-green-400 text-2xl"> password &nbsp;:&nbsp; test1234</h2>
                 
                 
              </h1>

            </div>
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
