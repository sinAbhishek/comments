import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setuser(user);
        // ...
      } else {
        // User is signed out
        // ...
        setuser("");
      }
    });
  }, []);
  const signout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("success");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="w-screen h-[50px] fixed bg-cyan-900 z-20 flex gap-4 items-center px-3 ">
      {user && (
        <div className=" flex items-center h-full w-max">
          <img
            className=" w-10 h-10 rounded-full"
            src={user?.photoURL}
            alt=""
          />
        </div>
      )}
      <button
        onClick={() => navigate("/")}
        className=" w-max h-8 flex items-center gap-6 text-slate-50 hover:cursor-pointer"
      >
        Home
      </button>
      {!user ? (
        <button
          onClick={() => navigate("/login")}
          className=" absolute right-4 text-white"
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => signout()}
          className=" absolute right-4 text-white"
        >
          Signout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
