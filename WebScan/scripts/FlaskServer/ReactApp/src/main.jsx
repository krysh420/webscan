import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ModeState from "../context/mode/modeState";
import License from './License';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ModeState><Home/></ModeState>
  },
  {
    path: "/about",
    element: <ModeState><About/></ModeState>
  },
  {
    path: "/license",
    element: <ModeState><License/></ModeState>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
