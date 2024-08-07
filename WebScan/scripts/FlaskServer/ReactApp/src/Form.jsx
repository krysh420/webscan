import { useContext, useState } from "react";
import styles from "./Home.module.css"
import ModeContext from "../context/mode/modeContext";

export default function Form(){
  const context = useContext(ModeContext)
  const {Result,setResult} = context
  const [Data, setData] = useState({URL:"",is_https:""})

  const onchange = (e) => {
    setData({...Data,[e.target.name]:e.target.value})
  }

  const handleSubmit = async() => {
    const resp = await fetch("http://127.0.0.1:5000/getURL",{
      method:"POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({Data})
    })
    const jsonResp = await resp.json()
    setResult(jsonResp)
  }
  return (
    <>
        <div className="mt-5" style={{height:"70vh", width:"35vw", display:"flex", justifyContent:"center", alignItems:"start"}}>
          <h2 className="mt-5">Get Started</h2>
        <div className="px-4" style={{width:"500px", height:"70vh" , border:"1px solid #dddddd", borderRadius:"10px", boxShadow:" 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 5px 1px 0 rgba(0, 0, 0, 0.19)", position:"absolute", display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:"50px"}}>
          <div className="form-floating mt-2"><input value={Data.URL} onChange={onchange} type="text" className={`form-control ${styles.inputLight}`} id="floatingInput" placeholder="name@example.com" name="URL" autoComplete="off" style={{ borderTop:"none", borderLeft:"none", borderRight:"none", borderRadius:"0px" }}/>
          <label htmlFor="floatingInput">URL For Testing</label></div>
          <div className="my-5">
            <select className={`form-select ${styles.inputLight}`} aria-label="Default select example" onChange={onchange} name="is_https" value={Data.is_https}>
              <option style={{color:"#000000"}} id="option1">Are you using https?</option>
              <option style={{color:"#000000"}} id="option2" value="True">Yes</option>
              <option style={{color:"#000000"}} id="option3" value="False">No</option>
            </select>
          </div>
          <div className="d-flex justify-content-end align-items-end " style={{height:"10vh"}}>
            <div><button type="submit" className="btn btn-primary" onClick={handleSubmit}>Run Scan</button></div>
          </div>
        </div>
        </div>
        
    </>
  )
}

