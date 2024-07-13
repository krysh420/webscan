"use client"
import deleteTodos from "../../lib/deleteTodos"

const todo = (props) => {
    return (
        <>
        <div className="card my-3" style={{width: "18rem"}}>
            <div className="card-body">
            <h4 className="card-title fs-3">{props.title}</h4>
            <p className="card-text fs-5">{props.desc}</p>
            <p className="card-text">{props.deadline==="none"?"You have not added a deadline yet.":`To be finised by ${props.deadline}`}</p>
            <button type="button" className="btn btn-primary">Update</button>
            <button type="button" onClick={()=>{deleteTodos(props.id)}} className="btn btn-outline-primary mx-2">Delete</button>
            </div>
        </div>
        </>
    )
}

export default todo