import { useEffect, useState } from "react";
import authServices from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "./store/userDataSlice";
import { Footer, Header } from "./components/index";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "./components/Loading/Loading";

function App() {
  

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
