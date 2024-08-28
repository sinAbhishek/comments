import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className=" border-b border-b-slate-600 py-4 px-10 w-full bg-[#131313]">
      <div className=" flex items-center pb-2 gap-2 ">
        <img
          className=" w-10 h-10 rounded-full"
          src={comment.photoUrl}
          alt=""
        />
        <p className=" text-white">{comment.username}</p>
      </div>
      <p className=" text-slate-50">{comment.comment}</p>
    </div>
  );
};

export default Comment;
