import React, { useContext, useState } from 'react'
import ModeContext from '../context/modeContext'
const Form = () => {

  const context = useContext(ModeContext)
  const { setResult, setLoading } = context
  const [Data, setData] = useState({ URL: "", is_https: "", port: "" })
  const [Disabled, setDisabled] = useState(false)

  const onchange = (e) => {
      if (e.target.name==='URL') {
        if ((e.target.value).includes(".") || (!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value)) || (e.target.value)==='')) {
          setDisabled(false)
          setData({ ...Data, [e.target.name]: e.target.value })
        }
        else{
          setDisabled(true)
        }
      }
      if (e.target.name==='port') {
        if ((!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value)) || (e.target.value)==='')) {
          setDisabled(false)
          setData({ ...Data, [e.target.name]: e.target.value })
        }
        else{
          setDisabled(true)
        }
      }
      if (e.target.name==='is_https') {
        setData({ ...Data, [e.target.name]: e.target.value })
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("block")
    const resp = await fetch("http://127.0.0.1:5000/Logs", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Data })
    })
    const jsonResp = await resp.json()
    setResult(jsonResp)
    setLoading("none")
  }
  return (
    <>
      <div className="form rounded-lg h-[70vh] w-[36%] max-[1050px]:w-full max-[1050px]:h-fit max-sm:p-2 max-[1050px]:py-4 max-[1050px]:px-2 " style={{ border: "1px solid #dddddd", boxShadow: " 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 5px 1px 0 rgba(0, 0, 0, 0.19)" }}>
        <div className="heading"><p className='text-2xl font-semibold text-center mt-4'>Get Started</p></div>
        <form className='text-blue-950 flex flex-col min-[1050px]:mt-[10%] min-[1050px]:justify-between'>
          <div className="input flex flex-col px-4 my-2">
            <label htmlFor="url" className={`my-2 ${localStorage.getItem("CurrentMode") === "dark" ? "text-blue-50" : ""}`}>Enter only the IP Address:</label>
            <input type="text" name='URL' onChange={onchange} value={Data.URL} className={`border border-blue-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none ${localStorage.getItem("CurrentMode") === "dark" ? "bg-transparent text-blue-50" : ""}`} id='url' autoComplete='off'/>
          </div>
          <div className="input flex flex-col px-4 my-2">
            <label htmlFor="port" className={`my-2 ${localStorage.getItem("CurrentMode") === "dark" ? "text-blue-50" : ""}`}>Enter the PORT on which the service is running:</label>
            <input type="text" name='port' onChange={onchange} value={Data.port} className={`border border-blue-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none ${localStorage.getItem("CurrentMode") === "dark" ? "bg-transparent text-blue-50" : ""}`} id='port' placeholder='Optional' autoComplete='off'/>
          </div>

          <div className="select flex flex-col px-4 my-2">
            <label htmlFor="ssl" className={`my-2 ${localStorage.getItem("CurrentMode") === "dark" ? "text-blue-50" : ""}`}>Is the service using HTTPS?</label>
            <select name="is_https" id="ssl" className={`border border-blue-700 rounded-lg p-2 focus:ring-2 focus:ring-blue-200 focus:outline-none ${localStorage.getItem("CurrentMode") === "dark" ? "bg-transparent text-blue-50" : ""}`} value={Data.is_https} onChange={onchange}>
              <option value="True" className={`${localStorage.getItem("CurrentMode") === "dark" ? "text-blue-950" : ""}`}>True</option>
              <option value="False" className={`${localStorage.getItem("CurrentMode") === "dark" ? "text-blue-950" : ""}`}>False</option>
            </select>
            <div className="button flex justify-end mt-8"><button disabled={Disabled} className='bg-blue-600 text-blue-50 p-2 rounded-lg disabled:bg-blue-400' onClick={handleSubmit}>Start Scan</button></div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Form