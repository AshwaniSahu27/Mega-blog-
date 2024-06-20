import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userInfo.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (id) {
      appwriteService.getPost(id).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [id, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.blogImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="px-5 post py-8 md:flex md:gap-3">
      <div className="md:w-1/2">
        <div className="relative flex w-full flex-col justify-center rounded-xl border p-2 px-3 py-4">
          <img
            src={appwriteService.getFilePreview(post.blogImage)}
            alt={post.title}
            className="max-h-[90vh] w-full rounded-xl object-cover  "
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="mr-3 rounded-md bg-green-400/50 px-4 py-2">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500/60  " onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}

          <div className=" w-full px-1 py-2">
            <h1 className="text-2xl font-bold text-white">{post.title}</h1>
          </div>
        </div>
      </div>

      <div className="browser-css rounded-lg bg-blue-200 px-2 py-1 md:w-1/2 ">
        {parse(post.content)}
      </div>
    </div>
  ) : null;
}
