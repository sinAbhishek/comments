"use client";

import React, { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const check = () => {
  console.log(auth.currentUser);
};

const Login = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        navigate("/");
        // ...
      } else {
        // User is signed out
        // ...
        // navigate("/login");
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
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(auth.currentUser);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
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
