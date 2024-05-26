import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    loginOpen:false,
    signupOpen:false

}
export const slice = createSlice({
    name:"action",
    initialState,
    reducers:{
         logOpen(state){
             state.signupOpen = false
            state.loginOpen = true
         },
         signOpen(state){
             state.loginOpen = false
           state.signupOpen = true
         },
         close(state){
            state.loginOpen = false
            state.signupOpen = false
         }
    }
})

export const {logOpen,signOpen,close} = slice.actions
export default slice.reducer