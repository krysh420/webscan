
import styles from "./Home.module.css"
export default function IndLogs(props){
    const {log,resLog}=props
    return(
        <>
        <div className={`card my-4 ${styles.cardStyleLogs}`}>
                    <div className="card-body d-flex 
                     align-items-center">
                            <div className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle" style={{marginBottom:"2px"}} viewBox="0 0 16 16">
                            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                            </svg></div>
                        <div className="text mx-3">
                        <h4 className="card-title mb-0">{log}</h4>
                        <p className="card-title fs-5 mt-1 mb-0">
                        {resLog}</p>
                        </div>
                    </div>
                </div>
        </>
    )
}