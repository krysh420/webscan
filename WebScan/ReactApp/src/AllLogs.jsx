import styles from "./Home.module.css"
import {getLogs,getResLogs} from "../Utils/FetchLogs"
import { useEffect, useState } from "react"
import IndLogs from "./IndLog"
import Loading from "./Loading"
import LogsError from "./LogsError"

export default function Logs() {
    const [Logs, setLogs] = useState(null)
    const [ResLogs, setResLogs] = useState(null)
    const [loading, setLoading] = useState(true);

    // const logs = []
    const fetchLogs = async() => {
        const data = await getLogs()
        setLogs(data)
    }


    const fetchResLogs = async() => {
        const data = await getResLogs()
        setResLogs(data)
    }
    useEffect(() => {
      try {
        fetchLogs()
        fetchResLogs()
      } catch (error) {
          return <LogsError/> 
        }
        finally{
            setLoading(false)
        }
    }, [])
    
    if (loading) {
        return  <Loading/>
    }
    
    if (!Logs || !ResLogs) {
        return <div><h2>Results</h2><p className="fs-5">No data available</p></div>;
    }
    return (
        <>
            <div>
                <h2>Results</h2>
                {
                Logs.length===0?
                <div 
                className={`card mt-4 ${styles.cardStyleResult}`}
                > 
                    <div className="card-body d-flex justify-content-between align-items-center">
                            <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" style={{marginBottom:"2px"}} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                            </svg></div>
                        <div className="text">
                        <h5 className="card-title mb-0">
                        All the results shall appear here</h5>
                        </div>
                    </div>
                </div>
                :Logs.map((item,index)=>{ 
                    return <IndLogs key={index} log={item.log} resLog={ResLogs[index].ResLog}/>
                })}  
            </div>
        </>
    )
}