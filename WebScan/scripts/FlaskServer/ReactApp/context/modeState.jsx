import { useState } from "react"
import ModeContext from "./modeContext"

const ModeState = (props) => {
    const [Result, setResult] = useState(null)
    const [Mode, setMode] = useState("")
    const [Loading, setLoading] = useState("none")

    
    const mode = localStorage.getItem('CurrentMode')
    const ToggleMode = () => {
        if (!mode) {
            localStorage.setItem('CurrentMode','dark')
            setMode('dark')
            document.getElementById("content").style.backgroundColor="#001a43"
            document.getElementById("content").style.color="#dee9fa"
            
        }
        else if(mode==='light'){
            localStorage.setItem('CurrentMode','dark')
            setMode('dark')
            document.getElementById("content").style.backgroundColor="#001a43"
            document.getElementById("content").style.color="#dee9fa"
            
        }
        else{
            localStorage.setItem('CurrentMode','light')
            setMode('light')
            document.getElementById("content").style.backgroundColor="white"
            document.getElementById("content").style.color="black"
            
        }

    }

    const OnReloadMode = () => {
        const mode = localStorage.getItem('CurrentMode')
        if(mode==='light'){
            setMode('light')
            document.getElementById("content").style.backgroundColor="white"
            document.getElementById("content").style.color="black"
            
        }
        else if(mode==='dark'){
            setMode('dark')
            document.getElementById("content").style.backgroundColor="#001a43"
            document.getElementById("content").style.color="#dee9fa"
            
        }
        


    }
    return(
        <ModeContext.Provider value={{Mode,Result,Loading,setResult,ToggleMode,OnReloadMode,setLoading}}>
            {props.children}
        </ModeContext.Provider>
    )
}

export default ModeState