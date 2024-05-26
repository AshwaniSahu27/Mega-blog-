import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    posts:[]
}

export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        addPost(state,action){
            state.posts = action.payload
        },
        getPost(state){
          return state
        }
    }
})
export const {addPost,getPost} = postSlice.actions
export default  postSlice.reducer