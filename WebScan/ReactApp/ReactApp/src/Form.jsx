
import { useState } from "react";
import Logs from "./AllLogs";
export default function Form(){

  return (
    <>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Please give the URL for Vulnerability Scan</label>
          <textarea onChange={onchange} className="form-control" placeholder="eg: http://127.0.0.1:4000"id="exampleFormControlTextarea1" name="url" rows="3" autoComplete="off" style={{ resize: "none" }}></textarea>
        </div>
        <div className="d-flex mt-4 justify-content-end"><button type="submit" className="btn btn-primary">Run Scan</button></div>
        <Logs/>
    </>
  )
}

