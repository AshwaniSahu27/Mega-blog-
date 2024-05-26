import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo";
import { useNavigate } from "react-router-dom";
import LogOut from "./LogOut";
import { logOpen, signOpen } from "../../store/actionsSlice";
import Signup from "../Signup";
import Login from "../Login";

function Header() {
  const authStatus = useSelector((state) => state.userInfo.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state)=>state.actions)

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
    <div className="w-full  bg-[#daebf4]">
      <nav className="flex justify-between py-2 px-3">
        <div>
          <Logo />
        </div>
        <ul className="flex">
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
                  className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
               
              </li>

            ) : null
          )}
           {state.loginOpen &&<Login/> }
           {state.signupOpen &&<Signup/> }
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
