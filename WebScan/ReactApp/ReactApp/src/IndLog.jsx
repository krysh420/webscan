
import styles from "./Home.module.css"
export default function IndLogs(props){
    const {log,resLog}=props
    return(
        <>
        <div className={`card my-4 ${styles.cardStyle}`}>
                    <div className="card-body d-flex 
                     align-items-center">
                            <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" style={{marginBottom:"2px"}} viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                            </svg></div>
                        <div className="text mx-3">
                        <h4 className="card-title mb-0">{log}</h4>
                        <p className="card-title fs-5 mb-0">
                        {resLog.line}</p>
                        </div>
                    </div>
                </div>
        </>
    )
}