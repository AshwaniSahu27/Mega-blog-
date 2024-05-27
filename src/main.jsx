import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import MyPosts from './pages/MyPosts.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Post from './pages/Post.jsx'
import Error from './pages/Error.jsx'
import NetworkError from './pages/NetworkError.jsx'



const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
   errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/add-post",
        element:<AddPost/>
      },
      {
        path:"/edit-post/:name",
        element:<EditPost/>
      },
      {
        path:"/my-posts",
        element:(
          <AuthLayout >
            <MyPosts/>
          </AuthLayout>
        )
      },
      {
        path:"/post/:id",
        element:<Post/>
      }
     
    ]
  },
  {
    path:"/network-error",
    element:<NetworkError/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>

)
