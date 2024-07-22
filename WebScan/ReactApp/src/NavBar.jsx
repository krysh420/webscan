import { Link , useLocation  } from "react-router-dom";
export default function NavBar(props){
  const {toggleMode,mode} = props
  let location = useLocation();
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-primary navbar-dark bg-primary" id="NAVBAR">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">WebScan</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`}  to="/about">About</Link>
            </li>
        </ul>
        </div>
        <div className="form-check form-switch d-flex justify-content-between align-items-center" style={{width:"180px"}}>
          <div style={{color:"white"}}>{mode} Mode</div>
          <div className=""><input className="form-check-input" style={{padding:"10px 20px"}} type="checkbox" role="switch" id="flexSwitchCheckChecked" onClick={toggleMode} /></div>
        </div>
    </div>
    </nav>
    </>
  )
}
