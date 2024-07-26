import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/about",
    element: <About/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
