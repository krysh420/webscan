import { useContext } from "react";
import { Link , useLocation, useNavigate  } from "react-router-dom";
import ModeContext from "../context/modeContext";


const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(ModeContext)
  const {Mode,ToggleMode} = context

  const toggleNav = () => {
    if (document.getElementById("content").style.transform==="translateY(0vh)") {
      document.getElementById("content").style.transform = "translateY(-26vh)"
      document.getElementById("content").style.transition = "transform 0.5s"
    } else {
      document.getElementById("content").style.transform = "translateY(0vh)"
      document.getElementById("content").style.transition = "transform 0.5s"
    }
  }

  return (
    <>
      <nav className='bg-blue-600 text-[#f6faff]'>
        <div className="content py-4 px-20 flex justify-between items-center max-sm:px-8">
          <Link to="/"><div className="logo text-2xl flex sm:w-36 justify-between items-center">
            <div className="img"><img src="logo.png"  width="36px" /></div>
            <p className="font-semibold max-sm:hidden">WebScan</p>
          </div></Link>
          <div className="options text-md hidden sm:block">
            <ul className='flex'>
              <li className='mx-4'><Link to="/" className={`text-blue-300 ${location.pathname==="/"?"text-purple-50":""}`}>Home</Link></li>
              <li className='mx-4'><Link to="/about" className={`text-blue-300 ${location.pathname==="/about"?"text-purple-50":""}`}>About</Link></li>
              <li className='mx-4'><Link to="/license" className={`text-blue-300 ${location.pathname==="/license"?"text-purple-50":""}`}>License</Link></li>
            </ul>
          </div>
          <div className="mode">
            <button type="button" onClick={ToggleMode}>
          {Mode==='light'|!Mode?
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>:
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" style={{color:"white"}} className="bi bi-moon" viewBox="0 0 16 16">
  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
</svg>}
            </button>
          </div>
          <div className="hamburger sm:hidden" onClick={toggleNav}><p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          </p>
          </div>
        </div>
        <div className="navbarSm flex justify-center sm:hidden">
          <ul className='pb-6'>
            <li><button onClick={()=>{navigate("/")}} className={`py-2 px-5 mb-2 w-fit border hover:bg-blue-100 hover:text-blue-950 rounded-[6px] ${location.pathname==="/"?"text-blue-950 bg-blue-100":""}`}>Home</button></li>
            <li><button onClick={()=>{navigate("/about")}} className={`py-2 px-5 mb-2 w-fit border hover:bg-blue-100 hover:text-blue-950 rounded-[6px] ${location.pathname==="/about"?"text-blue-950 bg-blue-100":""}`}>About</button></li>
            <li><button onClick={()=>{navigate("/license")}} className={`py-2 px-4 mb-2 w-fit border hover:bg-blue-100 hover:text-blue-950 rounded-[6px] ${location.pathname==="/license"?"text-blue-950 bg-blue-100":""}`}>License</button></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar