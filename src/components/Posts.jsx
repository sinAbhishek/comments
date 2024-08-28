import React, { useState } from "react";
import ReplyModal from "./ReplyModal";
import { FaRegComment } from "react-icons/fa";
const Posts = ({ posts }) => {
  const handleCloseReply = () => setOpenReply(false);
  const [openReply, setOpenReply] = useState(false);
  const handleOpenReply = () => setOpenReply(true);
  return (
    <div className=" px-4 pt-1 pb-4 relative  ">
      <div className=" w-full ">
        <div className=" flex items-center h-full gap-2">
          <img
            className=" w-10 h-10 rounded-full border border-slate-500"
            src={posts.photourl}
            alt=""
          />
          <p className=" text-white">{posts.username}</p>
        </div>
      </div>
      <p className=" text-slate-200 pl-[40px]">{posts.Content}</p>
      <p>{posts.userid}</p>

      <ReplyModal
        openReply={openReply}
        handleCloseReply={handleCloseReply}
        activepost={posts}
      />
      <div className=" absolute bottom-2 left-[55px] mt-2 flex items-center gap-1">
        <button className=" text-slate-200 " onClick={() => handleOpenReply()}>
          <FaRegComment size={"1.1rem"} />
        </button>
        <p className=" text-slate-50">{posts.Replies?.length}</p>
      </div>
    </div>
  );
};

export default Posts;
