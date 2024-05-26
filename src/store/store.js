import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userDataSlice";
import postReducer from "./userPostsSlice";
import actionReducer from "./actionsSlice"


 export const store = configureStore({
    reducer:{
        userInfo:userReducer,
        posts:postReducer,
        actions:actionReducer
    }
 })