import { useState } from "react";
import Logs from "./AllLogs";



export default function Form(){
  const [URL, setURL] = useState("")

  const onchange = (e) => {
    setURL(e.target.value)
  }

  function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}
  const handleSubmit = async() => {
    await fetch("http://127.0.0.1:8000/",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
    },
      body: JSON.stringify({url:URL})
    })
  }
  return (
    <>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Please give the URL for Vulnerability Scan</label>
          <textarea onChange={onchange} className="form-control" placeholder="eg: http://127.0.0.1:4000 or http://localhost:4000"id="exampleFormControlTextarea1" name="url" rows="3" autoComplete="off" value={URL} style={{ resize: "none" }}></textarea>
        </div>
        <div className="d-flex mt-4 justify-content-end"><button type="submit" className="btn btn-primary" onClick={handleSubmit}>Run Scan</button></div>
        <Logs/>
    </>
  )
}

