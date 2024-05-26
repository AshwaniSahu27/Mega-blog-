import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authServices from "../appwrite/auth";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { login as authLogin} from "../store/userDataSlice";
import Input from "./Input";
import Button from "./Button";
import { createPortal } from "react-dom";
import { close, signOpen } from "../store/actionsSlice";


function Login() {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const state = useSelector((state)=>state.actions)

  const login = async (data) => {
    setError("");
    const session = await authServices.login(data);
    if (session) {
      const userData = await authServices.getCurrentUser();
      if (userData) {
   
        dispatch(authLogin({$id:userData.$id,name:userData.name,status:userData.status, email:userData.email, }));
        dispatch(close())
      }
    }
  };

  function pageClick(){
    dispatch(close())
  }

  return (
    createPortal(
    <div onClick={pageClick} className={`fixed z-20 top-0 w-full h-screen flex items-center justify-center bg-slate-600/60 ${state.loginOpen?"":"hidden"}`}>
      <div
        onClick={(e)=>e.stopPropagation()}
        className={`mx-auto w-full max-w-lg bg-[#dff1fa] rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
             onClick={()=>dispatch(signOpen())}
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-2">
            <Input
              label="Email: "
              placeholder="Enter your email"
              className="w-full h-10 rounded-md placeholder:px-2"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              className="w-full h-10 rounded-md placeholder:px-2"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button children="Sign In" classname="rouded-lg w-full" />
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
    )
  );
}

export default Login;
