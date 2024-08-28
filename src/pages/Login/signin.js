"use client";

import React, { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        // ...
      } else {
      }
    });
  }, []);
  const provider = new GoogleAuthProvider();
  useEffect(() => {
    console.log(auth.currentUser);
  }, [auth]);

  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        const user = result.user;
        console.log(auth.currentUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className=" pt-[50px] w-screen h-screen flex justify-center items-center">
      <button
        className=" w-max px-2 py-2 rounded-md bg-blue-500 text-white font-semibold flex justify-center items-center gap-2"
        onClick={() => signin()}
      >
        <FaGoogle /> Sign in with Google
      </button>
    </div>
  );
};

export default Login;
