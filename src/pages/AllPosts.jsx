import React, { useEffect, useState } from "react";
import { PostCard } from "../components";
import services from "../appwrite/config";
import Loading from "../components/Loading/Loading";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    services.getPosts([]).then((post) => {
      setPosts(post.documents);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="allPosts px-10 py-10">
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
    </div>
  );
}

export default AllPosts;
