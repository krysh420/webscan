import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ModeState from '../context/modeState.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from '../components/About.jsx'
import License from '../components/License.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ModeState><App/></ModeState>
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
