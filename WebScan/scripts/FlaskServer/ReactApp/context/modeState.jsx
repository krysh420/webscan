import { useEffect, useState } from "react"
import ModeContext from "./modeContext"

const ModeState = (props) => {
    const [Result, setResult] = useState(null)
    const [Mode, setMode] = useState("")
    const [Loading, setLoading] = useState("none")
    const [API_KEY, setAPI_KEY] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:5000/GetKey", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then((resp)=>{return resp.json()}).then((resp)=>{setAPI_KEY(resp.key)})
    }, [])
    
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
        <ModeContext.Provider value={{Mode,Result,Loading,setResult,ToggleMode,OnReloadMode,setLoading,API_KEY}}>
            {props.children}
        </ModeContext.Provider>
    )
}

export default ModeState