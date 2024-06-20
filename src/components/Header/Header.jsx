import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import LogOut from "./LogOut";
import { logOpen, signOpen } from "../../store/actionsSlice";
import Signup from "../Signup";
import Login from "../Login";
import search from "../../../public/search.svg"
import press from "../../../public/press.svg"

function Header() {
  const authStatus = useSelector((state) => state.userInfo.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.actions);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <div className="header w-full sticky z-40 top-0 ">
      <nav className="flex justify-between px-3 py-2">
        <div className="flex gap-10 w-full ml-6">

        
        <div>
          <Logo />
        </div>
        <button data-open-modal="" className="bg-black/60 border-[1px]  border-slate-600 rounded-md w-[45%] text-white flex justify-between items-center gap-3">
        
        <div className="flex gap-3">
          <img src={search} alt="" className=" invert ml-2" />
  
          <span className="sl-hidden md:sl-block astro-v37mnknz" aria-hidden="true">
            Search
          </span>

        </div>
        <img src={press} alt="" className="invert  mr-2" />
         
        </button>
        </div>
        
        <ul className="flex w-[70vw] justify-end ">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => {
                    if (item.name == "Login") {
                      dispatch(logOpen());
                      return;
                    } else if (item.name == "Signup") {
                      dispatch(signOpen());
                      return;
                    }

                    navigate(item.slug);
                  }}
                  className="inline-bock rounded-full px-6 py-2 text-[#f70] duration-200 hover:bg-blue-100 hover:text-black"
                >
                  {item.name}
                </button>
              </li>
            ) : null,
          )}
          {state.loginOpen && <Login />}
          {state.signupOpen && <Signup />}
          {authStatus && (
            <li>
              <LogOut />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
