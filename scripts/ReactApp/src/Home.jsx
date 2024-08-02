import { useContext, useEffect } from "react";
import Form from "./Form";
import NavBar from "./NavBar";
import ModeContext from "../context/mode/modeContext";
import Logs from "./AllLogs";



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
    <div className="container" style={{ marginTop: "40px" }}>
      <h1 className="text-center">WebScan - Web Vulnerability Scanner</h1>
      <div className="d-flex justify-content-between">
        <Logs/>
        <Form/>
      </div>
    </div>
    </div>
    </>
  );
  
}