import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../appwrite/auth";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../store/userDataSlice";
import Input from "./Input";
import Button from "./Button";
import { createPortal } from "react-dom";
import { close, signOpen } from "../store/actionsSlice";

function Login() {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();
  const state = useSelector((state) => state.actions);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const login = async (data) => {
    setError("");
    setLoader(true);
    const session = await authServices.login(data);
    if (session.$id) {
      const userData = await authServices.getCurrentUser();
      if (userData) {
        dispatch(
          authLogin({
            $id: userData.$id,
            name: userData.name,
            status: userData.status,
            email: userData.email,
          }),
        );
        dispatch(close());
      }
    } else if (session.includes("Password")) {
      setError("Please Enter valid Email or Password");
    } else if (session.includes("Network")) {
      navigate("/network-error");
    }
    setLoader(false);
  };

  function pageClick() {
    dispatch(close());
  }

  return createPortal(
    <div
      onClick={pageClick}
      className={`fixed top-0 z-20 flex h-screen w-full items-center justify-center bg-slate-600/60 ${state.loginOpen ? "" : "hidden"} ${loader ? "" : ""}`}
    >
      <div
        className={`absolute left-1/2 top-1/2 h-8 w-8  animate-spin rounded-full border-[5px] border-t-blue-400 ${loader ? "" : "hidden"}`}
      ></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`mx-auto w-full max-w-lg  rounded-xl border border-black/10 p-10  ${loader ? "bg-[#c0d3dc]" : "bg-[#dff1fa]"}`}
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
            onClick={() => dispatch(signOpen())}
            className="text-primary font-medium transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-2">
            <Input
              label="Email: "
              placeholder="Enter your email"
              className="h-10 w-full rounded-md placeholder:px-2"
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
              className="h-10 w-full rounded-md placeholder:px-2"
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
    document.getElementById("portal"),
  );
}

export default Login;
