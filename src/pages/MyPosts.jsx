import React, { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading";
import { useSelector } from "react-redux";
import { PostCard } from "../components";
import services from "../appwrite/config";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state)=>state.userInfo.userData.$id)


  useEffect(() => {
    services.getMyPosts(userId).then((post) => {
      setPosts(post.documents);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="py-10 px-10 bg-[#45474B]">
      <div
        className="flex gap-4 flex-wrap
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
    </div>
  );
}

export default MyPosts;
