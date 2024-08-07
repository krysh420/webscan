import { useState } from "react"
import ModeContext from "./modeContext"
import styles from "../../src/Home.module.css"

const ModeState = (props) => {
    const [Result, setResult] = useState(null)
    const [Mode, setMode] = useState("")
    const mode = localStorage.getItem('CurrentMode')
    const ToggleMode = () => {
        if (!mode) {
            localStorage.setItem('CurrentMode','dark')
            setMode('dark')
            document.body.style.backgroundColor="#001a43"
            document.body.style.color="#dee9fa"
            if ( document.getElementById("floatingInput")&&document.getElementsByClassName("form-select")[0]) {
                document.getElementById("floatingInput").className=`form-control ${styles.inputDark}`
            }
            if (document.getElementsByClassName("form-select")[0]) {
                document.getElementsByClassName("form-select")[0].className=`form-select ${styles.inputDark}`
            }
            if(document.getElementById("option1")){
                document.getElementById("option1").style.color="#000000"
            }
            if(document.getElementById("option2")){
                document.getElementById("option2").style.color="#000000"
            }
            if(document.getElementById("option3")){
                document.getElementById("option3").style.color="#000000"
            }
        }
        else if(mode==='light'){
            localStorage.setItem('CurrentMode','dark')
            setMode('dark')
            document.body.style.backgroundColor="#001a43"
            document.body.style.color="#dee9fa"
            if ( document.getElementById("floatingInput")&&document.getElementsByClassName("form-select")[0]) {
                document.getElementById("floatingInput").className=`form-control ${styles.inputDark}`
            }
            if (document.getElementsByClassName("form-select")[0]) {
                document.getElementsByClassName("form-select")[0].className=`form-select ${styles.inputDark}`
            }
            if(document.getElementById("option1")){
                document.getElementById("option1").style.color="#000000"
            }
            if(document.getElementById("option2")){
                document.getElementById("option2").style.color="#000000"
            }
            if(document.getElementById("option3")){
                document.getElementById("option3").style.color="#000000"
            }
        }
        else{
            localStorage.setItem('CurrentMode','light')
            setMode('light')
            document.body.style.backgroundColor="white"
            document.body.style.color="black"
            if ( document.getElementById("floatingInput")&&document.getElementsByClassName("form-select")[0]) {
                document.getElementById("floatingInput").className=`form-control ${styles.inputLight}`
            }
            if (document.getElementsByClassName("form-select")[0]) {
                document.getElementsByClassName("form-select")[0].className=`form-select ${styles.inputLight}`
            }
            if(document.getElementById("option1")){
                document.getElementById("option1").style.color="#000000"
            }
            if(document.getElementById("option2")){
                document.getElementById("option2").style.color="#000000"
            }
            if(document.getElementById("option3")){
                document.getElementById("option3").style.color="#000000"
            }
        }

    }

    const OnReloadMode = () => {
        const mode = localStorage.getItem('CurrentMode')
        if(mode==='light'){
            setMode('light')
            document.body.style.backgroundColor="white"
            document.body.style.color="black"
            if ( document.getElementById("floatingInput")&&document.getElementsByClassName("form-select")[0]) {
                document.getElementById("floatingInput").className=`form-control ${styles.inputLight}`
            }
            if (document.getElementsByClassName("form-select")[0]) {
                document.getElementsByClassName("form-select")[0].className=`form-select ${styles.inputLight}`
            }
            if(document.getElementById("option1")){
                document.getElementById("option1").style.color="#000000"
            }
            if(document.getElementById("option2")){
                document.getElementById("option2").style.color="#000000"
            }
            if(document.getElementById("option3")){
                document.getElementById("option3").style.color="#000000"
            }
        }
        else if(mode==='dark'){
            setMode('dark')
            document.body.style.backgroundColor="#001a43"
            document.body.style.color="#dee9fa"
            if ( document.getElementById("floatingInput")&&document.getElementsByClassName("form-select")[0]) {
                document.getElementById("floatingInput").className=`form-control ${styles.inputDark}`
            }
            if (document.getElementsByClassName("form-select")[0]) {
                document.getElementsByClassName("form-select")[0].className=`form-select ${styles.inputDark}`
            }
            if(document.getElementById("option1")){
                document.getElementById("option1").style.color="#000000"
            }
            if(document.getElementById("option2")){
                document.getElementById("option2").style.color="#000000"
            }
            if(document.getElementById("option3")){
                document.getElementById("option3").style.color="#000000"
            }
        }
        


    }
    return(
        <ModeContext.Provider value={{Mode,Result,setResult,ToggleMode,OnReloadMode}}>
            {props.children}
        </ModeContext.Provider>
    )
}

export default ModeState