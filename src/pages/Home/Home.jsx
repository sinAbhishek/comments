import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, query, collection } from "firebase/firestore";
import PostModal from "../../components/PostModal";
import { db } from "../../firebase";
import Posts from "../../components/Posts";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [data, setdata] = useState([]);
  const [user, setuser] = React.useState("");
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setuser(user);
        // ...
      } else {
        navigate("/login");
      }
    });
  }, []);
  useEffect(() => {
    const q = query(collection(db, "Posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const array = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());

        array.push(doc.data());
        console.log(doc.data()[0]);
        console.log(array[0]);
      });
      setdata(array);
    });
  }, []);

  useEffect(() => {
    data[0] && console.log(data);
  }, [data]);
  return (
    <div className=" w-screen pt-[55px] h-screen overflow-y-auto flex justify-center bg-black">
      <div className="">
        <button
          onClick={() => handleOpen()}
          className="absolute max-[768px]:bottom-4 z-30  min-[768px]:top-[55px] left-2 bg-sky-500 text-white font-semibold w-max px-[20px] py-2 rounded-full flex items-center justify-center"
        >
          Create post
        </button>
      </div>
      <PostModal open={open} handleClose={handleClose} />
      <div className=" w-[55%] max-[768px]:w-[70%] ">
        {data &&
          data.map((post) => (
            <div
              onClick={(e) => {
                navigate(`/post/${post.id}`);
              }}
              className="border-[1px] border-slate-800"
            >
              <Posts posts={post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
