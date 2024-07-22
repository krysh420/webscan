import { useState } from "react";
import Form from "./Form";
import NavBar from "./NavBar";
import styles from "./Home.module.css"

export default function Home(){
  const [Mode, setMode] = useState("Light")

  const toggleMode = () => {
    if (Mode==="Light") {
      document.getElementById("body").style.background="rgb(38 51 73)"
      document.getElementById("body").style.color="#ffffff"
      document.getElementById("NAVBAR").className="navbar navbar-expand-lg navbar-primary navbar-dark bg-dark"
      document.getElementById("exampleFormControlTextarea1").className = `form-control ${styles.inputDark}`
      setMode("Dark")
    } else {
      document.getElementById("body").style.background="#ffffff"
      document.getElementById("body").style.color="#000000"
      document.getElementById("NAVBAR").className="navbar navbar-expand-lg navbar-primary navbar-dark bg-primary"
      document.getElementById("exampleFormControlTextarea1").className = ` form-control ${styles.inputLight}`
      setMode("Light")
    }
  }

  return (
    <>
    <div id="body" style={{paddingBottom:"58px"}}>
    <NavBar toggleMode={toggleMode} mode={Mode} />
    <div className="container" style={{ marginTop: "100px" }}>
      <h1 className="text-center mb-5">WebScan - Web Vulnerability Scanner</h1>
      <Form/>
    </div>
    </div>
    </>
  );
}