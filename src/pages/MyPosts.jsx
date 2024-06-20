import React, { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import { useSelector } from "react-redux";
import { PostCard } from "../components";
import services from "../appwrite/config";
import { Link } from "react-router-dom";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.userInfo.userData.$id);

  useEffect(() => {
    services.getMyPosts(userId).then((post) => {
      setPosts(post.documents);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="allPosts min-h-screen px-10 py-10">
      {posts.length > 0 && (
        <div
          className="flex flex-wrap gap-4
      "
        >
          {posts.map((post) => {
            return (
              <div key={post.$id} className=" w-[32%]">
                {<PostCard post={post} />}
              </div>
            );
          })}
        </div>
      )}

      {!posts.length >0&&   
      <div className=" relative left-[10vw] w-[70vw] h-[70vw] rounded-full bg-black/15" >
      <div className="absolute top-[5vw] left-[10vw]  w-[50vw] h-[50vw] rounded-full bg-black/25">
      <div className=" relative top-[5vw] left-[10vw]  w-[30vw] h-[30vw] rounded-full bg-black/40" >
         <div>
         <Link to="/add-post" className="absolute cursor-pointer z-10 bg-transparent  top-[5vw] left-[10vw]    w-[10vw] h-[10vw] rounded-full text-[#f70] flex justify-center items-center ">
           Add-Post
        </Link>
        <div className="setting absolute opacity-50 top-[5vw] left-[10vw]   w-[10vw] h-[10vw] rounded-full text-[#f70] flex justify-center items-center border-dashed  border-4 border-[#f70]">

        </div>
         </div>
       

      </div>
      </div>

      </div>

      }


   


    </div>
  );
}

export default MyPosts;
