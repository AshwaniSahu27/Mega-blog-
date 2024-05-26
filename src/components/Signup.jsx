import React, { useState } from "react";
import authServices from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/userDataSlice";
import Input from "./Input";
import Logo from "./Logo";
import Button from "./Button";
import { close, logOpen } from "../store/actionsSlice";
import { createPortal } from "react-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const state = useSelector((state)=>state.actions)


  const signup = async (data) => {
    setError("");
    console.log(data);
    try {
      const userData = await authServices.createAccount(data);
      if (userData) {
        const userData2 = await authServices.getCurrentUser();
        console.log(userData2);
        if (userData2) {
          dispatch(login(userData2));
          dispatch(close())
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  function pageClick(){
    dispatch(close())
  }

  return createPortal(

      <div onClick={pageClick} className={`fixed z-20 top-0 w-full h-screen flex items-center justify-center bg-slate-600/60 ${state.signupOpen?"":"hidden"}`} >
        <div onClick={(e)=>e.stopPropagation()}
          className={`mx-auto w-full flex flex-col gap-3 max-w-lg bg-[#dff1fa] rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Create Account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              onClick={() => dispatch(logOpen())}
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(signup)}>
            <div className="flex flex-col gap-2">
              <Input
                label="FullName:"
                type="text"
                className="w-full h-10 rounded-md placeholder:px-2"
                placeholder="Enter your fullname"
                {...register("fullname", {
                  required: true,
                })}
              />
              <Input
                label="Email:"
                type="email"
                className="w-full h-10 rounded-md placeholder:px-2"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password:"
                type="password"
                className="w-full h-10 rounded-md placeholder:px-2"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button children="Sign Up" classname="rouded-lg w-full" />
            </div>
          </form>
        </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Signup;
