import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, query, collection } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
const SinglePost = () => {
  const [data, setdata] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const q = query(collection(db, "Posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        // doc.data().forEach((c) => array.push(c));

        array.push(doc.data());
        console.log(doc.data()[0]);
        console.log(array[0]);
      });

      const post = array.find((p) => p.id === id);
      setdata(post);
    });
  }, []);
  return (
    <div className=" bg-black pt-[55px] w-screen flex justify-center h-max overflow-y-auto  ">
      <div className=" w-[55%] flex flex-col items-center border-x border-x-slate-500 ">
        <div className=" w-full">{data && <Posts posts={data} />}</div>
        <hr className=" text-slate-600 w-full" />
        {data && data.Replies?.map((c) => <Comment comment={c} />)}
      </div>
    </div>
  );
};

export default SinglePost;
