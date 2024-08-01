import { useState } from "react"
import ModeContext from "./modeContext"
import styles from "../../src/Home.module.css"

const ModeState = (props) => {

    const [Mode, setMode] = useState("")
    const mode = localStorage.getItem('CurrentMode')
    const ToggleMode = () => {
        if (!mode) {
            localStorage.setItem('CurrentMode','dark')
            setMode('dark')
            document.body.style.backgroundColor="#001a43"
            document.body.style.color="#dee9fa"
            if ( document.getElementById("exampleFormControlTextarea1")) {
                document.getElementById("exampleFormControlTextarea1").className=`form-control ${styles.inputDark}`
            }
        }
        else if(mode==='light'){
            localStorage.setItem('CurrentMode','dark')
            setMode('dark')
            document.body.style.backgroundColor="#001a43"
            document.body.style.color="#dee9fa"
            if (document.getElementById("exampleFormControlTextarea1")) {
                document.getElementById("exampleFormControlTextarea1").className=`form-control ${styles.inputDark}`
            }
        }
        else{
            localStorage.setItem('CurrentMode','light')
            setMode('light')
            document.body.style.backgroundColor="white"
            document.body.style.color="black"
            if (document.getElementById("exampleFormControlTextarea1")) {
                document.getElementById("exampleFormControlTextarea1").className=`form-control ${styles.inputLight}`
            }
        }

    }

    const OnReloadMode = () => {
        const mode = localStorage.getItem('CurrentMode')
        if(mode==='light'){
            setMode('light')
            document.body.style.backgroundColor="white"
            document.body.style.color="black"
            if ( document.getElementById("exampleFormControlTextarea1")) {
                document.getElementById("exampleFormControlTextarea1").className=`form-control ${styles.inputLight}`
            }
        }
        else if(mode==='dark'){
            setMode('dark')
            document.body.style.backgroundColor="#001a43"
            document.body.style.color="#dee9fa"
            if (document.getElementById("exampleFormControlTextarea1")) {
                document.getElementById("exampleFormControlTextarea1").className=`form-control ${styles.inputDark}`
            }
        }
        


    }
    return(
        <ModeContext.Provider value={{Mode,ToggleMode,OnReloadMode}}>
            {props.children}
        </ModeContext.Provider>
    )
}

export default ModeState