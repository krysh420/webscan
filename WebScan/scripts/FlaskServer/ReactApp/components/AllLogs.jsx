import React, { useContext, useEffect, useState } from 'react'
import ModeContext from '../context/modeContext'
import IndLogs from './IndLogs'



const AllLogs = () => {

  const [Logs, setLogs] = useState(null)
  const context = useContext(ModeContext)
  const { Result, Loading } = context
  useEffect(() => {
    if (Result) {
      setLogs(Result.logs)
    }
  }, [Result])
  return (
    <>
      <div className="Logs rounded-lg h-[70vh] w-[56%] max-[1050px]:w-full max-[1050px]:h-[70vh] max-[1050px]:mt-6" style={{border:"1px solid #dddddd", boxShadow:"0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19)"}}>
        <div className="heading text-center my-4 text-3xl font-semibold"><p>Results</p></div>

        <div style={{ overflowY: `${Logs ? "scroll" : "hidden"}`, overflowX: "hidden", maxHeight: "54vh", margin: "20px 10px", }}>
          {Logs ? Logs.length === 0 ? <div
            className="card mt-4 max-w-[350px] mx-6 text-[#00245a] bg-[#dfedff] border border-[#003678] cursor-pointer hover:bg-[#c6e0ff] p-4 rounded-md text-xl font-semibold"
          >
            <div className="flex justify-between items-center">
              <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" style={{ marginBottom: "2px" }} viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
              </svg></div>
              <div className="text ">
                <h5 className="card-title mb-0">
                  {Loading === "none" ? "0 logs. You can try another URL" : "Scan in progress ... Please Wait"} </h5>
              </div>
            </div>
          </div> : Logs.map((item, index) => {
            return <IndLogs key={index} log={item} array={Logs} />
          }) :
            <div
              className="card mt-4 mx-6 text-[#00245a] bg-[#dfedff] border border-[#003678] cursor-pointer hover:bg-[#c6e0ff] max-w-[350px] p-4 rounded-md text-xl font-semibold"
            >
              <div className="card-body flex justify-between items-center">
                <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" style={{ marginBottom: "2px" }} viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg></div>
                <div className="text ml-2">
                  <h5 className="card-title mb-0">
                    {Loading === "block" ? "Scan in progress ... Please Wait" : "All the results shall appear here"}</h5>
                </div>
              </div>
            </div>

          }

          <div role="status" className='ml-[50%] mt-20 ' style={{display:Loading}}>
            <svg aria-hidden="true" className="w-8 h-8 text-blue-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>

        </div>
      </div>
    </>
  )
}

export default AllLogs