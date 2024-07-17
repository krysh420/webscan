"use client"
import { useState } from "react";
import Logs from "./Logs";
export default function Form(){

    const [Todo, setTodo] = useState({title:"",desc:"",deadline:""})
    const onchange = (e) => {
        setTodo({...Todo,[e.target.name]:e.target.value})
    }
    const submit = async() => {
    }
  return (
    <>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Please give the URL for Vulnerability Scan</label>
          <textarea onChange={onchange} value={Todo.desc} className="form-control" placeholder="eg: http://127.0.0.1:4000"id="exampleFormControlTextarea1" name="url" rows="3" autoComplete="off" style={{ resize: "none" }}></textarea>
        </div>
        <div className="d-flex mt-4 justify-content-end"><button type="submit" onClick={submit} className="btn btn-primary">Run Scan</button></div>
        <Logs/>
    </>
  )
}

