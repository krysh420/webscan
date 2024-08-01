import { useContext, useEffect } from "react";
import Form from "./Form";
import NavBar from "./NavBar";
import ModeContext from "../context/mode/modeContext";



export default function Home(){
  const context = useContext(ModeContext)
  const {OnReloadMode} = context
  useEffect(() => {
    OnReloadMode()
  }, [])
  
  
  return (
    <>
    <div id="body" style={{height:"100vh"}}>
    <NavBar/>
    <div className="container" style={{ marginTop: "100px" }}>
      <h1 className="text-center mb-5">WebScan - Web Vulnerability Scanner</h1>
      <Form/>
    </div>
    </div>
    </>
  );
  
}