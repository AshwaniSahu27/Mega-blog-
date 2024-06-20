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
  const state = useSelector((state) => state.actions);
  const [loader, setLoader] = useState(false);

  const signup = async (data) => {
    setError("");
    setLoader(true);
    try {
      const userData = await authServices.createAccount(data);
      if (userData.$id) {
        const userData2 = await authServices.getCurrentUser();

        if (userData2) {
          dispatch(login(userData2));
          dispatch(close());
        }
      } else if (userData.includes("Password")) {
        setError("Password must be at least 8 length!");
      } else if (session.includes("Network")) {
        navigate("/network-error");
      }
      setLoader(false);
    } catch (error) {
      setError(error.message);
    }
  };

  function pageClick() {
    dispatch(close());
  }

  return createPortal(
    <div
      onClick={pageClick}
      className={`fixed top-0 z-20 flex h-screen w-full items-center justify-center backdrop-blur-[3px] ${
        state.signupOpen ? "" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`login mx-auto flex w-full max-w-lg flex-col gap-3 ${
          loader ? "" : ""
        } rounded-xl border border-black/10 p-10`}
      >
        <div
          className={`absolute left-1/2 top-1/2 h-8 w-8  animate-spin rounded-full border-[5px] border-t-blue-400 ${
            loader ? "" : "hidden"
          }`}
        ></div>
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
            className="text-primary font-medium transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className="flex flex-col gap-2">
            <Input
              label="FullName:"
              type="text"
              className="h-10 w-full rounded-md placeholder:px-2"
              placeholder="Enter your fullname"
              {...register("fullname", {
                required: true,
              })}
            />
            <Input
              label="Email:"
              type="email"
              className="h-10 w-full rounded-md placeholder:px-2"
              placeholder="Enter your email"
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
              label="Password:"
              type="password"
              className="h-10 w-full rounded-md placeholder:px-2"
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
    document.getElementById("portal"),
  );
}

export default Signup;
