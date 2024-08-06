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
import Feedback from './Feedback';
import Contact from './Contact';


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
  {
    path: "/feedback",
    element: <ModeState><Feedback/></ModeState>
  },
  {
    path: "/contact",
    element: <ModeState><Contact/></ModeState>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
