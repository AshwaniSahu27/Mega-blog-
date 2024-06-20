import React from "react";

function Loading() {
  return (
    <div className="py-10 px-10 allPosts h-screen">
      <div className="flex gap-4 flex-wrap">
        {Array.from({ length: 6 }).map((val,idx) => {
          return (
            <div key={idx} className="w-[32%] h-[40vh] relative bg-gray-400 rounded-xl p-4">

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Loading;
